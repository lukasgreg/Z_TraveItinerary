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
    updated: "2026-10-14",
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
    cave:    { label: "Cave",              color: "#8a4b2a", icon: "🕳️" },
    boat:    { label: "Boat trip",         color: "#1b7fb5", icon: "🚤" },
    gem:     { label: "Hidden gem",       color: "#0e9bb8", icon: "💎" },
    parking: { label: "Parking",           color: "#2b5fb3", icon: "🅿️" }
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
    loro: {
      name: "Loro Parque", cat: "sight", lat: 28.4083, lng: -16.5668, approx: true, gmaps: "Loro Parque, Puerto de la Cruz",
      desc: "Famous zoo & marine park on the western edge of Puerto: parrots (the world's largest collection), orcas, dolphins, sea lions, penguins, tigers, aquarium tunnel. Big but easy; plan 5–6 h. Several restaurants inside, with vegetarian/vegan options. Taxi (~€8–10) or the free Loro Parque tourist train from town; tickets are cheaper online — check price and opening hours before going.",
      links: [{ label: "Tickets & opening hours", url: "https://www.loroparque.com/en/" }],
      photo: "Loro Parque Puerto de la Cruz"
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
    pache: {
      name: "Casa Paché", cat: "food", lat: 28.4163, lng: -16.5508, veg: true, approx: true,
      desc: "Old Canarian house in the centre, 4.4★ with many 2026 reviews — generous traditional cooking: grilled goat cheese, stews, rabbit, homemade croquettes. Veg: queso asado, papas con mojo, salads, ask for veggie croquettes. Always busy — reserve or arrive at 13:00.",
      gmaps: "Casa Paché, Puerto de la Cruz"
    },
    gemelos: {
      name: "Mesón Los Gemelos", cat: "food", lat: 28.4172, lng: -16.5515, veg: true, approx: true,
      desc: "One of the busiest traditional taverns in the north (4.2★, ~1,900 reviews) — fresh fish, fried octopus, escaldón de gofio. Veg: papas con mojo, queso asado, salads. Queues at peak times — come early.",
      gmaps: "Mesón Los Gemelos, Puerto de la Cruz"
    },
    perrachica: {
      name: "Tasquita PerraChica", cat: "food", lat: 28.4158, lng: -16.5525, veg: true, approx: true,
      desc: "Small, cheap and friendly tapas bar — papas, cheese, croquettes, salads.",
      gmaps: "Tasquita PerraChica, Puerto de la Cruz"
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
      name: "Restaurante El Portillo (Teide park gate)", cat: "food", lat: 28.3060, lng: -16.5649, veg: true,
      desc: "Park entrance from the north (2,050 m). Visitor centre with a small botanical trail. Restaurante El Portillo next door: restaurant ~13:00–16:00, café 9:00–18:00 (per 2026 reviews). Veg: queso asado con mojo, papas arrugadas, ensalada; carnivores: garbanzas, conejo. Popular — call ahead or arrive at 13:00.",
      gmaps: "Restaurante El Portillo, Las Cañadas del Teide"
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
      name: "Restaurante La Cueva, Chinamada", cat: "food", lat: 28.56215, lng: -16.29077, veg: true,
      desc: "Eat inside a cave house in a village where people still live in caves. Canarian home cooking: papas, queso asado, potaje, carne. Veg: papas con mojo, queso, salad — ask about potaje without meat. Opening is irregular (reportedly closed Mon/Tue) — check Google Maps on the morning.",
      gmaps: "Restaurante La Cueva, Chinamada, Tenerife"
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
      name: "Cueva del Viento (Wind Cave) — only with a booked slot", cat: "cave", lat: 28.3600, lng: -16.7090, approx: true,
      desc: "NOT BOOKED — optional only if a slot frees up. Europe's longest lava tube (~18 km). Guided tour ~2 h incl. ~45 min underground with helmet and headlamp. €25/adult, CARD ONLY, must be booked online in advance. Long trousers + closed shoes required. Meet at the visitor centre, C/ Los Piquetes 51, Icod de los Vinos (15 min before).",
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
      name: "El Rebojo, Garachico", cat: "food", lat: 28.3735, lng: -16.7632, veg: true,
      desc: "Michelin Bib Gourmand = good value, NOT fine dining. Modern Canarian cooking a few steps from El Caletón; small plates and well-priced menus, usually with vegetarian options. Lunch 13:00–17:30, CLOSED Wed & Thu. Reserve the day before. Don't skip the smoked-cheese cheesecake.",
      gmaps: "El Rebojo, Garachico"
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

    teno: {
      name: "Punta de Teno lighthouse", cat: "view", lat: 28.3422, lng: -16.9222, approx: true,
      desc: "The wild north-west tip of Tenerife: a red-and-white lighthouse on a black lava point, the 500 m Los Gigantes / Teno cliffs dropping into the sea, and La Gomera on the horizon. Paths along the lava to several viewpoints and rock platforms. Private cars, walkers and bikes are banned on the access road (TF-445 works since Jan 2026) — only TITSA bus 369 from Buenavista (€1, ~20 min, roughly hourly ~08:00–19:30, last bus back ~19:50; Oct–Jun access window ~10:00–19:00). No shade, no shop, windy: bring water, hat and sun cream. With the forecast ~2 m swell: stay well back from the edge of the platforms.",
      links: [
        { label: "Bus 369 timetable (TITSA)", url: "https://titsa.com/index.php/tus-guaguas/lineas-y-horarios/linea-369" },
        { label: "Access rules (Buenavista town hall)", url: "https://www.buenavistadelnorte.es/acceso-a-punta-de-teno/" }
      ],
      gmaps: "Faro de Punta de Teno",
      photo: "Faro de Punta de Teno"
    },

    /* ---------- Santa Cruz / La Laguna ---------- */
    almeyda: {
      name: "Museo Histórico Militar de Canarias (Almeyda)", cat: "war", lat: 28.4728, lng: -16.2468,
      gmaps: "Museo Histórico Militar de Canarias, Santa Cruz de Tenerife",
      desc: "FREE military museum in an old barracks: the 'El Tigre' cannon that cost Admiral Nelson his arm in 1797, weapons, uniforms and the story of Tenerife's defence — plus the 1936 coup that started from the Canaries. Tue–Sat ~10:00–14:00 (check). Address: C/ San Isidro 2, Santa Cruz.",
      links: [{ label: "Info (webtenerife)", url: "https://www.webtenerife.co.uk/what-see/museums/museo-militar" }],
      photo: "Museo Histórico Militar de Canarias"
    },
    mercado: {
      name: "Mercado de Nuestra Señora de África", cat: "food", lat: 28.4632, lng: -16.2560, veg: true,
      gmaps: "Mercado Nuestra Señora de África, Santa Cruz de Tenerife",
      desc: "Santa Cruz's colourful market (1940s arcades). Grab snacks for the road: local cheeses, tropical fruit, mojo, churros. Best in the morning.",
      photo: "Mercado de Nuestra Señora de África"
    },
    laguna: {
      name: "San Cristóbal de La Laguna (UNESCO)", cat: "sight", lat: 28.4882, lng: -16.3156,
      desc: "University town and the original Spanish colonial grid (model for Havana & Cartagena). Walk Calle San Agustín, Calle Obispo Rey Redondo, the cathedral, and climb the tower of Iglesia de la Concepción for the view. Lively student bars.",
      photo: "San Cristóbal de La Laguna"
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
    cofradia: {
      name: "Cofradía de Pescadores El Médano", cat: "food", lat: 28.0468, lng: -16.5348, veg: true, approx: true,
      desc: "Relaxed fishermen's-cooperative restaurant: fish with mojo, papas arrugadas — reviewers praise its vegetarian dishes too. Typical local lunch, fair prices.",
      gmaps: "Cofradía de Pescadores El Médano"
    },
    ancla: {
      name: "El Ancla Médano", cat: "food", lat: 28.0480, lng: -16.5405, veg: true, approx: true,
      desc: "Seafront at La Jaquita beach: traditional Canarian food and rice dishes, marked vegetarian-friendly (ask what's available that day).",
      gmaps: "El Ancla Médano Restaurante"
    },
    platano_azul: {
      name: "El Plátano Azul, El Médano", cat: "food", lat: 28.0457, lng: -16.5363, veg: true, approx: true,
      desc: "On the main square; Mediterranean/Moroccan food with lots of vegan and vegetarian dishes — not Canarian, but easy for everyone.",
      gmaps: "El Plátano Azul, El Médano"
    },
    lille: {
      name: "Lille Café El Médano (veg/vegan)", cat: "food", lat: 28.0460, lng: -16.5375, veg: true, approx: true,
      desc: "Casual café with vegan & vegetarian bowls, toasties and burgers — light lunch before the beach.",
      gmaps: "Lille Café El Médano"
    },
    tejita: {
      name: "Playa de La Tejita", cat: "beach", lat: 28.0300, lng: -16.5575,
      desc: "Wild, natural golden-sand beach on the other side of Montaña Roja — no hotels. Can be windy and wavy. The far end towards the mountain is naturist.",
      photo: "La Tejita"
    },

    /* ---------- extra lunch alternatives ---------- */
    paso_teide: {
      name: "Restaurante Paso del Teide (Aguamansa)", cat: "food", lat: 28.3575, lng: -16.5035, veg: true, approx: true,
      desc: "Highly rated Canarian restaurant on the TF-21 (km 15) in the pine forest — on your way up or down. Grilled goat cheese, papas, potaje; meat dishes for the others.",
      gmaps: "Restaurante Paso del Teide, Aguamansa, La Orotava"
    },
    aguamansa_rest: {
      name: "Restaurante Aguamansa", cat: "food", lat: 28.3555, lng: -16.5010, veg: true, approx: true,
      desc: "Roadside Canarian home cooking on the TF-21: fried goat cheese, bread with mojo, papas; rabbit and cod for meat/fish eaters. May close mid-afternoon.",
      gmaps: "Restaurante Aguamansa, La Orotava"
    },
    cruz_carmen_rest: {
      name: "Restaurante Cruz del Carmen", cat: "food", lat: 28.5317, lng: -16.2799, veg: true, approx: true,
      desc: "Simple, good-value Canarian place at the Anaga visitor centre. Food is fine, service can be slow at weekends — order early.",
      gmaps: "Restaurante Cruz del Carmen, Anaga"
    },
    historias: {
      name: "Historias Para No Dormir (Taborno)", cat: "food", lat: 28.5555, lng: -16.2600, veg: true, approx: true,
      desc: "Homemade Canarian food with a creative twist in the mountain hamlet of Taborno; salads plus meat dishes. ~15 min drive from Las Carboneras.",
      gmaps: "Historias Para No Dormir, Taborno"
    },
    los_pinos: {
      name: "Tasca Restaurante Los Pinos, Garachico", cat: "food", lat: 28.3728, lng: -16.7618, veg: true, approx: true,
      desc: "Family-run tasca with homemade Canarian food and tapas — cheaper than El Rebojo. Veg: papas, queso asado, salads.",
      gmaps: "Restaurante Los Pinos, Garachico"
    },
    sioux: {
      name: "Bar Sioux, Garachico", cat: "food", lat: 28.3736, lng: -16.7652, veg: true, approx: true,
      desc: "Local bar known for generous tapas and raciones at good prices. A menú del día (~€10–14) is also common in town at lunch.",
      gmaps: "Bar Sioux, Garachico"
    },

    /* ---------- El Pijaral (BOOKED) ---------- */
    pijaral: {
      name: "El Pijaral — La Ensillada · Cabezo del Tejo loop (BOOKED)", cat: "hike", lat: 28.5686, lng: -16.1702,
      desc: "BOOKED: Tue 20 Oct, 13:00–15:00, reservation code 210063. The 'Enchanted Forest' — a strictly protected laurel and giant-heather forest (Reserva Natural Integral, max 45 people/day). Loop ~6.5 km, mostly gentle, usually 2.5–3 h — so start exactly at 13:00 and keep a steady pace. Highlight: Mirador Cabezo del Tejo (pin) with views over Anaga's north coast. Carry the reservation (phone/screenshot) and ID; rangers check. Stay on the path — fines up to €600.",
      links: [{ label: "Trail info (Tenerife ON)", url: "https://www.tenerifeon.es/itinerarios/sendero/pra-72-la-ensillada-cabezo-del-tejo" }],
      gmaps: "Mirador Cabezo del Tejo, Anaga",
      photo: "El Pijaral Anaga"
    },
    casa_alvaro: {
      name: "Bar Casa Álvaro, Chamorga", cat: "food", lat: 28.5700, lng: -16.1530, veg: true, approx: true,
      desc: "Tiny village bar at the very end of the Anaga road (10 min past the trailhead). Simple, very cheap Canarian food — papas, queso, salads, sandwiches; terrace. Open 11:00–19:00, closed Wednesdays (hours can be irregular — call 922 59 92 25 if unsure).",
      gmaps: "Bar Casa Álvaro, Chamorga"
    },
    bibi_mana: {
      name: "Guachinche Bibi y Mana, Taganana", cat: "food", lat: 28.5712, lng: -16.2052, veg: true, approx: true,
      desc: "Local guachinche in Taganana village (~25 min from the trailhead): big portions, moderate prices. Recommended: queso asado (veg) and octopus. Check opening hours on Google Maps.",
      gmaps: "Guachinche Bibi y Mana, Taganana"
    },

    /* ---------- boat trip (optional, not booked) ---------- */
    gigantes_boat: {
      name: "Los Gigantes boat trip — cliffs, whales & Masca bay", cat: "boat", lat: 28.2448, lng: -16.8418, approx: true,
      desc: "OPTIONAL, not booked. 2–3 h boats leave Los Gigantes marina several times a day: along the 600 m Acantilados de Los Gigantes, looking for the resident pilot whales and dolphins (sightings very likely all year), then a swim stop in Masca bay. Roughly €30–45 pp for 2–3 h (catamaran with lunch ~€35+, sailing boat 3–4 h ~€80–90). Choose an operator with the 'Barco Azul' whale-watching licence. Calm sea needed — operators cancel in bad conditions. Bring swimwear, towel, sun cream, motion-sickness tablets if needed.",
      links: [
        { label: "Compare trips (GetYourGuide)", url: "https://www.getyourguide.com/los-gigantes-l91695/dolphin-whale-watching-tc49/" },
        { label: "Compare trips (CheckYeti)", url: "https://www.checkyeti.com/en/boat-tours/spain/los-gigantes/boat-tours" }
      ],
      gmaps: "Puerto Los Gigantes marina",
      photo: "Acantilados de Los Gigantes"
    },
    pejeverde: {
      name: "Pejeverde Los Gigantes", cat: "food", lat: 28.2446, lng: -16.8414, veg: true, approx: true,
      desc: "Right on the harbour dock where the fishermen land their catch: rice dishes, ceviche, tartares, fresh fish. Tagged vegetarian-friendly — ask for the veg options.",
      gmaps: "Pejeverde Los Gigantes"
    },
    tas_k: {
      name: "Tas-k, Los Gigantes", cat: "food", lat: 28.2458, lng: -16.8402, veg: true, approx: true,
      desc: "Small tapas place loved by locals and visitors — plenty of tasty vegetarian options alongside fresh fish.",
      gmaps: "Tas-k Los Gigantes"
    },
    fishermans_inn: {
      name: "Fisherman's Inn, Puerto de Santiago", cat: "food", lat: 28.2372, lng: -16.8410, veg: true, approx: true,
      desc: "Simple fish place: cod, tapas, papas and salads, cooked to order (so expect a little wait). 5 min drive from the marina.",
      gmaps: "Fisherman's Inn Puerto de Santiago"
    },

    /* ---------- free caves (no booking) ---------- */
    achbinico: {
      name: "Cueva de Achbinico (San Blas), Candelaria", cat: "cave", lat: 28.3530, lng: -16.3718, approx: true,
      desc: "FREE, no booking. Seaside volcanic cave where the Guanches first kept the Virgin of Candelaria — considered the first Christian shrine of the Canaries. Short walk from the Basílica and the row of giant bronze Guanche kings on the seafront. 20–30 min stop on the way south.",
      gmaps: "Cueva de Achbinico, Candelaria",
      photo: "Cueva de Achbinico"
    },
    hermano_pedro: {
      name: "Cueva del Santo Hermano Pedro", cat: "cave", lat: 28.0490, lng: -16.5555, approx: true,
      desc: "FREE, no booking. Small pilgrimage cave where the Canarian saint Hermano Pedro sheltered as a goatherd in the 1640s; still a shrine with candles. Next to the airport (loud planes!) on the TF-643 near El Médano. Be quiet if a service is on. 20 min.",
      gmaps: "Cueva del Santo Hermano Pedro, Granadilla",
      photo: "Cueva del Hermano Pedro"
    },

    /* ---------- hidden gems (always on the map, listed in the Gems tab; coordinates approximate — use the Google Maps link) ---------- */
    gem_benijo: {
      name: "Playa de Benijo & Almáciga", cat: "gem", lat: 28.5719, lng: -16.1998, approx: true, gmaps: "Playa de Benijo, Taganana",
      desc: "Wild black-sand beach below the Anaga cliffs with the Roques de Anaga rising out of the surf — the best sunset spot on the north-east coast. Swim only when the sea is calm. A fresh-fish restaurant sits right above the beach (veg: ask for salad/papas arrugadas). Combine with Taganana/Bibi y Mana lunch.",
      why: "Rated far above its fame; most visitors never drive the last 15 min past Taganana."
    },
    gem_baranda: {
      name: "Casa del Vino La Baranda, El Sauzal", cat: "gem", lat: 28.4637, lng: -16.4283, approx: true, gmaps: "Casa del Vino La Baranda, El Sauzal",
      desc: "Wine museum in a 17th-century estate house with a restaurant and tasting bar of Tenerife wines and local cheese. Lovely stop on the TF-5 when driving between Puerto and Santa Cruz / La Laguna. Veg: cheese, salads, papas arrugadas.",
      why: "Local favourite, tiny crowds, great Teide-from-below views over the vineyards."
    },
    gem_san_marcos: {
      name: "Playa de San Marcos, Icod de los Vinos", cat: "gem", lat: 28.3790, lng: -16.7224, approx: true, gmaps: "Playa de San Marcos, Icod de los Vinos",
      desc: "Small black-sand cove in a fishing village below Icod with a calm natural pool and simple fish restaurants on the seafront. Five minutes' drive from the Drago Milenario — a good swim and lunch alternative on the Garachico day.",
      why: "Sheltered swimming when the north coast is rough; hardly any tourists."
    },
    gem_chinyero: {
      name: "Chinyero volcano trail (Special Natural Reserve)", cat: "gem", lat: 28.3292, lng: -16.7725, approx: true, gmaps: "Sendero Volcán Chinyero, Santiago del Teide",
      desc: "Easy circular hike (~5 km, ~2 h, barely any climb) through Canary pine forest around the 1909 Chinyero cone, with black lava fields and Teide views. Trailhead on the TF-38 between Santiago del Teide and Las Cañadas.",
      why: "The 'quiet' alternative to the Teide crowds; the youngest volcano trail on the island."
    },
    gem_vilaflor: {
      name: "Vilaflor — highest village in Spain", cat: "gem", lat: 28.1585, lng: -16.6360, approx: true, gmaps: "Vilaflor de Chasna",
      desc: "Whitewashed mountain village at 1,400 m with the Pino Gordo viewpoint, almond blossom in winter and good local bakeries and tapas bars. Natural stop if you drive the south side of Teide (TF-21).",
      why: "Authentic mountain-village feel, cool air, no tour buses."
    },
    gem_rasca: {
      name: "Faro de Rasca & coastal reserve", cat: "gem", lat: 28.0059, lng: -16.6808, approx: true, gmaps: "Faro de Rasca, Arona",
      desc: "Windswept lighthouse at the south-west tip of the island amid a protected volcanic coastal reserve with dramatic sunsets. Flat 20 min walk from the parking at the end of the road; bring a windbreaker.",
      why: "Raw, empty and photogenic; a different Tenerife from the resort coast."
    },

    /* ---------- parking (approximate pins; the Google Maps link finds the actual car park) ---------- */
    p_portillo: { name: "P: El Portillo visitor centre", cat: "parking", lat: 28.3048, lng: -16.5655, approx: true, gmaps: "Centro de Visitantes El Portillo, Teide", desc: "Free car park at the visitor centre / restaurant." },
    p_montana_blanca: { name: "P: Montaña Blanca trailhead (TF-21 km ~40.5)", cat: "parking", lat: 28.2652, lng: -16.5857, approx: true, gmaps: "Aparcamiento Montaña Blanca, Teide", desc: "Small free gravel lay-by on the TF-21 — fills by ~10:00. If full, use the next lay-bys along the road (never on the verge)." },
    p_teleferico: { name: "P: Teide cable car base", cat: "parking", lat: 28.256, lng: -16.6155, approx: true, gmaps: "Teleférico del Teide parking", desc: "Free car park at the base station; busy late morning." },
    p_roques: { name: "P: Roques de García / Mirador La Ruleta", cat: "parking", lat: 28.2244, lng: -16.6266, approx: true, gmaps: "Mirador de La Ruleta, Teide", desc: "Free car park opposite the Parador; can be full 11–15 h but turnover is quick." },
    p_minas: { name: "P: Minas de San José lay-by", cat: "parking", lat: 28.2295, lng: -16.6042, approx: true, gmaps: "Minas de San José, Teide", desc: "Small roadside parking on the TF-21." },
    p_pico_ingles: { name: "P: Pico del Inglés", cat: "parking", lat: 28.5282, lng: -16.2655, approx: true, gmaps: "Mirador Pico del Inglés", desc: "A few spaces at the end of the short access road; plenty at sunrise." },
    p_cruz_carmen: { name: "P: Cruz del Carmen visitor centre", cat: "parking", lat: 28.5306, lng: -16.2806, approx: true, gmaps: "Centro de Visitantes Cruz del Carmen", desc: "Free car park next to the visitor centre — the main Anaga hub. Full by ~10:30 at weekends." },
    p_carboneras: { name: "P: Las Carboneras (end of road)", cat: "parking", lat: 28.5455, lng: -16.2726, approx: true, gmaps: "Las Carboneras, Tenerife", desc: "Small parking area at the end of the road. Narrow access road — go slow." },
    p_teresitas: { name: "P: Playa de Las Teresitas car park", cat: "parking", lat: 28.5075, lng: -16.1878, approx: true, gmaps: "Aparcamiento Playa de Las Teresitas", desc: "Large free car park behind the beach; on Sundays use the far (north/Igueste) end." },
    p_icod: { name: "P: Icod centre (for the Drago)", cat: "parking", lat: 28.3663, lng: -16.7198, approx: true, gmaps: "Parking Icod de los Vinos Drago", desc: "Paid public car park / blue-zone streets above Plaza de la Pila; 3 min walk to the dragon tree." },
    p_cueva: { name: "P: Cueva del Viento visitor centre", cat: "parking", lat: 28.36, lng: -16.7092, approx: true, gmaps: "Cueva del Viento Centro de Visitantes", desc: "Parking at the visitor centre (only if you have a tour slot)." },
    p_garachico: { name: "P: Garachico seafront car park", cat: "parking", lat: 28.3738, lng: -16.76, approx: true, gmaps: "Aparcamiento Garachico", desc: "Free open car park by the sea at the eastern entrance of town; 5–8 min walk along the promenade to El Caletón." },
    p_buenavista: { name: "P: Buenavista del Norte bus station (bus 369 to Teno)", cat: "parking", lat: 28.3740, lng: -16.8600, approx: true, gmaps: "Estación de guaguas Buenavista del Norte", desc: "Leave the car at/near the bus station in Buenavista and take bus 369 to Punta de Teno (€1 cash or card). Free street parking around the town; arrive 10 min before the bus." },
    p_teno_alto: { name: "P: Teno Alto hamlet", cat: "parking", lat: 28.3332, lng: -16.8792, approx: true, gmaps: "Teno Alto, Buenavista del Norte", desc: "Park by the little square / Bar Los Bailaderos." },
    p_cherfe: { name: "P: Mirador de Cherfe", cat: "parking", lat: 28.2969, lng: -16.825, approx: true, gmaps: "Mirador de Cherfe", desc: "Lay-by at the viewpoint on the TF-436." },
    p_santa_cruz: { name: "P: Parking Plaza de España (underground)", cat: "parking", lat: 28.4682, lng: -16.248, approx: true, gmaps: "Parking Plaza de España Santa Cruz de Tenerife", desc: "Paid underground garage in the centre: ~8 min walk to the Military Museum, ~12 min to the market. Leave the car here for both." },
    p_laguna: { name: "P: La Laguna — Plaza del Cristo", cat: "parking", lat: 28.4897, lng: -16.3108, approx: true, gmaps: "Aparcamiento Plaza del Cristo La Laguna", desc: "Big open parking area at the east edge of the old town; 5–10 min walk to the restaurants. Alternative: paid garages around Avenida Trinidad." },
    p_raices: { name: "P: Las Raíces recreation area", cat: "parking", lat: 28.4236, lng: -16.3796, approx: true, gmaps: "Zona Recreativa Las Raíces", desc: "Free forest parking by the picnic area off the TF-24." },
    p_candelaria: { name: "P: Candelaria — Basílica car park", cat: "parking", lat: 28.3545, lng: -16.3705, approx: true, gmaps: "Aparcamiento Basílica de Candelaria", desc: "Car park next to the Basílica / Plaza de la Patrona; 3 min walk to the cave." },
    p_medano: { name: "P: El Médano beach / Montaña Roja start", cat: "parking", lat: 28.0428, lng: -16.5398, approx: true, gmaps: "Aparcamiento Playa de El Médano Montaña Roja", desc: "Free sandy car park at the western end of El Médano beach where the Montaña Roja trail starts; 10 min walk into town for lunch." },
    p_ensillada: { name: "P: La Ensillada (El Pijaral trailhead)", cat: "parking", lat: 28.55621, lng: -16.17986, gmaps: "La Ensillada, Carretera de la Cumbre, Anaga", desc: "Small parking / wide dirt verges on the TF-123 (Carretera de la Cumbre) at the La Ensillada bus stop — the trail starts up the short paved track here. Arrive by 12:40." },
    p_chamorga: { name: "P: Chamorga village", cat: "parking", lat: 28.5695, lng: -16.1540, approx: true, gmaps: "Chamorga, Anaga", desc: "Small parking at the end of the TF-123 by the village; the bar is a 2 min walk." },
    p_gigantes: { name: "P: Los Gigantes marina car park", cat: "parking", lat: 28.2455, lng: -16.8405, approx: true, gmaps: "Parking Puerto Los Gigantes", desc: "Paid car park at the marina (spaces fill late morning) — street parking higher up in town is the backup." },
    p_hermano_pedro: { name: "P: Hermano Pedro cave", cat: "parking", lat: 28.0492, lng: -16.556, approx: true, gmaps: "Cueva del Santo Hermano Pedro", desc: "Free parking at the sanctuary." },
    p_tejita: { name: "P: Playa de La Tejita car park", cat: "parking", lat: 28.0322, lng: -16.5548, approx: true, gmaps: "Aparcamiento Playa La Tejita", desc: "Free (dirt) car park behind the beach." },
    p_orotava: { name: "P: La Orotava centre", cat: "parking", lat: 28.3915, lng: -16.5235, approx: true, gmaps: "Aparcamiento La Orotava centro", desc: "Public car parks below the old town; the centre is steep, so park and walk up." }
  },

  /*
   * Step fields: time, place (id), title, text, tags, optional,
   *   park  — parking place id (shown as "where to park" + navigate)
   *   alts  — alternative place ids (e.g. backup restaurants, each with a Google Maps link)
   *   links — extra links [{label,url}]
   */
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
      summary: "A tropical garden next to the hotel, old town & fishermen's quarter, a proper Canarian lunch, a wild coastal path to an old cannon battery, then — on the warmest day of the week — a swim and sunset on the black-sand beach.",
      weather: { at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }], snapshot: "27–28 °C, dry — warmest day of the week; sea ~25 °C" },
      steps: [
        { time: "09:15", place: "loro", title: "Optional: Loro Parque instead of the walking day", text: "Swap option for a full day at the zoo & marine park (5–6 h, ~10 min taxi from the hotel). If you go, skip the plan below except maybe the sunset at Playa Jardín. Not booked — buy tickets online the evening before.", optional: true, tags: ["Optional", "€", "Veg ✓"] },
        { time: "09:30", place: "botanico", title: "Botanical Garden", text: "7 min walk uphill from the hotel. The giant strangler fig and the palm collection are the highlights. ~1 h.", tags: ["Nature", "€"] },
        { time: "10:45", place: "mirador_paz", title: "Mirador de La Paz → down to the promenade", text: "Look down over Playa Martiánez, take the path down and walk west along the coast." },
        { time: "11:15", place: "charco", title: "Old town: Plaza del Charco & the harbour", text: "Church of Peña de Francia, Casa de la Real Aduana (1620), fishing boats at the Muelle." },
        { time: "12:15", place: "ranilla", title: "La Ranilla street-art walk", text: "Zig-zag through the fishermen's quarter looking for the big murals." },
        { time: "13:00", place: "pache", title: "Lunch: Casa Paché", text: "Share papas arrugadas with red & green mojo, queso asado, padrón peppers; rabbit or stew for the meat eaters. Reserve in the morning — it's always busy.", tags: ["Lunch", "Veg ✓"], alts: ["gemelos", "perrachica"] },
        { time: "14:45", place: "rambla_castro", title: "Rambla de Castro & Fortín de San Fernando", text: "Taxi (~€12) or TITSA bus to Los Realejos. Walk the palm-lined coastal path to the 18th-century gun battery and the ruined hacienda. ~2 h, easy, some steps. Taxi straight to Playa Jardín afterwards (~10 min). Pack swimwear today.", tags: ["Hike", "Military"] },
        { time: "17:30", place: "playa_jardin", title: "Swim & sunset at Playa Jardín", text: "Warmest day of the trip (~27 °C, sea ~25 °C). Swim between the breakwaters if the lifeguard flag is green/yellow (north swell ~1.4 m — if it's red, use the sea-water pools of Lago Martiánez instead, small entry fee, check closing time). Sunset ~19:35 with Castillo de San Felipe behind you. Walk back along the coast (~35 min) or taxi.", tags: ["Swim", "Sunset"] },
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
        { time: "10:00", place: "montana_blanca", park: "p_montana_blanca", title: "Hike Montaña Blanca (free)", text: "Wide track past the black lava 'eggs' up to 2,750 m. ~8 km return, 3 h. Turn around whenever you like.", tags: ["Hike", "Free"] },
        { time: "13:30", place: "portillo", park: "p_portillo", title: "Lunch at Restaurante El Portillo", text: "Back down the road (10 min). Queso asado, papas, Canarian soups. Or eat a picnic on the lava.", tags: ["Lunch", "Veg ✓"], alts: ["paso_teide", "aguamansa_rest"] },
        { time: "15:00", place: "teleferico", park: "p_teleferico", title: "Optional: cable car to 3,555 m", text: "Only if booked/available and not windy. Up top, walk Trail 11 (La Fortaleza viewpoint) or 12 (Pico Viejo crater). Allow ~2 h. Last ascent is mid-afternoon — check.", optional: true, tags: ["Book", "€42"] },
        { time: "16:00", place: "roques_garcia", park: "p_roques", title: "Roques de García loop", text: "3.5 km / 1.5 h around the famous rock towers + Mirador de la Ruleta over the Ucanca plain.", tags: ["Hike", "Free"] },
        { time: "17:45", place: "minas", park: "p_minas", title: "Minas de San José moonscape", text: "Short walk on pumice — beautiful in the low sun." },
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
        snapshot: "Anaga ~20 °C, cloudy (mist in the forest = atmosphere), dry; Teresitas ~26 °C, bright-cloudy, sea ~24 °C — calm behind the breakwater despite the swell"
      },
      steps: [
        { time: "07:05", place: "pico_ingles", park: "p_pico_ingles", title: "Optional sunrise at Pico del Inglés", text: "Leave 07:05, sunrise ~08:08 over the sea of clouds with Teide behind you. Then coffee at Cruz del Carmen (5 min). Otherwise: sleep, breakfast, leave at 08:45.", optional: true, tags: ["Sunrise"] },
        { time: "09:45", place: "cruz_carmen", park: "p_cruz_carmen", title: "Cruz del Carmen — Path of the Senses", text: "Short loop into the laurel forest — the most 'jungle' part of the island. ~40 min. Arrive early, the car park fills on Sundays.", tags: ["Hike", "Free"] },
        { time: "10:45", place: "carboneras", park: "p_carboneras", title: "Hike Las Carboneras → Chinamada", text: "Drive 15 min to Las Carboneras. Ridge trail with laurel forest and big views, ~1 h 15 min each way.", tags: ["Hike", "Free"] },
        { time: "12:30", place: "chinamada", title: "Lunch in a cave: La Cueva, Chinamada", text: "Canarian home cooking inside a cave house. Check it's open on Google Maps in the morning (irregular hours). Veg: papas, queso asado, salad.", tags: ["Lunch", "Veg ✓"], alts: ["cruz_carmen_rest", "historias"] },
        { time: "14:00", place: "carboneras", title: "Walk back to Las Carboneras" },
        { time: "15:45", place: "teresitas_mirador", title: "Mirador de Las Teresitas", text: "Drive over El Bailadero (40 min, winding). Photo stop above the beach (roadside lay-by)." },
        { time: "16:15", place: "teresitas", park: "p_teresitas", title: "Playa de Las Teresitas — swim", text: "Golden sand, calm water behind the breakwater (open-sea swell ~1.4 m doesn't reach inside). A bit cloudier than Friday, but the sea is the same ~24 °C all week. Sunday = busy with locals.", tags: ["Beach"] },
        { time: "18:15", place: "san_andres", title: "San Andrés — castle ruins & a drink", text: "Look at the ruined tower (5 min walk from the beach car park); optional drink or fish snack at one of the village tascas.", optional: true },
        { time: "19:00", place: "hotel", title: "Drive back (~45 min) — dinner at the hotel" }
      ],
      alternatives: [
        { title: "WWII bunker hike", place: "san_andres", text: "Guided 8 km hike from San Andrés to a WWII bunker with tunnels and machine-gun posts (Civitatis) — replaces the Chinamada part." }
      ]
    },

    {
      id: "d5", date: "2026-10-19", title: "Dragon tree, Teno lighthouse & Garachico",
      area: "Icod · Buenavista · Punta de Teno · Garachico",
      summary: "The thousand-year dragon tree, a bus ride to the wild lighthouse at the island's north-west tip, a late lunch in pretty Garachico with big waves crashing on its lava pools, and an optional sunset on the Masca road.",
      weather: {
        at: [{ name: "Garachico", lat: 28.37, lng: -16.76 }, { name: "Punta de Teno", lat: 28.34, lng: -16.92 }],
        snapshot: "~25 °C, part cloudy, dry — NW swell ~2 m: spectacular waves at Teno, natural pools likely closed"
      },
      steps: [
        { time: "09:30", place: "hotel", title: "Leave the hotel", text: "TF-5 west, ~35 min to Icod de los Vinos." },
        { time: "10:05", place: "drago", park: "p_icod", title: "Drago Milenario", text: "Free view from Plaza de San Marcos, or pay to enter the garden around it. 25 min — don't linger, you have a bus to catch." },
        { time: "10:35", place: "teno", park: "p_buenavista", title: "Drive to Buenavista & take bus 369", text: "~25 min drive past Garachico. Park near the bus station and take the 11:00 bus (roughly hourly — check the TITSA timetable the day before). €1 per person each way, cash or card.", tags: ["Bus", "€1"] },
        { time: "11:20", place: "teno", title: "Punta de Teno lighthouse & cliffs", text: "Walk out over the lava to the lighthouse and the viewpoints facing the Teno/Los Gigantes cliffs and La Gomera. With a ~2 m swell the sea will be wild — great photos, but no swimming and keep well back from the edges. Take the ~13:25 bus back.", tags: ["Viewpoint", "Free"] },
        { time: "14:00", place: "rebojo", park: "p_garachico", title: "Lunch: El Rebojo, Garachico", text: "15 min from Buenavista. Kitchen open until 17:30, so a late lunch is fine — reserve for 14:00. Small plates & good-value menus with veg options.", tags: ["Lunch", "Veg ✓"], alts: ["los_pinos", "sioux"] },
        { time: "15:45", place: "garachico", title: "Garachico & El Caletón pools", text: "Walk the old town and Castillo de San Miguel. The lava pools will probably be closed with this swell (red flag) — watching the waves crash over them is a show in itself." },
        { time: "17:45", place: "cherfe", park: "p_cherfe", title: "Optional: Masca road & Mirador de Cherfe for sunset", text: "Via Buenavista and El Palmar onto the TF-436 over Masca (narrow, slow, ~50 min). Sunset ~19:32 at Cherfe; then back via Santiago del Teide & the TF-82/TF-5 (~1 h 15 min). Or skip and drive straight back (~35 min).", optional: true, tags: ["Sunset"] },
        { time: "~20:45", place: "hotel", title: "Dinner at the hotel", text: "Ask the hotel to keep dinner if you do the Masca sunset." }
      ],
      alternatives: [
        { title: "Cueva del Viento — only if a slot frees up", place: "cueva", park: "p_cueva", text: "Not booked. Check the official booking page the evening before — if a morning slot appears, do it at ~10:00 and skip the lighthouse (2 h, €25, card only, long trousers + closed shoes). Also fits Tue 20 or Wed 21 morning." },
        { title: "🚤 Boat version of Monday: Los Gigantes cliffs, whales & a swim", place: "gigantes_boat", park: "p_gigantes", alts: ["pejeverde", "tas_k", "fishermans_inn"],
          text: "Swap the lighthouse for the sea. 09:15 leave → 10:15 park at Los Gigantes marina (via TF-5/TF-82, ~1 h) → 10:30–13:00 boat: 600 m cliffs of Los Gigantes, resident pilot whales & dolphins, swim stop in Masca bay → 13:15 lunch at the marina → 15:00 drive up the Masca road (Mirador de Cherfe) → 16:15 Garachico pools & town → 17:45 Drago in Icod → home for dinner. Book 1–2 days ahead and pick a calm-sea day." },
        { title: "Masca gorge hike (instead of Teno)", place: "cherfe", text: "Must be booked: caminobarrancodemasca.com, ~€28 + €10 shuttle, descents start ~08:30–11:00, helmet & passport required, cars park in Santiago del Teide and you take the shuttle/bus 355. A full-day commitment." },
        { title: "Teno Alto plateau walk (instead of Garachico in the afternoon)", place: "teno_alto", park: "p_teno_alto", text: "Remote farming plateau above the cliffs, reached by car via El Palmar (~20 min from Buenavista). Easy 1–1.5 h loop, goat-cheese stop at Bar Los Bailaderos." }
      ]
    },

    {
      id: "d6", date: "2026-10-20", title: "Cannons, the Enchanted Forest & a coup",
      area: "Santa Cruz · Anaga (El Pijaral) · La Esperanza",
      summary: "The war day with a forest in the middle: the cannon that took Nelson's arm, picnic shopping at the market, your BOOKED walk through El Pijaral's enchanted laurel forest (13:00–15:00), a late lunch at the end of the world in Chamorga, and the forest clearing where Franco planned the 1936 coup.",
      weather: {
        at: [{ name: "Santa Cruz", lat: 28.47, lng: -16.25 }, { name: "Anaga – El Pijaral", lat: 28.56, lng: -16.18 }],
        snapshot: "Santa Cruz ~25 °C, cloudy, dry; Anaga ridge ~20 °C, misty in the forest — bring a layer"
      },
      steps: [
        { time: "09:00", place: "hotel", title: "Drive to Santa Cruz (~40 min, TF-5)" },
        { time: "09:55", place: "almeyda", park: "p_santa_cruz", title: "Military History Museum (Almeyda)", text: "Opens 10:00, free. 'El Tigre' cannon vs. Nelson (1797), Civil War & WWII-era coastal defence. Keep it to ~1 h today. Park once at Plaza de España and walk to the museum and the market.", tags: ["Military", "Free"] },
        { time: "11:10", place: "mercado", title: "Mercado Nuestra Señora de África — picnic shopping", text: "Buy a picnic for before the hike: bread, local goat cheese, almogrote, tomatoes, fruit, a bottle of water each. Grab a coffee/churros. Leave by 11:50 at the latest.", tags: ["Food", "Veg ✓"] },
        { time: "11:50", title: "Drive to La Ensillada (~45 min)", text: "Santa Cruz → San Andrés → TF-12 up to El Bailadero → TF-123 'Carretera de la Cumbre' east. Narrow and winding — don't rush, but don't be late for the 13:00 slot.", tags: ["Car"] },
        { time: "12:35", place: "pijaral", park: "p_ensillada", title: "Quick picnic at the trailhead", text: "Eat your market picnic by the car before the walk (no food stops on the trail).", tags: ["Lunch", "Veg ✓"] },
        { time: "13:00", place: "pijaral", title: "El Pijaral — Enchanted Forest loop (BOOKED)", text: "Reservation 210063, slot 13:00–15:00. Have the booking + ID on your phone. ~6.5 km loop via Mirador Cabezo del Tejo through moss-draped laurel and giant heather — the wildest 'jungle' on the island. Start on time and keep moving; the loop usually takes 2.5–3 h.", tags: ["Hike", "Booked ✓"] },
        { time: "15:15", place: "casa_alvaro", park: "p_chamorga", title: "Late lunch: Bar Casa Álvaro, Chamorga", text: "10 min further along the TF-123 to the last village of the road. Cheap and simple: papas con mojo, queso, salads. Open 11–19 (closed Wed).", tags: ["Lunch", "Veg ✓"], alts: ["bibi_mana", "mercado"] },
        { time: "16:30", place: "raices", park: "p_raices", title: "Las Raíces — where the Civil War was planned", text: "~50 min back via El Bailadero, La Laguna and the TF-24 into the La Esperanza forest. Short walk in the pines around the site.", tags: ["Military"] },
        { time: "18:15", place: "hotel", title: "Back to the hotel (~40 min)", text: "Spa/pool before dinner." }
      ],
      alternatives: [
        { title: "La Laguna instead of Las Raíces", place: "laguna", park: "p_laguna", text: "If you'd rather see a town than a forest clearing: stroll the UNESCO old town of La Laguna on the way back (Calle San Agustín, the cathedral, Concepción church tower) and have a barraquito." },
        { title: "Running late after the hike?", place: "teresitas_mirador", text: "Skip Las Raíces and drive straight home via San Andrés and the Mirador de Las Teresitas." },
        { title: "Castillo de San Juan Bautista", text: "Small black 17th-c. fort next to the Auditorio in Santa Cruz — 5 min look from outside if you're early for the museum." }
      ]
    },

    {
      id: "d7", date: "2026-10-21", title: "Escape the rain: caves, bunkers & beaches in the south",
      area: "Candelaria · El Médano · Montaña Roja",
      summary: "The best beach day of the week — sunny, calm sea in the south: a free Guanche cave on the way, a red volcano with WWII machine-gun nests, a surf-town lunch, a hermit's cave and a wild golden beach.",
      weather: {
        at: [{ name: "El Médano (south)", lat: 28.05, lng: -16.54 }, { name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }],
        snapshot: "South: sunniest & calmest day of the week — ~26 °C, ~10% cloud, waves ~0.4 m, sea ~25 °C. Best beach day."
      },
      steps: [
        { time: "09:00", place: "hotel", title: "Drive south (TF-5 → TF-1)" },
        { time: "09:45", place: "achbinico", park: "p_candelaria", title: "Candelaria: Cueva de Achbinico & the Guanche kings", text: "Free cave shrine by the sea, the Basílica and the giant bronze statues of the nine Guanche kings. 30–40 min.", tags: ["Cave", "Free"] },
        { time: "11:00", place: "montana_roja", park: "p_medano", title: "Montaña Roja loop + WWII machine-gun nests", text: "~45 min from Candelaria. Start at the El Médano beach boardwalk, look out for the concrete nests along the coast, climb the red cone. ~7.5 km, 2–2.5 h.", tags: ["Hike", "Military", "Free"] },
        { time: "13:30", place: "cofradia", title: "Lunch in El Médano", text: "Canarian fish & papas at the fishermen's cooperative — or one of the veggie-friendly alternatives.", tags: ["Lunch", "Veg ✓"], alts: ["ancla", "platano_azul", "lille"] },
        { time: "14:45", place: "hermano_pedro", park: "p_hermano_pedro", title: "Optional: Cueva del Santo Hermano Pedro", text: "Free hermit's cave shrine, 5 min drive. Planes roar overhead — oddly memorable. 20 min. Skip it if you'd rather have more beach time.", optional: true, tags: ["Cave", "Free"] },
        { time: "15:15", place: "tejita", park: "p_tejita", title: "Beach afternoon at Playa de La Tejita", text: "The main swim of the trip: natural golden sand under Montaña Roja, calm sea (~0.4 m), water ~25 °C. Stay until ~18:00. Bring an umbrella or shade — there's none.", tags: ["Beach", "Swim"] },
        { time: "18:00", place: "hotel", title: "Drive back (~1 h 10 min) — last hotel dinner", text: "Pack tonight; tomorrow you return the car." }
      ],
      alternatives: [
        { title: "If the forecast changes and the north is dry", text: "Stay north: Anaga second round (Afur → Playa de Tamadite, a wild beach at the end of a jungle ravine) or Bosque Encantado with permit." },
        { title: "Cueva del Viento (if a slot frees up)", place: "cueva", text: "A rainy north-coast day is ideal for the lava tube — but only if you manage to book a slot." },
        { title: "🚤 Whale-watching boat from Costa Adeje", text: "Calm, dry south = good sea day. Instead of Hermano Pedro + La Tejita, take a 2–3 h whale & dolphin catamaran from Puerto Colón (25 min from El Médano), ~€25–45 pp. Pick an operator with the 'Barco Azul' whale-watching licence." },
        { title: "Paisaje Lunar (Vilaflor)", text: "Strange white rock pinnacles in pine forest above Vilaflor; 3–4 h hike. Only if it's dry up there (forecast: drizzly)." }
      ]
    },

    {
      id: "d8", date: "2026-10-22", title: "Last morning & home",
      area: "La Orotava · Puerto → TFS → Prague",
      summary: "Quick final look at La Orotava, return the car, check out and catch the transfer.",
      weather: { at: [{ name: "Puerto de la Cruz", lat: 28.41, lng: -16.54 }], snapshot: "~23 °C, cloudy, light drizzle possible" },
      steps: [
        { time: "08:00", place: "hotel", title: "Breakfast & pack", text: "Ask reception/your rep the exact transfer pickup time (usually ~3.5–4 h before the flight)." },
        { time: "09:00", place: "orotava", park: "p_orotava", title: "La Orotava old town", text: "Casa de los Balcones, Jardines Victoria (view over the valley). 1 h.", optional: true },
        { time: "10:30", title: "Return the rental car", text: "Fuel as agreed in the contract; take photos of the car.", tags: ["Car"] },
        { time: "11:30", place: "hotel", title: "Check out", text: "Leave bags at reception." },
        { time: "12:00", place: "gemelos", title: "Early lunch: Mesón Los Gemelos", text: "Last papas con mojo — at 12:00 you beat the queue. Keep it light, the transfer is long.", tags: ["Lunch", "Veg ✓"], alts: ["pache", "perrachica"] },
        { time: "~13:00", place: "hotel", title: "Transfer bus to the airport", text: "Confirm the time! The drive is ~1.5–2 h." },
        { time: "17:05", place: "tfs", title: "Fly home — QS 1213 Tenerife South → Praha", text: "Lands 23:05 Prague time." }
      ],
      alternatives: [
        { title: "Sleep in instead", text: "Skip La Orotava, enjoy the hotel pool, return the car and walk to Lago Martiánez." }
      ]
    }
  ],

  bookings: [
    { id: "pijaral", title: "El Pijaral — La Ensillada · Cabezo del Tejo loop", when: "Tue 20 Oct, 13:00–15:00", price: "Free", status: "booked",
      note: "Reservation code 210063. Carry the booking + ID. Park at La Ensillada (TF-123) by 12:40.",
      url: "https://www.tenerifeon.es/itinerarios/sendero/pra-72-la-ensillada-cabezo-del-tejo" },
    { id: "loro", title: "Loro Parque (optional)", when: "Fri 16 Oct, full day — or any other day you fancy", price: "~€50 / adult (check)", status: "optional",
      note: "Not in the main plan. Buy tickets online the evening before; check opening hours. Taxi from the hotel ~10 min.",
      url: "https://www.loroparque.com/en/" },
    { id: "cave", title: "Cueva del Viento — lava-tube tour (not booked)", when: "Only if a slot frees up: Mon 19, Tue 20 or Wed 21 morning", price: "€25 / adult (card only)", status: "optional",
      note: "Currently no free slots, so it is NOT in the main plan. Check the booking page the evening before for cancellations. Free caves without booking are in the plan on Wed 21 (Achbinico in Candelaria, Hermano Pedro near El Médano).",
      url: "https://cuevadelviento.net/en/ruta-en-ingles-viaje-al-interior-de-la-tierra/" },
    { id: "rebojo", title: "El Rebojo, Garachico — lunch table", when: "Mon 19 Oct, 14:00 (after Teno)", price: "€€ (Bib Gourmand)", status: "recommended",
      note: "Closed Wed & Thu. Reserve by phone / Google Maps the day before.",
      url: "https://www.google.com/maps/search/?api=1&query=El+Rebojo+Garachico" },
    { id: "cable", title: "Teide cable car (optional)", when: "Sat 17 Oct, ~15:00", price: "~€42 return / adult", status: "optional",
      note: "Timed tickets. Weather-dependent — buy only once the forecast looks calm. Not needed for the free hikes.",
      url: "https://www.volcanoteide.com/en/teide-cable-car" },
    { id: "summit", title: "Teide summit permit (optional)", when: "Sat 17 Oct", price: "~€15 conservation fee (2026)", status: "optional",
      note: "Only via Tenerife ON. New slots each Monday 07:00 Canary time up to 56 days ahead — almost certainly sold out; watch for cancellations. Also needs the cable car.",
      url: "https://tenerifeon.es/" },
    { id: "boat", title: "Los Gigantes boat trip — whales, cliffs & swim (optional)", when: "Mon 19 Oct, ~10:30 (boat version of Monday)", price: "~€30–45 pp (2–3 h)", status: "optional",
      note: "Book 1–2 days ahead once the sea forecast looks calm. Look for the 'Barco Azul' licence. Meet at Los Gigantes marina; park at the marina car park.",
      url: "https://www.getyourguide.com/los-gigantes-l91695/dolphin-whale-watching-tc49/" },
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
      { dir: "Outbound", date: "Thu 15 Oct", flight: "QS 1212", from: "Praha T2", dep: "11:50 (Prague time)", to: "Tenerife South", arr: "16:15 (Canary time)",
        links: [
          { label: "Live status (Flightradar24)", url: "https://www.flightradar24.com/data/flights/qs1212" },
          { label: "Smartwings — booking & check-in", url: "https://www.smartwings.com/" },
          { label: "Prague airport departures", url: "https://www.prg.aero/en/flights" }
        ] },
      { dir: "Return", date: "Thu 22 Oct", flight: "QS 1213", from: "Tenerife South", dep: "17:05 (Canary time)", to: "Praha", arr: "23:05 (Prague time)",
        links: [
          { label: "Live status (Flightradar24)", url: "https://www.flightradar24.com/data/flights/qs1213" },
          { label: "Smartwings — booking & check-in", url: "https://www.smartwings.com/" },
          { label: "Tenerife South airport (Aena)", url: "https://www.aena.es/en/tenerife-sur.html" }
        ] }
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
