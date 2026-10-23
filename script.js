// ==========================================
// WONDERWIJS PORTAAL (Versie 72: Clean Code & Vercel Fix)
// ==========================================

const defaultImg = "https://placehold.co/600x400/8CC63F/ffffff?text=WonderWijs+Materiaal";

// ==========================================
// 1. LOKALE DATA & VARIABELEN
// ==========================================
function safeGetLocal(key, defaultData) {
    try {
        const data = localStorage.getItem(key);
        if (data && data !== "null" && data !== "undefined") {
            const parsed = JSON.parse(data);
            return (Array.isArray(parsed) && parsed.length > 0) ? parsed : defaultData;
        }
    } catch (e) { 
        console.warn("Lokaal geheugen gereset voor:", key); 
    }
    return defaultData;
}

window.openInOutlook = function(to, subject, body) {
    const cleanTo = (to || "").trim();
    const encodedTo = encodeURIComponent(cleanTo);
    const encodedSubject = encodeURIComponent(subject || "");
    const encodedBody = encodeURIComponent(body || "");

    // 1. Direct Outlook Web Deeplink voor Microsoft 365 (Stichting Wonderwijs)
    const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`;

    // Probeer direct Outlook Web te openen in een nieuw tabblad
    const outlookWindow = window.open(outlookWebUrl, '_blank');

    // 2. Fallback: als pop-up venster wordt geblokkeerd of lokale Outlook client actief is
    if (!outlookWindow || outlookWindow.closed || typeof outlookWindow.closed === 'undefined') {
        window.location.href = `mailto:${cleanTo}?subject=${encodedSubject}&body=${encodedBody}`;
    }
};

window.detecteerKistNaam = function(titel, beschrijving) {
    const text = ((titel || '') + ' ' + (beschrijving || '')).toLowerCase();
    if (text.includes('bee-bot') || text.includes('beebot')) return 'Bee-Bot';
    if (text.includes('blue-bot') || text.includes('bluebot')) return 'Blue-Bot';
    if (text.includes('green screen studio') || text.includes('greenscreen studio')) return 'Green Screen Studio';
    if (text.includes('green screen') || text.includes('greenscreen')) return 'Green Screen Studio';
    if (text.includes('makey makey') || text.includes('makeymakey')) return 'Makey Makey';
    if (text.includes('micro:bit') || text.includes('microbit')) return 'Micro:bit';
    if (text.includes('ozobot')) return 'Ozobot';
    if (text.includes('classvr') || text.includes('vr bril') || text.includes('virtual reality') || text.includes('vr')) return 'VR Brillen';
    if (text.includes('spike essential') || text.includes('lego essential')) return 'LEGO Spike Essential';
    if (text.includes('spike prime') || text.includes('lego spike')) return 'LEGO Spike Prime';
    if (text.includes('lego bricq') || text.includes('bricq')) return 'LEGO BricQ Motion';
    if (text.includes('podcast')) return 'Podcast Studio';
    if (text.includes('3d pen') || text.includes('3dpennen')) return '3D Pennen';
    if (text.includes('3d printer') || text.includes('3dprinter')) return '3D Printer';
    if (text.includes('piximakey') || text.includes('stop-motion') || text.includes('animatie')) return 'Piximakey';
    if (text.includes('mtiny')) return 'mTiny';
    if (text.includes('dash')) return 'Dash & Dot Robot';
    if (text.includes('cue')) return 'Cue Robot';
    if (text.includes('drone')) return 'Drones';
    if (text.includes('duplo')) return 'DUPLO Coding Express';
    if (text.includes('easiscope') || text.includes('microscoop')) return 'Easi-Scope Microscoop';
    if (text.includes('infento pro')) return 'Infento Pro Kit';
    if (text.includes('infento')) return 'Infento Talent Kit';
    if (text.includes('intelino') || text.includes('trein')) return 'Intelino Slimme Trein';
    if (text.includes('osmo')) return 'Osmo';
    if (text.includes('kiene klanken')) return 'Kiene Klanken';
    if (text.includes('sphero indi') || text.includes('indi')) return 'Sphero Indi';
    if (text.includes('sphero mini') || text.includes('sphero')) return 'Sphero Mini';
    if (text.includes('virtual-tee') || text.includes('virtuali-tee')) return 'Virtuali-Tee';
    if (text.includes('plugo')) return 'Plugo';
    if (text.includes('photon')) return 'Photon';
    if (text.includes('ipad') || text.includes('tablet')) return 'iPad Kist';
    return 'Wonderlab Leskist';
};

window.getAfbeeldingVoorKist = function(naam) {
    const clean = (naam || '').toLowerCase();
    if (clean.includes('bee-bot') || clean.includes('beebot')) return 'img/beebot.jpg';
    if (clean.includes('blue-bot') || clean.includes('bluebot')) return 'img/bluebot.jpg';
    if (clean.includes('green screen studio') || clean.includes('greenscreen studio') || clean.includes('greenscreenstudio')) return 'img/greenscreenstudio.jpg';
    if (clean.includes('green screen') || clean.includes('greenscreen')) return 'img/greenscreen.jpg';
    if (clean.includes('makey makey') || clean.includes('makeymakey')) return 'img/makeymakey.jpg';
    if (clean.includes('micro:bit') || clean.includes('microbit')) return 'img/microbit.jpg';
    if (clean.includes('ozobot')) return 'img/ozobot.jpg';
    if (clean.includes('classvr') || clean.includes('vr bril') || clean.includes('virtual reality') || clean.includes('vr')) return 'img/vrbrillen.jpg';
    if (clean.includes('spike essential') || clean.includes('lego essential')) return 'img/legoessential.jpg';
    if (clean.includes('spike prime') || clean.includes('lego spike')) return 'img/legospike.jpg';
    if (clean.includes('lego bricq') || clean.includes('bricq')) return 'img/legobricq.jpg';
    if (clean.includes('podcast')) return 'img/podcaststudio.jpg';
    if (clean.includes('3d pen') || clean.includes('3dpennen')) return 'img/3dpennen.jpg';
    if (clean.includes('3d printer') || clean.includes('3dprinter')) return 'img/3dprinter.jpg';
    if (clean.includes('piximakey') || clean.includes('stop-motion') || clean.includes('animatie')) return 'img/piximakey.jpg';
    if (clean.includes('mtiny')) return 'img/mtiny.jpg';
    if (clean.includes('dash')) return 'img/dashrobot.jpg';
    if (clean.includes('cue')) return 'img/cuerobot.jpg';
    if (clean.includes('drone')) return 'img/drones.jpg';
    if (clean.includes('duplo')) return 'img/duplocodingexpress.jpg';
    if (clean.includes('easiscope') || clean.includes('microscoop')) return 'img/easiscope.jpg';
    if (clean.includes('infento pro')) return 'img/infentoprokit.jpg';
    if (clean.includes('infento')) return 'img/infentotalentkit.jpg';
    if (clean.includes('intelino') || clean.includes('trein')) return 'img/intelinotrein.jpg';
    if (clean.includes('osmo')) return 'img/osmo.jpg';
    if (clean.includes('kiene klanken')) return 'img/kieneklanken.jpg';
    if (clean.includes('sphero indi') || clean.includes('indi')) return 'img/spheroindi.jpg';
    if (clean.includes('sphero mini') || clean.includes('sphero')) return 'img/spheromini.jpg';
    if (clean.includes('virtual-tee') || clean.includes('virtuali-tee')) return 'img/virtualtee.jpg';
    if (clean.includes('plugo')) return 'img/plugo.jpg';
    if (clean.includes('photon')) return 'img/photon.jpg';
    if (clean.includes('ipad') || clean.includes('tablet')) return 'img/ipad.jpg';
    return 'Verwonderlab.jpg';
};

let periodes = safeGetLocal('ww_periodes_v11', [{ id: 1, naam: "Periode 1 schooljaar 2026/2027", start: "2026-08-31", eind: "2026-09-20" }]);
let scholen = safeGetLocal('ww_scholen_v1', [{ id: 1, naam: "Binnenstebuiten" }, { id: 2, naam: "De Wegwijzer" }]);
let reserveringen = safeGetLocal('ww_reserveringen_v11', []);
let beheerdersLijst = safeGetLocal('ww_beheerders_v1', []); 
let mijnFavorieten = safeGetLocal('ww_favorieten_v1', []); 
let meldingen = safeGetLocal('ww_meldingen_v1', []); 
let leskisten = safeGetLocal('ww_leskisten_v15', []);
const standaardLesideeen = [
    {
        id: 1,
        titel: "Bee-Bot: Schattenjacht & Kaartlezen op de Boerderij",
        categorie: "Programmeren",
        bouw: "Groep 1-2 (Onderbouw)",
        afbeelding: "img/beebot.jpg",
        kistNaam: "Bee-Bot",
        beschrijving: "Laat kleuters spelenderwijs kennismaken met algoritmes en richtingen. De Bee-Bot volgt de commando's van de leerlingen om de schat op de boerderijmat te vinden.",
        link: "https://www.kennisnet.nl/leren-met-ict/digitale-geletterdheid/computational-thinking/",
        lesbrief: {
            doelen: "Leerlingen leren een stappenplan formuleren (algoritmisch denken), ruimtelijke begrippen toepassen (links, rechts, vooruit, achteruit) en fouten opsporen en herstellen (debuggen).",
            tijd: "45 minuten",
            organisatie: "Groepjes van 3 à 4 leerlingen per Bee-Bot",
            kistMateriaal: "Bee-Bot robots, laadstation, boerderij vloermat, richtingkaarten",
            klasMateriaal: "Houten blokjes (als obstakels), schatkaartjes/fiches",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Laad de Bee-Bots vooraf op en leg de vloermatten klaar op een vlakke vloer.",
            inleidingTijd: "10 min",
            inleiding: "Verzamel de klas in de kring. Introduceer de Bee-Bot als een 'robotbijtje' dat niet zelf kan nadenken, maar alleen doet wat wij hem vertellen. Demonstreer klassikaal met 2 stappen vooruit. Laat een kind 'menselijke robot' spelen die luistert naar stappencommando's.",
            kernTijd: "25 min",
            kern: "1. Leerlingen leggen een schatkaartje op een vak en een obstakel (bijv. de modderpoel).<br>2. Ze overleggen samen welke route de Bee-Bot moet nemen.<br>3. Ze leggen eerst de fysieke richtingkaarten neer (het algoritme ontwerpen).<br>4. Één leerling toetst de route in en drukt op GO.<br>5. Ging het mis? Samen ontdekken waar het bijtje verkeerd ging, wissen ('X') en opnieuw programmeren (debuggen).",
            afsluitingTijd: "10 min",
            afsluiting: "Kringgesprek: Waarom is het belangrijk om eerst de 'X' (wissen) in te drukken? Wat gebeurt er als je één stap vergeet? Koppel dit aan hoe computers werken.",
            tips: "Voor leerlingen die meer uitdaging aankunnen: laat ze voor een ander groepje een geheime code intoetsen en laat hen raden waar de Bee-Bot uitkomt."
        }
    },
    {
        id: 2,
        titel: "Green Screen: Levende Geschiedenis & Wonderwijs Journaal",
        categorie: "Mediawijsheid",
        bouw: "Groep 5-8 (Bovenbouw)",
        afbeelding: "img/greenscreenstudio.jpg",
        kistNaam: "Green Screen Studio",
        beschrijving: "Leerlingen stappen in een tijdmachine! Ze schrijven een historisch nieuwsbericht en presenteren dit alsof ze live verslag doen vanuit de Romeinse tijd of middeleeuwen.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen begrijpen hoe chroma-key en beeldbewerking werken, leren kritisch kijken naar gemanipuleerde media en oefenen met spreken, presenteren en scriptschrijven.",
            tijd: "60 - 75 minuten",
            organisatie: "Groepjes van 3: 1 presentator, 1 cameraman, 1 regisseur/technicus",
            kistMateriaal: "Green Screen doek / studio frame, statief, tabletklem, microfoons",
            klasMateriaal: "iPads/tablets met Green Screen app (bijv. Do Ink of CapCut), rekwisieten/kleding",
            voorbereidingTijd: "10 minuten",
            voorbereiding: "Span het groene doek kreukvrij op en zorg voor gelijkmatige belichting zonder harde schaduwen.",
            inleidingTijd: "15 min",
            inleiding: "Toon een bekend fragment uit het Jeugdjournaal weerbericht of een film (bijv. Star Wars). Vraag: staat de weerman echt voor een bewegende kaart? Leg uit hoe de app alles wat groen is vervangt door een foto of video.",
            kernTijd: "40 min",
            kern: "1. Elk groepje kiest een historische gebeurtenis en zoekt een passende rechtenvrije achtergrondfoto.<br>2. Ze schrijven een kort script van maximaal 1 minuut.<br>3. Ze nemen de video op voor het groene scherm (let op: geen groene kleding dragen!).<br>4. In de app monteren ze de achtergrond en voegen ze een nieuwstitel toe.",
            afsluitingTijd: "15 min",
            afsluiting: "Bekijk elkaars journaals op het digibord. Reflecteer op mediawijsheid: Hoe betrouwbaar zijn beelden die je online ziet op TikTok of Instagram?",
            tips: "Laat leerlingen experimenteren met een groen laken over iemand heen om 'onzichtbare' effecten te creëren."
        }
    },
    {
        id: 3,
        titel: "Makey Makey: Het Zingende Fruitorkest & Gamecontrollers",
        categorie: "Creatief",
        bouw: "Groep 3-6 (Middenbouw)",
        afbeelding: "img/makeymakey.jpg",
        kistNaam: "Makey Makey",
        beschrijving: "Verander bananen, appels en klei in een functionerende piano of gamecontroller. Leerlingen ontdekken hoe gesloten stroomkringen en geleiding werken.",
        link: "https://makeymakey.com/pages/apps",
        lesbrief: {
            doelen: "Leerlingen ontdekken het principe van gesloten elektrische stroomkringen, leren het verschil tussen geleiders en isolatoren en koppelen fysieke interactie aan software.",
            tijd: "50 minuten",
            organisatie: "Groepjes van 3 à 4 leerlingen per Makey Makey set",
            kistMateriaal: "Makey Makey bordjes, USB-kabels, krokodillenklemmen",
            klasMateriaal: "Laptops/Chromebooks met de Makey Makey Piano webapp of Scratch, bananen, appels, aluminiumfolie, potloodgrafiet, klei",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Sluit de Makey Makey sets aan op de laptops en open de online piano (makeymakey.com/pages/apps).",
            inleidingTijd: "10 min",
            inleiding: "Vraag de klas: kan een banaan muziek maken? Houd een banaan omhoog en tik erop. Geen geluid. Sluit de Makey Makey aan, pak de aarde-draad vast, tik op de banaan en speel een noot! Leg uit dat een klein, veilig stroompje door ons lichaam gaat om het circuit te sluiten.",
            kernTijd: "30 min",
            kern: "1. Leerlingen sluiten 4 stuks fruit aan op de pijltjestoetsen en spatiebalk van de Makey Makey.<br>2. Één leerling houdt de 'Earth' (aarde) klem vast.<br>3. Ze spelen samen eenvoudige liedjes (bijv. 'Kortjakje' of 'Vader Jacob').<br>4. Onderzoekscircuit: Welke andere voorwerpen in de klas geleiden stroom? Laat ze testen met metalen linialen, gummen, nat papier en potloodtekeningen.",
            afsluitingTijd: "10 min",
            afsluiting: "Welke materialen bleken onverwacht geleidend? Bespreek hoe gewone computertoetsenborden en gamecontrollers met precies dezelfde gesloten schakelaars werken.",
            tips: "Laat gevorderde leerlingen in Scratch een eigen geluideneffecten-bordje programmeren (bijv. dierengeluiden)."
        }
    },
    {
        id: 4,
        titel: "Micro:bit: Slimme Stappenteller & Boodschappenspel",
        categorie: "Programmeren",
        bouw: "Groep 6-8 (Bovenbouw)",
        afbeelding: "img/microbit.jpg",
        kistNaam: "Micro:bit",
        beschrijving: "Programmeer een minicomputer met sensoren. Leerlingen bouwen hun eigen stappenteller met de ingebouwde versnellingsmeter en testen hem op het schoolplein.",
        link: "https://makecode.microbit.org/",
        lesbrief: {
            doelen: "Leerlingen leren programmeren met variabelen, gebeurtenissen (events) en sensoren, en begrijpen hoe wearables en smartwatches data registreren.",
            tijd: "60 minuten",
            organisatie: "Tweetallen per laptop/Micro:bit",
            kistMateriaal: "Micro:bit bordjes, batterijhouders met 2x AAA batterijen, micro-USB kabels",
            klasMateriaal: "Chromebooks/laptops met internet (MakeCode), elastiek of schilderstape om Micro:bit aan de enkel te binden",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Zorg dat MakeCode (makecode.microbit.org) klaarstaat op de Chromebooks.",
            inleidingTijd: "10 min",
            inleiding: "Laat een smartwatch of fitbit zien. Hoe weet dit horloge hoeveel stappen je zet? Toon de Micro:bit en wijs op de versnellingsmeter (accelerometer chip) die beweging meet.",
            kernTijd: "35 min",
            kern: "1. Open MakeCode en maak een variabele 'stappen'.<br>2. Programmeer: 'bij opstarten' -> stel stappen in op 0.<br>3. Programmeer: 'wanneer geschud' -> verander stappen met 1, en toon getal 'stappen'.<br>4. Voeg een resetfunctie toe op Knop A.<br>5. Download de .hex code naar de Micro:bit, sluit de batterijhouder aan en bind de Micro:bit om de schoen of enkel.<br>6. Test: loop 50 stappen op het plein en controleer de nauwkeurigheid.",
            afsluitingTijd: "15 min",
            afsluiting: "Vergelijk de scores. Waarom telde de Micro:bit soms te veel of te weinig? Hoe lossen programmeurs 'valse' bewegingen op?",
            tips: "Extra uitdaging: programmeer een beloning! Als stappen > 100, toon dan een feestelijke animatie of een muziekje."
        }
    },
    {
        id: 5,
        titel: "Ozobot Evo: Kleurencodes & De Slimme Koeriersdienst",
        categorie: "Programmeren",
        bouw: "Groep 4-6 (Middenbouw)",
        afbeelding: "img/ozobot.jpg",
        kistNaam: "Ozobot",
        beschrijving: "Teken met speciale viltstiften routes en kleurcodes op papier. De Ozobot herkent de kleurencombinaties en voert acties uit zoals turboversnelling, omkeren en dansen.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen leren logisch redeneren, sensorherkenning begrijpen en algoritmes toepassen door middel van kleurvolgordes.",
            tijd: "50 minuten",
            organisatie: "Tweetallen per Ozobot",
            kistMateriaal: "Ozobots, kleurstiften (zwart, rood, groen, blauw), kleurencode referentiebladen",
            klasMateriaal: "Witte A3 tekenvellen, linialen",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Kalibreer de Ozobots vooraf op de zwarte stip en controleer of de stiften goed vloeien.",
            inleidingTijd: "10 min",
            inleiding: "Demonstreer de Ozobot op een voorbeeldblad: laat zien hoe de optische sensoren onderop de lijn volgen en hoe hij versnelt bij de code [blauw-zwart-blauw].",
            kernTijd: "30 min",
            kern: "1. De Challenge: De Ozobot is een slimme postbezorger die een brief moet bezorgen in Dorp A, B en C.<br>2. Leerlingen tekenen een wegennetwerk met zwarte lijnen (5mm dik).<br>3. Op kruispunten plaatsen ze kleurcodes voor richting (bijv. linksaf, rechtsaf) en snelheid.<br>4. Testen en debuggen: als de lijn te dun is of de kleuren vlekken, herkent de robot de code niet.",
            afsluitingTijd: "10 min",
            afsluiting: "Laat de robots rijden op elkaars banen. Wat was de moeilijkste bocht en hoe is dat opgelost?",
            tips: "Houd een wit correctie-stickertje bij de hand om fout getekende kleurcodes snel te overplakken zonder het hele vel opnieuw te tekenen."
        }
    },
    {
        id: 6,
        titel: "ClassVR: Virtuele Expeditie door het Menselijk Lichaam",
        categorie: "Mediawijsheid",
        bouw: "Groep 6-8 (Bovenbouw)",
        afbeelding: "img/vrbrillen.jpg",
        kistNaam: "VR Brillen",
        beschrijving: "Stap fysiek in de bloedbaan of sta bovenop een vulkaan. Leerlingen ervaren Virtual Reality en leren hoe meeslepende simulaties werken.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen ervaren hoe Virtual Reality de werkelijkheid simuleert, verkennen anatomie en natuurverschijnselen in 3D en leren mediawijze kijkdiscipline.",
            tijd: "50 minuten",
            organisatie: "Tweetallen: om en om 10 minuten de bril op en 10 minuten verslaglegging",
            kistMateriaal: "ClassVR brillenset in koffer, leerkracht tablet voor het beheerportaal",
            klasMateriaal: "Werkblad 'Expeditie Menselijk Lichaam', potloden",
            voorbereidingTijd: "10 minuten",
            voorbereiding: "Zet de brillen aan, controleer de wifi-verbinding en open de gewenste VR-playlist in het ClassVR portaal.",
            inleidingTijd: "10 min",
            inleiding: "Veiligheidsafspraken: altijd zittend kijken, bril met twee handen vasthouden, hand opsteken bij duizeligheid. Leg uit hoe gyroscopen en twee lenzen een 3D-illusie wekken.",
            kernTijd: "30 min",
            kern: "1. De leerkracht activeert de VR-ervaring 'Het Kloppende Hart'.<br>2. Leerlingen 'staan' midden in de linker hartkamer en zien rode bloedcellen langs suizen.<br>3. Opdracht op werkblad: Welke taak hebben de hartkleppen? Waar stroomt zuurstofrijk bloed heen?<br>4. Na 10 minuten wisselt de rol van kijker en verslaggever met de schoudermaat.",
            afsluitingTijd: "10 min",
            afsluiting: "Klassikale nabespreking: Hoe voelde het om 'in' een orgaan te staan? Waarvoor gebruiken artsen en piloten deze techniek?",
            tips: "Gebruik de leerkracht-tablet om 'hotspots' aan te wijzen op het digibord zodat leerlingen weten waar ze naar moeten kijken."
        }
    },
    {
        id: 7,
        titel: "LEGO Spike Essential: De Slimme Afvalscheider Robot",
        categorie: "Techniek",
        bouw: "Groep 3-5 (Middenbouw)",
        afbeelding: "img/legoessential.jpg",
        kistNaam: "LEGO Spike Essential",
        beschrijving: "Bouw met LEGO motoren, tandwielen en sensoren een slimme machine die helpt bij het opruimen van plastic afval in de stad.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen leren mechanische constructies bouwen (overbrengingen met tandwielen), sensoren programmeren op kleur en ontwerpend leren toepassen.",
            tijd: "60 minuten",
            organisatie: "Vaste duo's per LEGO Spike set en tablet",
            kistMateriaal: "LEGO Spike Essential sets, sorteerbakken",
            klasMateriaal: "iPads/tablets met de officiële LEGO SPIKE app",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Controleer of de hubs opgeladen zijn via USB en gekoppeld met Bluetooth aan de tablets.",
            inleidingTijd: "10 min",
            inleiding: "Toon een korte video over plastic afval en recyclingfabrieken. Hoe kunnen slimme machines afval veel sneller scheiden dan mensen met de hand?",
            kernTijd: "40 min",
            kern: "1. Leerlingen volgen het interactieve bouwplan in de Spike app en bouwen de sorteerarm.<br>2. Ze sluiten de kleursensor en de motor aan op de hub.<br>3. Ze programmeren met blokken: 'Als kleursensor geel ziet (plastic), draai 90 graden naar rechts. Als sensor groen ziet (glas), draai 90 graden naar links.'<br>4. Testen met gekleurde LEGO stenen.",
            afsluitingTijd: "10 min",
            afsluiting: "Demonstratie: welk duo heeft een perfect werkende afvalsorteerder? Wat kan er nog verbeterd worden aan de snelheid of constructie?",
            tips: "Laat leerlingen zelf een opvangbakje bouwen van overgebleven LEGO stenen."
        }
    },
    {
        id: 8,
        titel: "Podcast Studio: De Wonderwijs Schoolradio & Interviewen",
        categorie: "Mediawijsheid",
        bouw: "Groep 6-8 (Bovenbouw)",
        afbeelding: "img/podcaststudio.jpg",
        kistNaam: "Podcast Studio",
        beschrijving: "Richt een professionele audio-opnamestudio in de klas in. Leerlingen interviewen de directeur, een meester of elkaar over actuele onderwerpen en monteren geluidseffecten.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen oefenen met journalistieke vaardigheden (open vragen formuleren, luisteren), microfoondiscipline en de impact van geluid en framing in media.",
            tijd: "75 minuten (of 2 dagdelen)",
            organisatie: "Redactiegroepjes van 4: 2 presentatoren, 1 technicus/jingle-bediener, 1 editor",
            kistMateriaal: "Røde mengpaneel / microfoons op arm, professionele koptelefoons, kabels",
            klasMateriaal: "Laptop met Audacity of Soundtrap, kladblok voor het draaiboek",
            voorbereidingTijd: "10 minuten",
            voorbereiding: "Zet de mengtafel klaar op een rustige tafel in een aparte hoek of lokaal.",
            inleidingTijd: "15 min",
            inleiding: "Luister naar een intro van 1 minuut van een jeugdpodcast. Bespreek: waarom trekt het geluid van een jingle je aandacht? Wat is het verschil tussen een open en een gesloten vraag?",
            kernTijd: "45 min",
            kern: "1. Leerlingen maken een format: Jingle -> Welkom -> Interview -> Dilemma van de week -> Uitsmijter.<br>2. Ze stellen 5 prikkelende open vragen op aan hun gast.<br>3. Repetitie en geluidscheck: let op 'plop'-geluiden en afstand tot de microfoon.<br>4. Live opname van max. 5 minuten met realtime jingles.",
            afsluitingTijd: "15 min",
            afsluiting: "Luister de opname klassikaal terug. Beoordeel elkaars interviewstijl en radiostem.",
            tips: "Leg vooraf geluidseffecten (applaus, lachband, bel) klaar onder de gekleurde pads van het mengpaneel."
        }
    },
    {
        id: 9,
        titel: "3D Pennen: Dragende Bruggen & Ruimtelijke Monumenten",
        categorie: "Creatief",
        bouw: "Groep 5-8 (Middenbouw & Bovenbouw)",
        afbeelding: "img/3dpennen.jpg",
        kistNaam: "3D Pennen",
        beschrijving: "Teken in 3D in de lucht! Leerlingen ontwerpen dragende constructies en testen welke brug het meeste gewicht kan dragen.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen ontwikkelen ruimtelijk inzicht, leren over materiaaleigenschappen (smelten en stollen van thermoplastisch bioplastic) en passen constructieprincipes toe.",
            tijd: "60 minuten",
            organisatie: "Duo's per 3D pen en tekenmat",
            kistMateriaal: "3D Pennen, hittebestendige tekenmatten, vingertopbeschermers, adapters",
            klasMateriaal: "PLA filament in diverse kleuren, gewichtjes om te testen",
            voorbereidingTijd: "5 minuten",
            voorbereiding: "Sluit de adapters aan op veilige stekkerdozen en leg de hittebestendige matjes klaar.",
            inleidingTijd: "10 min",
            inleiding: "Veiligheid: de metalen printkop wordt 190°C! Raak deze nooit aan. Demonstreer hoe je van 2D naar 3D gaat: teken twee platte zijkanten en verbind ze met stutbalken in de lucht.",
            kernTijd: "40 min",
            kern: "1. De Challenge: Bouw een brug met een overspanning van minstens 15 cm die minstens 200 gram kan dragen.<br>2. Leerlingen schetsen eerst hun constructie (driehoeksverbanden zijn het sterkst!).<br>3. Ze tekenen de vlakken met de 3D pen op de mat.<br>4. Na afkoelen 'lassen' ze met een drupje filament de losse onderdelen aan elkaar.",
            afsluitingTijd: "10 min",
            afsluiting: "De Krachtmeting: test de bruggen tussen twee tafels met gewichten. Welke vorm hield het langst stand?",
            tips: "Zorg dat leerlingen langzaam tekenen en het filament 2 seconden de tijd geven om te stollen voordat ze loslaten."
        }
    },
    {
        id: 10,
        titel: "Piximakey: Magische Stop-Motion Klei-animatie",
        categorie: "Creatief",
        bouw: "Groep 3-8 (Alle groepen)",
        afbeelding: "img/piximakey.jpg",
        kistNaam: "Piximakey",
        beschrijving: "Breng kleipoppetjes en legofiguurtjes tot leven beeldje voor beeldje. Leerlingen creëren hun eigen animatiefilm met de houten Piximakey koffer.",
        link: "",
        lesbrief: {
            doelen: "Leerlingen begrijpen hoe filmische illusie en framerate werken (10-12 foto's per seconde), leren een visueel storyboard ontwerpen en werken samen aan een creatief mediaproduct.",
            tijd: "60 - 90 minuten",
            organisatie: "Groepjes van 3: regisseur, animator, cameraman",
            kistMateriaal: "Piximakey houten studio koffers, houten tabletstandaards",
            klasMateriaal: "Tablets/smartphones met Piximakey app, plasticine boetseerklei, achtergrondkarton",
            voorbereidingTijd: "10 minuten",
            voorbereiding: "Klap de houten koffers open op de tafels en installeer de Piximakey app.",
            inleidingTijd: "10 min",
            inleiding: "Toon een kort fragment van Wallace & Gromit of Shaun the Sheep. Vraag: hoe kunnen kleipoppen lopen? Leg uit dat film een reeks stilstaande foto's is die heel snel achter elkaar worden getoond.",
            kernTijd: "45 min",
            kern: "1. Bedenk een simpel verhaaltje van max. 20 seconden met een begin, probleem en oplossing.<br>2. Boetseer 1 of 2 personages van klei.<br>3. Zet de tablet in de houder: zorg dat de camera niet wiebelt!<br>4. Belangrijke regel: beweeg het poppetje 1 millimeter, haal je handen weg, en druk op de knop.<br>5. Gebruik 'onion skinning' (de schaduw van de vorige foto) voor vloeiende beweging.",
            afsluitingTijd: "15 min",
            afsluiting: "Bioscoop in de klas: bekijk alle gemaakte filmpjes op het digibord. Geef elkaar tops en tips over tempo en cameravoering.",
            tips: "Plak de houten koffer met een stukje schilderstape vast aan de tafel zodat de achtergrond niet verschuift."
        }
    }
];

window.verrijkLesideeen = function(ideeenLijst) {
    if (!ideeenLijst || ideeenLijst.length === 0) {
        return [...standaardLesideeen];
    }
    return ideeenLijst.map(idee => {
        const match = standaardLesideeen.find(s => 
            s.id == idee.id || 
            (idee.titel && s.titel.toLowerCase().includes(idee.titel.toLowerCase())) ||
            (idee.titel && s.kistNaam && idee.titel.toLowerCase().includes(s.kistNaam.toLowerCase()))
        );
        const kistNaam = idee.kistNaam || (match ? match.kistNaam : window.detecteerKistNaam(idee.titel, idee.beschrijving));
        const afbeelding = idee.afbeelding || (match ? match.afbeelding : window.getAfbeeldingVoorKist(kistNaam));
        const lesbrief = idee.lesbrief || (match ? match.lesbrief : null);
        const bouw = idee.bouw || (match ? match.bouw : "Alle groepen");

        return {
            ...idee,
            kistNaam: kistNaam,
            afbeelding: afbeelding,
            lesbrief: lesbrief,
            bouw: bouw
        };
    });
};

let lesideeen = window.verrijkLesideeen(safeGetLocal('ww_lesideeen_v15', standaardLesideeen));

window.cloudLeerlijnen = []; 
let actieveLesideeFilter = 'Alle';
let actieveLesideeZoekterm = '';
let actieveDocentFilter = 'Alle';
let actieveDocentZoekterm = '';
let currentPdfs = [];

const ictTips = ["Tip: Gebruik Canva Education (gratis voor scholen) om leerlingen zelf presentaties of posters te laten ontwerpen."];

function slaDataOp() {
    try {
        localStorage.setItem('ww_periodes_v11', JSON.stringify(periodes));
        localStorage.setItem('ww_reserveringen_v11', JSON.stringify(reserveringen));
        localStorage.setItem('ww_leskisten_v15', JSON.stringify(leskisten)); 
        localStorage.setItem('ww_lesideeen_v15', JSON.stringify(lesideeen));
        localStorage.setItem('ww_scholen_v1', JSON.stringify(scholen));
        localStorage.setItem('ww_beheerders_v1', JSON.stringify(beheerdersLijst));
        localStorage.setItem('ww_favorieten_v1', JSON.stringify(mijnFavorieten));
        localStorage.setItem('ww_meldingen_v1', JSON.stringify(meldingen));
    } catch(e) { console.error("Opslagfout", e); }
}

const getVal = (id, def = "") => { const el = document.getElementById(id); return el ? el.value : def; };
const getCheck = (id, def = true) => { const el = document.getElementById(id); return el ? el.checked : def; };

// ==========================================
// 2. FIREBASE CLOUD CONNECTIE
// ==========================================
(async () => {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js");
        const { getFirestore, collection, onSnapshot, doc, setDoc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
        const { getStorage, ref, uploadString, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js");

        const firebaseConfig = {
            apiKey: "AIzaSyCAvg6sZJBzkVhe7UH_jUzFmuoy6aYcYFM",
            authDomain: "verwonderlab-portaal.firebaseapp.com",
            projectId: "verwonderlab-portaal",
            storageBucket: "verwonderlab-portaal.firebasestorage.app",
            messagingSenderId: "778630419427",
            appId: "1:778630419427:web:02d9ddd753f3efed2846d6"
        };

        window.firebaseApp = initializeApp(firebaseConfig);
        const db = getFirestore(window.firebaseApp);
        const storage = getStorage(window.firebaseApp);

        const checkError = (err) => { 
            console.warn("Firebase snapshot error:", err); 
        };

        // Tabellen Ophalen
        onSnapshot(collection(db, "periodes"), (snapshot) => { if(!snapshot.empty) { periodes = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst(); } }, checkError);
        onSnapshot(collection(db, "scholen"), (snapshot) => { if(!snapshot.empty) { scholen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);
        onSnapshot(collection(db, "beheerders"), (snapshot) => { if(!snapshot.empty) { beheerdersLijst = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } else { beheerdersLijst = []; slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);
        onSnapshot(collection(db, "leskisten"), (snapshot) => { if(!snapshot.empty) { leskisten = snapshot.docs.map(d => d.data()).sort((a,b) => a.id - b.id); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); } }, checkError);
        onSnapshot(collection(db, "lesideeen"), (snapshot) => { 
            if(!snapshot.empty) { 
                const cloudIdeeen = snapshot.docs.map(d => d.data());
                // Zorg dat cloud-lesideeën altijd verrijkt zijn met passende afbeeldingen en complete lesbrieven
                lesideeen = window.verrijkLesideeen(cloudIdeeen);
                slaDataOp(); 
                if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); 
                if(window.renderLesideeenGrid) window.renderLesideeenGrid(); 
            } 
        }, checkError);
        onSnapshot(collection(db, "reserveringen"), (snapshot) => { if(!snapshot.empty) { reserveringen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst(); if(typeof window.renderMijnReserveringen === "function") window.renderMijnReserveringen(); if(typeof window.renderStatistiekenTab === "function") window.renderStatistiekenTab(); } }, checkError);
        onSnapshot(collection(db, "meldingen"), (snapshot) => { if(!snapshot.empty) { meldingen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);

        // Voortgang realtime ophalen en direct toepassen op de vinkjes
        onSnapshot(collection(db, "voortgang"), (snapshot) => { 
            let huidigeEmail = localStorage.getItem('ww_huidige_email'); 
            if (huidigeEmail) { 
                const cleanEmail = huidigeEmail.trim().toLowerCase();
                const veiligId = cleanEmail.replace(/[@.]/g, '_');
                const docSnap = snapshot.docs.find(d => 
                    d.id === veiligId || 
                    d.id === cleanEmail || 
                    (d.data() && d.data().email && d.data().email.toLowerCase() === cleanEmail)
                ); 
                if(docSnap && docSnap.data().vinkjes) { 
                    localStorage.setItem('ww_vinkjes', docSnap.data().vinkjes); 
                    if(typeof window.reproduceerVinkjes === "function") {
                        window.reproduceerVinkjes(); 
                    }
                } 
            } 
        }, checkError);

        // Functie om de voortgang waterdicht op te slaan in Firebase
        window.saveVoortgangToCloud = async function(email, vinkjes) { 
            if (!email) return;
            try {
                const cleanEmail = email.trim().toLowerCase();
                const veiligId = cleanEmail.replace(/[@.]/g, '_');
                await setDoc(doc(db, "voortgang", veiligId), { 
                    email: cleanEmail, 
                    vinkjes: vinkjes,
                    laatsteUpdate: new Date().toISOString()
                }, { merge: true }); 
            } catch(e) {
                console.error("Opslaan voortgang in cloud mislukt:", e);
            }
        };

        // Directe sync functie bij inloggen of openen op een ander device
        window.syncVoortgangVanCloud = async function(email) {
            if (!email) return;
            try {
                const cleanEmail = email.trim().toLowerCase();
                const veiligId = cleanEmail.replace(/[@.]/g, '_');
                const { getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
                let snap = await getDoc(doc(db, "voortgang", veiligId));
                if (!snap.exists()) {
                    snap = await getDoc(doc(db, "voortgang", cleanEmail));
                }
                if (snap.exists() && snap.data().vinkjes) {
                    localStorage.setItem('ww_vinkjes', snap.data().vinkjes);
                    if (typeof window.reproduceerVinkjes === "function") {
                        window.reproduceerVinkjes();
                    }
                }
            } catch(err) {
                console.warn("Direct voortgang ophalen:", err);
            }
        };
        
        // Opslaan Functies
        window.saveMateriaalToCloud = async function(rawId, newData, imgData, pdfsData) {
            try {
                if(imgData && imgData.startsWith('data:image')) {
                    const imgRef = ref(storage, `afbeeldingen/${newData.id}`);
                    await uploadString(imgRef, imgData, 'data_url');
                    newData.afbeelding = await getDownloadURL(imgRef);
                }
                let finalPdfs = [];
                for(let i = 0; i < pdfsData.length; i++) {
                    let pdf = pdfsData[i];
                    if(pdf.data && pdf.data.startsWith('data:application')) {
                        const pdfRef = ref(storage, `pdfs/${newData.id}_${Date.now()}_${i}.pdf`);
                        await uploadString(pdfRef, pdf.data, 'data_url');
                        finalPdfs.push({ naam: pdf.naam, data: await getDownloadURL(pdfRef) });
                    } else {
                        finalPdfs.push(pdf);
                    }
                }
                newData.pdfs = finalPdfs;
                await setDoc(doc(db, "leskisten", newData.id.toString()), newData);
                currentPdfs = [];
                if(window.updatePdfPreview) window.updatePdfPreview();
            } catch(e) { console.error("Cloud Opslag Mislukt:", e); }
        };

        window.saveMeldingToCloud = async function(newData) { try { if(newData.foto && newData.foto.startsWith('data:image')) { const imgRef = ref(storage, `schades/${newData.id}`); await uploadString(imgRef, newData.foto, 'data_url'); newData.foto = await getDownloadURL(imgRef); } await setDoc(doc(db, "meldingen", newData.id.toString()), newData); } catch(e) { console.error("Opslaan Melding Mislukt:", e); } };
        window.deleteMateriaalFromCloud = async function(id) { await deleteDoc(doc(db, "leskisten", id.toString())); };
        window.saveLesideeToCloud = async function(newData) { await setDoc(doc(db, "lesideeen", newData.id.toString()), newData); };
        window.deleteLesideeFromCloud = async function(id) { await deleteDoc(doc(db, "lesideeen", id.toString())); };
        window.savePeriodeToCloud = async function(newData) { await setDoc(doc(db, "periodes", newData.id.toString()), newData); };
        window.deletePeriodeFromCloud = async function(id) { await deleteDoc(doc(db, "periodes", id.toString())); };
        window.saveSchoolToCloud = async function(newData) { await setDoc(doc(db, "scholen", newData.id.toString()), newData); };
        window.deleteSchoolFromCloud = async function(id) { await deleteDoc(doc(db, "scholen", id.toString())); };
        window.saveBeheerderToCloud = async function(newData) { await setDoc(doc(db, "beheerders", newData.id.toString()), newData); };
        window.deleteBeheerderFromCloud = async function(id) { await deleteDoc(doc(db, "beheerders", id.toString())); };
        window.addReserveringToCloud = async function(newData) { await setDoc(doc(db, "reserveringen", newData.id.toString()), newData); };
        window.updateChecklistInCloud = async function(id, dataObj) { await setDoc(doc(db, "reserveringen", id.toString()), dataObj, { merge: true }); };
        window.deleteReserveringFromCloud = async function(id) { await deleteDoc(doc(db, "reserveringen", id.toString())); };
        window.deleteMeldingFromCloud = async function(id) { await deleteDoc(doc(db, "meldingen", id.toString())); };
        window.updateMeldingStatusInCloud = async function(id, status) { await setDoc(doc(db, "meldingen", id.toString()), {status: status}, {merge: true}); };

    } catch (error) { 
        console.error("Firebase module overgeslagen. Lokaal actief."); 
    }
})();

// ==========================================
// 3. MICROSOFT 365 SSO AUTHENTICATIE & VEILIGHEID
// ==========================================
window.toonEmailLogin = function() {
    if (typeof window.controleerSSOAuthenticatie === "function") {
        window.controleerSSOAuthenticatie();
    }
};

window.checkLeerkrachtLogin = function() {
    let huidigeNaam = localStorage.getItem('ww_huidige_leerkracht');
    let huidigeEmail = localStorage.getItem('ww_huidige_email');

    const vereistDomein = (window.AUTH_CONFIG && window.AUTH_CONFIG.allowedDomain) ? window.AUTH_CONFIG.allowedDomain.toLowerCase() : "@wonderwijs.nl";

    // Strikte controle: Moet ingelogd zijn én het e-mailadres moet eindigen op @wonderwijs.nl
    if (!huidigeEmail || !huidigeEmail.toLowerCase().endsWith(vereistDomein)) {
        localStorage.removeItem('ww_huidige_leerkracht');
        localStorage.removeItem('ww_huidige_email');
        if (typeof window.controleerSSOAuthenticatie === "function") {
            window.controleerSSOAuthenticatie();
        }
        return; 
    }

    // Gebruiker is geauthenticeerd via Microsoft SSO (@wonderwijs.nl):
    const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.removeProperty('display');
        mainApp.style.opacity = '1';
        mainApp.style.visibility = 'visible';
    }
    const loginOverlay = document.getElementById('wwSsoLoginOverlay');
    if (loginOverlay) {
        loginOverlay.style.display = 'none';
    }

    setTimeout(() => {
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) pageTitle.innerText = 'Welkom, ' + huidigeNaam + '!';
        const userEmailSubtitle = document.getElementById('userEmailSubtitle');
        if (userEmailSubtitle) {
            userEmailSubtitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 4px; color: #64748b;">✉️ ${huidigeEmail}</span>`;
        }

        // Werk ook de gebruikersbadge in de zijbalk bij
        if (typeof window.updateSidebarUserProfile === "function") {
            window.updateSidebarUserProfile();
        }

        // Check Beheerdersrechten
        const isBeheerder = beheerdersLijst.some(b => b.email && b.email.toLowerCase() === huidigeEmail.toLowerCase());
        const adminBtn = document.getElementById('adminLoginBtn');
        if (adminBtn) adminBtn.style.display = isBeheerder ? 'inline-block' : 'none';

        const leerlijnBadge = document.getElementById('leerlijnAccountBadge');
        if (leerlijnBadge && huidigeEmail) {
            leerlijnBadge.innerHTML = `👤 Voortgang gekoppeld aan: <strong>${huidigeEmail}</strong>`;
        }
        if (typeof window.syncVoortgangVanCloud === "function") {
            window.syncVoortgangVanCloud(huidigeEmail);
        }

        // Inladen van alle lijsten nu we geautoriseerd zijn
        if (typeof window.renderReserveringsGrid === "function") window.renderReserveringsGrid();
        if (typeof window.renderLesideeenGrid === "function") window.renderLesideeenGrid();
        if (typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst();
        if (typeof window.renderMijnReserveringen === "function") window.renderMijnReserveringen();
        if (typeof window.reproduceerVinkjes === "function") window.reproduceerVinkjes();

        if (sessionStorage.getItem('ww_open_admin') === 'true' && isBeheerder) {
            sessionStorage.removeItem('ww_open_admin');
            if (typeof window.checkAdminPassword === "function") {
                window.checkAdminPassword();
            }
        }
    }, 200);
};

