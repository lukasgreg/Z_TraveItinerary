# Tenerife itinerary (15.–22. 10. 2026)

Static site served by GitHub Pages from `master` (root): https://lukasgreg.github.io/Z_TraveItinerary/
No build step — push to `master` and Pages redeploys in ~1 min.

## Files
- `data.js` — **all trip content**. Almost every change belongs here.
- `photos.js` — generated Wikimedia Commons photo per place id (`node tools/fetch-photos.mjs`).
- `app.js`, `style.css`, `index.html` — the app (MapLibre map on OpenFreeMap tiles + AWS terrain: relief, 3D, satellite toggle; day timeline; Book & Info tabs; live Open-Meteo weather).

## Editing the plan (typical requests from the phone)
- **Add a place** (restaurant, hike…): add an entry to `places` with `name, cat, lat, lng, desc`, optional `veg: true`,
  `gmaps: "Name Town"` (better Google Maps navigation for businesses), `links: [{label,url}]`, `photo: "Commons search"` or `img: "https://…jpg"`.
  `cat` must be a key of `categories` (base, food, hike, beach, war, view, sight, cave, parking).
  Set `approx: true` when the pin is not verified (popup tells users to use the Google Maps link).
- **Put it in the plan**: add a step to the day in `days[].steps`: `{ time, place, title, text, tags, optional, links, park, alts }`.
  `park` = id of a `parking` place (where to leave the car); `alts` = ids of alternative places (backup restaurants).
  Steps are shown in array order; map pin numbers follow the order of first appearance.
- **Plan B**: `days[].alternatives: [{ title, text, place? }]`.
- **Bookings**: `bookings[]` with `status: required | recommended | optional`.
- Bump `meta.updated` to today's date on every content change.
- Verify coordinates (e.g. nominatim.openstreetmap.org) — wrong pins are worse than no pins.
- Validate before committing: `node -e "global.window={};require('./data.js');const t=window.TRIP;for(const d of t.days)for(const s of [...d.steps,...(d.alternatives||[])])if(s.place&&!t.places[s.place])throw s.place;console.log('ok')"`

## Rules from the traveller
- Every restaurant/food place MUST have `gmaps` ("Name, Town") so it gets a Google Maps link, and every lunch step MUST have 2–3 `alts`.
- Every driving stop should have a `park` entry.
- Only put things that need booking into the main plan if they are actually booked; otherwise list them as optional/Plan B (e.g. Cueva del Viento is NOT booked).
- Check that restaurants are not (temporarily) closed before recommending them.

## Context
- 4 travellers, one vegetarian → always note vegetarian options for food places.
- Base: Hotel Atlantic Mirage, Puerto de la Cruz (breakfast + dinner at hotel; lunches out — local, casual, not fine dining).
- Rental car 17.–22. 10. (returned morning of the 22nd). Days 15–16 are on foot/bus/taxi.
- Interests: nature hikes (esp. Anaga laurel forest), military/war history sites, beaches, local food, sunsets.
- All times are Canary time (Prague − 1 h).
