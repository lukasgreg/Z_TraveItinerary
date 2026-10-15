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
    day.steps.forEach((s) => {
      if (s.park) (placeUse[s.park] ||= []).push({ di, step: s, role: "parking for " + (T.places[s.place]?.name || s.title) });
      (s.alts || []).forEach((a) => (placeUse[a] ||= []).push({ di, step: s, role: "alternative" }));
    });
    (day.alternatives || []).forEach((a) => {
      const st = { title: a.title };
      [a.place, a.park, ...(a.alts || [])].filter(Boolean).forEach((id) => (placeUse[id] ||= []).push({ di, step: st, role: "Plan B" }));
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
  if (["#map", "#book", "#gems", "#info"].includes(location.hash)) state.view = location.hash.slice(1);

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

  function packHtml(day) {
    if (!day.pack) return "";
    return `<details class="pack"><summary>🎒 What to wear & bring</summary>
      <p><b>Wear:</b> ${esc(day.pack.wear)}</p>
      <ul>${(day.pack.bring || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>`;
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
    if (s.includes("veg") || s.includes("booked")) return "veg";
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
        if (p.gmaps) acts.push(`<a class="btn small" href="${searchUrl(p)}" target="_blank" rel="noopener">📍 Google Maps</a>`);
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
          ${s.park ? parkHtml(s.park) : ""}
          ${s.alts?.length ? altsHtml(s.alts) : ""}
        </div></li>`;
    }).join("");

    const alts = (day.alternatives || []).map((a) => {
      const ap = a.place ? T.places[a.place] : null;
      const links = (ap?.links || []).map((l) => `<a class="btn small" href="${esc(l.url)}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`).join("");
      return `<div class="alt"><b>${esc(a.title)}</b><p>${esc(a.text)}</p>
      ${ap ? `<div class="acts"><button class="btn small" data-place="${esc(a.place)}">🗺️ On map</button>${links}</div>` : ""}
      ${a.park ? parkHtml(a.park) : ""}
      ${a.alts?.length ? altsHtml(a.alts, "lunch option") : ""}</div>`;
    }).join("");

    $("#day").innerHTML = `
      <header class="day-head">
        <p class="kicker">Day ${state.day + 1} · ${fmtDay(day.date)}${isToday ? " · today" : ""}</p>
        <h2>${esc(day.title)}</h2>
        <p class="area">${esc(day.area || "")}</p>
        <p class="summary">${esc(day.summary || "")}</p>
      </header>
      ${weatherHtml(day)}
      ${packHtml(day)}
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

  function parkHtml(id) {
    const p = T.places[id];
    return `<div class="park-row"><span class="park-ico">P</span>
      <div class="park-txt"><b>${esc(p.name.replace(/^P: /, ""))}</b><span>${esc(p.desc || "")}</span></div>
      <a class="btn small" href="${navUrl(p)}" target="_blank" rel="noopener">🧭</a></div>`;
  }

  function altsHtml(ids, label = "alternative") {
    return `<details class="alts-in"><summary>${ids.length} ${label}${ids.length > 1 ? "s" : ""} nearby</summary>${ids.map((id) => {
      const p = T.places[id];
      return `<div class="alt-item"><b>${esc(p.name)}</b><span>${esc(p.desc || "")}</span>
        <div class="acts"><a class="btn small" href="${searchUrl(p)}" target="_blank" rel="noopener">📍 Google Maps</a>
        <a class="btn small" href="${navUrl(p)}" target="_blank" rel="noopener">🧭 Navigate</a>
        <button class="btn small" data-place="${esc(id)}">🗺️ On map</button></div></div>`;
    }).join("")}</details>`;
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
    const label = { booked: "Booked ✓", required: "Must book", recommended: "Recommended", optional: "Optional" };
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
          ${(f.links || []).length ? `<div class="acts" style="grid-column:1/-1">${f.links.map((l) => `<a class="btn small" href="${esc(l.url)}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`).join("")}</div>` : ""}
        </div>`).join("")}
        <p style="margin:10px 0 0;font-size:13px;color:var(--ink-2)">🧳 ${esc(I.baggage)}</p>
      </div>
      <div class="card-block">
        <h3>🏨 Hotel</h3>
        <p style="margin:0 0 8px">${esc(hotel.name)}<br><span style="color:var(--ink-2);font-size:13px">${esc(hotel.desc)}</span></p>
        ${hotel.meals ? `<div class="kv"><span>🥐 Breakfast</span><span style="text-align:right">${esc(hotel.meals.breakfast)}</span></div>
        <div class="kv"><span>🍽️ Dinner</span><span style="text-align:right">${esc(hotel.meals.dinner)}</span></div>
        <p style="margin:6px 0 10px;font-size:13px;color:var(--ink-2)">${esc(hotel.meals.note || "")}</p>` : ""}
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

  /* ---------- hidden gems view ---------- */
  const gemIds = () => Object.keys(T.places).filter((id) => T.places[id].cat === "gem");
  function renderGems() {
    const ids = gemIds();
    $("#view-gems").innerHTML = `<section class="section">
      <h2>💎 Hidden gems</h2>
      <p class="lead">Well-rated, lesser-known spots that are not in the day plan. They are always shown on the map (diamond pins). Pins are approximate — use Google Maps to navigate.</p>
      ${ids.map((id) => {
        const p = T.places[id];
        const ph = photoOf(id);
        return `<div class="card-block gem-card">
          ${ph ? `<img class="thumb" loading="lazy" src="${esc(ph.src)}" alt="">` : ""}
          <h3>${esc(p.name)}</h3>
          ${p.why ? `<p class="gem-why">${esc(p.why)}</p>` : ""}
          <p>${esc(p.desc || "")}</p>
          <div class="acts">
            <button class="btn small primary" data-place="${esc(id)}">🗺️ On map</button>
            <a class="btn small" href="${navUrl(p)}" target="_blank" rel="noopener">🧭 Navigate</a>
            <a class="btn small" href="${searchUrl(p)}" target="_blank" rel="noopener">📍 Google Maps</a>
          </div></div>`;
      }).join("")}
    </section>`;
    $$("#view-gems [data-place]").forEach((b) => b.addEventListener("click", () => openPlace(b.dataset.place, null)));
    $$("#view-gems img.thumb").forEach((img) => img.addEventListener("error", () => img.remove()));
  }

  /* ---------- views ---------- */
  function showView(v) {
    const desktop = window.matchMedia("(min-width: 960px)").matches;
    if (desktop && v === "map") v = state.view === "map" ? "plan" : state.view;
    state.view = v;
    document.body.classList.toggle("show-map", v === "map");
    $$(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.view === v));
    ["plan", "book", "gems", "info"].forEach((k) => $(`#view-${k}`).classList.toggle("active", k === v || (v === "map" && k === "plan")));
    if (v === "map" && map) setTimeout(() => map.resize(), 0);
    if (v === "book" || v === "gems" || v === "info" || v === "map") history.replaceState(null, "", `#${v}`);
    else history.replaceState(null, "", `#d${state.day + 1}`);
  }
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

  /* ---------- map (MapLibre: OpenFreeMap vector tiles + terrain relief) ---------- */
  let map;
  let popup;
  let showParking = true;
  let mapReady = false;
  const whenReady = (fn) => (mapReady ? fn() : map.once("load", () => setTimeout(fn, 0)));
  const markers = {};
  const TERRAIN = {
    type: "raster-dem", encoding: "terrarium", tileSize: 256, maxzoom: 14,
    tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
    attribution: "Terrain: Mapzen/AWS"
  };

  function initMap() {
    map = new maplibregl.Map({
      container: "map",
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [-16.6, 28.29], zoom: 9.2, maxPitch: 75,
      attributionControl: { compact: true },
      cooperativeGestures: false
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-left");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
    popup = new maplibregl.Popup({ offset: 30, maxWidth: "300px", focusAfterOpen: false });

    map.on("load", () => {
      const firstSymbol = map.getStyle().layers.find((l) => l.type === "symbol")?.id;
      map.addSource("sat", {
        type: "raster", tileSize: 256, maxzoom: 19,
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        attribution: "Imagery © Esri"
      });
      map.addLayer({ id: "sat", type: "raster", source: "sat", layout: { visibility: "none" } }, firstSymbol);
      map.addSource("dem-hs", TERRAIN);
      map.addSource("dem-3d", TERRAIN);
      map.addLayer({
        id: "relief", type: "hillshade", source: "dem-hs",
        paint: {
          "hillshade-exaggeration": 0.55,
          "hillshade-shadow-color": "#4a2f1f",
          "hillshade-highlight-color": "#fff6e8",
          "hillshade-accent-color": "#6b4a32"
        }
      }, firstSymbol);
      map.addSource("route", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "route-glow", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#ffffff", "line-width": 7, "line-opacity": 0.8 } });
      map.addLayer({ id: "route", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#d9481f", "line-width": 3.5, "line-dasharray": [1.2, 1.6] } });
      map.setSky?.({ "sky-color": "#7fb6e0", "horizon-color": "#f6e7cf", "fog-color": "#f1e4cf", "sky-horizon-blend": 0.35, "horizon-fog-blend": 0.4, "fog-ground-blend": 0.6 });
      mapReady = true;
      updateRoute();
      fitFilter(true);
    });

    $("#map-filter").innerHTML = `<button data-f="all">All days</button>` +
      T.days.map((d, i) => `<button data-f="${i}">${fmtDay(d.date).replace(/ \w+$/, "")}</button>`).join("");
    $$("#map-filter button").forEach((b) => b.addEventListener("click", () => {
      setMapFilter(b.dataset.f === "all" ? null : +b.dataset.f);
      if (b.dataset.f !== "all") { state.day = +b.dataset.f; renderDaybar(); renderDay(); }
      fitFilter();
    }));

    $("#legend").innerHTML = Object.values(T.categories).map((c) => `<div><i style="background:${c.color}"></i>${c.icon} ${esc(c.label)}</div>`).join("") +
      `<div class="legend-note">Numbers = order within the day · faded pins = alternatives · dashed line = order, not the road</div>`;
    $("#legend-btn").addEventListener("click", () => { $("#legend").hidden = !$("#legend").hidden; });

    const btn3d = $("#btn-3d");
    btn3d.addEventListener("click", () => {
      const on = btn3d.getAttribute("aria-pressed") !== "true";
      btn3d.setAttribute("aria-pressed", on);
      whenReady(() => on ? enable3d() : disable3d());
    });
    function enable3d() {
      map.setTerrain({ source: "dem-3d", exaggeration: 1.4 });
      map.easeTo({ pitch: 62, bearing: map.getBearing() || -20, duration: 900 });
    }
    function disable3d() {
      map.setTerrain(null);
      map.easeTo({ pitch: 0, bearing: 0, duration: 700 });
    }
    const btnSat = $("#btn-sat");
    btnSat.addEventListener("click", () => {
      const on = btnSat.getAttribute("aria-pressed") !== "true";
      btnSat.setAttribute("aria-pressed", on);
      whenReady(() => map.setLayoutProperty("sat", "visibility", on ? "visible" : "none"));
    });
    const btnPark = $("#btn-park");
    btnPark.addEventListener("click", () => {
      showParking = !showParking;
      btnPark.setAttribute("aria-pressed", showParking);
      setMapFilter(state.mapFilter);
    });

    let here;
    $("#locate").addEventListener("click", () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        const ll = [pos.coords.longitude, pos.coords.latitude];
        if (!here) {
          const el = document.createElement("div");
          el.className = "pin-here";
          here = new maplibregl.Marker({ element: el }).setLngLat(ll).addTo(map);
        } else here.setLngLat(ll);
        map.flyTo({ center: ll, zoom: 14 });
      }, () => {}, { enableHighAccuracy: true, timeout: 10000 });
    });

    setMapFilter(state.view === "map" || window.matchMedia("(min-width: 960px)").matches ? state.day : null);
    fitFilter(true);
  }

  function popupHtml(id) {
    const p = T.places[id];
    const c = T.categories[p.cat];
    const ph = p.cat === "parking" ? null : photoOf(id);
    const when = id === "hotel" ? "" : (placeUse[id] || [])
      .map((u) => `${fmtDay(T.days[u.di].date)}${u.step.time ? " · " + u.step.time : ""}${u.role ? " · " + u.role : ""}`)
      .filter((v, i, a) => a.indexOf(v) === i).join("<br>");
    const links = (p.links || []).map((l) => `<a class="btn small" href="${esc(l.url)}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`).join("");
    return `<div class="pop">
      ${ph ? `<img src="${esc(ph.src)}" alt="" onerror="this.remove()">` : ""}
      ${ph && ph.page ? `<div class="credit"><a href="${esc(ph.page)}" target="_blank" rel="noopener">${esc(ph.credit || "Wikimedia Commons")}</a></div>` : ""}
      <div class="body">
        <div class="cat" style="color:${c.color}">${c.icon} ${esc(c.label)}${p.veg ? ' · <span class="vegtxt">🌱 veg options</span>' : ""}</div>
        <h4>${esc(p.name)}</h4>
        ${when ? `<div class="when">📅 ${when}</div>` : ""}
        <p>${esc(p.desc || "")}</p>
        ${p.approx ? `<div class="approx">📍 Pin is approximate — use the Google Maps button for the exact spot.</div>` : ""}
        <div class="acts">
          <a class="btn small primary" href="${navUrl(p)}" target="_blank" rel="noopener">🧭 Navigate</a>
          <a class="btn small" href="${searchUrl(p)}" target="_blank" rel="noopener">📍 Google Maps</a>
          ${links}
        </div>
      </div></div>`;
  }

  function addPin(id, label, opts = {}) {
    const p = T.places[id];
    const c = T.categories[p.cat];
    const el = document.createElement("button");
    el.type = "button";
    el.className = "pin-wrap";
    el.setAttribute("aria-label", p.name);
    const inner = p.cat === "parking" ? "P" : label != null ? label : c.icon;
    el.innerHTML = `<div class="pin${opts.dim ? " dim" : ""}${p.cat === "parking" ? " park" : ""}${p.cat === "gem" ? " gem" : ""}${label == null && p.cat !== "parking" ? " emoji" : ""}" style="--c:${c.color}"><span>${inner}</span></div>`;
    el.addEventListener("click", (e) => { e.stopPropagation(); showPopup(id); });
    const isPark = p.cat === "parking";
    markers[id] = new maplibregl.Marker({ element: el, anchor: isPark ? "center" : "bottom", offset: isPark ? [20, -8] : [0, 0] })
      .setLngLat([p.lng, p.lat]).addTo(map);
  }

  function showPopup(id) {
    const p = T.places[id];
    popup.setLngLat([p.lng, p.lat]).setHTML(popupHtml(id)).addTo(map);
  }

  function dayPlaceIds(day) {
    const main = Object.keys(day._numbers);
    const extra = new Set();
    day.steps.forEach((s) => { (s.alts || []).forEach((a) => extra.add(a)); });
    (day.alternatives || []).forEach((a) => { if (a.place) extra.add(a.place); (a.alts || []).forEach((x) => extra.add(x)); if (a.park) extra.add(a.park); });
    const parks = day.steps.map((s) => s.park).filter(Boolean);
    return { main, extra: [...extra].filter((x) => !main.includes(x)), parks };
  }

  function setMapFilter(f) {
    state.mapFilter = f;
    $$("#map-filter button").forEach((b) => b.classList.toggle("active", f == null ? b.dataset.f === "all" : b.dataset.f === String(f)));
    Object.keys(markers).forEach((k) => { markers[k].remove(); delete markers[k]; });
    popup?.remove();
    const day = f == null ? null : T.days[f];
    if (day) {
      const { main, extra, parks } = dayPlaceIds(day);
      if (!main.includes("hotel")) main.push("hotel");
      main.forEach((id) => addPin(id, T.places[id].cat !== "base" ? day._numbers[id] : null));
      extra.forEach((id) => !markers[id] && addPin(id, null, { dim: true }));
      if (showParking) parks.forEach((id) => !markers[id] && addPin(id));
      gemIds().forEach((id) => !markers[id] && addPin(id));
    } else {
      Object.keys(T.places).forEach((id) => {
        const p = T.places[id];
        if (p.cat === "parking" && !showParking) return;
        addPin(id, null, { dim: p.cat === "parking" });
      });
    }
    updateRoute();
  }

  function updateRoute() {
    if (!map || !map.getSource("route")) return;
    const day = state.mapFilter == null ? null : T.days[state.mapFilter];
    const coords = [];
    if (day) day.steps.forEach((s) => {
      if (!s.place) return;
      const p = T.places[s.place];
      const last = coords[coords.length - 1];
      if (!last || last[0] !== p.lng || last[1] !== p.lat) coords.push([p.lng, p.lat]);
    });
    map.getSource("route").setData({
      type: "FeatureCollection",
      features: coords.length > 1 ? [{ type: "Feature", geometry: { type: "LineString", coordinates: coords } }] : []
    });
  }

  function fitFilter(instant) {
    const ids = Object.keys(markers).filter((id) => T.places[id].cat !== "gem" && (T.places[id].cat !== "parking" || state.mapFilter != null));
    if (!ids.length || !map) return;
    const b = new maplibregl.LngLatBounds();
    ids.forEach((id) => b.extend([T.places[id].lng, T.places[id].lat]));
    setTimeout(() => {
      map.resize();
      map.fitBounds(b, { padding: { top: 70, bottom: 40, left: 40, right: 70 }, maxZoom: 14, duration: instant ? 0 : 900 });
    }, 60);
  }

  function openPlace(id, dayIdx) {
    if (dayIdx != null && state.mapFilter !== dayIdx) setMapFilter(dayIdx);
    if (!markers[id]) setMapFilter(null);
    showView("map");
    const p = T.places[id];
    setTimeout(() => {
      map.resize();
      map.jumpTo({ center: [p.lng, p.lat], zoom: Math.max(map.getZoom(), 13.5) });
      showPopup(id);
    }, 80);
  }

  /* ---------- boot ---------- */
  renderStatus();
  renderDaybar();
  renderDay();
  renderBook();
  renderGems();
  renderInfo();
  initMap();
  showView(state.view);
  loadWeather();
})();