// Universele functie om het e-mailadres en de naam van de leerkracht in het zijmenu te tonen
window.updateSidebarUserProfile = function() {
    const bottomMenu = document.querySelector('.bottom-menu');
    if (!bottomMenu) return;

    let huidigeNaam = localStorage.getItem('ww_huidige_leerkracht');
    let huidigeEmail = localStorage.getItem('ww_huidige_email');
    if (!huidigeNaam && !huidigeEmail) return;

    let userBadge = document.getElementById('sidebarUserProfileBadge');
    if (!userBadge) {
        userBadge = document.createElement('div');
        userBadge.id = 'sidebarUserProfileBadge';
        userBadge.style.cssText = `
            padding: 10px 12px;
            margin-bottom: 12px;
            background: rgba(140, 198, 63, 0.12);
            border: 1px solid rgba(140, 198, 63, 0.25);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            overflow: hidden;
        `;
        const label = bottomMenu.querySelector('.menu-label');
        if (label && label.nextSibling) {
            bottomMenu.insertBefore(userBadge, label.nextSibling);
        } else {
            bottomMenu.prepend(userBadge);
        }
    }

    userBadge.innerHTML = `
        <div style="font-weight: 700; font-size: 13px; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${huidigeNaam}">${huidigeNaam || 'Leerkracht'}</div>
        <div style="font-size: 11px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${huidigeEmail}">✉️ ${huidigeEmail || ''}</div>
    `;
};

