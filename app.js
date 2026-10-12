(() => {
  "use strict";

  const T = window.TRIP;
  const PHOTOS = window.PHOTOS || {};
  const TZ = "Atlantic/Canary";
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };

  /* ---------- dates (always in Canary time) ---------- */
  const canaryNow = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { date: `${p.year}-${p.month}-${p.day}`, minutes: (+p.hour % 24) * 60 + +p.minute };
  };
  const parseDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const addDays = (iso, n) => { const d = parseDate(iso); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const daysBetween = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 864e5);
  const fmtDay = (iso) => { const d = parseDate(iso); return `${DOW[d.getUTCDay()]} ${d.getUTCDate()} ${MON[d.getUTCMonth()]}`; };
  const stepMinutes = (t) => { const m = /(\d{1,2}):(\d{2})/.exec(t || ""); return m ? +m[1] * 60 + +m[2] : null; };

  /* ---------- index: which steps use which place ---------- */
  const placeUse = {};
  T.days.forEach((day, di) => {
    const numbers = {};
    let n = 0;
    day.steps.forEach((s) => {
      if (!s.place) return;
      if (!(s.place in numbers)) numbers[s.place] = ++n;
      s._n = numbers[s.place];
      (placeUse[s.place] ||= []).push({ di, step: s });
    });
    day._numbers = numbers;
  });

  const mapsQuery = (p) => (p.gmaps ? p.gmaps : `${p.lat},${p.lng}`);
  const navUrl = (p) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery(p))}`;
  const searchUrl = (p) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery(p))}`;
  const photoOf = (id) => {
    const p = T.places[id];
    if (p?.img) return { src: p.img };
    return PHOTOS[id] || null;
  };

  /* ---------- state ---------- */
  const now = canaryNow();
  const todayIdx = T.days.findIndex((d) => d.date === now.date);
  const hashDay = /^#d(\d+)$/.exec(location.hash);
  const state = {
    view: "plan",
    day: hashDay ? Math.min(T.days.length - 1, Math.max(0, +hashDay[1] - 1)) : Math.max(0, todayIdx),
    mapFilter: null
  };
  if (["#map", "#book", "#info"].includes(location.hash)) state.view = location.hash.slice(1);

  /* ---------- status pill ---------- */
  function renderStatus() {
    const el = $("#trip-status");
    $("#trip-sub").textContent = T.meta.dates;
    const toStart = daysBetween(now.date, T.meta.start);
    const sinceEnd = daysBetween(T.meta.end, now.date);
    if (toStart > 1) el.textContent = `in ${toStart} days`;
    else if (toStart === 1) el.textContent = "tomorrow!";
    else if (sinceEnd > 0) el.textContent = "¡hasta pronto!";
    else el.textContent = `Day ${daysBetween(T.meta.start, now.date) + 1} of ${T.days.length}`;
  }

  /* ---------- weather (Open-Meteo, no key) ---------- */
  const WMO = (c) => {
    if (c === 0) return ["☀️", "Clear"];
    if (c === 1) return ["🌤️", "Mostly clear"];
    if (c === 2) return ["⛅", "Partly cloudy"];
    if (c === 3) return ["☁️", "Overcast"];
    if (c === 45 || c === 48) return ["🌫️", "Fog / low cloud"];
    if (c >= 51 && c <= 57) return ["🌦️", "Drizzle"];
    if (c >= 61 && c <= 67) return ["🌧️", "Rain"];
    if (c >= 71 && c <= 77) return ["🌨️", "Snow"];
    if (c >= 80 && c <= 82) return ["🌦️", "Showers"];
    if (c >= 85 && c <= 86) return ["🌨️", "Snow showers"];
    if (c >= 95) return ["⛈️", "Thunderstorm"];
    return ["🌡️", ""];
  };
  const wx = {}; // key "lat,lng|date" -> data
  const wxKey = (l, date) => `${(+l.lat).toFixed(2)},${(+l.lng).toFixed(2)}|${date}`;

  async function loadWeather() {
    const start = T.meta.start > now.date ? T.meta.start : addDays(now.date, -1);
    const lastForecast = addDays(now.date, 15);
    const end = T.meta.end < lastForecast ? T.meta.end : lastForecast;
    if (end < start) return;
    const locs = [];
    const seen = new Set();
    T.days.forEach((d) => (d.weather?.at || []).forEach((l) => {
      const k = `${(+l.lat).toFixed(2)},${(+l.lng).toFixed(2)}`;
      if (!seen.has(k)) { seen.add(k); locs.push(l); }
    }));
    const cacheKey = `tf-wx-${start}-${end}-${locs.length}`;
    let cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null"); } catch { /* ignore */ }
    let data = cached && Date.now() - cached.t < 3600e3 ? cached.d : null;
    if (!data) {
      const u = "https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
        latitude: locs.map((l) => l.lat).join(","),
        longitude: locs.map((l) => l.lng).join(","),
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max",
        timezone: TZ, start_date: start, end_date: end
      });
      try {
        const r = await fetch(u);
        if (!r.ok) return;
        data = await r.json();
        if (!Array.isArray(data)) data = [data];
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: data })); } catch { /* ignore */ }
      } catch { return; }
    }
    data.forEach((res, i) => {
      const l = locs[i];
      const dd = res.daily;
      if (!l || !dd) return;
      dd.time.forEach((date, j) => {
        wx[wxKey(l, date)] = {
          code: dd.weather_code[j], tmax: dd.temperature_2m_max[j], tmin: dd.temperature_2m_min[j],
          prob: dd.precipitation_probability_max[j], rain: dd.precipitation_sum[j], wind: dd.wind_speed_10m_max[j]
        };
      });
    });
    renderDaybar();
    renderDay();
  }

  function weatherHtml(day) {
    const at = day.weather?.at || [];
    const cards = at.map((l) => {
      const w = wx[wxKey(l, day.date)];
      if (!w) return "";
      const [ico, label] = WMO(w.code);
      return `<div class="wx-card"><div class="ico">${ico}</div><div class="wx-main">
        <div class="wx-loc">${esc(l.name)}</div>
        <div class="wx-val">${Math.round(w.tmax)}° / ${Math.round(w.tmin)}° · ${esc(label)}</div>
        <div class="wx-det">💧 ${w.prob ?? "–"}% · ${w.rain ?? 0} mm · 💨 ${Math.round(w.wind)} km/h</div>
      </div><div class="wx-src">live</div></div>`;
    }).join("");
    if (cards) return `<div class="wx-row">${cards}</div>`;
    if (day.weather?.snapshot) {
      return `<div class="wx-row"><div class="wx-card"><div class="ico">🌤️</div><div class="wx-main">
        <div class="wx-loc">Forecast from ${esc(T.meta.updated)}</div>
        <div class="wx-val">${esc(day.weather.snapshot)}</div></div><div class="wx-src">saved</div></div></div>`;
    }
    return "";
  }

  /* ---------- plan view ---------- */
  function renderDaybar() {
    $("#daybar").innerHTML = T.days.map((d, i) => {
      const dt = parseDate(d.date);
      const first = d.weather?.at?.[0];
      const w = first && wx[wxKey(first, d.date)];
      const wxs = w ? `${WMO(w.code)[0]} ${Math.round(w.tmax)}°` : "";
      return `<button class="daychip${i === state.day ? " active" : ""}${i === todayIdx ? " today" : ""}" role="tab" aria-selected="${i === state.day}" data-day="${i}">
        <span class="dow">${DOW[dt.getUTCDay()]}</span><span class="dnum">${dt.getUTCDate()}</span><span class="wx">${wxs}</span></button>`;
    }).join("");
    $$("#daybar .daychip").forEach((b) => b.addEventListener("click", () => selectDay(+b.dataset.day)));
    const act = $("#daybar .active");
    if (act) act.scrollIntoView({ block: "nearest", inline: "center" });
  }

  const tagClass = (t) => {
    const s = t.toLowerCase();
    if (s.includes("veg")) return "veg";
    if (s.includes("book") || s.startsWith("€")) return "book";
    if (s.includes("military")) return "mil";
    if (s === "free") return "free";
    return "";
  };

  function renderDay() {
    const day = T.days[state.day];
    const isToday = state.day === todayIdx;
    let nowIdx = -1;
    if (isToday) day.steps.forEach((s, i) => { const m = stepMinutes(s.time); if (m != null && m <= now.minutes) nowIdx = i; });

    const steps = day.steps.map((s, i) => {
      const p = s.place ? T.places[s.place] : null;
      const cat = p ? T.categories[p.cat] : null;
      const tags = [...(s.tags || [])];
      if (s.optional && !tags.some((t) => /optional/i.test(t))) tags.unshift("Optional");
      const ph = s.place && p.cat !== "base" ? photoOf(s.place) : null;
      const links = [...(s.links || [])];
      const acts = [];
      if (p) {
        acts.push(`<button class="btn small" data-place="${esc(s.place)}">🗺️ On map</button>`);
        acts.push(`<a class="btn small" href="${navUrl(p)}" target="_blank" rel="noopener">🧭 Navigate</a>`);
        (p.links || []).forEach((l) => links.push(l));
      }
      links.forEach((l) => acts.push(`<a class="btn small" href="${esc(l.url)}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`));
      const cls = ["step", s.optional ? "optional" : "", i === nowIdx ? "now" : "", isToday && i < nowIdx ? "done" : ""].join(" ");
      return `<li class="${cls}">
        <div class="dot" style="border-color:${cat ? cat.color : "var(--line)"}">${cat ? cat.icon : "•"}${s.place && p.cat !== "base" ? `<b>${s._n}</b>` : ""}</div>
        <div class="card">
          <div class="time">${esc(s.time || "")}${i === nowIdx ? " · now" : ""}</div>
          <h3>${esc(s.title)}</h3>
          ${tags.length ? `<div class="tags">${tags.map((t) => `<span class="tag ${/optional/i.test(t) ? "opt" : tagClass(t)}">${esc(t)}</span>`).join("")}</div>` : ""}
          ${ph ? `<img class="thumb" loading="lazy" src="${esc(ph.src)}" alt="">` : ""}
          ${s.text ? `<p>${esc(s.text)}</p>` : ""}
          ${acts.length ? `<div class="acts">${acts.join("")}</div>` : ""}
        </div></li>`;
    }).join("");

    const alts = (day.alternatives || []).map((a) => `<div class="alt"><b>${esc(a.title)}</b><p>${esc(a.text)}</p>
      ${a.place ? `<button class="btn small" data-place="${esc(a.place)}">🗺️ On map</button>` : ""}</div>`).join("");

    $("#day").innerHTML = `
      <header class="day-head">
        <p class="kicker">Day ${state.day + 1} · ${fmtDay(day.date)}${isToday ? " · today" : ""}</p>
        <h2>${esc(day.title)}</h2>
        <p class="area">${esc(day.area || "")}</p>
        <p class="summary">${esc(day.summary || "")}</p>
      </header>
      ${weatherHtml(day)}
      <div class="day-actions">
        <button class="btn primary" id="day-on-map">🗺️ Day on map</button>
        ${state.day > 0 ? `<button class="btn" data-go="${state.day - 1}">← ${fmtDay(T.days[state.day - 1].date)}</button>` : ""}
        ${state.day < T.days.length - 1 ? `<button class="btn" data-go="${state.day + 1}">${fmtDay(T.days[state.day + 1].date)} →</button>` : ""}
      </div>
      <ol class="timeline">${steps}</ol>
      ${alts ? `<section class="alts"><h3>Plan B & alternatives</h3>${alts}</section>` : ""}
      <p class="edit-hint">Plan last edited ${esc(T.meta.updated)} · times are Canary time</p>`;

    $("#day-on-map").addEventListener("click", () => { setMapFilter(state.day); showView("map"); fitFilter(); });
    $$("#day [data-go]").forEach((b) => b.addEventListener("click", () => { selectDay(+b.dataset.go); $("#pane-content").scrollTo({ top: 0 }); }));
    $$("#day [data-place]").forEach((b) => b.addEventListener("click", () => openPlace(b.dataset.place, state.day)));
    $$("#day img.thumb").forEach((img) => img.addEventListener("error", () => img.remove()));
  }

  function selectDay(i) {
    state.day = i;
    history.replaceState(null, "", `#d${i + 1}`);
    renderDaybar();
    renderDay();
    if (window.matchMedia("(min-width: 960px)").matches) { setMapFilter(i); fitFilter(); }
  }

  /* ---------- book view ---------- */
  function renderBook() {
    const done = store.get("tf-bk-done", {});
    const label = { required: "Must book", recommended: "Recommended", optional: "Optional" };
    $("#view-book").innerHTML = `<section class="section">
      <h2>Bookings & to-dos</h2>
      <p class="lead">Tick things off as you book them (saved on this phone only). Prices as found in Oct 2026 — check before paying.</p>
      ${T.bookings.map((b) => `<label class="bk${done[b.id] ? " done" : ""}">
        <input type="checkbox" data-bk="${esc(b.id)}"${done[b.id] ? " checked" : ""}>
        <div><h4>${esc(b.title)}<span class="pill ${esc(b.status)}">${label[b.status] || esc(b.status)}</span></h4>
        <div class="meta">📅 ${esc(b.when)} · 💶 ${esc(b.price)}</div>
        <p>${esc(b.note)}</p>
        ${b.url ? `<a class="btn small" href="${esc(b.url)}" target="_blank" rel="noopener">Open booking page ↗</a>` : ""}</div>
      </label>`).join("")}
    </section>`;
    $$("#view-book input[data-bk]").forEach((cb) => cb.addEventListener("change", () => {
      const d = store.get("tf-bk-done", {});
      d[cb.dataset.bk] = cb.checked;
      store.set("tf-bk-done", d);
      cb.closest(".bk").classList.toggle("done", cb.checked);
    }));
  }

  /* ---------- info view ---------- */
  function renderInfo() {
    const I = T.info;
    const hotel = T.places.hotel;
    const vegLabel = { vegan: "vegan", veg: "veg", ask: "ask", no: "meat/fish" };
    $("#view-info").innerHTML = `<section class="section">
      <h2>Trip info</h2>
      <p class="lead">${esc(I.timezone)}</p>
      <div class="card-block">
        <h3>✈️ Flights</h3>
        ${I.flights.map((f) => `<div class="flight">
          <div class="lbl">${esc(f.dir)} · <b>${esc(f.date)}</b> · ${esc(f.flight)}</div>
          <div class="end"><b>${esc(f.dep.split(" ")[0])}</b><span>${esc(f.from)} ${esc(f.dep.replace(/^\S+\s*/, ""))}</span></div>
          <div class="arrow">→</div>
          <div class="end r"><b>${esc(f.arr.split(" ")[0])}</b><span>${esc(f.to)} ${esc(f.arr.replace(/^\S+\s*/, ""))}</span></div>
        </div>`).join("")}
        <p style="margin:10px 0 0;font-size:13px;color:var(--ink-2)">🧳 ${esc(I.baggage)}</p>
      </div>
      <div class="card-block">
        <h3>🏨 Hotel</h3>
        <p style="margin:0 0 8px">${esc(hotel.name)}<br><span style="color:var(--ink-2);font-size:13px">${esc(hotel.desc)}</span></p>
        <a class="btn small" href="${navUrl(hotel)}" target="_blank" rel="noopener">🧭 Navigate to hotel</a>
        <button class="btn small" data-place="hotel">🗺️ On map</button>
      </div>
      <div class="card-block">
        <h3>🆘 Important</h3>
        ${I.emergency.map((e) => `<div class="kv"><span>${esc(e.label)}</span>${/^\d+$/.test(e.value) ? `<a href="tel:${esc(e.value)}">${esc(e.value)}</a>` : `<span style="text-align:right">${esc(e.value)}</span>`}</div>`).join("")}
      </div>
      <div class="card-block">
        <h3>💡 Tips</h3>
        <ul class="list">${I.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      <div class="card-block">
        <h3>🥔 What to eat (veg guide)</h3>
        <div class="food">${I.food.map((f) => `<div><span class="v ${esc(f.veg)}">${vegLabel[f.veg] || esc(f.veg)}</span><b>${esc(f.name)}</b><span>${esc(f.desc)}</span></div>`).join("")}</div>
        <p style="margin:12px 0 0;font-size:13px;color:var(--ink-2)">🍷 ${esc(I.guachinche)}</p>
      </div>
      <div class="card-block">
        <h3>🗣️ Handy Spanish</h3>
        ${I.phrases.map((p) => `<div class="phrase"><b>${esc(p.es)}</b><span>${esc(p.en)}</span></div>`).join("")}
      </div>
      <p class="edit-hint">Photos: Wikimedia Commons (credits in map popups). Weather: Open-Meteo.</p>
    </section>`;
    $$("#view-info [data-place]").forEach((b) => b.addEventListener("click", () => openPlace(b.dataset.place, null)));
  }

  /* ---------- views ---------- */
  function showView(v) {
    const desktop = window.matchMedia("(min-width: 960px)").matches;
    if (desktop && v === "map") v = state.view === "map" ? "plan" : state.view;
    state.view = v;
    document.body.classList.toggle("show-map", v === "map");
    $$(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.view === v));
    ["plan", "book", "info"].forEach((k) => $(`#view-${k}`).classList.toggle("active", k === v || (v === "map" && k === "plan")));
    if (v === "map" && map) setTimeout(() => map.invalidateSize(), 0);
    if (v === "book" || v === "info" || v === "map") history.replaceState(null, "", `#${v}`);
    else history.replaceState(null, "", `#d${state.day + 1}`);
  }
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

  /* ---------- map ---------- */
  let map, markerLayer, routeLayer;
  const markers = {};

  function initMap() {
    map = L.map("map", { zoomControl: false, tap: true }).setView([28.29, -16.6], 10);
    L.control.zoom({ position: "bottomleft" }).addTo(map);
    const base = {
      "Map": L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      "Topo": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19, attribution: "Tiles &copy; Esri"
      }),
      "Terrain (hiking)": L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17, subdomains: "abc", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>, <a href="https://opentopomap.org">OpenTopoMap</a>'
      }),
      "Satellite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19, attribution: "Imagery &copy; Esri"
      })
    };
    base["Map"].addTo(map);
    L.control.layers(base, null, { position: "topright" }).addTo(map);
    routeLayer = L.layerGroup().addTo(map);
    markerLayer = L.layerGroup().addTo(map);

    $("#map-filter").innerHTML = `<button data-f="all">All days</button>` +
      T.days.map((d, i) => `<button data-f="${i}">${fmtDay(d.date).replace(/ \w+$/, "")}</button>`).join("");
    $$("#map-filter button").forEach((b) => b.addEventListener("click", () => {
      setMapFilter(b.dataset.f === "all" ? null : +b.dataset.f);
      if (b.dataset.f !== "all") { state.day = +b.dataset.f; renderDaybar(); renderDay(); }
      fitFilter();
    }));

    $("#legend").innerHTML = Object.values(T.categories).map((c) => `<div><i style="background:${c.color}"></i>${c.icon} ${esc(c.label)}</div>`).join("") +
      `<div style="margin-top:6px;color:var(--ink-3);font-size:12px">Numbers = order within the day.<br>Dashed line = order, not the road.</div>`;
    $("#legend-btn").addEventListener("click", () => { $("#legend").hidden = !$("#legend").hidden; });

    let here;
    $("#locate").addEventListener("click", () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        const ll = [pos.coords.latitude, pos.coords.longitude];
        if (here) here.setLatLng(ll); else here = L.marker(ll, { icon: L.divIcon({ className: "", html: '<div class="pin-here"></div>', iconSize: [16, 16] }) }).addTo(map);
        map.flyTo(ll, 14);
      }, () => {}, { enableHighAccuracy: true, timeout: 10000 });
    });

    setMapFilter(state.view === "map" || window.matchMedia("(min-width: 960px)").matches ? state.day : null);
    fitFilter();
  }

  function popupHtml(id) {
    const p = T.places[id];
    const c = T.categories[p.cat];
    const ph = photoOf(id);
    const uses = (placeUse[id] || []).filter((u, i, a) => a.findIndex((x) => x.di === u.di) === i || id !== "hotel");
    const when = id === "hotel" ? "" : uses.map((u) => `${fmtDay(T.days[u.di].date)}${u.step.time ? " · " + u.step.time : ""}`).filter((v, i, a) => a.indexOf(v) === i).join("<br>");
    const links = (p.links || []).map((l) => `<a class="btn small" href="${esc(l.url)}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`).join("");
    return `<div class="pop">
      ${ph ? `<img src="${esc(ph.src)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
      ${ph && ph.page ? `<div class="credit"><a href="${esc(ph.page)}" target="_blank" rel="noopener">${esc(ph.credit || "Wikimedia Commons")}</a></div>` : ""}
      <div class="body">
        <div class="cat" style="color:${c.color}">${c.icon} ${esc(c.label)}${p.veg ? ' · <span style="color:var(--leaf)">🌱 veg options</span>' : ""}</div>
        <h4>${esc(p.name)}</h4>
        ${when ? `<div class="when">📅 ${when}</div>` : ""}
        <p>${esc(p.desc)}</p>
        <div class="acts">
          <a class="btn small primary" href="${navUrl(p)}" target="_blank" rel="noopener">🧭 Navigate</a>
          <a class="btn small" href="${searchUrl(p)}" target="_blank" rel="noopener">Google Maps</a>
          ${links}
        </div>
      </div></div>`;
  }

  function pinIcon(id, label, dim) {
    const c = T.categories[T.places[id].cat];
    const inner = label != null ? `<span>${label}</span>` : `<span class="e">${c.icon}</span>`;
    return L.divIcon({
      className: "", iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28],
      html: `<div class="pin${dim ? " dim" : ""}" style="background:${c.color}">${inner}</div>`
    });
  }

  function setMapFilter(f) {
    state.mapFilter = f;
    $$("#map-filter button").forEach((b) => b.classList.toggle("active", f == null ? b.dataset.f === "all" : b.dataset.f === String(f)));
    markerLayer.clearLayers();
    routeLayer.clearLayers();
    Object.keys(markers).forEach((k) => delete markers[k]);
    const day = f == null ? null : T.days[f];
    const ids = day ? Object.keys(day._numbers) : Object.keys(T.places);
    if (day && !ids.includes("hotel")) ids.push("hotel");
    ids.forEach((id) => {
      const p = T.places[id];
      const n = day && p.cat !== "base" ? day._numbers[id] : null;
      const m = L.marker([p.lat, p.lng], { icon: pinIcon(id, n), zIndexOffset: p.cat === "base" ? -100 : 0 })
        .bindPopup(() => popupHtml(id), { maxWidth: 290, autoPanPaddingTopLeft: [10, 60] });
      m.addTo(markerLayer);
      markers[id] = m;
    });
    // places mentioned only in alternatives: show faded on the day view
    if (day) (day.alternatives || []).forEach((a) => {
      if (!a.place || markers[a.place]) return;
      const p = T.places[a.place];
      markers[a.place] = L.marker([p.lat, p.lng], { icon: pinIcon(a.place, null, true) })
        .bindPopup(() => popupHtml(a.place), { maxWidth: 290 }).addTo(markerLayer);
    });
    if (day) {
      const pts = [];
      day.steps.forEach((s) => { if (s.place) { const p = T.places[s.place]; const last = pts[pts.length - 1]; if (!last || last[0] !== p.lat || last[1] !== p.lng) pts.push([p.lat, p.lng]); } });
      if (pts.length > 1) L.polyline(pts, { color: "#d9481f", weight: 3, opacity: .7, dashArray: "6 8" }).addTo(routeLayer);
    }
  }

  function fitFilter() {
    const ids = Object.keys(markers);
    if (!ids.length) return;
    const b = L.latLngBounds(ids.map((id) => [T.places[id].lat, T.places[id].lng]));
    setTimeout(() => { map.invalidateSize(); map.fitBounds(b, { padding: [50, 50], maxZoom: 14 }); }, 50);
  }

  function openPlace(id, dayIdx) {
    if (dayIdx != null && state.mapFilter !== dayIdx) setMapFilter(dayIdx);
    if (!markers[id]) setMapFilter(null);
    showView("map");
    const p = T.places[id];
    setTimeout(() => {
      map.invalidateSize();
      map.setView([p.lat, p.lng], Math.max(map.getZoom(), 13), { animate: false });
      markers[id]?.openPopup();
    }, 60);
  }

  /* ---------- boot ---------- */
  renderStatus();
  renderDaybar();
  renderDay();
  renderBook();
  renderInfo();
  initMap();
  showView(state.view);
  loadWeather();
})();
