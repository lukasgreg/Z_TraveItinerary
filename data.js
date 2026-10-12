/*
 * TENERIFE 15.–22. 10. 2026 — all trip content lives in this file.
 * To change the plan, edit only this file (see CLAUDE.md for the schema).
 *
 * places : every map pin. Referenced from day steps by id.
 * days   : the day-by-day plan. Step order = pin numbers on the map.
 * bookings, info : the "Book" and "Info" tabs.
 *
 * Times: everything is LOCAL CANARY TIME (Prague − 1 h), except the Prague departure.
 */
window.TRIP = {
  meta: {
    title: "Tenerife",
    dates: "15.–22. 10. 2026",
    start: "2026-10-15",
    end: "2026-10-22",
    base: { lat: 28.4164, lng: -16.5369 },
    updated: "2026-10-12",
    weatherSnapshot: "Forecast snapshot taken 12 Oct 2026 — the live forecast replaces it automatically once the day is within range."
  },

  /* category -> colour + emoji (used for pins, legend and step icons) */
  categories: {
    base:    { label: "Hotel & transport", color: "#3d3a36", icon: "🏨" },
    food:    { label: "Lunch & food",      color: "#e4572e", icon: "🍴" },
    hike:    { label: "Hike & nature",     color: "#2f7d4f", icon: "🥾" },
    beach:   { label: "Beach & swim",      color: "#d9a21b", icon: "🏖️" },
    war:     { label: "Military history",  color: "#6b5b3e", icon: "🪖" },
    view:    { label: "Viewpoint / sunset",color: "#7b4bb7", icon: "🌅" },
    sight:   { label: "Town & sights",     color: "#0f7c8a", icon: "📍" },
    cave:    { label: "Cave",              color: "#8a4b2a", icon: "🕳️" }
  },

  places: {
    /* ---------- base ---------- */
    tfs: {
      name: "Tenerife South airport (TFS – Reina Sofía)", cat: "base", lat: 28.0445, lng: -16.5725,
      desc: "Arrival 15 Oct 16:15, departure 22 Oct 17:05. Transfer bus to/from the hotel is included in your package — the bus to the north coast takes about 1.5–2 h with hotel stops.",
      photo: "Tenerife South Airport"
    },
    hotel: {
      name: "Hotel Atlantic Mirage Suites & Spa 4*", cat: "base", lat: 28.41644, lng: -16.53693,
      desc: "Your base. Adults-only hotel in the La Paz district of Puerto de la Cruz (C/ Eucaliptus 4). Breakfast and dinner here most days. 10 min walk to Lago Martiánez, ~20 min to the old town.",
      photo: "Puerto de la Cruz Tenerife coast"
    },

    /* ---------- Puerto de la Cruz ---------- */
    martianez: {
      name: "Lago Martiánez & seafront promenade", cat: "sight", lat: 28.4166, lng: -16.5425,
      desc: "César Manrique's lava-and-seawater pool complex. The promenade above it leads straight into the old town — perfect first-evening stroll.",
      photo: "Lago Martiánez"
    },
    charco: {
      name: "Plaza del Charco (old town)", cat: "sight", lat: 28.4169, lng: -16.5497,
      desc: "The heart of Puerto de la Cruz, under Indian laurel trees. Around it: Calle Quintana, the church of Nuestra Señora de la Peña de Francia, the Casa de la Real Aduana and the little fishing harbour (Muelle).",
      photo: "Plaza del Charco Puerto de la Cruz"
    },
    muelle: {
      name: "Old fishing harbour & Punta del Viento", cat: "view", lat: 28.4182, lng: -16.5482,
      desc: "Waves crash on black lava right next to town. Good spot to watch the sunset (~19:35) on the first evening.",
      photo: "Puerto de la Cruz harbour"
    },
    botanico: {
      name: "Jardín Botánico (Botanical Garden)", cat: "hike", lat: 28.4115, lng: -16.5359,
      desc: "Founded 1788 by royal order to acclimatise tropical plants — giant fig with strangling roots, palms, bromeliads. A compact 'jungle' 7 min walk from the hotel. Tickets at the gate (a few €), roughly 9:00–18:00 (check on the day).",
      photo: "Jardín de Aclimatación de La Orotava"
    },
    mirador_paz: {
      name: "Mirador de La Paz", cat: "view", lat: 28.4155, lng: -16.5390,
      desc: "Cliff-top viewpoint above Playa Martiánez, a few minutes from the hotel. Stairs/zigzag path down to the beach and promenade.",
      photo: "Mirador de La Paz Puerto de la Cruz"
    },
    ranilla: {
      name: "La Ranilla — fishermen's quarter & street art", cat: "sight", lat: 28.4160, lng: -16.5535,
      desc: "Old fishermen's neighbourhood, now full of big murals (Puerto Street Art festival) and small tascas. Wander Calle Mequinez, Calle Lomo, Calle Cupido.",
      photo: "Puerto de la Cruz mural street art"
    },
    bodeguita: {
      name: "Lunch: La Tasca de al Lado", cat: "food", lat: 28.4155, lng: -16.5515, veg: true,
      desc: "Small tasca in the centre doing Canarian home cooking at a good price (locals rave about the bonito en mojo and papas arrugadas). Order to share: papas arrugadas con mojo (vegan), queso asado/a la plancha con mojo (veg), almogrote (veg cheese paste), pimientos de padrón. Meat eaters: carne fiesta, conejo en salmorejo. ~€15–25 pp. Check that it's open — many places take a break around 16:00.",
      gmaps: "La Tasca de al lado Puerto de la Cruz"
    },
    perrachica: {
      name: "Alt. lunch: Tasquita PerraChica", cat: "food", lat: 28.4158, lng: -16.5525, veg: true,
      desc: "Small, cheap and friendly tapas bar — papas, cheese, croquettes, salads. Good backup if the first choice is full. Third option: Enyesque Tapas Bar (great value modern tapas).",
      gmaps: "Tasquita PerraChica Puerto de la Cruz"
    },
    rambla_castro: {
      name: "Rambla de Castro coastal path + Fortín de San Fernando", cat: "war", lat: 28.3985, lng: -16.5915,
      desc: "Wild palm-grove coast in Los Realejos. Easy 3–4 km path past the ruined Hacienda de Castro and the Fortín de San Fernando — an 18th-century coastal gun battery built against pirate and British raids, cannons still pointing to sea. Get there by taxi (~€12, 10 min) or TITSA bus to Los Realejos / San Vicente (Rambla de Castro stop).",
      photo: "Rambla de Castro"
    },
    playa_jardin: {
      name: "Playa Jardín & Castillo de San Felipe", cat: "view", lat: 28.4140, lng: -16.5620,
      desc: "Black-sand beach landscaped with gardens by César Manrique, and a little 17th-century coastal fort at its end. Best sunset spot in town.",
      photo: "Playa Jardín Puerto de la Cruz"
    },
    orotava: {
      name: "La Orotava old town", cat: "sight", lat: 28.3904, lng: -16.5226,
      desc: "Steep cobbled colonial town above Puerto: Casa de los Balcones (carved wooden balconies), Jardines Victoria, Hijuela del Botánico, Iglesia de la Concepción. 15 min by car or TITSA bus 345/350.",
      photo: "La Orotava"
    },

    /* ---------- Teide ---------- */
    portillo: {
      name: "El Portillo visitor centre + lunch", cat: "food", lat: 28.3044, lng: -16.5647, veg: true,
      desc: "Park entrance from the north (2,050 m). Visitor centre with a small botanical trail. Restaurante El Portillo next door: restaurant ~13:00–16:00, café 9:00–18:00 (per 2026 reviews). Veg: queso asado con mojo, papas arrugadas, ensalada; carnivores: garbanzas, conejo. Popular — call ahead or arrive at 13:00.",
      gmaps: "Restaurante El Portillo Teide"
    },
    montana_blanca: {
      name: "Montaña Blanca hike (PNT 7) — 'Teide eggs'", cat: "hike", lat: 28.2649, lng: -16.5853,
      desc: "FREE, no permit. Start at the small car park at TF-21 km ~40.5 (2,350 m). A wide pumice track climbs gently past the 'Huevos del Teide' (giant black lava balls) to the summit of Montaña Blanca (2,750 m) with Teide towering above. ~8 km return, 2.5–3.5 h, +400 m. Bring water, sun cream, wind jacket. Arrive before ~10:00 — the car park is small.",
      links: [{ label: "Trail info (Tenerife ON)", url: "https://tenerifeon.es/en/routes/hiking/" }],
      photo: "Huevos del Teide"
    },
    teleferico: {
      name: "Teide cable car (base station)", cat: "view", lat: 28.2554, lng: -16.6163,
      desc: "OPTIONAL. 8 min up to La Rambleta (3,555 m). From the top, two short trails need NO permit: Trail 11 to the La Fortaleza viewpoint and Trail 12 to the Pico Viejo viewpoint (look into the crater). ~€42 return (non-resident adult, 2026). Oct 14–24 roughly 9:00–17:30; closes in strong wind/ice. Book a timed slot online. The final 160 m to the actual summit needs the separate free-ish permit (see Book tab).",
      links: [{ label: "Book cable car (volcanoteide.com)", url: "https://www.volcanoteide.com/en/teide-cable-car" }],
      photo: "Teleférico del Teide"
    },
    roques_garcia: {
      name: "Roques de García loop (PNT 3)", cat: "hike", lat: 28.2236, lng: -16.6286,
      desc: "FREE. The iconic rock towers (Roque Cinchado) in front of Teide. 3.5 km loop, ~1.5 h, a bit of scrambling on the far side. Opposite: Mirador de la Ruleta over the flat Llano de Ucanca.",
      photo: "Roques de García"
    },
    minas: {
      name: "Minas de San José — pumice moonscape", cat: "view", lat: 28.2290, lng: -16.6040,
      desc: "Short walk across white-and-ochre pumice fields that look like the moon. Great late-afternoon light; good optional sunset/stargazing stop (Teide park is a Starlight reserve).",
      photo: "Minas de San José Teide"
    },

    /* ---------- Anaga ---------- */
    pico_ingles: {
      name: "Mirador Pico del Inglés — optional sunrise", cat: "view", lat: 28.5284, lng: -16.2659,
      desc: "Balcony at ~1,000 m over the Anaga ridges, both coasts and — on clear mornings — Teide floating over a sea of clouds. Sunrise ~08:08. Leave the hotel at ~07:05 (≈55 min). Bring a hoodie.",
      photo: "Pico del Inglés Anaga"
    },
    cruz_carmen: {
      name: "Cruz del Carmen — Sendero de los Sentidos", cat: "hike", lat: 28.5310, lng: -16.2800,
      desc: "Anaga visitor centre (car park, toilets, café). The 'Path of the Senses' is a short (20–40 min) boardwalk into dripping laurel forest (laurisilva) — the Tertiary-era 'jungle' with moss, ferns and twisted trees.",
      photo: "Cruz del Carmen Anaga laurisilva"
    },
    carboneras: {
      name: "Las Carboneras → Chinamada hike", cat: "hike", lat: 28.5452, lng: -16.2720,
      desc: "Ridge path from the hamlet of Las Carboneras to Chinamada through laurel and heather forest with drops into the barrancos and views of Roque de Taborno. ~3 km each way, ~1 h 15 min each way. Park at the end of the road in Las Carboneras (narrow access road).",
      photo: "Chinamada Anaga"
    },
    chinamada: {
      name: "Lunch: Restaurante La Cueva, Chinamada", cat: "food", lat: 28.5570, lng: -16.2805, veg: true,
      desc: "Eat inside a cave house in a village where people still live in caves. Canarian home cooking: papas, queso asado, potaje, carne. Veg: papas con mojo, queso, salad — ask about potaje without meat. Opening is irregular (reportedly closed Mon/Tue) — check Google Maps on the morning. Backup: Bar Casa Paca at Cruz del Carmen or picnic.",
      gmaps: "Restaurante La Cueva Chinamada"
    },
    teresitas_mirador: {
      name: "Mirador de Las Teresitas", cat: "view", lat: 28.5121, lng: -16.1771,
      desc: "The postcard view down on the golden beach and San Andrés, from the TF-12 road towards Igueste. Quick photo stop.",
      photo: "Mirador de Las Teresitas"
    },
    teresitas: {
      name: "Playa de Las Teresitas — the yellow-sand beach", cat: "beach", lat: 28.5080, lng: -16.1860,
      desc: "1.3 km of golden sand (imported from the Sahara in the 1970s) behind a breakwater = calm water. Showers, kiosks, free parking (fills up on Sundays). East-facing, so afternoon sun is fine but sunset happens behind the mountains.",
      photo: "Playa de Las Teresitas"
    },
    san_andres: {
      name: "San Andrés — castle ruins & fish bars", cat: "war", lat: 28.5045, lng: -16.1930,
      desc: "Ruined round tower of the Castillo de San Andrés (1706, half destroyed by a flood) at the beach end. The hills above hide unmarked WWII machine-gun nests (1940s, fear of British 'Operation Pilgrim'); a guided 8 km bunker hike starts here (Civitatis). The village has cheap fish tascas — good for an afternoon drink.",
      links: [{ label: "Guided bunker hike (Civitatis)", url: "https://www.civitatis.com/en/san-andres-espana/san-andres-bunkers-hike" }],
      photo: "Castillo de San Andrés Tenerife"
    },

    /* ---------- West ---------- */
    cueva: {
      name: "Cueva del Viento (Wind Cave) — BOOK", cat: "cave", lat: 28.3600, lng: -16.7090,
      desc: "Europe's longest lava tube (~18 km). Guided tour ~2 h incl. ~45 min underground with helmet and headlamp. €25/adult, CARD ONLY, must be booked online in advance. Long trousers + closed shoes required. Meet at the visitor centre, C/ Los Piquetes 51, Icod de los Vinos (15 min before).",
      links: [{ label: "Book tour (official)", url: "https://cuevadelviento.net/en/ruta-en-ingles-viaje-al-interior-de-la-tierra/" }],
      photo: "Cueva del Viento Icod"
    },
    drago: {
      name: "Drago Milenario (Icod de los Vinos)", cat: "sight", lat: 28.3672, lng: -16.7212,
      desc: "The oldest dragon tree in the Canaries (hundreds of years old). You can see it for free from Plaza de San Marcos/Plaza de la Pila; the park around it is paid. 15 min stop.",
      photo: "Drago Milenario"
    },
    garachico: {
      name: "Garachico & El Caletón lava pools", cat: "beach", lat: 28.3742, lng: -16.7640,
      desc: "Pretty town rebuilt after the 1706 eruption buried its port. Swim in El Caletón — natural pools formed by that lava flow (only when the sea is calm, follow the flag). Castillo de San Miguel (16th-c. fort) right next to the pools; Roque de Garachico offshore.",
      photo: "Garachico El Caletón"
    },
    rebojo: {
      name: "Lunch: El Rebojo, Garachico", cat: "food", lat: 28.3735, lng: -16.7632, veg: true,
      desc: "Michelin Bib Gourmand = good value, NOT fine dining. Modern Canarian cooking a few steps from El Caletón; small plates and well-priced menus, usually with vegetarian options. Lunch 13:00–17:30, CLOSED Wed & Thu. Reserve the day before. Don't skip the smoked-cheese cheesecake.",
      gmaps: "El Rebojo Garachico"
    },
    cherfe: {
      name: "Mirador de Cherfe (Masca valley)", cat: "view", lat: 28.2967, lng: -16.8254,
      desc: "Viewpoint over the Masca gorge and its jagged ridges, with La Gomera on the horizon. On the TF-436 mountain road (very narrow, hairpins — drive slowly, honk on blind bends). Optional sunset spot.",
      photo: "Masca Tenerife"
    },
    teno_alto: {
      name: "Teno Alto plateau walk", cat: "hike", lat: 28.3330, lng: -16.8800,
      desc: "Remote farming plateau with stone walls, goats and a cliff edge 600 m above the sea. Easy 1–1.5 h loop from the hamlet (PR-TF 51 area). Reached by a small road from El Palmar. Bar Los Bailaderos in the hamlet serves local goat cheese.",
      photo: "Teno Alto"
    },

    /* ---------- Santa Cruz / La Laguna ---------- */
    almeyda: {
      name: "Museo Histórico Militar de Canarias (Almeyda)", cat: "war", lat: 28.4728, lng: -16.2468,
      desc: "FREE military museum in an old barracks: the 'El Tigre' cannon that cost Admiral Nelson his arm in 1797, weapons, uniforms and the story of Tenerife's defence — plus the 1936 coup that started from the Canaries. Tue–Sat ~10:00–14:00 (check). Address: C/ San Isidro 2, Santa Cruz.",
      links: [{ label: "Info (webtenerife)", url: "https://www.webtenerife.co.uk/what-see/museums/museo-militar" }],
      photo: "Museo Histórico Militar de Canarias"
    },
    mercado: {
      name: "Mercado de Nuestra Señora de África", cat: "food", lat: 28.4632, lng: -16.2560, veg: true,
      desc: "Santa Cruz's colourful market (1940s arcades). Grab snacks for the road: local cheeses, tropical fruit, mojo, churros. Best in the morning.",
      photo: "Mercado de Nuestra Señora de África"
    },
    laguna: {
      name: "San Cristóbal de La Laguna (UNESCO)", cat: "sight", lat: 28.4882, lng: -16.3156,
      desc: "University town and the original Spanish colonial grid (model for Havana & Cartagena). Walk Calle San Agustín, Calle Obispo Rey Redondo, the cathedral, and climb the tower of Iglesia de la Concepción for the view. Lively student bars.",
      photo: "San Cristóbal de La Laguna"
    },
    somos: {
      name: "Lunch: Somos lo que comemos (vegan Canarian)", cat: "food", lat: 28.4870, lng: -16.3140, veg: true,
      desc: "Tiny, very cheap vegan restaurant doing Canarian home cooking — menú del día around €7–10. A rare place where the vegetarian gets the full local experience. Simple setting. If the meat eaters revolt: Tasca Los Corazones (traditional tasca, well rated) in the centre.",
      gmaps: "Somos lo que comemos La Laguna"
    },
    raices: {
      name: "Las Raíces — Franco's 1936 coup memorial", cat: "war", lat: 28.423946, lng: -16.380139,
      desc: "In the pine and eucalyptus forest of La Esperanza. On 17 June 1936 General Franco, then military commander of the Canaries, held a 'picnic' here with officers to plan the uprising that started the Spanish Civil War. A Francoist obelisk stood here from 1958; under the Historical Memory Law it was ordered demolished — what remains is uncertain, but the site and forest are worth the stop. Off the TF-24 road.",
      links: [{ label: "TracesOfWar entry", url: "https://tracesofwar.com/sights/91790/Remains-Memorial-Franco.htm" }],
      photo: "Las Raíces El Rosario"
    },

    /* ---------- South ---------- */
    medano: {
      name: "El Médano", cat: "sight", lat: 28.0456, lng: -16.5370,
      desc: "Laid-back windsurfing town on the sunny, dry south coast — usually dry when the north is rainy. Long sandy beach, boardwalk, cheap menú del día around the main square (€10–14).",
      photo: "El Médano Tenerife"
    },
    montana_roja: {
      name: "Montaña Roja loop + WWII machine-gun nests", cat: "war", lat: 28.0310, lng: -16.5470,
      desc: "Red volcanic cone in a nature reserve. Loop from El Médano over the dunes to the summit (171 m): ~7.5 km / 2–2.5 h, moderate. Along the coast here sit concrete WWII machine-gun nests (1941–43) built when Spain feared a British invasion of the Canaries — around 50 survive on the south coast. Windy, no shade: hat + water.",
      links: [{ label: "Route (Komoot)", url: "https://www.komoot.com/highlight/4528469" }],
      photo: "Montaña Roja El Médano"
    },
    medano_lunch: {
      name: "Lunch: El Médano — menú del día / El Med Veg", cat: "food", lat: 28.0462, lng: -16.5365, veg: true,
      desc: "Easiest: a 3-course 'menú del día' incl. drink (~€10–14) on Plaza Roja / beach front — ask for 'algo vegetariano'. Fully vegan option: El Med Veg (check it's open). Local favourite for a quick lunch: La Estación cafeteria-bar.",
      gmaps: "restaurants Plaza El Médano"
    },
    tejita: {
      name: "Playa de La Tejita", cat: "beach", lat: 28.0300, lng: -16.5575,
      desc: "Wild, natural golden-sand beach on the other side of Montaña Roja — no hotels. Can be windy and wavy. The far end towards the mountain is naturist.",
      photo: "La Tejita"
    }
  },

  days: [
    {
      id: "d1", date: "2026-10-15", title: "Arrival & first stroll",
      area: "Prague → Puerto de la Cruz",
      summary: "Fly in, transfer bus to the hotel, then a relaxed walk along the sea into the old town for sunset.",
      weather: { at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }], snapshot: "29 °C / 23 °C, overcast, dry" },
      steps: [
        { time: "09:50", title: "Check-in at Prague airport, Terminal 2", text: "Be there 2 h before departure. Bags: 23 kg checked + 8 kg cabin per person. Flight QS 1212.", tags: ["Prague time"] },
        { time: "11:50", title: "Take off — QS 1212 Praha → Tenerife South", text: "Flight ~5 h 25 min. Put your watch back 1 hour on landing (Canary time = Prague − 1 h).", tags: ["Prague time"] },
        { time: "16:15", place: "tfs", title: "Land at Tenerife South (Reina Sofía)", text: "Collect bags, find your transfer rep/bus. The drive to the north coast takes ~1.5–2 h with hotel stops." },
        { time: "~18:15", place: "hotel", title: "Check in at Hotel Atlantic Mirage", text: "Drop the bags, change into something light — it'll still be ~25 °C." },
        { time: "18:45", place: "martianez", title: "Walk the seafront past Lago Martiánez", text: "From the hotel down via Mirador de La Paz to the promenade, then west along the ocean pools. ~15 min." },
        { time: "19:15", place: "muelle", title: "Sunset at the old harbour", text: "Sunset ~19:36. Watch the waves smash the lava at Punta del Viento, then poke around Plaza del Charco." },
        { time: "19:50", place: "charco", title: "Plaza del Charco — first drink", text: "Optional: a barraquito (layered coffee with condensed milk & liqueur) or a local beer (Dorada / Tropical) on the square.", optional: true },
        { time: "20:30", place: "hotel", title: "Dinner at the hotel", text: "Check dinner closing time when you check in — the transfer can run late." }
      ],
      alternatives: [
        { title: "Transfer late?", text: "If you only arrive after 19:30, skip the walk; do Mirador de La Paz (3 min from the hotel) for the last light." }
      ]
    },

    {
      id: "d2", date: "2026-10-16", title: "Puerto de la Cruz on foot",
      area: "Puerto de la Cruz · Los Realejos (no car)",
      summary: "A tropical garden next to the hotel, old town & fishermen's quarter, a proper Canarian lunch, then a wild coastal path to an old cannon battery and sunset on the black-sand beach.",
      weather: { at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }], snapshot: "27 °C, mostly sunny, dry — good beach weather" },
      steps: [
        { time: "09:30", place: "botanico", title: "Botanical Garden", text: "7 min walk uphill from the hotel. The giant strangler fig and the palm collection are the highlights. ~1 h.", tags: ["Nature", "€"] },
        { time: "10:45", place: "mirador_paz", title: "Mirador de La Paz → down to the promenade", text: "Look down over Playa Martiánez, take the path down and walk west along the coast." },
        { time: "11:15", place: "charco", title: "Old town: Plaza del Charco & the harbour", text: "Church of Peña de Francia, Casa de la Real Aduana (1620), fishing boats at the Muelle. The municipal market is nearby if you want fruit." },
        { time: "12:15", place: "ranilla", title: "La Ranilla street-art walk", text: "Zig-zag through the fishermen's quarter looking for the big murals." },
        { time: "13:00", place: "bodeguita", title: "Lunch: La Tasca de al Lado", text: "Share papas arrugadas with red & green mojo, queso asado, almogrote, padrón peppers. Backup: Tasquita PerraChica or Enyesque.", tags: ["Lunch", "Veg ✓"] },
        { time: "15:00", place: "rambla_castro", title: "Rambla de Castro & Fortín de San Fernando", text: "Taxi (~€12) or TITSA bus to Los Realejos. Walk the palm-lined coastal path to the 18th-century gun battery and the ruined hacienda. ~2 h, easy, some steps. Taxi/bus back.", tags: ["Hike", "Military"] },
        { time: "18:45", place: "playa_jardin", title: "Sunset at Playa Jardín", text: "Sunset ~19:35. Feet in the black sand, Castillo de San Felipe behind you. Walk back along the coast (~35 min) or taxi." },
        { time: "20:30", place: "hotel", title: "Dinner at the hotel" }
      ],
      alternatives: [
        { title: "La Orotava instead of Rambla de Castro", place: "orotava", text: "Bus 345/350 (~20 min) up to the colonial old town — Casa de los Balcones, Jardines Victoria. More 'town', less nature." },
        { title: "Lazy beach afternoon", place: "martianez", text: "Lago Martiánez pools (paid) or Playa Martiánez if the sea is calm." }
      ]
    },

    {
      id: "d3", date: "2026-10-17", title: "Teide — volcano day",
      area: "Parque Nacional del Teide (car from today)",
      summary: "The clearest day of the week up high — so the volcano goes first. A free hike to the 'Teide eggs', lunch at the park gate, the iconic rocks, a moonscape, and an optional sunset above the clouds.",
      weather: {
        at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }, { name: "Teide (3,550 m)", lat: 28.27, lng: -16.64 }],
        snapshot: "Coast 26 °C; Teide summit −0 to 5 °C, mostly clear (26% cloud), light wind — best Teide day of the week"
      },
      steps: [
        { time: "08:30", title: "Pick up the rental car", text: "Fill up — there's no petrol station inside the park. Pack layers: it's ~25 °C at the coast and ~10 °C at 2,300 m (near 0 °C at 3,550 m).", tags: ["Car"] },
        { time: "08:45", place: "orotava", title: "Drive up via La Orotava (TF-21)", text: "Optional quick stop for bakery snacks/water in La Orotava. The road climbs through pine forest above the clouds — ~1 h to the park.", optional: true },
        { time: "10:00", place: "montana_blanca", title: "Hike Montaña Blanca (free)", text: "Park at TF-21 km ~40.5. Wide track past the black lava 'eggs' up to 2,750 m. ~8 km return, 3 h. Turn around whenever you like.", tags: ["Hike", "Free"] },
        { time: "13:30", place: "portillo", title: "Lunch at El Portillo", text: "Back down the road (10 min). Queso asado, papas, Canarian soups. Or eat a picnic on the lava.", tags: ["Lunch", "Veg ✓"] },
        { time: "15:00", place: "teleferico", title: "Optional: cable car to 3,555 m", text: "Only if booked/available and not windy. Up top, walk Trail 11 (La Fortaleza viewpoint) or 12 (Pico Viejo crater). Allow ~2 h. Last ascent is mid-afternoon — check.", optional: true, tags: ["Book", "€42"] },
        { time: "16:00", place: "roques_garcia", title: "Roques de García loop", text: "3.5 km / 1.5 h around the famous rock towers + Mirador de la Ruleta over the Ucanca plain.", tags: ["Hike", "Free"] },
        { time: "17:45", place: "minas", title: "Minas de San José moonscape", text: "Short walk on pumice — beautiful in the low sun." },
        { time: "19:15", place: "minas", title: "Optional: sunset above the clouds + stars", text: "Sunset ~19:34. Stay until ~20:15 for the first stars (Teide is a Starlight reserve). It gets cold fast. Then ~1 h drive back — ask the hotel to keep dinner or for a late plate.", optional: true },
        { time: "~20:30", place: "hotel", title: "Back at the hotel — dinner" }
      ],
      alternatives: [
        { title: "Summit of Teide (3,718 m)", place: "teleferico", text: "Needs the summit permit from tenerifeon.es (new slots every Monday 07:00 Canary time, up to 56 days ahead; ~€15 fee for non-residents since 2026) AND a cable car ticket. Likely sold out — check for cancellations the evening before." },
        { title: "Too windy / cable car closed", place: "roques_garcia", text: "Just do Montaña Blanca + Roques de García; you lose nothing essential." },
        { title: "Cloudy on the 17th?", text: "Swap with Sunday (18th) — Teide looks still OK then (≈37% cloud, colder). From Mon 19th it turns cloudy/drizzly up high, so don't postpone beyond the 18th." }
      ]
    },

    {
      id: "d4", date: "2026-10-18", title: "Anaga — laurel jungle & the golden beach",
      area: "Anaga Rural Park · San Andrés",
      summary: "The island's 'jungle': moss-dripping laurel forest on knife-edge ridges, lunch in a cave village, then the yellow-sand beach of Las Teresitas.",
      weather: {
        at: [{ name: "Anaga (Cruz del Carmen)", lat: 28.53, lng: -16.28 }, { name: "Las Teresitas", lat: 28.51, lng: -16.19 }],
        snapshot: "Anaga ~21 °C, part cloudy (mist in the forest = atmosphere), dry; Teresitas ~25 °C"
      },
      steps: [
        { time: "07:05", place: "pico_ingles", title: "Optional sunrise at Pico del Inglés", text: "Leave 07:05, sunrise ~08:08 over the sea of clouds with Teide behind you. Then coffee at Cruz del Carmen (5 min). Otherwise: sleep, breakfast, leave at 08:45.", optional: true, tags: ["Sunrise"] },
        { time: "09:45", place: "cruz_carmen", title: "Cruz del Carmen — Path of the Senses", text: "Park at the visitor centre. Short loop into the laurel forest — the most 'jungle' part of the island. ~40 min.", tags: ["Hike", "Free"] },
        { time: "10:45", place: "carboneras", title: "Hike Las Carboneras → Chinamada", text: "Drive 15 min to Las Carboneras. Ridge trail with laurel forest and big views, ~1 h 15 min each way.", tags: ["Hike", "Free"] },
        { time: "12:30", place: "chinamada", title: "Lunch in a cave: La Cueva, Chinamada", text: "Canarian home cooking inside a cave house. Check it's open on Google Maps in the morning (irregular hours). Veg: papas, queso asado, salad.", tags: ["Lunch", "Veg ✓"] },
        { time: "14:00", place: "carboneras", title: "Walk back to Las Carboneras" },
        { time: "15:45", place: "teresitas_mirador", title: "Mirador de Las Teresitas", text: "Drive over El Bailadero (40 min, winding). Photo stop above the beach." },
        { time: "16:15", place: "teresitas", title: "Playa de Las Teresitas — swim", text: "Golden sand, calm water behind the breakwater. Sunday = busy with locals, park at the far (Igueste) end.", tags: ["Beach"] },
        { time: "18:15", place: "san_andres", title: "San Andrés — castle ruins & a drink", text: "Look at the ruined tower; optional drink or fish snack at one of the village tascas.", optional: true },
        { time: "19:00", place: "hotel", title: "Drive back (~45 min) — dinner at the hotel" }
      ],
      alternatives: [
        { title: "Bosque Encantado (El Pijaral)", text: "The most magical laurel trail on the island, but it needs a FREE permit (max 45 people/day) from tenerifeon.es — book now if you want it." },
        { title: "Restaurant closed?", place: "cruz_carmen", text: "Eat at Bar Casa Paca at Cruz del Carmen, or drive on to Taganana (Guachinche Bibi y Mana — queso asado, octopus)." },
        { title: "WWII bunker hike", place: "san_andres", text: "Guided 8 km hike from San Andrés to a WWII bunker with tunnels and machine-gun posts (Civitatis) — replaces the Chinamada part." }
      ]
    },

    {
      id: "d5", date: "2026-10-19", title: "Lava tube, dragon tree & the wild west",
      area: "Icod · Garachico · Teno · Masca",
      summary: "Underground through Europe's longest lava tube, lunch next to natural lava pools, then the dramatic western mountains.",
      weather: {
        at: [{ name: "Garachico", lat: 28.37, lng: -16.76 }, { name: "Teno / Masca", lat: 28.32, lng: -16.84 }],
        snapshot: "~22–24 °C, half cloudy, dry — fine: the cave is underground anyway"
      },
      steps: [
        { time: "09:15", place: "hotel", title: "Leave the hotel", text: "TF-5 west, ~35 min to Icod de los Vinos. Long trousers + closed shoes for the cave!" },
        { time: "10:00", place: "cueva", title: "Cueva del Viento guided tour", text: "Be at the visitor centre 15 min before your slot. ~2 h total. Pick the first slot available on the official site.", tags: ["Book", "€25", "Cave"] },
        { time: "12:15", place: "drago", title: "Drago Milenario", text: "Free view from Plaza de San Marcos, 15 min." },
        { time: "13:00", place: "rebojo", title: "Lunch: El Rebojo, Garachico", text: "Reserve the day before. Small plates & good-value menus with veg options.", tags: ["Lunch", "Veg ✓"] },
        { time: "14:45", place: "garachico", title: "Garachico & El Caletón pools", text: "Swim in the lava pools if the sea is calm (green/yellow flag). Castillo de San Miguel next door.", tags: ["Swim"] },
        { time: "16:00", place: "teno_alto", title: "Teno Alto plateau walk", text: "Via Buenavista and El Palmar (~35 min). Easy loop to the cliff edge, goat-cheese stop at Bar Los Bailaderos.", tags: ["Hike", "Free"] },
        { time: "18:30", place: "cherfe", title: "Optional: Masca road & Mirador de Cherfe for sunset", text: "TF-436 over Masca (narrow, slow). Sunset ~19:32 at Cherfe; then back via Santiago del Teide & the TF-82/TF-5 (~1 h 15 min). Or skip and drive back the way you came (~50 min).", optional: true, tags: ["Sunset"] },
        { time: "~20:30", place: "hotel", title: "Dinner at the hotel" }
      ],
      alternatives: [
        { title: "Masca gorge hike (instead of Teno)", place: "cherfe", text: "Must be booked: caminobarrancodemasca.com, ~€28 + €10 shuttle, descents start ~08:30–11:00, helmet & passport required, cars park in Santiago del Teide and you take the shuttle/bus 355. A full-day commitment — would replace the cave." },
        { title: "Punta de Teno lighthouse", text: "Cliffs and lighthouse at the island's western tip. Private cars are banned (2026 road works) — only TITSA bus 369 from Buenavista, €1, ~20 min." },
        { title: "Cave slots full?", text: "Try Wed 21st (rainy north = perfect cave day) and swap with the south day." }
      ]
    },

    {
      id: "d6", date: "2026-10-20", title: "Cannons, a coup & a colonial town",
      area: "Santa Cruz · La Laguna · La Esperanza",
      summary: "The war day: the cannon that took Nelson's arm, the market, a cheap vegan Canarian lunch in UNESCO La Laguna, and the forest clearing where Franco planned the 1936 coup.",
      weather: {
        at: [{ name: "Santa Cruz", lat: 28.47, lng: -16.25 }, { name: "La Laguna", lat: 28.49, lng: -16.32 }],
        snapshot: "Santa Cruz ~25 °C, cloudy, dry; La Laguna cooler (~20 °C) — bring a layer"
      },
      steps: [
        { time: "09:15", place: "hotel", title: "Drive to Santa Cruz (~40 min, TF-5)", text: "Park in a public garage near Plaza de España." },
        { time: "10:00", place: "almeyda", title: "Military History Museum (Almeyda)", text: "Free. 'El Tigre' cannon vs. Nelson (1797), Civil War & WWII-era coastal defence. ~1–1.5 h.", tags: ["Military", "Free"] },
        { time: "11:45", place: "mercado", title: "Mercado Nuestra Señora de África", text: "Snack stop: cheese, fruit, churros; buy mojo to take home." },
        { time: "13:15", place: "somos", title: "Lunch: Somos lo que comemos (La Laguna)", text: "Vegan Canarian menú del día ~€7–10. Alternative for everyone: Tasca Los Corazones.", tags: ["Lunch", "Vegan ✓"] },
        { time: "14:30", place: "laguna", title: "Walk La Laguna's old town", text: "Calle San Agustín, the cathedral, climb the Concepción church tower." },
        { time: "16:30", place: "raices", title: "Las Raíces — where the Civil War was planned", text: "20 min up the TF-24 into the La Esperanza forest. Short walk in the pines around the site.", tags: ["Military"] },
        { time: "17:30", place: "hotel", title: "Back to the hotel (~40 min)", text: "Time for the spa/pool before dinner." }
      ],
      alternatives: [
        { title: "Igueste & El Semáforo signal tower hike", text: "Short steep hike (2.2 km one way, +350 m) from Igueste de San Andrés to an abandoned 19th-c. signal tower that announced ships to Santa Cruz — good if you want more walking." },
        { title: "Castillo de San Juan Bautista", text: "Small black 17th-c. fort next to the Auditorio in Santa Cruz — 5 min look from outside." }
      ]
    },

    {
      id: "d7", date: "2026-10-21", title: "Escape the rain: south coast bunkers & beaches",
      area: "El Médano · Montaña Roja",
      summary: "Rain showers are forecast on the north coast — the dry south is the place to be: a red volcano with WWII machine-gun nests, a surf-town lunch and a wild golden beach.",
      weather: {
        at: [{ name: "El Médano (south)", lat: 28.05, lng: -16.54 }, { name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }],
        snapshot: "South ~26 °C, part cloudy, dry. North: showers (~10 mm) — good day to be away"
      },
      steps: [
        { time: "09:00", place: "hotel", title: "Drive south (~1 h 10 min, TF-5 → TF-1)" },
        { time: "10:15", place: "montana_roja", title: "Montaña Roja loop + WWII machine-gun nests", text: "Start at the El Médano beach boardwalk, look out for the concrete nests along the coast, climb the red cone. ~7.5 km, 2–2.5 h.", tags: ["Hike", "Military", "Free"] },
        { time: "13:00", place: "medano_lunch", title: "Lunch in El Médano", text: "Menú del día by the beach (~€10–14 incl. drink), or vegan at El Med Veg.", tags: ["Lunch", "Veg ✓"] },
        { time: "14:30", place: "tejita", title: "Playa de La Tejita", text: "Beach time on natural golden sand under Montaña Roja.", tags: ["Beach"] },
        { time: "17:30", place: "hotel", title: "Drive back (~1 h 10 min) — last hotel dinner", text: "Pack tonight; tomorrow you return the car." }
      ],
      alternatives: [
        { title: "If the forecast changes and the north is dry", text: "Stay north: Anaga second round (Afur → Playa de Tamadite, a wild beach at the end of a jungle ravine) or Bosque Encantado with permit." },
        { title: "Paisaje Lunar (Vilaflor)", text: "Strange white rock pinnacles in pine forest above Vilaflor; 3–4 h hike. Only if it's dry up there (forecast: drizzly)." },
        { title: "Cueva del Viento", text: "If you didn't make it on Monday — perfect rainy-day plan." }
      ]
    },

    {
      id: "d8", date: "2026-10-22", title: "Last morning & home",
      area: "La Orotava · Puerto → TFS → Prague",
      summary: "Quick final look at La Orotava, return the car, check out and catch the transfer.",
      weather: { at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }], snapshot: "~23 °C, cloudy, light drizzle possible" },
      steps: [
        { time: "08:00", place: "hotel", title: "Breakfast & pack", text: "Ask reception/your rep the exact transfer pickup time (usually ~3.5–4 h before the flight)." },
        { time: "09:00", place: "orotava", title: "La Orotava old town", text: "Casa de los Balcones, Jardines Victoria (view over the valley). 1 h.", optional: true },
        { time: "10:30", title: "Return the rental car", text: "Fuel as agreed in the contract; take photos of the car.", tags: ["Car"] },
        { time: "11:30", place: "hotel", title: "Check out", text: "Leave bags at reception." },
        { time: "12:00", place: "perrachica", title: "Early lunch in town", text: "Last papas con mojo — or something light, the transfer is long.", tags: ["Lunch", "Veg ✓"] },
        { time: "~13:00", place: "hotel", title: "Transfer bus to the airport", text: "Confirm the time! The drive is ~1.5–2 h." },
        { time: "17:05", place: "tfs", title: "Fly home — QS 1213 Tenerife South → Praha", text: "Lands 23:05 Prague time." }
      ],
      alternatives: [
        { title: "Sleep in instead", text: "Skip La Orotava, enjoy the hotel pool, return the car and walk to Lago Martiánez." }
      ]
    }
  ],

  bookings: [
    { id: "cave", title: "Cueva del Viento — guided lava-tube tour", when: "Mon 19 Oct, ~10:00", price: "€25 / adult (card only)", status: "required",
      note: "Must be booked online in advance. Long trousers + closed shoes. No children under 5.",
      url: "https://cuevadelviento.net/en/ruta-en-ingles-viaje-al-interior-de-la-tierra/" },
    { id: "rebojo", title: "El Rebojo, Garachico — lunch table", when: "Mon 19 Oct, 13:00", price: "€€ (Bib Gourmand)", status: "recommended",
      note: "Closed Wed & Thu. Reserve by phone / Google Maps the day before.",
      url: "https://www.google.com/maps/search/?api=1&query=El+Rebojo+Garachico" },
    { id: "cable", title: "Teide cable car (optional)", when: "Sat 17 Oct, ~15:00", price: "~€42 return / adult", status: "optional",
      note: "Timed tickets. Weather-dependent — buy only once the forecast looks calm. Not needed for the free hikes.",
      url: "https://www.volcanoteide.com/en/teide-cable-car" },
    { id: "summit", title: "Teide summit permit (optional)", when: "Sat 17 Oct", price: "~€15 conservation fee (2026)", status: "optional",
      note: "Only via Tenerife ON. New slots each Monday 07:00 Canary time up to 56 days ahead — almost certainly sold out; watch for cancellations. Also needs the cable car.",
      url: "https://tenerifeon.es/" },
    { id: "pijaral", title: "El Pijaral / Bosque Encantado permit (optional)", when: "Sun 18 Oct", price: "Free", status: "optional",
      note: "Max 45 people/day. Fines ~€600 without it.",
      url: "https://tenerifeon.es/" },
    { id: "masca", title: "Barranco de Masca hike (alternative)", when: "Any day", price: "~€28 + €10 shuttle", status: "optional",
      note: "Daily cap; passport numbers of all hikers needed; helmet required.",
      url: "https://www.caminobarrancodemasca.com/" },
    { id: "portillo", title: "Restaurante El Portillo — lunch", when: "Sat 17 Oct, 13:30", price: "€", status: "recommended",
      note: "Popular with tour groups — call ahead or arrive right at 13:00.",
      url: "https://www.google.com/maps/search/?api=1&query=Restaurante+El+Portillo+Teide" },
    { id: "transfer", title: "Confirm return transfer pickup time", when: "Wed 21 Oct", price: "Included", status: "required",
      note: "Ask your rep / check the travel agency app.", url: "" }
  ],

  info: {
    flights: [
      { dir: "Outbound", date: "Thu 15 Oct", flight: "QS 1212", from: "Praha T2", dep: "11:50 (Prague time)", to: "Tenerife South", arr: "16:15 (Canary time)" },
      { dir: "Return", date: "Thu 22 Oct", flight: "QS 1213", from: "Tenerife South", dep: "17:05 (Canary time)", to: "Praha", arr: "23:05 (Prague time)" }
    ],
    baggage: "4 travellers · 23 kg checked + 8 kg cabin each. Check-in opens 2 h before departure.",
    timezone: "Canary Islands = Prague − 1 hour (WEST, UTC+1).",
    emergency: [
      { label: "Emergency (EU)", value: "112" },
      { label: "Hotel", value: "Atlantic Mirage, C/ Eucaliptus 4, Puerto de la Cruz" }
    ],
    tips: [
      "Teide: 25 °C at the coast can be 0 °C at 3,500 m — take a fleece, wind jacket, hat, sun cream. Sun at altitude burns fast.",
      "Anaga roads are narrow and winding; parking fills on weekends — start early.",
      "Fill the tank before Teide (no petrol station inside the park).",
      "Most places are closed ~16:00–19:30 between lunch and dinner. Lunch is 13:00–15:30.",
      "Never leave anything visible in the parked car at trailheads.",
      "Swim in natural pools only when the sea is calm; north-coast swells are strong.",
      "Mobile data: EU roaming works normally (Spain)."
    ],
    food: [
      { name: "Papas arrugadas con mojo", veg: "vegan", desc: "Small wrinkly salt-crust potatoes with red (rojo/picón) and green (verde) sauce. The national dish." },
      { name: "Mojo rojo / verde", veg: "vegan", desc: "Garlic-pepper sauces. Red = paprika & chilli, green = coriander/parsley." },
      { name: "Queso asado / a la plancha", veg: "veg", desc: "Grilled local goat cheese with mojo or palm honey (miel de palma)." },
      { name: "Almogrote", veg: "veg", desc: "Spicy aged-cheese paste from La Gomera, on bread." },
      { name: "Pimientos de padrón", veg: "vegan", desc: "Fried little green peppers with coarse salt." },
      { name: "Gofio", veg: "vegan", desc: "Toasted grain flour, the Guanche staple — in desserts, mousse, or kneaded (pella)." },
      { name: "Escaldón de gofio", veg: "no", desc: "Gofio stirred into fish or meat broth — not vegetarian." },
      { name: "Potaje de berros", veg: "ask", desc: "Watercress soup — usually cooked with pork. Ask 'sin carne?'." },
      { name: "Garbanzas", veg: "no", desc: "Chickpea stew with pork/chorizo." },
      { name: "Carne fiesta / conejo en salmorejo", veg: "no", desc: "Marinated pork / rabbit in garlic-vinegar sauce." },
      { name: "Barraquito", veg: "veg", desc: "Layered coffee with condensed milk, Licor 43, lemon peel and cinnamon." },
      { name: "Bienmesabe / quesillo", veg: "veg", desc: "Almond-honey cream / Canarian flan." }
    ],
    phrases: [
      { es: "Soy vegetariano/a. ¿Tiene algo sin carne ni pescado?", en: "I'm vegetarian. Do you have something without meat or fish?" },
      { es: "¿Lleva caldo de carne o pescado?", en: "Is it made with meat or fish stock?" },
      { es: "La cuenta, por favor.", en: "The bill, please." },
      { es: "¿Está abierto hoy?", en: "Are you open today?" }
    ],
    guachinche: "Guachinches are pop-up wine-farm eateries in the north (season usually starts Oct/Nov): house wine, 3–4 dishes, cash, cheap. Many are meat-heavy — papas, queso and salad are the veg fallback. Ask Claude to find one open near where you are."
  }
};