// Global functies voor beheerdersmodus (zonder wachtwoord, Microsoft SSO geautoriseerd)
window.checkAdminPassword = function() {
    const leerkrachtView = document.getElementById("leerkrachtView");
    const beheerdersView = document.getElementById("beheerdersView");

    // Als we niet op het dashboard zitten, navigeer naar index.html en open admin
    if (!beheerdersView) {
        sessionStorage.setItem('ww_open_admin', 'true');
        window.location.href = 'index.html';
        return;
    }

    if (leerkrachtView) leerkrachtView.style.display = "none";
    beheerdersView.style.display = "block";

    const adminBtn = document.getElementById("adminLoginBtn");
    const adminLogoutBtn = document.getElementById("adminLogoutBtn");
    const pageTitle = document.getElementById("pageTitle");
    const userEmailSubtitle = document.getElementById("userEmailSubtitle");

    if (adminBtn) adminBtn.style.display = "none";
    if (adminLogoutBtn) adminLogoutBtn.style.display = "inline-block";
    if (pageTitle) pageTitle.innerText = "Beheerders Dashboard";
    if (userEmailSubtitle) {
        let huidigeEmail = localStorage.getItem('ww_huidige_email') || "";
        userEmailSubtitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 4px; color: #8CC63F; font-weight: 600;">🛡️ Beheerdersmodus &bull; Ingelogd als: ${huidigeEmail}</span>`;
    }
};

window.logoutAdmin = function() {
    const leerkrachtView = document.getElementById("leerkrachtView");
    const beheerdersView = document.getElementById("beheerdersView");
    const adminBtn = document.getElementById("adminLoginBtn");
    const adminLogoutBtn = document.getElementById("adminLogoutBtn");
    const pageTitle = document.getElementById("pageTitle");
    const userEmailSubtitle = document.getElementById("userEmailSubtitle");

    if (leerkrachtView) leerkrachtView.style.display = "";
    if (beheerdersView) beheerdersView.style.display = "none";
    if (adminBtn) adminBtn.style.display = "inline-block";
    if (adminLogoutBtn) adminLogoutBtn.style.display = "none";

    let huidigeNaam = localStorage.getItem('ww_huidige_leerkracht') || "Gastdocent";
    let huidigeEmail = localStorage.getItem('ww_huidige_email') || "";
    if (pageTitle) pageTitle.innerText = "Welkom, " + huidigeNaam + "!";
    if (userEmailSubtitle) {
        userEmailSubtitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 4px; color: #64748b;">✉️ ${huidigeEmail}</span>`;
    }
};

// ==========================================
// 4. MOBIELE NAVIGATIE & DOMCONTENTLOADED
// ==========================================
window.initMobileNavigation = function() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    if (document.getElementById('mobileNavToggle')) return;

    const logoDiv = sidebar.querySelector('.logo');
    if (logoDiv) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'mobileNavToggle';
        toggleBtn.type = 'button';
        toggleBtn.className = 'mobile-menu-btn';
        toggleBtn.innerHTML = '<span>☰ Menu</span>';
        toggleBtn.setAttribute('aria-label', 'Menu in- of uitklappen');

        toggleBtn.onclick = function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-menu-open');
            const isOpen = sidebar.classList.contains('mobile-menu-open');
            toggleBtn.innerHTML = isOpen ? '<span>✕ Sluiten</span>' : '<span>☰ Menu</span>';
        };

        logoDiv.appendChild(toggleBtn);

        // Sluit mobiel menu automatisch als de gebruiker op een menu-link tikt
        sidebar.querySelectorAll('.menu-item').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-menu-open');
                    toggleBtn.innerHTML = '<span>☰ Menu</span>';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialiseer mobiele navigatie voor alle smartphones
    if (typeof window.initMobileNavigation === "function") {
        window.initMobileNavigation();
    }

    const vereistDomein = (window.AUTH_CONFIG && window.AUTH_CONFIG.allowedDomain) ? window.AUTH_CONFIG.allowedDomain.toLowerCase() : "@wonderwijs.nl";
    const huidigeEmail = localStorage.getItem('ww_huidige_email');
    const isAuthenticated = huidigeEmail && huidigeEmail.toLowerCase().endsWith(vereistDomein);

    const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
    if (mainApp) {
        if (isAuthenticated) {
            mainApp.style.opacity = '1';
            mainApp.style.visibility = 'visible';
            mainApp.style.removeProperty('display');
        } else {
            mainApp.style.setProperty('display', 'none', 'important');
        }
    }

    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.menu-item').forEach(item => {
        if(!item.classList.contains('logout')) {
            item.classList.remove('active'); 
            const itemPage = item.getAttribute('href');
            // Zorg dat 'index.html' ook matcht als er geen bestandsnaam in de URL staat
            if (itemPage === currentPage || (currentPage === '' && itemPage === 'index.html')) {
                item.classList.add('active'); 
            }
        }
    });
    
    if(typeof toonWillekeurigeTip === "function") toonWillekeurigeTip();

    // Specifieke check voor profiel pagina
    if(window.location.pathname.includes('profiel.html')) {
        if(typeof laadProfielPagina === "function") laadProfielPagina();
    }

    if(typeof window.updateSidebarUserProfile === "function") window.updateSidebarUserProfile();
    if(typeof checkLeerkrachtLogin === "function") checkLeerkrachtLogin(); 
    if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen();
});

// ==========================================
// 5. RENDERING & LOGICA
// ==========================================
window.renderMijnReserveringen = function() {
    const teacherList = document.getElementById('teacherReservationsList');
    if (!teacherList) return;

    const ingelogdeEmail = localStorage.getItem('ww_huidige_email');
    if (!ingelogdeEmail) return;

    const mijnReserveringen = reserveringen.filter(r => r.aanvragerEmail === ingelogdeEmail);

    if (mijnReserveringen.length === 0) {
        teacherList.innerHTML = `<p style="padding: 15px; color: #888; font-size: 13px;">Je hebt momenteel geen reserveringen.</p>`;
    } else {
        teacherList.innerHTML = mijnReserveringen.map(r => {
            const periode = periodes.find(p => p.id == r.periodeId);
            let statusColor = r.status === "Geaccepteerd" ? "#8CC63F" : (r.status === "Afgewezen" ? "#ef4444" : "#f59e0b");
            return `
            <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid ${statusColor};">
                <div>
                    <strong style="display: block; font-size: 14px; color: #1e293b;">${r.kist}</strong>
                    <span style="font-size: 12px; color: #64748b;">${periode ? periode.naam : ''}</span>
                </div>
                <span style="background: ${statusColor}; color: white; font-size: 11px; padding: 3px 8px; border-radius: 12px; font-weight: bold;">${r.status}</span>
            </div>`;
        }).join('');
    }
};

window.renderReserveringsGrid = function() {
    const container = document.getElementById('leskistenContainer');
    if(!container) return;
    
    let gefilterd = leskisten.filter(k => {
        let matchFilter = true;
        if(actieveDocentFilter === 'Favorieten') matchFilter = mijnFavorieten.includes(k.id);
        else if(actieveDocentFilter !== 'Alle') matchFilter = k.doelgroep && k.doelgroep.includes(actieveDocentFilter);
        
        let matchZoek = actieveDocentZoekterm === '' || (k.naam && k.naam.toLowerCase().includes(actieveDocentZoekterm)) || (k.tag && k.tag.toLowerCase().includes(actieveDocentZoekterm));
        return matchFilter && matchZoek;
    });

    if(gefilterd.length === 0) {
        container.innerHTML = "<p style='color:#64748b; width: 100%; grid-column: 1 / -1; padding: 20px 0;'>Er staan nog geen materialen in de database.</p>";
        container.style.display = "block";
        return;
    }

    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    container.style.gap = "20px";
    
    container.innerHTML = gefilterd.map(kist => {
        let isKapot = kist.beschikbaar === false;
        let isFav = mijnFavorieten.includes(kist.id);
        
        let hartjeHtml = `<div onclick="window.toggleFavoriet(${kist.id}, event)" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">${isFav ? '❤️' : '🤍'}</div>`;
        let actieHtml = isKapot ? `<div style="color: #E74C3C; font-weight: bold; font-size: 13px; margin-top: auto; padding-top: 15px;">⚠️ Tijdelijk in reparatie</div>` : `<button class="btn-submit" style="margin-top: auto; background: #3e2723; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;">Informatie & Reserveren</button>`;
        let clickEvent = isKapot ? `` : `onclick="window.openLeskistInfo(${kist.id})"`;
        let styling = isKapot ? `opacity: 0.6; cursor: not-allowed;` : `cursor: pointer;`;
        let imgSource = kist.afbeelding && kist.afbeelding.startsWith('data:image') ? kist.afbeelding : (kist.afbeelding || defaultImg);
        
        return `
        <div class="leskist-card" ${clickEvent} style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); display: flex; flex-direction: column; position: relative; transition: transform 0.2s ease; ${styling}">
            ${hartjeHtml}
            <div style="height: 160px; overflow: hidden; flex-shrink: 0;">
                <img src="${imgSource}" alt="${kist.naam}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
                <h3 style="margin-top: 0; font-size: 18px; color: #1e293b; margin-bottom: 5px;">${kist.naam}</h3>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 15px;">${kist.tag}</p>
                ${actieHtml}
            </div>
        </div>`;
    }).join('');
    if (typeof window.checkUrlReservationParam === "function") {
        window.checkUrlReservationParam();
    }
};

window.filterLesideeen = function(cat) {
    actieveLesideeFilter = cat;
    window.renderLesideeenGrid();
};

window.zoekLesideeen = function(val) {
    actieveLesideeZoekterm = (val || '').toLowerCase().trim();
    window.renderLesideeenGrid();
};

window.toggleLesbrief = function(detailId, btn) {
    const drawer = document.getElementById(detailId);
    if (!drawer) return;
    const isHidden = drawer.style.display === 'none' || drawer.style.display === '';
    drawer.style.display = isHidden ? 'block' : 'none';
    if (btn) {
        btn.innerHTML = isHidden 
            ? '<span>▲ Lesbrief inklappen</span>' 
            : '<span>📖 Bekijk complete lesbrief</span> <span class="arrow-indicator">▼</span>';
        btn.style.background = isHidden ? '#e2e8f0' : '#f8fafc';
        btn.style.borderColor = isHidden ? '#8CC63F' : '#cbd5e1';
    }
};

window.renderLesbriefContent = function(idee, kistNaam, reserveerUrl) {
    const lb = idee.lesbrief;
    if (!lb) {
        return `
        <div style="padding: 10px 0;">
            <p><strong>Over deze les:</strong> ${idee.beschrijving || 'Geen uitgebreide lesbrief beschikbaar.'}</p>
            ${idee.link ? `<p><a href="${idee.link}" target="_blank" style="color: #2563eb; font-weight: bold; text-decoration: none;">🌐 Bekijk online lesmateriaal →</a></p>` : ''}
            <div class="lesbrief-cta">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #166534;">Direct aan de slag met deze les?</p>
                <a href="${reserveerUrl}" class="btn-direct-reserve" style="display: inline-flex; width: auto; padding: 10px 22px;">📅 Reserveer direct '${kistNaam}'</a>
            </div>
        </div>`;
    }

    return `
    <div style="padding: 5px 0;">
        <div class="lesbrief-section">
            <h4>🎯 Kerndoelen & Wat leerlingen leren</h4>
            <div style="background: white; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #8CC63F; font-size: 13px; line-height: 1.6;">
                ${lb.doelen}
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 16px;">
            <div style="background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <strong style="color: #0f172a; display: block; margin-bottom: 2px;">⏱️ Tijdsduur</strong>
                <span style="color: #64748b;">${lb.tijd || '50 minuten'}</span>
            </div>
            <div style="background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <strong style="color: #0f172a; display: block; margin-bottom: 2px;">👥 Organisatie</strong>
                <span style="color: #64748b;">${lb.organisatie || 'In tweetallen / groepjes'}</span>
            </div>
        </div>

        <div class="lesbrief-section">
            <h4>🧰 Benodigdheden & Voorbereiding</h4>
            <div style="background: white; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="margin: 0 0 6px 0;"><strong>Uit de leskist:</strong> ${lb.kistMateriaal || kistNaam}</p>
                <p style="margin: 0 0 6px 0;"><strong>In het lokaal:</strong> ${lb.klasMateriaal || 'Digibord, tafels vrijmaken'}</p>
                <p style="margin: 0; color: #64748b; font-size: 12px;"><em>💡 Voorbereiding (${lb.voorbereidingTijd || '5 min'}): ${lb.voorbereiding}</em></p>
            </div>
        </div>

        <div class="lesbrief-section">
            <h4>🚀 Lesverloop in 3 fasen</h4>
            <div class="lesbrief-step-card">
                <strong>1. Inleiding (${lb.inleidingTijd || '10 min'}):</strong>
                <p style="margin: 4px 0 0 0; color: #475569;">${lb.inleiding}</p>
            </div>
            <div class="lesbrief-step-card">
                <strong>2. Kernactiviteit & Opdracht (${lb.kernTijd || '30 min'}):</strong>
                <p style="margin: 4px 0 0 0; color: #475569;">${lb.kern}</p>
            </div>
            <div class="lesbrief-step-card">
                <strong>3. Afsluiting & Reflectie (${lb.afsluitingTijd || '10 min'}):</strong>
                <p style="margin: 4px 0 0 0; color: #475569;">${lb.afsluiting}</p>
            </div>
        </div>

        ${lb.tips ? `
        <div class="lesbrief-section">
            <h4>💡 Tips & Differentiatie</h4>
            <div style="background: #fffbeb; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #f59e0b; color: #92400e; font-size: 12.5px;">
                ${lb.tips}
            </div>
        </div>` : ''}

        ${idee.link ? `
        <div style="margin-top: 10px; margin-bottom: 15px;">
            <a href="${idee.link}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: #2563eb; font-weight: 600; text-decoration: none; font-size: 12.5px;">
                <span>🌐 Extra online lesmateriaal & printbladen bekijken →</span>
            </a>
        </div>` : ''}

        <div class="lesbrief-cta">
            <p style="margin: 0 0 10px 0; font-weight: 700; color: #166534; font-size: 14px;">Direct enthousiast om deze les te geven?</p>
            <a href="${reserveerUrl}" class="btn-direct-reserve" style="display: inline-flex; width: auto; padding: 11px 26px; font-size: 13px;">
                <span>📅 Reserveer direct '${kistNaam}'</span>
            </a>
        </div>
    </div>`;
};

window.checkUrlReservationParam = function() {
    const params = new URLSearchParams(window.location.search);
    const kistParam = params.get('kist');
    if (!kistParam || !leskisten || leskisten.length === 0) return;

    const term = decodeURIComponent(kistParam).toLowerCase().trim();
    const gevonden = leskisten.find(k => 
        k.id.toString() === term || 
        (k.naam && k.naam.toLowerCase().includes(term)) ||
        (k.naam && term.includes(k.naam.toLowerCase()))
    );

    if (gevonden) {
        setTimeout(() => {
            if (typeof window.openLeskistInfo === 'function') {
                window.openLeskistInfo(gevonden.id);
            }
            const cards = document.querySelectorAll('.leskist-card');
            cards.forEach(card => {
                if (card.innerText.toLowerCase().includes(gevonden.naam.toLowerCase())) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.border = '2px solid #8CC63F';
                    card.style.boxShadow = '0 0 0 4px rgba(140, 198, 63, 0.25), 0 10px 25px rgba(0,0,0,0.1)';
                }
            });
        }, 350);
    }
};

window.renderLesideeenGrid = function() {
    const container = document.getElementById('lesideeenContainer');
    if(!container) return;
    
    container.style.display = 'block';
    if(lesideeen.length === 0) {
        lesideeen = window.verrijkLesideeen([]);
        slaDataOp();
    }

    // Filter balk
    const uniekeCategorieen = ['Alle', ...new Set(lesideeen.map(i => i.categorie || 'Inspiratie'))];
    let filterHtml = `
    <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 25px; align-items: center; justify-content: space-between; background: white; padding: 14px 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">`;
    
    uniekeCategorieen.forEach(cat => {
        const isActive = actieveLesideeFilter === cat;
        const bg = isActive ? '#8CC63F' : '#ffffff';
        const color = isActive ? '#ffffff' : '#475569';
        const border = isActive ? '1px solid #8CC63F' : '1px solid #cbd5e1';
        filterHtml += `<button onclick="window.filterLesideeen('${cat}')" style="background: ${bg}; color: ${color}; border: ${border}; padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: ${isActive ? '0 3px 8px rgba(140, 198, 63, 0.3)' : 'none'};">${cat}</button>`;
    });
    
    filterHtml += `</div>
        <div>
            <input type="text" id="lesideeZoekInput" placeholder="🔍 Zoek op titel, leskist of bouw..." value="${actieveLesideeZoekterm}" onkeyup="window.zoekLesideeen(this.value)" style="padding: 8px 16px; border: 1px solid #cbd5e1; border-radius: 20px; outline: none; font-size: 13px; width: 250px; background: #f8fafc;">
        </div>
    </div>`;

    const gefilterdeIdeeen = (actieveLesideeFilter === 'Alle' ? lesideeen : lesideeen.filter(i => i.categorie === actieveLesideeFilter))
        .filter(i => {
            if (!actieveLesideeZoekterm) return true;
            const term = actieveLesideeZoekterm;
            return (i.titel && i.titel.toLowerCase().includes(term)) ||
                   (i.beschrijving && i.beschrijving.toLowerCase().includes(term)) ||
                   (i.kistNaam && i.kistNaam.toLowerCase().includes(term)) ||
                   (i.categorie && i.categorie.toLowerCase().includes(term)) ||
                   (i.bouw && i.bouw.toLowerCase().includes(term));
        });

    let gridHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; width: 100%;">';
    
    if(gefilterdeIdeeen.length === 0) {
        gridHtml += "<div style='grid-column: 1 / -1; padding: 40px; text-align: center; background: white; border-radius: 12px; color: #64748b; border: 1px solid #e2e8f0;'>Geen lesideeën gevonden voor de huidige selectie.</div>";
    } else {
        gefilterdeIdeeen.forEach(idee => {
            const kistNaam = idee.kistNaam || window.detecteerKistNaam(idee.titel, idee.beschrijving);
            const foto = idee.afbeelding || window.getAfbeeldingVoorKist(kistNaam);
            const bouwBadge = idee.bouw || "Alle groepen";
            const categorieBadge = idee.categorie || "Inspiratie";
            const reserveerUrl = `reserveren.html?kist=${encodeURIComponent(kistNaam)}`;
            const detailId = `lesbrief-detail-${idee.id}`;

            gridHtml += `
            <div class="idea-card" id="idea-card-${idee.id}">
                <div class="idea-image-wrapper">
                    <img src="${foto}" alt="${idee.titel}">
                    <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px; flex-wrap: wrap; z-index: 2;">
                        <span class="idea-badge">${categorieBadge}</span>
                        <span class="idea-badge bouw">${bouwBadge}</span>
                    </div>
                </div>

                <div class="idea-card-body">
                    <h3>${idee.titel}</h3>
                    
                    <div class="idea-material-tag">
                        <span>📦</span> <span>Leskist: <strong>${kistNaam}</strong></span>
                    </div>

                    <p>${idee.beschrijving || ""}</p>

                    <!-- Actieknoppen rij -->
                    <div class="idea-actions-row">
                        <button onclick="window.toggleLesbrief('${detailId}', this)" class="btn-toggle-lesbrief">
                            <span>📖 Bekijk complete lesbrief</span> <span class="arrow-indicator">▼</span>
                        </button>
                        <a href="${reserveerUrl}" class="btn-direct-reserve">
                            <span>📅 Reserveer kist</span>
                        </a>
                    </div>

                    <!-- Uitklapbare complete lesbrief -->
                    <div id="${detailId}" class="lesbrief-drawer">
                        ${window.renderLesbriefContent(idee, kistNaam, reserveerUrl)}
                    </div>
                </div>
            </div>`;
        });
    }
    gridHtml += '</div>';
    container.innerHTML = filterHtml + gridHtml;
};

window.renderBeheerdersTabellen = function() {
    const periodesBody = document.getElementById('adminPeriodsBody');
    if (periodesBody) {
        periodesBody.innerHTML = periodes.map(p => `<tr><td><strong>${p.naam}</strong></td><td>${p.start}</td><td>${p.eind}</td><td style="text-align: right;"><button class="btn-green-action" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" onclick="window.openPeriodeModal(${p.id})">✏️</button><button style="padding: 5px 10px; font-size: 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="window.deletePeriode(${p.id})">🗑️</button></td></tr>`).join('');
    }

    const scholenBody = document.getElementById('adminScholenBody');
    if (scholenBody) {
        scholenBody.innerHTML = scholen.map(s => `<tr><td style="padding: 12px;"><strong>${s.naam}</strong></td><td style="text-align: right; padding: 12px;"><button class="btn-green-action" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" onclick="window.openSchoolModal(${s.id})">✏️</button><button style="padding: 5px 10px; font-size: 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="window.deleteSchool(${s.id})">🗑️</button></td></tr>`).join('');
    }

    const gebruikersBody = document.getElementById('adminGebruikersBody');
    if (gebruikersBody) {
        if (beheerdersLijst.length === 0) {
            gebruikersBody.innerHTML = `<tr><td colspan="2" style="text-align: center; padding: 20px; color: #888;">Nog geen extra beheerders toegevoegd.</td></tr>`;
        } else {
            gebruikersBody.innerHTML = beheerdersLijst.map(b => `<tr><td style="padding: 12px; font-family: monospace;"><strong>${b.email}</strong></td><td style="text-align: right; padding: 12px;"><button style="padding: 5px 10px; font-size: 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="window.verwijderBeheerder(${b.id})">🗑️ Verwijder Rechten</button></td></tr>`).join('');
        }
    }

    const reserveringenBody = document.getElementById('adminReservationsBody');
    if (reserveringenBody) {
        // Vul dropdown filters dynamisch bij indien nog niet gevuld
        const filterPeriodeSelect = document.getElementById('adminFilterPeriode');
        if (filterPeriodeSelect && filterPeriodeSelect.options.length <= 1 && periodes.length > 0) {
            const huidigeVal = filterPeriodeSelect.value;
            filterPeriodeSelect.innerHTML = '<option value="Alle">Alle Periodes</option>';
            periodes.forEach(p => {
                filterPeriodeSelect.innerHTML += `<option value="${p.id}">${p.naam} (${p.start} t/m ${p.eind})</option>`;
            });
            if (huidigeVal) filterPeriodeSelect.value = huidigeVal;
        }

        const filterSchoolSelect = document.getElementById('adminFilterSchool');
        if (filterSchoolSelect && filterSchoolSelect.options.length <= 1 && scholen.length > 0) {
            const huidigeSchoolVal = filterSchoolSelect.value;
            filterSchoolSelect.innerHTML = '<option value="Alle">Alle Locaties / Scholen</option>';
            scholen.forEach(s => {
                filterSchoolSelect.innerHTML += `<option value="${s.naam}">${s.naam}</option>`;
            });
            if (huidigeSchoolVal) filterSchoolSelect.value = huidigeSchoolVal;
        }

        // Lees actieve filters uit
        const gekozenPeriode = filterPeriodeSelect ? filterPeriodeSelect.value : 'Alle';
        const gekozenStatus = document.getElementById('adminFilterStatus') ? document.getElementById('adminFilterStatus').value : 'Alle';
        const gekozenSchool = filterSchoolSelect ? filterSchoolSelect.value : 'Alle';
        const zoekTerm = document.getElementById('adminFilterZoek') ? document.getElementById('adminFilterZoek').value.toLowerCase().trim() : '';

        // Filter de reserveringen
        let gefilterdeReserveringen = reserveringen.filter(r => {
            let matchP = (gekozenPeriode === 'Alle' || r.periodeId == gekozenPeriode);
            let matchStatus = (gekozenStatus === 'Alle' || r.status === gekozenStatus);
            let matchSchool = (gekozenSchool === 'Alle' || (r.school && r.school === gekozenSchool));
            let matchZoek = true;
            if (zoekTerm) {
                const kistNaam = (r.kist || '').toLowerCase();
                const docentNaam = (r.leerkracht || '').toLowerCase();
                const docentMail = (r.aanvragerEmail || '').toLowerCase();
                const schoolNaam = (r.school || '').toLowerCase();
                matchZoek = kistNaam.includes(zoekTerm) || docentNaam.includes(zoekTerm) || docentMail.includes(zoekTerm) || schoolNaam.includes(zoekTerm);
            }
            return matchP && matchStatus && matchSchool && matchZoek;
        });

        // Werk aantal tekst bij
        const aantalTekst = document.getElementById('reserveringenAantalTekst');
        if (aantalTekst) {
            aantalTekst.innerText = `Toont ${gefilterdeReserveringen.length} van de ${reserveringen.length} reservering(en)`;
        }

        // Bewaar voor PDF export
        window._laatstGefilterdeReserveringen = gefilterdeReserveringen;

        if (gefilterdeReserveringen.length === 0) {
            reserveringenBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: #888;">Geen reserveringen gevonden die voldoen aan de filters.</td></tr>`;
        } else {
            reserveringenBody.innerHTML = gefilterdeReserveringen.map(r => {
                const periode = periodes.find(p => p.id == r.periodeId);
                const periodeNaam = periode ? periode.naam : "Verwijderde periode";
                let statusHTML = '';
                
                if (r.status === "In afwachting") {
                    statusHTML = `<div class="status-actions"><button style="background: #8CC63F; color: white; padding: 6px 10px; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; font-weight: bold;" onclick="window.beoordeelReservering(${r.id}, 'Geaccepteerd')">✔ Accepteren</button><button style="background: #ef4444; color: white; padding: 6px 10px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;" onclick="window.beoordeelReservering(${r.id}, 'Afgewezen')">✖ Afwijzen</button></div>`;
                } else {
                    let statusColor = r.status === "Geaccepteerd" ? "#8CC63F" : (r.status === "Afgewezen" ? "#ef4444" : "#f59e0b");
                    statusHTML = `<span style="background: ${statusColor}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">${r.status}</span>`;
                    
                    if (r.status === "Geaccepteerd") {
                        statusHTML += `
                        <div style="margin-top: 15px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 12px; font-weight: bold; color: #334155; margin-bottom: 8px;">📋 Logboek / Status Kist</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.klaar ? '#8CC63F' : '#fff'}; color: ${r.klaar ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'klaar', this.checked)" ${r.klaar ? 'checked' : ''}>📦 Klaarzetten</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.opgehaald ? '#8CC63F' : '#fff'}; color: ${r.opgehaald ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'opgehaald', this.checked)" ${r.opgehaald ? 'checked' : ''}>🤝 Opgehaald</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.ingeleverd ? '#8CC63F' : '#fff'}; color: ${r.ingeleverd ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'ingeleverd', this.checked)" ${r.ingeleverd ? 'checked' : ''}>🔙 Ingeleverd</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.compleet ? '#8CC63F' : '#fff'}; color: ${r.compleet ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'compleet', this.checked)" ${r.compleet ? 'checked' : ''}>✅ Compleet</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.schade ? '#ef4444' : '#fff'}; color: ${r.schade ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'schade', this.checked)" ${r.schade ? 'checked' : ''}>⚠️ Schade</label>
                            </div>
                            <input type="text" placeholder="✏️ Ruimte voor toelichting..." value="${r.toelichting || ''}" onchange="window.updateChecklist(${r.id}, 'toelichting', this.value)" style="width: 100%; padding: 8px; font-size: 12px; border: 1px solid #cbd5e1; border-radius: 6px;">
                        </div>`;
                    }
                }
                
                let actieMenuHTML = `<button style="background: transparent; border: none; font-size: 18px; cursor: pointer;" onclick="window.actieReserveringVerwijderen(${r.id}, event)">🗑️</button>`;
                
                const docentNaam = r.leerkracht || "Onbekende leerkracht";
                const docentEmail = r.aanvragerEmail 
                    ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px;"><a href="mailto:${r.aanvragerEmail}" style="color: #64748b; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">✉️ ${r.aanvragerEmail}</a></div>` 
                    : `<div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">(Geen e-mailadres)</div>`;
                const schoolBadge = r.school 
                    ? `<div style="font-size: 12px; color: #334155; margin-top: 4px; font-weight: 500;">🏫 ${r.school}</div>` 
                    : '';
                
                let leerkrachtWeergave = `
                    <div>
                        <strong style="color: #0f172a; font-size: 14px;">${docentNaam}</strong>
                        ${docentEmail}
                        ${schoolBadge}
                    </div>
                `;
                
                return `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="vertical-align: top; padding: 15px;"><strong>${r.kist}</strong></td>
                    <td style="vertical-align: top; padding: 15px;">${leerkrachtWeergave}</td>
                    <td style="vertical-align: top; padding: 15px;">${periodeNaam}</td>
                    <td style="vertical-align: top; padding: 15px;">${statusHTML}</td>
                    <td style="vertical-align: top; padding: 15px; text-align: center;">${actieMenuHTML}</td>
                </tr>`;
            }).join('');
        }
    }

    const leskistenBody = document.getElementById('adminLeskistenBody');
    if (leskistenBody) {
        leskistenBody.innerHTML = leskisten.map(kist => {
            let statusBadge = kist.beschikbaar === false ? `<span style="background: #ef4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px;">In reparatie</span>` : `<span style="background: #8CC63F; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px;">Actief</span>`;
            let imgSource = kist.afbeelding && kist.afbeelding.startsWith('data:image') ? kist.afbeelding : (kist.afbeelding || defaultImg);
            return `<tr><td style="padding: 10px;"><img src="${imgSource}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td><td style="padding: 10px;"><strong>${kist.naam}</strong><br><span style="font-size:11px; color:#888;">${kist.tag}</span></td><td style="padding: 10px;">${kist.doelgroep}<br>${statusBadge}</td><td style="text-align: right; padding: 10px;"><button class="btn-green-action" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" onclick="window.openMateriaalModal(${kist.id})">✏️</button><button style="padding: 5px 10px; font-size: 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="window.deleteMateriaal(${kist.id})">🗑️</button></td></tr>`;
        }).join('');
    }

    const lesideeenBody = document.getElementById('adminLesideeenBody');
    if (lesideeenBody) {
        if (lesideeen.length === 0) {
            lesideeenBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888; padding:20px;">Nog geen lesideeën toegevoegd.</td></tr>`;
        } else {
            lesideeenBody.innerHTML = lesideeen.map(idee => {
                const veiligeBeschrijving = idee.beschrijving || "";
                const korteBeschrijving = veiligeBeschrijving.length > 70 ? veiligeBeschrijving.substring(0,70) + '...' : veiligeBeschrijving;
                return `<tr><td style="padding: 12px;"><strong>${idee.titel}</strong><br><span style="font-size:11px; color:#888;">${idee.categorie}</span></td><td style="padding: 12px;">${korteBeschrijving}</td><td style="text-align: right; padding: 12px;"><button class="btn-green-action" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" onclick="window.openLesideeModal(${idee.id})">✏️</button><button style="padding: 5px 10px; font-size: 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="window.deleteLesidee(${idee.id})">🗑️</button></td></tr>`;
            }).join('');
        }
    }
}

window.updateKalenderEnLijst = function() {
    const calendarGrid = document.getElementById('calendarGrid');
    const eventsList = document.getElementById('upcomingEventsList');
    if (!calendarGrid || !eventsList) return;

    let navDate = window._kalenderNavDate || new Date();
    const currentDate = new Date();
    const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    const month = navDate.getMonth();
    const year = navDate.getFullYear();
    
    const monthText = document.getElementById('monthYearText');
    if (monthText) monthText.innerText = `${monthNames[month]} ${year}`;

    calendarGrid.querySelectorAll('.day').forEach(el => el.remove());

    const firstDayIndex = new Date(year, month, 1).getDay();
    const firstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = firstDay; i > 0; i--) {
        const d = document.createElement('div');
        d.classList.add('day', 'muted');
        d.innerText = daysInPrevMonth - i + 1;
        calendarGrid.appendChild(d);
    }

    let ingelogdeEmail = localStorage.getItem('ww_huidige_email') || "";
    const mijnKisten = reserveringen.filter(r => r.aanvragerEmail === ingelogdeEmail && r.status === "Geaccepteerd");
    let eventsArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = i;

        if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dayDiv.style.border = "2px solid #8CC63F";
            dayDiv.style.fontWeight = "bold";
        }

        periodes.forEach(per => {
            if (!per.start || !per.eind) return;
            const sParts = per.start.split('-');
            const eParts = per.eind.split('-');
            const sYear = parseInt(sParts[0]), sMonth = parseInt(sParts[1]) - 1, sDay = parseInt(sParts[2]);
            const eYear = parseInt(eParts[0]), eMonth = parseInt(eParts[1]) - 1, eDay = parseInt(eParts[2]);

            if (sDay === i && sMonth === month && sYear === year) {
                dayDiv.style.borderBottom = "4px solid #3b82f6";
                eventsArray.push({ dag: i, type: 'info', tekst: `Start: ${per.naam}`, subtekst: 'Begin uitleen', kleur: '#3b82f6' });
            }
            if (eDay === i && eMonth === month && eYear === year) {
                dayDiv.style.borderBottom = "4px solid #f59e0b";
                eventsArray.push({ dag: i, type: 'info', tekst: `Inleveren: ${per.naam}`, subtekst: 'Alles retour', kleur: '#f59e0b' });
            }
        });

        mijnKisten.forEach(res => {
            const per = periodes.find(p => p.id == res.periodeId);
            if (per && per.start && per.eind) {
                const sParts = per.start.split('-');
                const eParts = per.eind.split('-');
                const sYear = parseInt(sParts[0]), sMonth = parseInt(sParts[1]) - 1, sDay = parseInt(sParts[2]);
                const eYear = parseInt(eParts[0]), eMonth = parseInt(eParts[1]) - 1, eDay = parseInt(eParts[2]);

                if (sDay === i && sMonth === month && sYear === year) {
                    dayDiv.style.background = "rgba(140, 198, 63, 0.4)";
                    dayDiv.style.fontWeight = "bold";
                    eventsArray.push({ dag: i, type: 'actie', tekst: `Ophalen: ${res.kist}`, subtekst: `Start ${per.naam}`, kleur: '#8CC63F' });
                }
                if (eDay === i && eMonth === month && eYear === year) {
                    dayDiv.style.background = "rgba(239, 68, 68, 0.4)";
                    dayDiv.style.fontWeight = "bold";
                    eventsArray.push({ dag: i, type: 'actie', tekst: `Retour: ${res.kist}`, subtekst: `Einde ${per.naam}`, kleur: '#ef4444' });
                }
            }
        });

        calendarGrid.appendChild(dayDiv);
    }

    eventsArray.sort((a,b) => a.dag - b.dag);
    let eventsHTML = eventsArray.map(ev => `<div style="background: white; padding: 10px; border-left: 4px solid ${ev.kleur}; border-radius: 4px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);"><strong style="color: #1e293b;">${ev.tekst}</strong><br><span style="font-size: 12px; color: #64748b;">${ev.dag} ${monthNames[month]} - ${ev.subtekst}</span></div>`).join('');
    
    eventsList.innerHTML = eventsHTML === '' ? '<p style="font-size: 13px; color: #888;">Geen acties gepland in deze maand.</p>' : eventsHTML;

    if (!window._kalenderEventsBound) {
        const prevBtn = document.getElementById('prevMonthBtn');
        const nextBtn = document.getElementById('nextMonthBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => { window._kalenderNavDate.setMonth(window._kalenderNavDate.getMonth() - 1); window.updateKalenderEnLijst(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { window._kalenderNavDate.setMonth(window._kalenderNavDate.getMonth() + 1); window.updateKalenderEnLijst(); });
        window._kalenderEventsBound = true;
    }
}
window._kalenderNavDate = new Date();

// ==========================================
// 6. FORMULIEREN EN MODALS
// ==========================================
document.addEventListener('submit', async (e) => { 
    const form = e.target; 
    if (['editLeskistForm', 'editLesideeForm', 'periodeForm', 'reserveForm', 'schoolForm', 'storingForm'].includes(form.id)) { 
        e.preventDefault(); 
        const btn = form.querySelector('button[type="submit"]') || form.querySelector('button.btn-green-action') || form.querySelector('button'); 
        await verwerkFormulier(form.id, btn); 
    } 
});

async function verwerkFormulier(formId, btnElement) { 
    let originalText = "Opslaan"; 
    if (btnElement) { originalText = btnElement.innerText || "Opslaan"; btnElement.innerText = "Opslaan... ⏳"; btnElement.disabled = true; } 
    
    try { 
        if (formId === 'editLeskistForm') { 
            const rawId = getVal('editKistId'); 
            const imgData = getVal('editAfbeelding', defaultImg); 
            let kistId = rawId ? parseInt(rawId) : Date.now(); 
            const newData = { id: kistId, naam: getVal('editNaam', 'Naamloos Materiaal'), tag: getVal('editTag'), doelgroep: getVal('editDoelgroep'), kerndoelen: getVal('editKerndoelen'), beschrijving: getVal('editBeschrijving'), inhoud: getVal('editInhoud'), videoUrl: getVal('editVideo'), beschikbaar: getCheck('editBeschikbaar', true), afbeelding: imgData, pdfs: currentPdfs || [] }; 
            const idx = leskisten.findIndex(k => k.id == kistId); 
            if(idx > -1) leskisten[idx] = { ...leskisten[idx], ...newData }; else leskisten.push(newData); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.renderReserveringsGrid) window.renderReserveringsGrid(); 
            if(window.saveMateriaalToCloud) await window.saveMateriaalToCloud(rawId, newData, imgData, currentPdfs); 
            window.sluitAlleModals(); 
            alert("✅ Materiaal succesvol opgeslagen!"); 
        } else if (formId === 'editLesideeForm') { 
            const rawId = getVal('editLesideeId'); 
            const ideeId = rawId ? parseInt(rawId) : Date.now(); 
            const newData = { id: ideeId, titel: getVal('editLesideeTitel', 'Naamloos Idee'), categorie: getVal('editLesideeCategorie', 'Standaard'), beschrijving: getVal('editLesideeBeschrijving'), link: getVal('editLesideeLink') }; 
            const idx = lesideeen.findIndex(i => i.id == ideeId); 
            if(idx > -1) lesideeen[idx] = { ...lesideeen[idx], ...newData }; else lesideeen.push(newData); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.renderLesideeenGrid) window.renderLesideeenGrid(); 
            if(window.saveLesideeToCloud) await window.saveLesideeToCloud(newData); 
            window.sluitAlleModals(); 
            alert("✅ Lesidee succesvol opgeslagen!"); 
        } else if (formId === 'periodeForm') { 
            const rawId = getVal('editPeriodeId'); 
            const perId = rawId ? parseInt(rawId) : Date.now(); 
            const newData = { id: perId, naam: getVal('periodeNaam', 'Naamloze Periode'), start: getVal('periodeStart'), eind: getVal('periodeEind') }; 
            const idx = periodes.findIndex(p => p.id == perId); 
            if(idx > -1) periodes[idx] = { ...periodes[idx], ...newData }; else periodes.push(newData); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.savePeriodeToCloud) await window.savePeriodeToCloud(newData); 
            window.sluitAlleModals(); 
            if(window.updateKalenderEnLijst) window.updateKalenderEnLijst(); 
            alert("✅ Periode succesvol opgeslagen!"); 
        } else if (formId === 'schoolForm') { 
            const rawId = getVal('editSchoolId'); 
            const schoolId = rawId ? parseInt(rawId) : Date.now(); 
            const newData = { id: schoolId, naam: getVal('schoolNaam', 'Naamloze School') }; 
            const idx = scholen.findIndex(s => s.id == schoolId); 
            if(idx > -1) scholen[idx] = { ...scholen[idx], ...newData }; else scholen.push(newData); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.saveSchoolToCloud) await window.saveSchoolToCloud(newData); 
            window.sluitAlleModals(); 
            alert("✅ Locatie succesvol opgeslagen!"); 
        } else if (formId === 'reserveForm') { 
            const kistNaam = getVal('geselecteerdeKistNaam', 'Onbekende Kist'); 
            const gekozenPeriodeId = parseInt(getVal('periodeSelect', '0')); 
            const gekozenSchool = getVal('schoolSelect'); 
            
            if(!gekozenPeriodeId || !gekozenSchool) { 
                alert("⚠️ Selecteer alstublieft een school en een periode."); 
                if (btnElement) { btnElement.innerText = originalText; btnElement.disabled = false; } 
                return; 
            } 
            
            const huidigeNaam = localStorage.getItem('ww_huidige_leerkracht') || "Onbekend";
            const huidigeEmail = localStorage.getItem('ww_huidige_email') || "Onbekend";

            const nieuweReservering = { 
                id: Date.now(), 
                kist: kistNaam, 
                leerkracht: huidigeNaam, 
                aanvragerEmail: huidigeEmail, 
                school: gekozenSchool, 
                periodeId: gekozenPeriodeId, 
                status: "In afwachting" 
            }; 
            
            reserveringen.push(nieuweReservering); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.updateKalenderEnLijst) window.updateKalenderEnLijst(); 
            if(window.renderMijnReserveringen) window.renderMijnReserveringen(); 
            if(window.addReserveringToCloud) await window.addReserveringToCloud(nieuweReservering); 
            
            window.sluitAlleModals(); 
            const formObj = document.getElementById('reserveForm'); 
            if (formObj) formObj.reset(); 
            alert('✅ Aanvraag is gelukt en is direct zichtbaar op je dashboard!'); 
       } else if (formId === 'storingForm') { 
        const kistSelect = getVal('storingKist'); 
        const soortMelding = getVal('storingSoort'); 
        const beschrijving = getVal('storingBeschrijving'); 
        const imgData = getVal('storingFotoData', ''); 
        
        if(!kistSelect || !soortMelding || !beschrijving) { 
            alert("⚠️ Vul alstublieft alle verplichte velden in."); 
            if (btnElement) { btnElement.innerText = originalText; btnElement.disabled = false; } 
            return; 
        } 
        
        const melderNaam = localStorage.getItem('ww_huidige_leerkracht') || "Onbekende Leerkracht";
        const melderEmail = localStorage.getItem('ww_huidige_email') || "Onbekend";

        const nieuweMelding = { 
            id: Date.now(), 
            kist: kistSelect, 
            soort: soortMelding, 
            beschrijving: beschrijving, 
            foto: imgData, 
            leerkracht: melderNaam, 
            datum: new Date().toLocaleDateString('nl-NL'), 
            status: 'Open' 
        }; 
        
        meldingen.push(nieuweMelding); 
        slaDataOp(); 
        if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
        if(window.saveMeldingToCloud) await window.saveMeldingToCloud(nieuweMelding); 
        
        window.sluitAlleModals(); 
        const formObj = document.getElementById('storingForm'); 
        if(formObj) formObj.reset(); 
        if(document.getElementById('storingFotoPreview')) document.getElementById('storingFotoPreview').innerHTML = ''; 
        if(document.getElementById('storingFotoData')) document.getElementById('storingFotoData').value = ''; 
        
        // Maak de e-mail op en open direct Microsoft 365 Outlook
        const mailOnderwerp = `Storing / Schade: ${kistSelect}`;
        const mailBody = 
`Beste beheerder,

Er is zojuist een nieuwe storingsmelding gedaan via het Verwonderlab Portaal.

Materiaal: ${kistSelect}
Soort melding: ${soortMelding}
Gemeld door: ${melderNaam} (${melderEmail})

Beschrijving:
${beschrijving}

(De eventuele foto en huidige status kun je bekijken in het Beheerders Dashboard)`;
        
        if (typeof window.openInOutlook === 'function') {
            window.openInOutlook("verwonderlab@wonderwijs.nl", mailOnderwerp, mailBody);
        } else {
            window.location.href = `mailto:verwonderlab@wonderwijs.nl?subject=${encodeURIComponent(mailOnderwerp)}&body=${encodeURIComponent(mailBody)}`;
        }

        alert('✅ Je melding is opgeslagen in het systeem en Outlook wordt nu geopend om de melding te versturen!'); 
    }
    } catch(err) { 
        alert("❌ Er is iets misgegaan tijdens het verwerken: " + err.message); 
        console.error(err); 
    } finally { 
        if (btnElement) { btnElement.innerText = originalText; btnElement.disabled = false; } 
    } 
}

// Hulpmiddelen
window.filterDocentKisten = function(doelgroep) { actieveDocentFilter = doelgroep; document.querySelectorAll('#docentKistFilters .filter-btn').forEach(btn => { btn.style.background = btn.innerText.includes(doelgroep) ? (doelgroep === 'Favorieten' ? '#ef4444' : '#8CC63F') : 'white'; btn.style.color = btn.innerText.includes(doelgroep) ? 'white' : '#64748b'; }); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); };
window.zoekDocentKisten = function() { const input = document.getElementById('docentKistZoekInput'); if(input) { actieveDocentZoekterm = input.value.toLowerCase(); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); } };
window.toggleFavoriet = function(id, event) { event.stopPropagation(); if(mijnFavorieten.includes(id)) { mijnFavorieten = mijnFavorieten.filter(favId => favId !== id); } else { mijnFavorieten.push(id); } slaDataOp(); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); };
window.sluitAlleModals = function() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); const vid = document.getElementById('modalVideo'); if(vid) vid.src = ""; }; 
window.onclick = function(event) { if (event.target.classList.contains('modal')) window.sluitAlleModals(); };
window.switchAdminTab = function(tabId, btnElement) { 
    document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none'); 
    const target = document.getElementById(tabId);
    if(target) target.style.display = 'block'; 
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active')); 
    if(btnElement) btnElement.classList.add('active'); 
    
    if (tabId === 'tab-statistieken' && typeof window.renderStatistiekenTab === 'function') {
        window.renderStatistiekenTab();
    }
    if (tabId === 'tab-reserveringen' && typeof window.renderBeheerdersTabellen === 'function') {
        window.renderBeheerdersTabellen();
    }
};

// ==========================================
// RESERVERINGEN FILTERING & PDF EXPORT
// ==========================================
window.filterAdminReserveringen = function() {
    if (typeof window.renderBeheerdersTabellen === 'function') {
        window.renderBeheerdersTabellen();
    }
};

window.resetAdminReserveringFilters = function() {
    const p = document.getElementById('adminFilterPeriode');
    const s = document.getElementById('adminFilterStatus');
    const sch = document.getElementById('adminFilterSchool');
    const z = document.getElementById('adminFilterZoek');
    if (p) p.value = 'Alle';
    if (s) s.value = 'Alle';
    if (sch) sch.value = 'Alle';
    if (z) z.value = '';
    window.filterAdminReserveringen();
};

window.downloadReserveringenPDF = function() {
    const list = window._laatstGefilterdeReserveringen || reserveringen;
    if (!list || list.length === 0) {
        alert("⚠️ Er zijn momenteel geen reserveringen om als PDF te exporteren.");
        return;
    }

    const filterPeriodeSelect = document.getElementById('adminFilterPeriode');
    const periodeFilterVal = (filterPeriodeSelect && filterPeriodeSelect.selectedIndex >= 0) ? filterPeriodeSelect.options[filterPeriodeSelect.selectedIndex].text : 'Alle Periodes';
    const statusFilterVal = document.getElementById('adminFilterStatus') ? document.getElementById('adminFilterStatus').value : 'Alle';
    const schoolFilterVal = document.getElementById('adminFilterSchool') ? document.getElementById('adminFilterSchool').value : 'Alle';
    
    let filterOmschrijving = [];
    if (periodeFilterVal && !periodeFilterVal.includes('Alle Periodes')) filterOmschrijving.push(`Periode: ${periodeFilterVal}`);
    if (statusFilterVal && statusFilterVal !== 'Alle') filterOmschrijving.push(`Status: ${statusFilterVal}`);
    if (schoolFilterVal && schoolFilterVal !== 'Alle') filterOmschrijving.push(`Locatie: ${schoolFilterVal}`);
    const filterSubtitel = filterOmschrijving.length > 0 ? filterOmschrijving.join(' &bull; ') : 'Alle periodes en locaties';

    const datumNu = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    let rowsHtml = list.map((r, idx) => {
        const per = periodes.find(p => p.id == r.periodeId);
        const perTekst = per ? `<strong>${per.naam}</strong><br><span style="font-size: 11px; color: #64748b;">${per.start} t/m ${per.eind}</span>` : 'Onbekend';
        
        let statusKleur = r.status === 'Geaccepteerd' ? '#16a34a' : (r.status === 'Afgewezen' ? '#dc2626' : '#d97706');
        let statusBadge = `<span style="background: ${statusKleur}; color: white; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; display: inline-block;">${r.status}</span>`;

        let checklistItems = [];
        if (r.klaar) checklistItems.push('📦 Klaargezet');
        if (r.opgehaald) checklistItems.push('🤝 Opgehaald');
        if (r.ingeleverd) checklistItems.push('🔙 Ingeleverd');
        if (r.compleet) checklistItems.push('✅ Compleet');
        if (r.schade) checklistItems.push('⚠️ Schade');
        let checklistTekst = checklistItems.length > 0 ? `<div style="font-size: 11px; color: #334155; margin-top: 3px;">${checklistItems.join(' &bull; ')}</div>` : '';
        let toelichtingTekst = r.toelichting ? `<div style="font-size: 11px; color: #64748b; font-style: italic; margin-top: 2px;">"${r.toelichting}"</div>` : '';

        return `
        <tr style="border-bottom: 1px solid #e2e8f0; background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
            <td style="padding: 10px 12px; font-weight: bold; color: #1e293b; vertical-align: top;">${r.kist}</td>
            <td style="padding: 10px 12px; vertical-align: top;">
                <div style="font-weight: 600; color: #0f172a;">${r.leerkracht || 'Onbekend'}</div>
                <div style="font-size: 11px; color: #64748b;">${r.aanvragerEmail || ''}</div>
            </td>
            <td style="padding: 10px 12px; color: #334155; vertical-align: top;">${r.school || '-'}</td>
            <td style="padding: 10px 12px; vertical-align: top;">${perTekst}</td>
            <td style="padding: 10px 12px; vertical-align: top;">
                ${statusBadge}
                ${checklistTekst}
                ${toelichtingTekst}
            </td>
        </tr>`;
    }).join('');

    const printHtml = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="utf-8">
        <title>Verwonderlab Reserveringen Overzicht (PDF)</title>
        <style>
            @page { size: A4 landscape; margin: 10mm 12mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 20px; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .header-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; border-bottom: 3px solid #8CC63F; padding-bottom: 12px; }
            .logo-img { height: 46px; width: auto; object-fit: contain; }
            h1 { font-size: 22px; color: #432918; margin: 0 0 4px 0; }
            .subtitle { font-size: 13px; color: #64748b; margin: 0; }
            .meta-box { font-size: 12px; color: #475569; text-align: right; }
            .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            .data-table th { background: #8CC63F; color: white; text-align: left; padding: 9px 12px; font-weight: bold; border-top: 1px solid #76ab33; }
            .summary-bar { margin-top: 20px; padding: 12px 15px; background: #f1f5f9; border-radius: 8px; display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; color: #334155; }
            @media print {
                body { padding: 0; }
                .no-print { display: none !important; }
            }
        </style>
    </head>
    <body>
        <div class="no-print" style="margin-bottom: 18px; padding: 12px 16px; background: #fef9c3; border: 1px solid #fde047; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span>💡 <strong>PDF Opslaan:</strong> Kies in het printvenster bij <em>Bestemming / Destination</em> voor <strong>"Opslaan als PDF"</strong>.</span>
            <button onclick="window.print()" style="background: #8CC63F; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-weight: bold; cursor: pointer;">Direct Printen / Opslaan</button>
        </div>

        <table class="header-table">
            <tr>
                <td style="vertical-align: middle;">
                    <h1>Overzicht Verwonderlab Reserveringen</h1>
                    <p class="subtitle">Stichting Wonderwijs &bull; ${filterSubtitel}</p>
                </td>
                <td class="meta-box" style="vertical-align: middle;">
                    <img src="Verwonderlab.jpg" class="logo-img" alt="Verwonderlab Logo"><br>
                    <span>Gegenereerd op: ${datumNu}</span>
                </td>
            </tr>
        </table>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 22%;">Lesmateriaal</th>
                    <th style="width: 25%;">Leerkracht & E-mail</th>
                    <th style="width: 20%;">School / Locatie</th>
                    <th style="width: 18%;">Periode</th>
                    <th style="width: 15%;">Status / Voortgang</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>

        <div class="summary-bar">
            <span>Totaal weergegeven: ${list.length} reservering(en)</span>
            <span>Verwonderlab Dashboard &bull; verwonderlab@wonderwijs.nl</span>
        </div>

        <script>
            window.onload = function() {
                setTimeout(function() {
                    window.print();
                }, 400);
            };
        </script>
    </body>
    </html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
        printWin.document.open();
        printWin.document.write(printHtml);
        printWin.document.close();
    } else {
        alert("⚠️ Sta pop-ups toe in je browser om het PDF overzicht te openen.");
    }
};

// ==========================================
// STATISTIEKEN & INZICHTEN LOGBOEK
// ==========================================
window.renderStatistiekenTab = function() {
    const kpiGrid = document.getElementById('statsKpiGrid');
    const inkoopAdviesBox = document.getElementById('statsInkoopAdviesBox');
    const topKistenLijst = document.getElementById('statsTopKistenLijst');
    const topScholenLijst = document.getElementById('statsTopScholenLijst');
    const topDocentenLijst = document.getElementById('statsTopDocentenLijst');

    if (!kpiGrid || !reserveringen) return;

    const totaal = reserveringen.length;
    const geaccepteerd = reserveringen.filter(r => r.status === 'Geaccepteerd').length;

    // Reserveringen per lesmateriaal
    const kistCounts = {};
    reserveringen.forEach(r => {
        if (!r.kist) return;
        kistCounts[r.kist] = (kistCounts[r.kist] || 0) + 1;
    });
    const sortedKisten = Object.entries(kistCounts).sort((a,b) => b[1] - a[1]);
    const populairsteKist = sortedKisten.length > 0 ? sortedKisten[0][0] : "Geen";
    const populairsteKistAantal = sortedKisten.length > 0 ? sortedKisten[0][1] : 0;

    // Reserveringen per school
    const schoolCounts = {};
    reserveringen.forEach(r => {
        const sch = r.school || "Onbekende school";
        schoolCounts[sch] = (schoolCounts[sch] || 0) + 1;
    });
    const sortedScholen = Object.entries(schoolCounts).sort((a,b) => b[1] - a[1]);
    const topSchool = sortedScholen.length > 0 ? sortedScholen[0][0] : "Geen";
    const topSchoolAantal = sortedScholen.length > 0 ? sortedScholen[0][1] : 0;

    // Reserveringen per leerkracht
    const docentCounts = {};
    reserveringen.forEach(r => {
        const naam = r.leerkracht || "Onbekend";
        const email = r.aanvragerEmail || "";
        const key = `${naam}###${email}`;
        docentCounts[key] = (docentCounts[key] || 0) + 1;
    });
    const sortedDocenten = Object.entries(docentCounts).sort((a,b) => b[1] - a[1]);
    const uniekeDocentenAantal = Object.keys(docentCounts).length;

    // 1. KPI Kaarten
    kpiGrid.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; align-items: center; gap: 15px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(140, 198, 63, 0.15); display: flex; align-items: center; justify-content: center; font-size: 24px;">📦</div>
            <div>
                <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Totaal Reserveringen</span>
                <div style="font-size: 26px; font-weight: 800; color: #0f172a; line-height: 1.1;">${totaal}</div>
                <span style="font-size: 11px; color: #16a34a; font-weight: 600;">${geaccepteerd} goedgekeurd</span>
            </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; align-items: center; gap: 15px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; font-size: 24px;">⭐</div>
            <div>
                <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Meest Populair</span>
                <div style="font-size: 15px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;" title="${populairsteKist}">${populairsteKist}</div>
                <span style="font-size: 11px; color: #d97706; font-weight: 600;">${populairsteKistAantal}x aangevraagd</span>
            </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; align-items: center; gap: 15px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; font-size: 24px;">🏫</div>
            <div>
                <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Actiefste School</span>
                <div style="font-size: 15px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;" title="${topSchool}">${topSchool}</div>
                <span style="font-size: 11px; color: #2563eb; font-weight: 600;">${topSchoolAantal} reservering${topSchoolAantal > 1 ? 'en' : ''}</span>
            </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; align-items: center; gap: 15px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(168, 85, 247, 0.15); display: flex; align-items: center; justify-content: center; font-size: 24px;">👩‍🏫</div>
            <div>
                <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Actieve Docenten</span>
                <div style="font-size: 26px; font-weight: 800; color: #0f172a; line-height: 1.1;">${uniekeDocentenAantal}</div>
                <span style="font-size: 11px; color: #9333ea; font-weight: 600;">Unieke aanvragers</span>
            </div>
        </div>
    `;

    // 2. Slim Inkoop- & Capaciteitsadvies
    let adviesItems = [];
    if (sortedKisten.length > 0) {
        sortedKisten.slice(0, 3).forEach(([naam, aantal]) => {
            if (aantal >= 2) {
                adviesItems.push(`<li>🔥 <strong>${naam}</strong> is al <strong>${aantal} keer</strong> aangevraagd. <em>Inkoopadvies:</em> Overweeg een extra exemplaar/groepsset aan te schaffen voor Stichting Wonderwijs zodat scholen sneller aan de beurt zijn.</li>`);
            }
        });
    }

    const ongebruikteKisten = leskisten.filter(k => !kistCounts[k.naam]);
    if (ongebruikteKisten.length > 0) {
        adviesItems.push(`<li>🌱 Er zijn momenteel <strong>${ongebruikteKisten.length} leskisten</strong> nog niet gereserveerd (zoals <em>${ongebruikteKisten.slice(0, 2).map(k=>k.naam).join(', ')}</em>). Tip: Breng deze extra onder de aandacht bij de scholen via een inspiratie-lesidee!</li>`);
    }

    if (adviesItems.length === 0) {
        adviesItems.push(`<li>Zodra er reserveringen binnenkomen, analyseert het systeem automatisch de bezettingsgraad en ontvang je hier concrete inkoopadviezen.</li>`);
    }

    inkoopAdviesBox.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
            <div style="font-size: 30px;">💡</div>
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1e293b;">Slim Inkoop- & Capaciteitsadvies</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.6;">
                    ${adviesItems.join('')}
                </ul>
            </div>
        </div>
    `;

    // 3. Meest Gereserveerde Materialen (Visuele balken)
    if (sortedKisten.length === 0) {
        topKistenLijst.innerHTML = `<p style="color: #888; font-size: 13px;">Nog geen reserveringen geregistreerd.</p>`;
    } else {
        const maxCount = sortedKisten[0][1] || 1;
        topKistenLijst.innerHTML = sortedKisten.slice(0, 8).map(([naam, count], i) => {
            const perc = Math.round((count / maxCount) * 100);
            const isTop = i === 0;
            return `
            <div style="margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 5px;">
                    <span style="color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 75%;">${isTop ? '🏆 ' : ''}${naam}</span>
                    <span style="color: #8CC63F; font-weight: 700;">${count}x</span>
                </div>
                <div style="background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #8CC63F, #76ab33); width: ${perc}%; height: 100%; border-radius: 5px; transition: width 0.5s ease;"></div>
                </div>
            </div>`;
        }).join('');
    }

    // 4. Meest Actieve Scholen
    if (sortedScholen.length === 0) {
        topScholenLijst.innerHTML = `<p style="color: #888; font-size: 13px;">Nog geen locaties geregistreerd.</p>`;
    } else {
        const medailles = ['🥇', '🥈', '🥉'];
        topScholenLijst.innerHTML = sortedScholen.slice(0, 5).map(([schoolNaam, count], i) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                    <span style="font-size: 16px;">${medailles[i] || '🏫'}</span>
                    <strong style="font-size: 13px; color: #1e293b; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${schoolNaam}</strong>
                </div>
                <span style="background: #8CC63F; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold; flex-shrink: 0;">${count} reservering${count > 1 ? 'en' : ''}</span>
            </div>
        `).join('');
    }

    // 5. Top Aanvragers (Leerkrachten)
    if (sortedDocenten.length === 0) {
        topDocentenLijst.innerHTML = `<p style="color: #888; font-size: 13px;">Nog geen leerkrachten geregistreerd.</p>`;
    } else {
        topDocentenLijst.innerHTML = sortedDocenten.slice(0, 5).map(([key, count]) => {
            const [naam, email] = key.split('###');
            return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
                <div style="overflow: hidden;">
                    <strong style="font-size: 13px; color: #1e293b; display: block; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${naam}</strong>
                    <span style="font-size: 11px; color: #64748b;">${email || 'Geen email'}</span>
                </div>
                <span style="background: #3b82f6; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold; flex-shrink: 0;">${count}x</span>
            </div>`;
        }).join('');
    }

    // 6. Volledig Logboek
    window.renderStatsLogboekTabel(reserveringen);
};

window.renderStatsLogboekTabel = function(items) {
    const logboekBody = document.getElementById('statsLogboekBody');
    if (!logboekBody) return;

    if (!items || items.length === 0) {
        logboekBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 25px; color: #888;">Geen gegevens gevonden in het logboek.</td></tr>`;
        return;
    }

    const gesorteerd = [...items].sort((a,b) => b.id - a.id);

    logboekBody.innerHTML = gesorteerd.map((r, idx) => {
        const per = periodes.find(p => p.id == r.periodeId);
        const datumTekst = new Date(r.id).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        let statusKleur = r.status === "Geaccepteerd" ? "#8CC63F" : (r.status === "Afgewezen" ? "#ef4444" : "#f59e0b");

        return `
        <tr style="border-bottom: 1px solid #e2e8f0; background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
            <td style="padding: 10px 12px; font-family: monospace; font-size: 12px; color: #64748b;">${datumTekst}</td>
            <td style="padding: 10px 12px; font-weight: bold; color: #0f172a;">${r.kist}</td>
            <td style="padding: 10px 12px;">
                <div style="font-weight: 600; color: #1e293b;">${r.leerkracht || 'Onbekend'}</div>
                <div style="font-size: 11px; color: #64748b;">${r.aanvragerEmail || ''}</div>
            </td>
            <td style="padding: 10px 12px; color: #334155;">${r.school || '-'}</td>
            <td style="padding: 10px 12px;">${per ? per.naam : 'Onbekend'}</td>
            <td style="padding: 10px 12px;">
                <span style="background: ${statusKleur}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">${r.status}</span>
            </td>
        </tr>`;
    }).join('');
};

window.filterStatsLog = function() {
    const input = document.getElementById('statsLogZoek');
    if (!input) return;
    const term = input.value.toLowerCase().trim();
    if (!term) {
        window.renderStatsLogboekTabel(reserveringen);
        return;
    }
    const gefilterd = reserveringen.filter(r => {
        return (r.kist && r.kist.toLowerCase().includes(term)) ||
               (r.leerkracht && r.leerkracht.toLowerCase().includes(term)) ||
               (r.aanvragerEmail && r.aanvragerEmail.toLowerCase().includes(term)) ||
               (r.school && r.school.toLowerCase().includes(term));
    });
    window.renderStatsLogboekTabel(gefilterd);
};

window.printStatistiekenRapport = function() {
    window.downloadReserveringenPDF();
};

window.openLeskistInfo = function(id) {
    const kist = leskisten.find(k => k.id == id);
    if(!kist) return;
    
    document.getElementById('modalTitle').innerText = kist.naam || "";
    document.getElementById('modalBeschrijving').innerText = kist.beschrijving || "";
    document.getElementById('modalDoelgroep').innerText = kist.doelgroep || "";
    document.getElementById('modalKerndoelen').innerText = kist.kerndoelen || "";
    document.getElementById('modalInhoud').innerText = kist.inhoud || "";
    
    const pdfContainer = document.getElementById('modalPdfContainer');
    if (pdfContainer) {
        if (kist.pdfs && kist.pdfs.length > 0) {
            let pdfHtml = '<strong style="color: #333; display:block; margin-bottom: 8px;">📄 Leskaarten / Bijlagen:</strong><div style="display: flex; flex-direction: column; gap: 8px;">';
            kist.pdfs.forEach(pdf => {
                pdfHtml += `<a href="${pdf.data}" download="${pdf.naam}" class="btn-green-action" style="text-decoration: none; display: inline-block; text-align: center; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; background: #8CC63F; color: white;">💾 Download ${pdf.naam}</a>`;
            });
            pdfHtml += '</div>';
            pdfContainer.innerHTML = pdfHtml;
            pdfContainer.style.display = 'block';
        } else {
            pdfContainer.innerHTML = '';
            pdfContainer.style.display = 'none';
        }
    }

    const videoContainer = document.getElementById('modalVideoContainer');
    const videoIframe = document.getElementById('modalVideo');
    if (kist.videoUrl && kist.videoUrl.trim() !== "") {
        let veiligeUrl = kist.videoUrl.trim();
        const match = veiligeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
        if (match && match[1]) veiligeUrl = `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
        if (videoIframe) videoIframe.src = veiligeUrl;
        if (videoContainer) videoContainer.style.display = "block";
    } else {
        if (videoIframe) videoIframe.src = "";
        if (videoContainer) videoContainer.style.display = "none";
    }

    // NIEUW: Gekoppelde lesideeën tonen in de pop-up ter inspiratie
    const gekoppeldeIdeeenLijst = document.getElementById('gekoppeldeIdeeenLijst');
    const modalGekoppeldeIdeeen = document.getElementById('modalGekoppeldeIdeeen');
    if (gekoppeldeIdeeenLijst && modalGekoppeldeIdeeen) {
        const zoekTerm = kist.naam.toLowerCase().replace('groepsset', '').replace('nr.', '').trim();
        const relevanteIdeeen = lesideeen.filter(idee => 
            idee.titel.toLowerCase().includes(zoekTerm) || 
            (idee.beschrijving && idee.beschrijving.toLowerCase().includes(zoekTerm))
        ).slice(0, 3);

        if (relevanteIdeeen.length > 0) {
            gekoppeldeIdeeenLijst.innerHTML = relevanteIdeeen.map(idee => `
                <div style="background: #f1f5f9; padding: 10px 15px; border-radius: 8px; border-left: 3px solid #8CC63F; margin-bottom: 8px;">
                    <strong style="font-size: 13px; color: #1e293b;">${idee.titel}</strong>
                    <p style="font-size: 12px; color: #64748b; margin: 5px 0 0 0;">${idee.beschrijving}</p>
                    ${idee.link ? `<a href="${idee.link}" target="_blank" style="font-size: 11px; color: #3b82f6; text-decoration: none; display: inline-block; margin-top: 5px;">🔗 Bekijk idee →</a>` : ''}
                </div>
            `).join('');
            modalGekoppeldeIdeeen.style.display = 'block';
        } else {
            // Als er geen automatische match is, tonen we een standaard inspiratie-melding of verbergen we het
            modalGekoppeldeIdeeen.style.display = 'none';
        }
    }

    if(document.getElementById('geselecteerdeKistId')) document.getElementById('geselecteerdeKistId').value = kist.id;
    if(document.getElementById('geselecteerdeKistNaam')) document.getElementById('geselecteerdeKistNaam').value = kist.naam;
    
    const schoolSelect = document.getElementById('schoolSelect');
    if (schoolSelect) {
        const opgeslagenStandaardSchool = localStorage.getItem('ww_standaard_school') || "";
        schoolSelect.innerHTML = '<option value="" disabled>-- Kies een locatie --</option>';
        scholen.forEach(s => {
            let isSelected = (s.naam === opgeslagenStandaardSchool) ? 'selected' : '';
            schoolSelect.innerHTML += `<option value="${s.naam}" ${isSelected}>${s.naam}</option>`;
        });
    }
    
    const select = document.getElementById('periodeSelect');
    const submitBtn = document.getElementById('reserveSubmitBtn');
    const bezettePeriodeIds = reserveringen.filter(r => r.kist === kist.naam && (r.status === 'In afwachting' || r.status === 'Geaccepteerd')).map(r => parseInt(r.periodeId));
    const vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
    const beschikbarePeriodes = periodes.filter(p => !bezettePeriodeIds.includes(parseInt(p.id)) && new Date(p.eind) >= vandaag);
    
    if (select) {
        select.innerHTML = '';
        if (beschikbarePeriodes.length === 0) {
            select.innerHTML = '<option disabled selected>Geen periodes beschikbaar</option>';
            if(submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.5"; }
        } else {
            if(submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = "1"; }
            select.innerHTML = '<option disabled selected value="">-- Kies een periode --</option>';
            beschikbarePeriodes.forEach(p => select.innerHTML += `<option value="${p.id}">${p.naam} (${p.start} t/m ${p.eind})</option>`);
        }
    }
    
    const resModal = document.getElementById('infoReserveModal');
    if(resModal) resModal.style.display = 'flex';
}

// Admin Functies (Bewerken/Verwijderen)
window.beoordeelReservering = async function(id, nieuweStatus) {
    let r = reserveringen.find(x => x.id == id);
    if (r) r.status = nieuweStatus;
    slaDataOp();
    if (window.renderBeheerdersTabellen) window.renderBeheerdersTabellen();
    if (window.updateChecklistInCloud) {
        await window.updateChecklistInCloud(id, { status: nieuweStatus });
    }
    const per = periodes.find(p => p.id == r?.periodeId);
    if (nieuweStatus === 'Geaccepteerd' && r) {
        await window.verstuurGoedkeuringsMail(r, per);
    }
};

window.verstuurGoedkeuringsMail = async function(r, per) {
    const docentEmail = r.aanvragerEmail;
    const docentNaam = r.leerkracht || "Leerkracht";
    const kistNaam = r.kist || "Lesmateriaal";
    const periodeNaam = per ? `${per.naam} (${per.start} t/m ${per.eind})` : "de gereserveerde periode";
    const schoolNaam = r.school || "de schoollocatie";
    const beheerderNaam = localStorage.getItem('ww_huidige_leerkracht') || "Beheerder Verwonderlab";

    if (!docentEmail || !docentEmail.includes('@')) {
        alert(`✅ Reservering voor '${kistNaam}' is geaccepteerd!\n\nLet op: er is geen e-mailadres gekoppeld aan deze aanvraag voor ${docentNaam}. Er is daarom geen e-mail verstuurd.`);
        return;
    }

    const mailOnderwerp = `✅ Goedgekeurd: Reservering ${kistNaam} - Verwonderlab Wonderwijs`;
    const mailTekst = 
`Beste ${docentNaam},

Goed nieuws! Je reserveringsaanvraag voor '${kistNaam}' via het Verwonderlab Portaal is goedgekeurd door de beheerder.

Reserveringsdetails:
• Lesmateriaal: ${kistNaam}
• Periode: ${periodeNaam}
• Locatie / School: ${schoolNaam}
• Status: Goedgekeurd

Je kunt het materiaal op de afgesproken startdatum ophalen. Zorg ervoor dat het materiaal aan het einde van de periode weer compleet en netjes wordt ingeleverd voor de volgende leerkracht.

Bekijk je reserveringen en tips in het Verwonderlab Portaal:
https://verwonderlabportaal.vercel.app/

Met vriendelijke groet,
${beheerderNaam}
Verwonderlab Wonderwijs
Afzender: verwonderlab@wonderwijs.nl`;

    // 1. Probeer automatische verzending via Vercel Serverless API (/api/send-email)
    let isVerzondenViaServer = false;
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: docentEmail,
                leerkracht: docentNaam,
                kist: kistNaam,
                periode: periodeNaam,
                school: schoolNaam,
                approvedBy: beheerderNaam
            })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.sent) {
                isVerzondenViaServer = true;
            }
        }
    } catch (apiError) {
        console.warn("Serverless mail API niet bereikbaar:", apiError);
    }

    if (isVerzondenViaServer) {
        alert(`✅ Reservering goedgekeurd!\n\nEr is automatisch een bevestigingsmail verstuurd naar ${docentNaam} (${docentEmail}).`);
    } else {
        // 2. Open direct Microsoft 365 Outlook
        window.openInOutlook(docentEmail, mailOnderwerp, mailTekst);

        alert(`✅ Reservering voor '${kistNaam}' is goedgekeurd!\n\nOutlook wordt nu geopend met de kant-en-klare bevestigingsmail voor ${docentNaam} (${docentEmail}).\n\nKlik in Outlook op 'Verzenden' om de mail te versturen.`);
    }
};
window.actieReserveringVerwijderen = function(id, event) { event.preventDefault(); if(confirm("Weet je zeker dat je deze reservering definitief wilt verwijderen?")) { reserveringen = reserveringen.filter(r => r.id != id); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.deleteReserveringFromCloud) window.deleteReserveringFromCloud(id); } }
window.updateChecklist = async function(id, veld, waarde) { let r = reserveringen.find(x => x.id == id); if(r) r[veld] = waarde; slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.updateChecklistInCloud) window.updateChecklistInCloud(id, { [veld]: waarde }); }
window.toggleMeldingStatus = async function(id) { let m = meldingen.find(x => x.id == id); if(m) { m.status = m.status === 'Open' ? 'Opgelost' : 'Open'; slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.updateMeldingStatusInCloud) await window.updateMeldingStatusInCloud(id, m.status); } }
window.deleteMelding = async function(id) { if(confirm("Weet je zeker dat je deze melding wilt verwijderen?")) { meldingen = meldingen.filter(m => m.id != id); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.deleteMeldingFromCloud) await window.deleteMeldingFromCloud(id); } }
window.deletePeriode = function(id) { if(confirm("Weet je zeker dat je deze periode wilt verwijderen?")) { periodes = periodes.filter(p => p.id != id); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.deletePeriodeFromCloud) window.deletePeriodeFromCloud(id); } }
window.deleteSchool = function(id) { if(confirm("Weet je zeker dat je deze school/locatie wilt verwijderen?")) { scholen = scholen.filter(s => s.id != id); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.deleteSchoolFromCloud) window.deleteSchoolFromCloud(id); } }
window.deleteMateriaal = function(id) { if(confirm("Weet je zeker dat je dit materiaal wilt verwijderen?")) { leskisten = leskisten.filter(k => k.id != id); slaDataOp(); if(document.getElementById('leskistenContainer')) window.renderReserveringsGrid(); if(window.deleteMateriaalFromCloud) window.deleteMateriaalFromCloud(id); } }
window.deleteLesidee = function(id) { if(confirm("Weet je zeker dat je dit lesidee wilt verwijderen?")) { lesideeen = lesideeen.filter(i => i.id != id); slaDataOp(); if(document.getElementById('lesideeenContainer')) window.renderLesideeenGrid(); if(window.deleteLesideeFromCloud) window.deleteLesideeFromCloud(id); } }
window.voegBeheerderToe = async function() { const emailInput = document.getElementById('nieuweBeheerderEmail'); const email = emailInput ? emailInput.value.trim().toLowerCase() : ""; if(!email || !email.includes('@')) { alert("⚠️ Vul een geldig e-mailadres in."); return; } if(beheerdersLijst.some(b => b.email === email)) { alert("ℹ Dit e-mailadres is al een beheerder."); emailInput.value = ""; return; } const newData = { id: Date.now(), email: email }; beheerdersLijst.push(newData); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.saveBeheerderToCloud) { await window.saveBeheerderToCloud(newData); emailInput.value = ""; alert("✅ E-mailadres succesvol toegevoegd als beheerder!"); } else { alert("❌ Kan niet verbinden met de Cloud."); } }
window.verwijderBeheerder = async function(id) { if(confirm("Weet je zeker dat je de beheerdersrechten van dit e-mailadres wilt intrekken?")) { beheerdersLijst = beheerdersLijst.filter(b => b.id != id); slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.deleteBeheerderFromCloud) await window.deleteBeheerderFromCloud(id); } }

// Open Modals
window.openPeriodeModal = function(id = null) { const form = document.getElementById('periodeForm'); if(form) form.reset(); if(id) { document.getElementById('modalPeriodeTitle').innerText = "Periode Bewerken"; const per = periodes.find(p => p.id == id); if(document.getElementById('editPeriodeId')) document.getElementById('editPeriodeId').value = per.id; if(document.getElementById('periodeNaam')) document.getElementById('periodeNaam').value = per.naam; if(document.getElementById('periodeStart')) document.getElementById('periodeStart').value = per.start; if(document.getElementById('periodeEind')) document.getElementById('periodeEind').value = per.eind; } else { document.getElementById('modalPeriodeTitle').innerText = "Nieuwe Periode Aanmaken"; if(document.getElementById('editPeriodeId')) document.getElementById('editPeriodeId').value = ""; } const m = document.getElementById('periodeModal'); if(m) m.style.display = 'flex'; }
window.openSchoolModal = function(id = null) { const form = document.getElementById('schoolForm'); if(form) form.reset(); if(id) { document.getElementById('modalSchoolTitle').innerText = "School/Locatie Bewerken"; const sch = scholen.find(s => s.id == id); if(document.getElementById('editSchoolId')) document.getElementById('editSchoolId').value = sch.id; if(document.getElementById('schoolNaam')) document.getElementById('schoolNaam').value = sch.naam; } else { document.getElementById('modalSchoolTitle').innerText = "Nieuwe School/Locatie Aanmaken"; if(document.getElementById('editSchoolId')) document.getElementById('editSchoolId').value = ""; } const m = document.getElementById('schoolModal'); if(m) m.style.display = 'flex'; }
window.openStoringModal = function() { const form = document.getElementById('storingForm'); if(form) form.reset(); if(document.getElementById('storingFotoPreview')) document.getElementById('storingFotoPreview').innerHTML = ''; if(document.getElementById('storingFotoData')) document.getElementById('storingFotoData').value = ''; const select = document.getElementById('storingKist'); if(select) { select.innerHTML = '<option value="" disabled selected>-- Selecteer een leskist --</option>'; leskisten.forEach(k => select.innerHTML += `<option value="${k.naam}">${k.naam}</option>`); } const m = document.getElementById('storingModal'); if(m) m.style.display = 'flex'; }
window.openMateriaalModal = function(id = null) { const form = document.getElementById('editLeskistForm'); if(form) form.reset(); const afbFile = document.getElementById('editAfbeeldingFile'); if(afbFile) afbFile.value = ""; const editPdfFiles = document.getElementById('editPdfFiles'); if(editPdfFiles) editPdfFiles.value = ""; if(id) { document.getElementById('modalMateriaalTitle').innerText = "Materiaal Bewerken"; const kist = leskisten.find(k => k.id == id); if(document.getElementById('editKistId')) document.getElementById('editKistId').value = kist.id; if(document.getElementById('editAfbeelding')) document.getElementById('editAfbeelding').value = kist.afbeelding || defaultImg; let imgSource = kist.afbeelding && kist.afbeelding.startsWith('data:image') ? kist.afbeelding : (kist.afbeelding || defaultImg); if(document.getElementById('imagePreview')) document.getElementById('imagePreview').innerHTML = `<img src="${imgSource}" style="width: 100%; border-radius: 8px;">`; if(document.getElementById('editNaam')) document.getElementById('editNaam').value = kist.naam || ""; if(document.getElementById('editTag')) document.getElementById('editTag').value = kist.tag || ""; if(document.getElementById('editDoelgroep')) document.getElementById('editDoelgroep').value = kist.doelgroep || ""; if(document.getElementById('editKerndoelen')) document.getElementById('editKerndoelen').value = kist.kerndoelen || ""; if(document.getElementById('editBeschrijving')) document.getElementById('editBeschrijving').value = kist.beschrijving || ""; if(document.getElementById('editInhoud')) document.getElementById('editInhoud').value = kist.inhoud || ""; if(document.getElementById('editVideo')) document.getElementById('editVideo').value = kist.videoUrl || ""; if(document.getElementById('editBeschikbaar')) document.getElementById('editBeschikbaar').checked = kist.beschikbaar !== false; currentPdfs = kist.pdfs || []; } else { document.getElementById('modalMateriaalTitle').innerText = "Nieuw Materiaal Toevoegen"; if(document.getElementById('editKistId')) document.getElementById('editKistId').value = ""; if(document.getElementById('editAfbeelding')) document.getElementById('editAfbeelding').value = defaultImg; if(document.getElementById('imagePreview')) document.getElementById('imagePreview').innerHTML = ""; if(document.getElementById('editBeschikbaar')) document.getElementById('editBeschikbaar').checked = true; currentPdfs = []; } if(window.updatePdfPreview) window.updatePdfPreview(); const m = document.getElementById('editLeskistModal'); if(m) m.style.display = 'flex'; }
window.openLesideeModal = function(id = null) { const form = document.getElementById('editLesideeForm'); if(!form) return; form.reset(); if(id) { document.getElementById('modalLesideeTitle').innerText = "Lesidee Bewerken"; const idee = lesideeen.find(i => i.id == id); if(document.getElementById('editLesideeId')) document.getElementById('editLesideeId').value = idee.id; if(document.getElementById('editLesideeTitel')) document.getElementById('editLesideeTitel').value = idee.titel || ""; if(document.getElementById('editLesideeCategorie')) document.getElementById('editLesideeCategorie').value = idee.categorie || ""; if(document.getElementById('editLesideeBeschrijving')) document.getElementById('editLesideeBeschrijving').value = idee.beschrijving || ""; if(document.getElementById('editLesideeLink')) document.getElementById('editLesideeLink').value = idee.link || ""; } else { document.getElementById('modalLesideeTitle').innerText = "Nieuw Lesidee Toevoegen"; if(document.getElementById('editLesideeId')) document.getElementById('editLesideeId').value = ""; } const m = document.getElementById('editLesideeModal'); if(m) m.style.display = 'flex'; }
window.toonWillekeurigeTip = function() { const tipElement = document.getElementById('tipText'); if (tipElement) tipElement.innerText = ictTips[Math.floor(Math.random() * ictTips.length)]; }
// ==========================================
// LEERLIJNEN VOORTGANG & CLOUD SYNCHRONISATIE
// ==========================================
document.addEventListener('change', (e) => { 
    if (e.target.type === 'checkbox' && e.target.id && e.target.id.startsWith('check-domein')) { 
        let huidigeEmail = localStorage.getItem('ww_huidige_email'); 
        if(!huidigeEmail) {
            console.warn("Geen e-mailadres beschikbaar om voortgang op te slaan.");
            return;
        }
        
        let checkboxStates = {};
        try {
            const raw = localStorage.getItem('ww_vinkjes');
            if (raw) checkboxStates = JSON.parse(raw) || {};
        } catch(err) {
            checkboxStates = {};
        }

        checkboxStates[e.target.id] = e.target.checked; 
        const strState = JSON.stringify(checkboxStates); 
        
        localStorage.setItem('ww_vinkjes', strState); 
        
        // Sla direct op in de Firebase cloud gekoppeld aan het e-mailadres
        if(typeof window.saveVoortgangToCloud === 'function') {
            window.saveVoortgangToCloud(huidigeEmail, strState); 
        }

        // Visuele feedback op de leerlijnen pagina
        const syncBadge = document.getElementById('cloudSyncStatusPill');
        if (syncBadge) {
            syncBadge.innerHTML = '☁️ <span style="color:#15803d; font-weight:700;">Opgeslagen in cloud</span>';
            clearTimeout(window._syncPillTimer);
            window._syncPillTimer = setTimeout(() => {
                syncBadge.innerHTML = '☁️ Automatisch gesynchroniseerd met jouw account';
            }, 2500);
        }
    } 
});

window.reproduceerVinkjes = function() { 
    let savedChecks = {}; 
    try {
        const raw = localStorage.getItem('ww_vinkjes');
        if (raw) savedChecks = JSON.parse(raw) || {};
    } catch(e) { savedChecks = {}; }

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => { 
        if (cb.id && cb.id.startsWith('check-domein')) {
            cb.checked = !!savedChecks[cb.id];
        }
    }); 
    document.querySelectorAll('.domain-card').forEach(card => { 
        if (typeof updateVoortgang === "function") {
            updateVoortgang(card.id);
        }
    }); 
};

// Start eventuele deep link routering bij het laden
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.checkUrlReservationParam === 'function') {
        window.checkUrlReservationParam();
    }
});