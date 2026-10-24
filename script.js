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
    const encodedSubject = encodeURIComponent(subject || "");
    // Zorg dat regeleindes correct worden gecodeerd voor Outlook Desktop client
    const formattedBody = (body || "").replace(/\r?\n/g, '\r\n');
    const encodedBody = encodeURIComponent(formattedBody);

    // mailto: triggert direct de geïnstalleerde Microsoft Outlook Desktop app van het besturingssysteem
    const mailtoUrl = `mailto:${cleanTo}?subject=${encodedSubject}&body=${encodedBody}`;

    const tempLink = document.createElement('a');
    tempLink.href = mailtoUrl;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(() => {
        if (tempLink.parentNode) {
            tempLink.parentNode.removeChild(tempLink);
        }
    }, 400);
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
    if (clean.includes('bee-bot') || clean.includes('beebot')) return 'img/les_beebot_schat.jpg';
    if (clean.includes('blue-bot') || clean.includes('bluebot')) return 'img/les_beebot_schat.jpg';
    if (clean.includes('dash') || clean.includes('dot') || clean.includes('dans') || clean.includes('cue')) return 'img/les_dansende_robot.jpg';
    if (clean.includes('green screen') || clean.includes('greenscreen')) return 'img/les_greenscreen_journaal.jpg';
    if (clean.includes('makey makey') || clean.includes('makeymakey')) return 'img/les_makeymakey_piano.jpg';
    if (clean.includes('micro:bit') || clean.includes('microbit')) return 'img/les_microbit_stappen.jpg';
    if (clean.includes('spike essential') || clean.includes('lego essential')) return 'img/les_legospike_kermis.jpg';
    if (clean.includes('spike prime') || clean.includes('lego spike')) return 'img/les_legospike_afval.jpg';
    if (clean.includes('lego bricq') || clean.includes('bricq')) return 'img/les_legospike_kermis.jpg';
    if (clean.includes('podcast')) return 'img/les_podcast_radio.jpg';
    if (clean.includes('3d pen') || clean.includes('3dpennen')) return 'img/les_3dpen_brug.jpg';
    if (clean.includes('3d printer') || clean.includes('3dprinter')) return 'img/les_3dpen_brug.jpg';
    if (clean.includes('piximakey') || clean.includes('stop-motion') || clean.includes('animatie')) return 'img/les_piximakey_animatie.jpg';
    if (clean.includes('ozobot')) return 'img/les_ozobot_doolhof.jpg';
    if (clean.includes('classvr') || clean.includes('vr bril') || clean.includes('vr') || clean.includes('virtual reality')) return 'img/les_classvr_expeditie.jpg';
    if (clean.includes('mtiny')) return 'img/les_beebot_schat.jpg';
    if (clean.includes('duplo')) return 'img/les_beebot_schat.jpg';
    if (clean.includes('sphero')) return 'img/les_ozobot_doolhof.jpg';
    return 'Verwonderlab.jpg';
};

window.vindKistVoorIdee = function(idee) {
    if (!idee) return { id: '', naam: 'Verwonderlab Leskist' };

    // 1. Directe kistId koppeling als die geldig is
    if (idee.kistId && typeof leskisten !== 'undefined' && leskisten.length > 0) {
        const direct = leskisten.find(k => k.id == idee.kistId);
        if (direct) return direct;
    }

    const tekst = ((idee.titel || '') + ' ' + (idee.beschrijving || '') + ' ' + (idee.kistNaam || '')).toLowerCase();

    // 2. Slimme patroonherkenning op basis van onderwerp
    if (typeof leskisten !== 'undefined' && leskisten.length > 0) {
        const patronen = [
            { sleutel: ['green screen', 'greenscreen', 'journaal', 'weerbericht', 'studio', 'film'], kistTerm: 'green screen' },
            { sleutel: ['3d pen', '3dpennen', 'filament', 'brug', 'bruggen'], kistTerm: '3d pen' },
            { sleutel: ['3d printer', '3d print', '3dprinter'], kistTerm: '3d print' },
            { sleutel: ['bee-bot', 'beebot', 'bijtje', 'schat', 'boerderij'], kistTerm: 'bee-bot' },
            { sleutel: ['blue-bot', 'bluebot'], kistTerm: 'blue-bot' },
            { sleutel: ['dash', 'dot', 'dans', 'dance', 'choreografie'], kistTerm: 'dash' },
            { sleutel: ['makey makey', 'makey', 'fruit', 'stroomkring', 'geleiding'], kistTerm: 'makey' },
            { sleutel: ['micro:bit', 'microbit', 'stappen', 'teller', 'alarm'], kistTerm: 'micro:bit' },
            { sleutel: ['spike essential', 'lego essential', 'kermis', 'reuzenrad'], kistTerm: 'spike essential' },
            { sleutel: ['spike prime', 'lego spike', 'afval', 'sorteerder', 'sorteer'], kistTerm: 'spike prime' },
            { sleutel: ['podcast', 'radio', 'interview', 'microfoon', 'luister'], kistTerm: 'podcast' },
            { sleutel: ['piximakey', 'stop-motion', 'animatie', 'klei', 'filmpje'], kistTerm: 'piximakey' },
            { sleutel: ['ozobot', 'doolhof', 'kleurcode'], kistTerm: 'ozobot' },
            { sleutel: ['classvr', 'vr bril', 'expeditie', 'virtual reality', 'vr'], kistTerm: 'vr' },
            { sleutel: ['infento pro'], kistTerm: 'infento pro' },
            { sleutel: ['infento'], kistTerm: 'infento' },
            { sleutel: ['intelino'], kistTerm: 'intelino' },
            { sleutel: ['sphero'], kistTerm: 'sphero' },
            { sleutel: ['mtiny'], kistTerm: 'mtiny' },
            { sleutel: ['cue'], kistTerm: 'cue' },
            { sleutel: ['drone'], kistTerm: 'drone' },
            { sleutel: ['duplo'], kistTerm: 'duplo' },
            { sleutel: ['microscoop', 'easiscope'], kistTerm: 'microscoop' }
        ];

        for (const p of patronen) {
            if (p.sleutel.some(s => tekst.includes(s))) {
                const kistMatch = leskisten.find(k => k.naam && k.naam.toLowerCase().includes(p.kistTerm));
                if (kistMatch) return kistMatch;
            }
        }

        // Match op basis van canonieke kistNaam als die niet per ongeluk "3d pennen" is voor een ander onderwerp
        if (idee.kistNaam && !(idee.kistNaam.toLowerCase().includes('3d') && (tekst.includes('green screen') || tekst.includes('dash') || tekst.includes('bee-bot')))) {
            const kn = idee.kistNaam.toLowerCase();
            const matchKist = leskisten.find(k => k.naam && (k.naam.toLowerCase() === kn || k.naam.toLowerCase().includes(kn) || kn.includes(k.naam.toLowerCase())));
            if (matchKist) return matchKist;
        }

        // Match op basis van de titel van het lesidee
        if (idee.titel) {
            const it = idee.titel.toLowerCase();
            const matchTitel = leskisten.find(k => k.naam && (it.includes(k.naam.toLowerCase()) || k.naam.toLowerCase().includes(it.split(':')[0])));
            if (matchTitel) return matchTitel;
        }
    }

    // Veilige fallback: detecteer de echte naam. NOOIT blind leskisten[0] pakken!
    const veiligeNaam = window.detecteerKistNaam(idee.titel, idee.beschrijving);
    return { id: '', naam: veiligeNaam };
};

window.getTemplateLesbriefVoorKist = function(kistNaam, idee) {
    const tekst = ((kistNaam || '') + ' ' + (idee ? ((idee.titel || '') + ' ' + (idee.beschrijving || '')) : '')).toLowerCase();

    // 1. GREEN SCREEN STUDIO
    if (tekst.includes('green screen') || tekst.includes('greenscreen') || tekst.includes('journaal') || tekst.includes('weerbericht')) {
        return {
            tijd: "75 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "35 min", afsluiting: "15 min" },
            organisatie: "Studioteams van 4: Presentator, Cameraman, Regisseur/Script, Geluid/Props",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met technologie",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken' (camera, microfoon, chroma-key en digitale achtergronden).",
                    "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media en info': Begrijpen hoe media worden geproduceerd, hoe framing werkt en dat beeldmateriaal digitaal gemanipuleerd kan worden.",
                    "Kerndoel 3: De gedigitaliseerde wereld (24b) 'Jezelf en de ander': Respectvol samenwerken in een mediateam en presentatievaardigheden ontwikkelen."
                ],
                leerlingDoelen: "De leerling kan: 1. Uitleggen hoe een groen scherm (chroma-keying) werkt. 2. Een beknopt videoscript schrijven en presenteren voor de camera. 3. Verschillende digitale tools (camera, microfoon, achtergronden) combineren tot één video-uitzending."
            },
            kistMateriaal: "Groot groen chroma-key scherm met uitschuifbaar statief, iPad-statief met stevige klem, externe richtmicrofoon met verlengkabel, 2 LED studiolampen met diffusers",
            klasMateriaal: "iPads of tablets met app (bijv. Green Screen by Do Ink of iMovie), verkleedkleren of decor-attributen, digibord voor vertoning",
            voorbereiding: "Span het groene doek kreukvrij op tegen een egale muur en zorg voor gelijkmatige verlichting zonder harde slagschaduwen.",
            inleiding: "Toon een fragment van het echte Jeugdjournaal en direct daarna 'behind the scenes' beelden met het groene doek. Leg het principe van chroma-keying uit: de computer vervangt de specifieke groene kleur door een foto of video.",
            kern: "1. Format & Script: Teams schrijven een strak draaiboek van max. 60 seconden.<br>2. Achtergronden: Zoek een dynamische weerkaart of nieuwsomgeving.<br>3. Kledingcheck: Géén groene kleding aan!<br>4. Opname & Mix: Neem de uitzending live op met Do Ink.",
            afsluiting: "Klassikale première op het digibord en reflectie op framing en nepnieuws in de media.",
            differentiatie: {
                uitdaging: "Voeg 'Picture-in-Picture' toe met een live schakeling naar een verslaggever ter plaatse.",
                ondersteuning: "Gebruik een voorgedrukt invul-script met vaste zinnen en pictogrammen."
            }
        };
    }

    // 2. 3D PENNEN
    if (tekst.includes('3d pen') || tekst.includes('3dpennen') || tekst.includes('filament') || tekst.includes('brug')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "5 min", inleiding: "10 min", kern: "35 min", afsluiting: "15 min" },
            organisatie: "Duo's per 3D pen en hittebestendige tekenmat",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met technologie",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken' (2D blauwdrukken, hittebestendige mallen en vloeibaar polymeer).",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen': Begrijpen hoe additive manufacturing (laag-voor-laag 3D-modelleren) werkt.",
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Ruimtelijke constructielogica': Driehoeksverbindingen vs. vierkante dragers toepassen."
                ],
                leerlingDoelen: "De leerling kan: 1. Veilig werken met een 3D pen en PLA bioplastic. 2. Een dragend vakwerk ontwerpen met driehoeksconstructies. 3. Losse 2D-componenten in de ruimte aan elkaar lassen tot een stevig 3D-bouwwerk."
            },
            kistMateriaal: "Set van 12 ergonomische 3D pennen, veilige laagvoltage voedingen/kabels, siliconen hittebestendige tekenmatten met rasters, siliconen vingerbeschermers, nozzle-reinigers, ontwerpsjablonen",
            klasMateriaal: "PLA bioplastic filament (diverse kleuren), scharen, testgewichten of waterflesjes voor de sterktemeting, houten steunblokken",
            voorbereiding: "Sluit adapters aan op veilige stekkerdozen en leg de matjes klaar. Zorg voor goede ventilatie in het lokaal.",
            inleiding: "Veiligheidsinstructie: penpunt wordt 190°C, nooit aanraken! Demonstreer hoe je in 2D tekent en balkjes omhoog in de lucht trekt.",
            kern: "1. Blauwdruk: Schets een dragend vakwerk op papier met driehoeken.<br>2. 2D Zijkanten: Teken de zijkanten op het matje.<br>3. 3D Lassen: Zet ze rechtop en verbind ze met dwarse stutbalken.<br>4. Sterktetest: Meet hoeveel gewicht de brug kan dragen.",
            afsluiting: "Klassikale draagkrachtmeting tussen twee tafels. Bespreek waarom driehoeken constructief sterker zijn dan vierkanten.",
            differentiatie: {
                uitdaging: "Ontwerp een beweegbare ophaalbrug of een boogbrugconstructie.",
                ondersteuning: "Gebruik transparant bakpapier over voorgedrukte sjablonen."
            }
        };
    }

    // 3. BEE-BOT
    if (tekst.includes('bee-bot') || tekst.includes('beebot') || tekst.includes('bijtje')) {
        return {
            tijd: "45 minuten",
            tijdsopbouw: { voorbereiding: "5 min", inleiding: "10 min", kern: "25 min", afsluiting: "10 min" },
            organisatie: "Groepjes van 3 à 4 kleuters rondom een vloermat",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: ontdekt stappenplan en algoritme; zet stappen in volgorde en herstelt fouten'.",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: hardwareknoppen bedienen, instructies invoeren en geheugen wissen'.",
                    "Kerndoel 1: Praktische vaardigheden (22c) 'Data: pictogrammen en symbolen koppelen aan fysieke acties'."
                ],
                leerlingDoelen: "De leerling kan: 1. Een stappenplan bedenken van punt A naar B. 2. Ruimtelijke begrippen (vooruit, links, rechts, achteruit) toepassen. 3. Begrijpen dat de robot eerst gewist moet worden ('X') voor een nieuwe route."
            },
            kistMateriaal: "6 gele Bee-Bot robots, laadstation met adapter, boerderij vloermat, schatkaart vloermat, fysieke richtingspijlen",
            klasMateriaal: "Houten blokken (als hekjes/obstakels), speelgoeddiertjes, schatkistjes/fiches",
            voorbereiding: "Laad de Bee-Bots vooraf op en leg de themamatten vlak op de grond of tafels.",
            inleiding: "Introduceer Bee-Bot in de kring. Laat kinderen zelf 'robot' spelen en commando's uitvoeren.",
            kern: "1. Plaats een schat en een obstakel.<br>2. Leg eerst de fysieke pijlenkaarten op een rij.<br>3. Tel de stappen hardop.<br>4. Voer de code in op Bee-Bot en druk op GO.<br>5. Foutje? Samen debuggen met het kruisje 'X'!",
            afsluiting: "Kringgesprek over computergeheugen en het belang van 'wissen' voor elke nieuwe start.",
            differentiatie: {
                uitdaging: "Programmeer een geheime route voor een ander groepje.",
                ondersteuning: "Loop de route eerst met een speelfiguurtje stap voor stap over de mat."
            }
        };
    }

    // 4. DASH & DOT ROBOT
    if (tekst.includes('dash') || tekst.includes('dot') || tekst.includes('robot dance')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "30 min", afsluiting: "15 min" },
            organisatie: "Tweetallen of drietallen met 1 tablet en 1 Dash robot",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: sequenties ontwerpen, loops (herhalingen) toepassen en systematisch debuggen'.",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: draadloze Bluetooth-koppeling en sensoraansturing'.",
                    "Kerndoel 3: De gedigitaliseerde wereld (24b) 'Jezelf en de ander: creatieve expressie en samenwerking in teams'."
                ],
                leerlingDoelen: "De leerling kan: 1. Een choreografie ontwerpen in blokcode. 2. Herhaallussen (loops) gebruiken op de beat van de muziek. 3. Systematisch bugs opsporen."
            },
            kistMateriaal: "Dash robots, laadkabels, oranje accessoires (konijnenoren/staart), optionele xylofoon en balwerper",
            klasMateriaal: "Tablets met app 'Blockly for Dash & Dot', schilderstape voor dansvloertjes, muziekbox",
            voorbereiding: "Laad de robots op, installeer de Blockly app en plak dansvlakken af met tape.",
            inleiding: "Demonstreer één dansmove met lichteffecten. Leg uit dat robots instructies nodig hebben (algoritme).",
            kern: "1. Dance Challenge: Ontwerp een routine van 30 seconden.<br>2. Gebruik herhaallussen voor efficiënte code.<br>3. Voeg geluiden en LED-effecten toe.<br>4. Test en corrigeer afstanden.",
            afsluiting: "De Wonderwijs Robot Dance Battle met klassikale jurering en reflectie.",
            differentiatie: {
                uitdaging: "Laat Dash reageren op de ingebouwde afstandssensor met een pirouette.",
                ondersteuning: "Gebruik fysieke pijlenkaarten om de routine eerst op tafel uit te leggen."
            }
        };
    }

    // 5. MAKEY MAKEY
    if (tekst.includes('makey') || tekst.includes('fruit') || tekst.includes('stroomkring')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "25 min", afsluiting: "10 min" },
            organisatie: "Tweetallen per Makey Makey kit en laptop/Chromebook",
            dgDoelen: {
                domein: "Domein 1: Praktische Kennis — Kerndoel 22a Digitale Systemen",
                kerndoelenWonderwijs: [
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: begrijpen hoe invoerapparaten en gesloten elektrische stroomkringen met aarding werken'.",
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken': fysieke voorwerpen transformeren tot interactieve technologie.",
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren': gebeurtenisgestuurde interactie ('Wanneer toets ingedrukt -> speel geluid')."
                ],
                leerlingDoelen: "De leerling kan: 1. Uitleggen wat het verschil is tussen geleiders en isolatoren. 2. Een gesloten stroomkring maken met aarding. 3. Fysieke voorwerpen koppelen aan interactieve computerprogramma's."
            },
            kistMateriaal: "Makey Makey printplaten, rode USB-kabels, sets gekleurde krokodillenklemmen, aardingsdraden",
            klasMateriaal: "Laptops/Chromebooks met Chrome browser, vers fruit (bananen, appels), potloden, aluminiumfolie",
            voorbereiding: "Sluit de Makey Makey boards aan op laptops en open de online piano app.",
            inleiding: "Demonstreer een banaan die piano speelt door zelf de aardingsdraad vast te houden. Leg gesloten stroomkringen uit.",
            kern: "1. Verbind de aarding (Earth) met je hand.<br>2. Sluit krokodillenklemmen aan op Space, Up, Down, Left, Right.<br>3. Test geleiding van verschillende voorwerpen in het lokaal.<br>4. Bouw een werkend instrument of interactieve quiz.",
            afsluiting: "Klassikale demonstratie van de meest creatieve instrumenten.",
            differentiatie: {
                uitdaging: "Bouw een custom game controller in Scratch met aluminiumfolie vloertegels.",
                ondersteuning: "Gebruik een eenvoudig testcircuit met alleen bananen en de online piano."
            }
        };
    }

    // 6. MICRO:BIT
    if (tekst.includes('micro:bit') || tekst.includes('microbit') || tekst.includes('stappen')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "10 min", kern: "30 min", afsluiting: "10 min" },
            organisatie: "Duo's met 1 Micro:bit en 1 Chromebook/laptop",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: variabelen (teller + 1), sensordata (versnellingsmeter shake) en if/else-logica'.",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: microprocessor, sensoren, LED-matrix en firmware flashen'.",
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken': programmeren en fysieke wearable koppelen."
                ],
                leerlingDoelen: "De leerling kan: 1. Een versnellingsmetersensor programmeren. 2. Een variabele aanmaken en ophogen met 1. 3. Een werkende wearable stappenteller maken en testen."
            },
            kistMateriaal: "Micro:bit v2 microcontrollers, batterijhouders (2x AAA), USB-kabels, elastische polsbanden, krokodillenklemmen",
            klasMateriaal: "Chromebooks met MakeCode editor, gymkleding of beweegruimte",
            voorbereiding: "Zorg dat de MakeCode pagina klaarstaat en de batterijhouders voorzien zijn van volle batterijen.",
            inleiding: "Bespreek hoe smartwatches stappen tellen met bewegingssensoren. Toon de versnellingsmeter op de Micro:bit.",
            kern: "1. Maak variabele 'stappen'.<br>2. Programmeer 'bij schudden -> verander stappen met 1'.<br>3. Toon het getal op het 5x5 LED-scherm.<br>4. Download het .hex bestand naar de Micro:bit.<br>5. Bevestig aan de enkel en loop een testrondje van 50 stappen!",
            afsluiting: "Vergelijk de gemeten stappen met de werkelijk getelde stappen en kalibreer de gevoeligheid.",
            differentiatie: {
                uitdaging: "Programmeer een feestelijk animatie-icoon en geluidje zodra de 100 stappen bereikt zijn.",
                ondersteuning: "Gebruik kant-en-klare codekaarten voor de blokkenstructuur."
            }
        };
    }

    // 7. LEGO SPIKE PRIME
    if (tekst.includes('spike prime') || tekst.includes('lego spike') || tekst.includes('afval')) {
        return {
            tijd: "90 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "45 min", afsluiting: "20 min" },
            organisatie: "Groepjes van 3: Constructeur, Software-engineer, Tester",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: complexe beslisstructuren (Als... Dan... Anders...), sensorkalibratie en servomotoraansturing'.",
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken: mechanische grijpers, hefbomen en optische sensoren'.",
                    "Kerndoel 3: De gedigitaliseerde wereld (24c) 'Samenleving en wereld: automatisering en robotica in circulaire economie'."
                ],
                leerlingDoelen: "De leerling kan: 1. Een geautomatiseerde sorteermachine ontwerpen en bouwen. 2. Een if/else-algoritme programmeren op basis van sensordata. 3. Uitleggen hoe industriële automatisering bijdraagt aan recycling."
            },
            kistMateriaal: "LEGO Spike Prime sets (grote hub, servomotoren, kleurensensor, afstandssensor, tandwielen, hefbomen)",
            klasMateriaal: "Laptops/Chromebooks met SPIKE app, gekleurde teststeentjes (geel = plastic, blauw = papier, rood = restafval)",
            voorbereiding: "Laad de hubs op en zet bakjes klaar met afval-steentjes.",
            inleiding: "Bespreek moderne recyclingfabrieken en het belang van sensoren om materialen te onderscheiden.",
            kern: "1. Bouw een sorteerarm met een servomotor.<br>2. Monteer de kleurensensor boven de sorteerplek.<br>3. Programmeer if/else: Geel -> Bak 1, Blauw -> Bak 2, Anders -> Bak 3.<br>4. Stresstest met 10 willekeurige blokjes.",
            afsluiting: "Presentatie van de sorteerstraten en reflectie op computer vision en AI in fabrieken.",
            differentiatie: {
                uitdaging: "Laat de ultrasone sensor meten wanneer een bak vol is en een waarschuwingsgeluid geven.",
                ondersteuning: "Geef een stroomdiagram van het beslisalgoritme mee."
            }
        };
    }

    // 8. PODCAST STUDIO
    if (tekst.includes('podcast') || tekst.includes('radio') || tekst.includes('interview')) {
        return {
            tijd: "75 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "35 min", afsluiting: "15 min" },
            organisatie: "Redactiegroepjes van 4: Presentator, Gast, Geluidstechnicus, Tijdwaarnemer",
            dgDoelen: {
                domein: "Domein 1: Praktische Kennis — Kerndoel 22b Digitale Media & Informatie",
                kerndoelenWonderwijs: [
                    "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media en info: journalistieke vraagstelling, bronbeoordeling en framing'.",
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken': mengpaneel, microfoons en live sound effects mixen.",
                    "Kerndoel 3: De gedigitaliseerde wereld (24a) 'Veiligheid & privacy: toestemming voor audio-opname en auteursrecht van muziek'."
                ],
                leerlingDoelen: "De leerling kan: 1. Een journalistiek interview voorbereiden met open vragen. 2. Professionele audioapparatuur bedienen. 3. Een boeiende audio-opname maken met jingles en strakke timing."
            },
            kistMateriaal: "Podcast mengtafel met sound pads, broadcast condensatormicrofoons op bureauarmen, popfilters, over-ear studiokoptelefoons, XLR-kabels, SD-kaart",
            klasMateriaal: "Laptop/Chromebook met Audacity of Soundtrap, kladblokken voor het draaiboek",
            voorbereiding: "Zet de set klaar in een rustige hoek en test de microfoonkanalen.",
            inleiding: "Luister naar een fragment van 1 minuut uit een jeugdpodcast. Bespreek microfoondiscipline en open versus gesloten vragen.",
            kern: "1. Kies een prikkelend thema.<br>2. Maak een strak draaiboek (Jingle -> Vraag 1-3 -> Dilemma -> Outro).<br>3. Wijs geluidseffecten toe onder de sound pads.<br>4. Neem de podcast van maximaal 5 minuten op in één take!",
            afsluiting: "Klassikaal luistercafé met tops en tips op presentatie en dynamiek.",
            differentiatie: {
                uitdaging: "Componeer een eigen jingle met rechtenvrije loops.",
                ondersteuning: "Gebruik een vragenkaart met 10 sterke starters voor open interviewvragen."
            }
        };
    }

    // 9. PIXIMAKEY
    if (tekst.includes('piximakey') || tekst.includes('stop-motion') || tekst.includes('animatie')) {
        return {
            tijd: "75 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "35 min", afsluiting: "15 min" },
            organisatie: "Creatieve filmteams van 3: Animator, Cameraregisseur, Scenarist",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met technologie",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken: decorbouw, kleifiguren en digitale stop-motion frame-capturing'.",
                    "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media en info: filmcontinuïteit, camerastandpunten en visuele storytelling'."
                ],
                leerlingDoelen: "De leerling kan: 1. Een kort storyboard ontwerpen met begin, midden en eind. 2. De stop-motion techniek (beeld-voor-beeld) toepassen met 12 frames per seconde. 3. Geduldig millimeter-verplaatsingen maken voor een vloeiende animatie."
            },
            kistMateriaal: "Houten Piximakey studio koffers met verstelbare tablet/telefoonstandaard, achtergrondvellen, modelleerklei, spatels",
            klasMateriaal: "Tablets/smartphones met de gratis Piximakey animatie app, LEGO minifiguren, papieren knutselspullen",
            voorbereiding: "Plaats de Piximakey studio's stevig op tafels en zorg voor stabiel licht.",
            inleiding: "Toon een korte stop-motion film (bijv. Shaun het Schaap). Laat zien dat 1 seconde film uit 12 losse foto's bestaat.",
            kern: "1. Storyboard van 6 scènes tekenen.<br>2. Kleipoppetjes en decors boetseren.<br>3. Tablet stabiel in de houder klemmen.<br>4. Beeld-voor-beeld opnemen met millimeter-aanpassingen met de onion-skin functie.<br>5. Geluidseffecten en stemmen inspreken.",
            afsluiting: "Wonderwijs Filmfestival: bekijk elkaars animaties op het grote scherm.",
            differentiatie: {
                uitdaging: "Voeg camerabewegingen (panning) toe door de camera op een rails te schuiven.",
                ondersteuning: "Gebruik kant-en-klare LEGO figuurtjes in plaats van klei."
            }
        };
    }

    // 10. OZOBOT
    if (tekst.includes('ozobot') || tekst.includes('kleurcode') || tekst.includes('doolhof')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "5 min", inleiding: "15 min", kern: "30 min", afsluiting: "10 min" },
            organisatie: "Tweetallen met 1 Ozobot en stiften",
            dgDoelen: {
                domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                kerndoelenWonderwijs: [
                    "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: optische kleurcodes (snelheid, richting, spins) en algoritmes ontwerpen'.",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: optische lijnsensoren en kalibratie op papier'."
                ],
                leerlingDoelen: "De leerling kan: 1. Zwarte lijnsporen tekenen die optische sensoren kunnen volgen. 2. Kleurvolgordes (rood-groen-blauw) gebruiken als programmeerinstructies. 3. Doolhoven ontwerpen met logische kruispunten."
            },
            kistMateriaal: "Ozobot Evo / Bit robotjes in laadetui, set officiële kleurcode-stiften (zwart, rood, groen, blauw), kalibratiekaarten",
            klasMateriaal: "Wit A4/A3 papier, linialen, stiften",
            voorbereiding: "Laad de robotjes op en leg wit papier en stiften klaar.",
            inleiding: "Demonstreer hoe de Ozobot een zwarte lijn volgt en reageert met licht op gekleurde vakjes.",
            kern: "1. Teken een doorlopende zwarte lijn van 5 mm dikte.<br>2. Voeg een turbocode (blauw-groen-rood) in.<br>3. Ontwerp een doolhof met 3 mogelijke uitgangen.<br>4. Test en kalibreer op de zwarte stip.",
            afsluiting: "Ozobot Grand Prix: wie navigeert het doolhof in de snelste tijd?",
            differentiatie: {
                uitdaging: "Programmeer Ozobot via OzoBlockly in de webbrowser.",
                ondersteuning: "Gebruik voorgedrukte doolhofbladen met stippellijnen."
            }
        };
    }

    // 11. CLASSVR
    if (tekst.includes('classvr') || tekst.includes('vr') || tekst.includes('virtual reality') || tekst.includes('expeditie')) {
        return {
            tijd: "60 minuten",
            tijdsopbouw: { voorbereiding: "10 min", inleiding: "10 min", kern: "30 min", afsluiting: "10 min" },
            organisatie: "Tweetallen: om en om 10 minuten kijken en noteren",
            dgDoelen: {
                domein: "Domein 1: Praktische Kennis — Kerndoel 22b Digitale Media & Informatie",
                kerndoelenWonderwijs: [
                    "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media en info: kritisch onderzoeken hoe virtuele werelden (VR, AR, simulaties) onze waarneming beïnvloeden'.",
                    "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: gyroscopen, sensoren en stereoscopische lenzen die 3D diepte creëren'.",
                    "Kerndoel 3: De gedigitaliseerde wereld (24b) 'Jezelf en de ander: gezonde kijkdiscipline en schermbalans'."
                ],
                leerlingDoelen: "De leerling kan: 1. Uitleggen hoe Virtual Reality een 3D-diepte illusie wekt. 2. Gerichte onderzoeksvragen beantwoorden op basis van een virtuele verkenning. 3. Kritisch reflecteren op de kansen en gevaren van virtuele werelden."
            },
            kistMateriaal: "ClassVR virtual reality brillen in transportkoffer met ingebouwd snellader-systeem, docententablet met ClassVR beheerportaal",
            klasMateriaal: "Klassikale werkbladen over het lesthema (bijv. menselijk lichaam, zonnestelsel), potloden, stabiel schoolnetwerk",
            voorbereiding: "Controleer batterijen en wifi-verbinding en laad de afspeellijst in het docentenportaal.",
            inleiding: "Kijkprotocol: zittend rondkijken, bril met twee handen vasthouden. Leg kort de werking van stereoscopisch zicht uit.",
            kern: "1. Synchrone lancering via het docentenportaal.<br>2. Onderzoeker A verkent de 3D-wereld op focuspunten.<br>3. Co-piloot B stelt vragen vanaf het werkblad.<br>4. Na 10 minuten wisselen van rol.<br>5. Schetsen van de waarnemingen.",
            afsluiting: "Klassikaal napraten over het verschil tussen een 2D schoolboek en een 3D virtuele ervaring.",
            differentiatie: {
                uitdaging: "Onderzoek hoe chirurgen of piloten VR gebruiken in professionele trainingen.",
                ondersteuning: "Kortere sessies van 3-5 minuten voor leerlingen die gevoelig zijn voor beweging."
            }
        };
    }

    // 12. STANDAARD TEMPLATE VOOR OVERIGE KISTEN
    return {
        tijd: "60 minuten",
        tijdsopbouw: { voorbereiding: "10 min", inleiding: "15 min", kern: "25 min", afsluiting: "10 min" },
        organisatie: "Tweetallen of groepjes van 4",
        dgDoelen: {
            domein: "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met technologie",
            kerndoelenWonderwijs: [
                "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken'.",
                "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: bediening en doelgericht gebruik'."
            ],
            leerlingDoelen: "De leerling kan doelgericht experimenteren met het materiaal en samenwerken aan een creatieve oplossing."
        },
        kistMateriaal: `Verwonderlab leskist '${kistNaam}' met bijbehorende accessoires en handleiding`,
        klasMateriaal: "Digibord, tablets of laptops, schrijfspullen",
        voorbereiding: "Zet de materialen klaar en controleer de werking.",
        inleiding: "Activeer voorkennis en bespreek de doelen van de les.",
        kern: "Leerlingen gaan actief en onderzoekend aan de slag in tweetallen.",
        afsluiting: "Bespreek de resultaten klassikaal.",
        differentiatie: { uitdaging: "Geef een verdiepende ontwerpopdracht.", ondersteuning: "Bied extra stappenondersteuning." }
    };
};

window.getPrimaireDgDoelVoorIdee = function(idee) {
    if (idee && idee.lesbrief && idee.lesbrief.dgDoelen && idee.lesbrief.dgDoelen.kerndoelenWonderwijs && idee.lesbrief.dgDoelen.kerndoelenWonderwijs.length > 0) {
        return idee.lesbrief.dgDoelen.kerndoelenWonderwijs[0];
    }
    const kistNaam = (idee ? (idee.kistNaam || window.detecteerKistNaam(idee.titel, idee.beschrijving)) : '').toLowerCase();
    const tekst = ((idee ? ((idee.titel || '') + ' ' + (idee.beschrijving || '')) : '') + ' ' + kistNaam).toLowerCase();

    if (tekst.includes('green screen') || tekst.includes('greenscreen') || tekst.includes('journaal') || tekst.includes('weerbericht')) {
        return "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken' & 22b Digitale media en info";
    }
    if (tekst.includes('3d pen') || tekst.includes('3dpennen') || tekst.includes('3d print') || tekst.includes('filament') || tekst.includes('brug')) {
        return "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken' & 22a Digitale systemen";
    }
    if (tekst.includes('dash') || tekst.includes('robot dance') || tekst.includes('dans')) {
        return "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: loops en sequenties' & 22a Hardwarekoppeling";
    }
    if (tekst.includes('bee-bot') || tekst.includes('beebot') || tekst.includes('schat')) {
        return "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: stappenplan & algoritme' & 22a Knoppenbediening";
    }
    if (tekst.includes('makey') || tekst.includes('fruit') || tekst.includes('stroomkring')) {
        return "Kerndoel 1: Praktische vaardigheden (22a) 'Digitale systemen: stroomkringen & geleiding' & 23a Creëren";
    }
    if (tekst.includes('micro:bit') || tekst.includes('microbit') || tekst.includes('stappen')) {
        return "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: sensordata & variabelen' & 22a Microcontrollers";
    }
    if (tekst.includes('spike essential') || tekst.includes('kermis')) {
        return "Kerndoel 2: Ontwerpen en maken (23a) 'Creëren met technologie & mechanica' & 23b Programmeren";
    }
    if (tekst.includes('spike prime') || tekst.includes('afval') || tekst.includes('sorteerder')) {
        return "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren: if/else beslisstructuren' & 23a Constructies";
    }
    if (tekst.includes('podcast') || tekst.includes('radio') || tekst.includes('interview')) {
        return "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media & interviews' & 23a 'Audio-montage'";
    }
    if (tekst.includes('piximakey') || tekst.includes('stop-motion') || tekst.includes('animatie')) {
        return "Kerndoel 2: Ontwerpen en maken (23a) 'Creëren met technologie & stop-motion' & 22b Digitale media";
    }
    if (tekst.includes('ozobot') || tekst.includes('doolhof') || tekst.includes('kleurcode')) {
        return "Kerndoel 2: Ontwerpen en maken (23b) 'Programmeren met kleurcodes' & 22a Optische sensoren";
    }
    if (tekst.includes('classvr') || tekst.includes('vr') || tekst.includes('expeditie')) {
        return "Kerndoel 1: Praktische vaardigheden (22b) 'Digitale media: immersive VR & 3D' & 24b Balans";
    }
    return "Kerndoel 2: Ontwerpen en maken (23a) 'Combineert verschillende tools en technieken'";
};

let periodes = safeGetLocal('ww_periodes_v11', [{ id: 1, naam: "Periode 1 schooljaar 2026/2027", start: "2026-08-31", eind: "2026-09-20" }]);
let scholen = safeGetLocal('ww_scholen_v1', [{ id: 1, naam: "Binnenstebuiten" }, { id: 2, naam: "De Wegwijzer" }]);
let reserveringen = safeGetLocal('ww_reserveringen_v11', []);
let beheerdersLijst = safeGetLocal('ww_beheerders_v1', []); 
let mijnFavorieten = safeGetLocal('ww_favorieten_v1', []); 
let meldingen = safeGetLocal('ww_meldingen_v1', []); 
let feedbackLijst = safeGetLocal('ww_feedback_v1', []);
const defaultFeedbackConfig = {
    titel: "Hoe is het lesmateriaal bevallen?",
    ondertitel: "Jouw ervaring helpt ons om het Verwonderlab continu te verbeteren en inspiratie te delen met collega-leerkrachten!",
    bedankTitel: "Hartelijk dank voor je feedback!",
    bedankTekst: "We hebben jouw ervaringen, tips en eventuele foto's succesvol ontvangen. Mede dankzij jouw input kunnen we het lesmateriaal in het Verwonderlab continu verbeteren en collega's binnen Wonderwijs inspireren!",
    secties: {
        sterren: { actief: true, titel: "⭐ 1. Algemene beoordeling", toelichting: "Hoe beoordeel je deze leskist over het geheel genomen?" },
        enthousiasme: { 
            actief: true, 
            titel: "👥 2. Ervaring & enthousiasme in de klas", 
            toelichting: "Hoe hebben de leerlingen het werken met dit materiaal ervaren?",
            opties: ["🤩 Zeer enthousiast!", "🙂 Positief & betrokken", "😐 Wisselende reacties", "😕 Moeite met motiveren"]
        },
        compleetheid: {
            actief: true,
            label: "Kwaliteit & compleetheid van de kist:",
            opties: ["✅ Helemaal compleet & gebruiksklaar", "⚠️ Er ontbrak een klein onderdeel", "🔧 Technisch mankement ervaren"]
        },
        toelichting: {
            actief: true,
            label: "Toelichting of ervaringen uit de les:",
            placeholder: "Vertel in een paar zinnen hoe de lessen zijn verlopen. Wat werkte fantastisch en wat kan een volgende leerkracht helpen?"
        },
        dgDoelen: {
            actief: true,
            titel: "🎯 3. Doelen Digitale Geletterdheid (DG)",
            toelichting: "Aan welke domeinen en vaardigheden uit de leerlijn Digitale Geletterdheid is tijdens dit project gewerkt?",
            domeinen: [
                { icoon: "🧠", titel: "Computational Thinking", sub: "Algoritmes, probleemoplossend denken, logica, debuggen en robots programmeren." },
                { icoon: "💻", titel: "ICT-basisvaardigheden", sub: "Hardware en sensoren bedienen, iPads/laptops, opslag en softwarefuncties verkennen." },
                { icoon: "🌐", titel: "Mediawijsheid", sub: "Online veiligheid, privacy, samenwerken, omgangsvormen en media-creatie (bijv. podcast/video)." },
                { icoon: "🔍", titel: "Informatievaardigheden", sub: "Gericht zoeken, informatie selecteren, presenteren en de betrouwbaarheid van bronnen beoordelen." }
            ],
            opdrachtLabel: "Specifieke lesopdracht of kerndoel (optioneel):",
            opdrachtPlaceholder: "Bijv. Een danswedstrijd geprogrammeerd of een stop-motion journaal over het thema 'Natuur' gemaakt"
        },
        fotos: {
            actief: true,
            titel: "📸 4. Foto's & Resultaten delen (Optioneel)",
            toelichting: "Deel foto's van leerlingen aan het werk, van het bouwwerk of het eindresultaat.",
            avg: "* Let op AVG: gezichten van leerlingen uitsluitend delen conform toestemming binnen jullie school."
        },
        onedrive: {
            actief: true,
            label: "Of deel een link naar jullie school SharePoint / OneDrive foto-map:"
        },
        quote: {
            actief: true,
            label: "Quote van een leerling of gouden tip (optioneel):",
            placeholder: "Bijv. 'Juf, mogen we morgen weer programmeren met de robots?'"
        }
    },
    extraVragen: []
};

let feedbackConfig = safeGetLocal('ww_feedback_config_v1', defaultFeedbackConfig);
if (!feedbackConfig.secties) feedbackConfig.secties = defaultFeedbackConfig.secties;
if (!feedbackConfig.extraVragen) feedbackConfig.extraVragen = [];

let leskisten = safeGetLocal('ww_leskisten_v15', []);
const standaardLesideeen = [

    {
        "id": 1,
        "titel": "Dansende Robots: De Wonderwijs Robot Dance Battle",
        "kistNaam": "Dash & Dot Robot",
        "bouw": "Groep 3-5 (Onder- & Middenbouw)",
        "categorie": "Programmeren",
        "afbeelding": "img/les_dansende_robot.jpg",
        "beschrijving": "Leerlingen programmeren Dash tot een swingende dansrobot met choreografieën, loops (herhalingen), lichteffecten en ritmische bewegingen.",
        "link": "",
        "lesbrief": {
            "tijd": "60 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "30 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Tweetallen of drietallen met 1 tablet en 1 Dash robot",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren & Algoritmisch Denken",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23b: Sequenties ontwerpen, loops (herhalingen) toepassen en systematisch debuggen.",
                    "Kerndoel 22a: Draadloze Bluetooth-koppeling en bediening van robotsystemen.",
                    "Kerndoel 24b: Creatieve expressie en effectieve samenwerking in teams."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een opeenvolgende choreografie (algoritme) ontwerpen in blokcode. 2. Een herhaallus (loop) gebruiken om danspassen ritmisch te herhalen. 3. Systematisch een bug in de code opsporen en verbeteren als de robot uit de pas loopt."
            },
            "kistMateriaal": "Dash robots, laadkabels, oranje accessoires (oren/staartjes), optioneel xylofoon of balwerper",
            "klasMateriaal": "Tablets/iPads met de gratis app 'Wonder' of 'Blockly', schilderstape voor dansvlakken (1.5 x 1.5 m), muziekbox voor achtergrondmuziek",
            "voorbereiding": "Laad de Dash robots vooraf volledig op. Installeer de app 'Blockly for Dash & Dot' op de tablets en plak 4 of 5 afgebakende 'dansvloertjes' met schilderstape op de grond.",
            "inleiding": "Zet een vrolijk dansnummer op. Laat de demonstratie-Dash robot één korte dansmove doen met knipperende ooglampjes. Vraag aan de klas: 'Wie vertelt deze robot hoe hij moet bewegen? Kan hij zelf naar de muziek luisteren?' Leg uit dat robots geen eigen hersenen hebben: wij mensen schrijven de exacte instructies (een algoritme). Demonstreer op het digibord hoe je een voorwaartse beweging, een draai van 360° en een lichteffect koppelt.",
            "kern": "1. <strong>De Dance Challenge:</strong> Ontwerp een originele dansroutine van minimaal 30 seconden op het ritme van de muziek.<br>2. <strong>Rollenverdeling:</strong> De Choreograaf (bedenkt de passen op papier), de Programmeur (sleept de blokken in Blockly) en de Tester (plaatst Dash op de dansvloer).<br>3. <strong>Efficiëntie met Loops:</strong> Leerlingen ontdekken de 'Herhaal / Loop' functie: in plaats van 8x dezelfde stap los onder elkaar te zetten, gebruiken ze een herhaallus van 8x.<br>4. <strong>Licht & Sound:</strong> Programmeer de wielen-LEDs en voeg grappige robotgeluiden toe op de beat.<br>5. <strong>Testen & Debuggen:</strong> Rijdt Dash van de dansvloer af of stopt hij te vroeg? Meet de afstanden en pas de timingsfactor in de code aan.",
            "afsluiting": "<strong>De Wonderwijs Robot Dance Battle!</strong> Ieder team toont hun choreografie op de klassikale dansvloer. Reflectievragen: Waarom is een herhaallus (loop) handiger dan 20 losse blokken? Welke bug kwamen jullie tegen en hoe hebben jullie die samen opgelost?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Laat Dash reageren op de omgeving! Programmeer de ingebouwde afstandssensor zodat Dash een pirouette maakt zodra er een hand voor zijn oog beweegt.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Laat leerlingen eerst fysieke pijlenkaarten (vooruit, links, rechts, draai) op de grond neerleggen voordat ze de app openen."
            }
        }
    },
    {
        "id": 2,
        "titel": "Bee-Bot: Schattenjacht & Kaartlezen op de Boerderij",
        "kistNaam": "Bee-Bot",
        "bouw": "Groep 1-2 (Onderbouw)",
        "categorie": "Programmeren",
        "afbeelding": "img/les_beebot_schat.jpg",
        "beschrijving": "Kleuters navigeren een vrolijk robotbijtje over een boerderij-avonturenmat. Spelenderwijs leren ze stappenplannen maken, tellen en ruimtelijke begrippen toepassen.",
        "link": "",
        "lesbrief": {
            "tijd": "45 minuten",
            "tijdsopbouw": {
                "voorbereiding": "5 min",
                "inleiding": "10 min",
                "kern": "25 min",
                "afsluiting": "10 min"
            },
            "organisatie": "Groepjes van 3 à 4 kleuters rondom een vloermat",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23b: Ontdekken dat je een robot aanstuurt met specifieke instructies; stappen in volgorde zetten; fouten herstellen.",
                    "Kerndoel 22a: Eenvoudige bediening van hardwareknoppen (vooruit, achteruit, draai, GO, wissen).",
                    "Kerndoel 22c: Pictogrammen en symbolen koppelen aan fysieke acties."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een eenvoudig stappenplan bedenken van punt A naar B. 2. Ruimtelijke begrippen (vooruit, links, rechts, achteruit) toepassen. 3. Begrijpen dat de robot eerst gewist moet worden ('X') voor een nieuwe route."
            },
            "kistMateriaal": "Bee-Bot robots, laadstation, boerderij vloermatten, richtingskaartjes (oranje pijlen)",
            "klasMateriaal": "Houten blokken (als hekjes/obstakels), fiches of kaartjes met de schat",
            "voorbereiding": "Zorg dat de Bee-Bots zijn opgeladen en leg de matten vlak op de vloer of op aaneengeschoven tafels.",
            "inleiding": "Verzamel de kleuters in de kring. Introduceer Bee-Bot: 'Dit is Bee-Bot, ons robotbijtje! Bee-Bot heeft geen eigen ogen om te zien waar de honing is. Wij zijn de baas van zijn hersenen!' Laat een kind zelf 'robot' spelen: de leerkracht geeft commando's (stap vooruit, draai een kwartslag). Laat vervolgens op de Bee-Bot zien hoe je 2 stappen vooruit programmeert en op GO drukt.",
            "kern": "1. <strong>De Schat & Het Obstakel:</strong> Leg een schatkaartje op een vakje (bijv. bij de schuur) en een modderpoel (blokje) op een tussenliggend vakje.<br>2. <strong>Fysiek Algoritme:</strong> De kleuters leggen éérst de fysieke richtingpijlen neer op de vloer naast de mat.<br>3. <strong>Tellen & Redeneren:</strong> Ze tellen hardop het aantal stappen (bijv. '2 vooruit, 1 draai naar rechts, 1 vooruit').<br>4. <strong>Invoeren & Starten:</strong> Eén kind voert de code in op de knoppen van Bee-Bot en drukt op de groene GO-knop.<br>5. <strong>Debuggen:</strong> Loopt het bijtje tegen het hek? Samen analyseren waar het misging, op het kruisje ('X') drukken en de code corrigeren!",
            "afsluiting": "Kringgesprek: Waarom moeten we altijd eerst op de 'X' (wissen) drukken voordat we een nieuwe route maken? Wat gebeurt er als je die vergeet? (Uitleg van computergeheugen).",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Laat kleuters voor een ander groepje een geheime route programmeren: waar komt Bee-Bot uit als je alleen de pijltjes ziet?",
                "ondersteuning": "<strong>Ondersteuning:</strong> Gebruik een klein pionnetje of speelfiguur om de route stap-voor-stap mee te lopen over de mat."
            }
        }
    },
    {
        "id": 3,
        "titel": "Green Screen: Live Schooljournaal & Weerbericht",
        "kistNaam": "Green Screen Studio",
        "bouw": "Groep 5-8 (Bovenbouw)",
        "categorie": "Mediawijsheid",
        "afbeelding": "img/les_greenscreen_journaal.jpg",
        "beschrijving": "Tover het klaslokaal om tot een professionele televisiestudio. Leerlingen schrijven scripts, presenteren voor een groen scherm en ontdekken hoe media de werkelijkheid manipuleren.",
        "link": "",
        "lesbrief": {
            "tijd": "75 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "35 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Studioteams van 4: Presentator, Cameraman, Regisseur/Script, Geluid/Props",
            "dgDoelen": {
                "domein": "Domein 1: Praktische Kennis — Kerndoel 22b Digitale Media & Informatie",
                "kerndoelenWonderwijs": [
                    "Kerndoel 22b: Begrijpen hoe media worden geproduceerd, hoe framing werkt en dat beeldmateriaal digitaal gemanipuleerd kan worden.",
                    "Kerndoel 23a: Een multimediaproduct (video-uitzending) opnemen en monteren met chroma-key technologie.",
                    "Kerndoel 24b: Respectvol samenwerken in een mediateam en presentatievaardigheden ontwikkelen."
                ],
                "leerlingDoelen": "De leerling kan: 1. Uitleggen hoe een groen scherm (chroma-keying) werkt. 2. Een beknopt videoscript schrijven en presenteren voor de camera. 3. Kritisch reflecteren op beeldbewerking en nepnieuws in moderne media."
            },
            "kistMateriaal": "Groot groen scherm (achterwand met statief), iPad-statief met klem, externe microfoon met lange kabel, studiolampen",
            "klasMateriaal": "iPads met Green Screen by Do Ink app (of CapCut/iMovie), verkleedkleren of props (microfoon, paraplu, weerkaarten)",
            "voorbereiding": "Span het groene doek kreukvrij op tegen een egale muur en zorg voor gelijkmatige verlichting zonder harde slagschaduwen.",
            "inleiding": "Toon een kort fragment van het echte Jeugdjournaal of een spectaculaire Hollywoodfilm. Toon daarna de 'behind the scenes' beelden met een groen scherm. Vraag: 'Waarom gebruiken televisiemakers een groen scherm en geen wit scherm?' (Uitleg over chroma-keying en het grote kleurcontrast met menselijke huidtinten).",
            "kern": "1. <strong>Thema Kiezen:</strong> Teams kiezen een format: Het Wonderwijs Weerbericht van het jaar 2050 of Live verslaggeving vanaf een vulkaanuitbarsting.<br>2. <strong>Draaiboek Schrijven:</strong> De Regisseur en Presentator schrijven een strak draaiboek van max. 60 seconden met openingszin, kernfeit en afkondiging.<br>3. <strong>Achtergrond Selecteren:</strong> De Cameraman zoekt in de beeldbank naar een geschikte achtergrondvideo of foto (bijv. onweer, tornado, zon).<br>4. <strong>Kledingcheck:</strong> Absoluut géén groene kleding aan, anders verdwijnt je lichaam in de weerskaart!<br>5. <strong>Opname:</strong> Live opnemen in de Green Screen app en direct terugkijken hoe de achtergrond synchroon samensmelt.",
            "afsluiting": "Klassikale bioscoopvertoning op het digibord! Reflectievragen: Hoe betrouwbaar zijn filmpjes die je ziet op TikTok of Instagram? Kun je alles geloven wat er levensecht uitziet? (Koppeling naar deepfakes en AI-beeldmanipulatie).",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Voeg 'Picture-in-Picture' toe: een verslaggever in de studio die live schakelt naar een verslaggever ter plaatse in een klein kader.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Geef een invul-scriptblad met kant-en-klare zinnen en vaste rollen."
            }
        }
    },
    {
        "id": 4,
        "titel": "Makey Makey: Het Zingende Fruit & Menselijke Stroomkringen",
        "kistNaam": "Makey Makey",
        "bouw": "Groep 4-6 (Middenbouw)",
        "categorie": "Creatief",
        "afbeelding": "img/les_makeymakey_piano.jpg",
        "beschrijving": "Verander bananen, appels en je eigen klasgenoten in een interactief pianotoetsenbord! Leerlingen ontdekken geleiding, gesloten stroomkringen en computertoetsenbord-emulatie.",
        "link": "",
        "lesbrief": {
            "tijd": "60 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "25 min",
                "afsluiting": "10 min"
            },
            "organisatie": "Tweetallen of viertallen per Makey Makey kit en laptop/Chromebook",
            "dgDoelen": {
                "domein": "Domein 1: Praktische Kennis — Kerndoel 22a Digitale Systemen",
                "kerndoelenWonderwijs": [
                    "Kerndoel 22a: Begrijpen hoe invoerapparaten (toetsenbord/muis) signalen naar een computer sturen via fysieke stroomkringen.",
                    "Kerndoel 23a: Fysieke voorwerpen uit de leefwereld transformeren tot interactieve technologie.",
                    "Kerndoel 23b: Gebeurtenisgestuurd programmeren (Event-driven: 'Wanneer toets X ingedrukt -> speel toon Y')."
                ],
                "leerlingDoelen": "De leerling kan: 1. Het verschil uitleggen tussen geleiders en isolatoren. 2. Een gesloten elektrische stroomkring maken met aarding (Earth). 3. Fysieke voorwerpen koppelen aan digitale interacties in een computerprogramma."
            },
            "kistMateriaal": "Makey Makey printplaten, rode USB-kabels, krokodillenklemmen, aardingsdraad",
            "klasMateriaal": "Laptops/Chromebooks met internet (Makey Makey piano of Scratch), vers fruit (bananen, appels, mandarijnen), potloodtekeningen (grafiet), aluminiumfolie",
            "voorbereiding": "Open op de computers de officiële Makey Makey Piano webapp (makeymakey.com/piano) of een Scratch pianoproject.",
            "inleiding": "Sluit stiekem een Makey Makey aan op een banaan en houd zelf de aardedraad vast. Raak de banaan aan: er klinkt een pianotoon! Vraag de klas: 'Hoe kan een banaan piano spelen?' Leg het principe van een gesloten elektrische stroomkring en aarding (Earth) uit op kindniveau.",
            "kern": "1. <strong>Geleidingsonderzoek:</strong> Test welke voorwerpen stroom geleiden: een liniaal? Een gum? Een appel? Een hand van een klasgenoot?<br>2. <strong>Klemmen Bevestigen:</strong> Koppel de krokodillenklemmen aan de pijltjestoetsen en spatiebalk op het Makey Makey bordje.<br>3. <strong>Het Fruitorgel:</strong> Prik de klemmen in 4 verschillende stukken fruit.<br>4. <strong>De Aardingskabel:</strong> Eén leerling houdt de aardingskabel (Earth) vast. Zodra hij of zij een banaan aanraakt, sluit de stroomkring en weerklinkt de muziek!<br>5. <strong>Muziekstuk Oefenen:</strong> Oefen samen een herkenbaar liedje (bijv. 'Kortjakje' of 'Vader Jacob') op het fruit.",
            "afsluiting": "Klassikaal fruitconcert! Reflectievragen: Waarom geleidt een banaan wel stroom en hout niet? Hoe gebruikt het touchscreen op een iPad ditzelfde principe van elektrische geleiding van je vinger?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Maak een 'High Five Piano' waarbij twee leerlingen elkaar een high five geven om een toon te laten klinken.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Gebruik eerst grote stroken aluminiumfolie die eenvoudig met klemmen vast te zetten zijn."
            }
        }
    },
    {
        "id": 5,
        "titel": "Micro:bit: Slimme Stappenteller & Gezonde School Challenge",
        "kistNaam": "Micro:bit",
        "bouw": "Groep 6-8 (Bovenbouw)",
        "categorie": "Programmeren",
        "afbeelding": "img/les_microbit_stappen.jpg",
        "beschrijving": "Ontwerp en programmeer een draagbare stappenteller (wearable technology). Leerlingen gebruiken de ingebouwde versnellingsmeter, variabelen en logische voorwaarden.",
        "link": "",
        "lesbrief": {
            "tijd": "70 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "30 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Duo's per Micro:bit en computer/Chromebook",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23b: Werken met variabelen ('stappen = stappen + 1'), logische voorwaarden en sensorsignalen.",
                    "Kerndoel 22c: Data verzamelen, opslaan in het chipgeheugen en visualiseren op een LED matrix.",
                    "Kerndoel 24c: De invloed van wearables en sensortechnologie op gezondheid en maatschappij analyseren."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een variabele aanmaken en ophogen met 1 bij een sensor-actie. 2. Code flashen naar een losse microprocessor. 3. Onderzoeken hoe accuraat digitale metingen zijn en data interpreteren."
            },
            "kistMateriaal": "Micro:bit V2 bordjes, batterijhouders met 2x AAA batterijen, micro-USB kabels, elastische polsbandjes",
            "klasMateriaal": "Laptops met toegang tot makecode.microbit.org, schaar, tape, papier om een horlogekastje te knutselen",
            "voorbereiding": "Zorg dat de batterijen vol zijn en test vooraf of de browser WebUSB ondersteunt voor direct downloaden.",
            "inleiding": "Vraag de klas: 'Wie heeft er thuis een smartwatch of stappenteller? Hoe weet zo'n apparaatje het verschil tussen een stap en een armzwaai?' Introduceer de ingebouwde 3D-versnellingsmeter (accelerometer) op het Micro:bit bordje.",
            "kern": "1. <strong>Variabele Maken:</strong> Open Microsoft MakeCode en maak een variabele aan genaamd 'Stappen'.<br>2. <strong>Opstartwaarde:</strong> Programmeer: 'Bij opstarten -> stel Stappen in op 0'.<br>3. <strong>Schud-Sensor:</strong> Voeg het input-blok toe: 'Wanneer geschud -> verander Stappen met 1' en 'Toon getal Stappen'.<br>4. <strong>Flashen:</strong> Download het .hex bestand naar de Micro:bit en koppel de batterijhouder aan.<br>5. <strong>Polsbandje:</strong> Bevestig de Micro:bit om je pols of enkel met het elastische bandje.<br>6. <strong>Schoolplein-Test:</strong> Ren 50 stappen over het schoolplein. Geeft de teller precies 50 aan? Pas indien nodig de gevoeligheid aan in de code.",
            "afsluiting": "Vergelijk de scores van de teams. Reflectievragen: Waarom meet een sensor soms een valse stap? Hoe filteren slimme algoritmes in echte smartwatches dit weg?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Programmeer een feestelijk overwinningsmuziekje via de ingebouwde speaker zodra de teller 100 stappen bereikt.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Toon het complete blokkenschema als voorbeeld op het digibord."
            }
        }
    },
    {
        "id": 6,
        "titel": "LEGO Spike Essential: De Slimme Kermis & Veilig Reuzenrad",
        "kistNaam": "LEGO Spike Essential",
        "bouw": "Groep 3-5 (Middenbouw)",
        "categorie": "Techniek & Bouwen",
        "afbeelding": "img/les_legospike_kermis.jpg",
        "beschrijving": "Bouw met tandwielen en assen een spectaculair reuzenrad en programmeer motoren en kleurensensoren om de attractie volautomatisch en veilig te laten draaien.",
        "link": "",
        "lesbrief": {
            "tijd": "75 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "35 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Duo's per LEGO Spike Essential koffer en iPad",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met Technologie & 23b Programmeren",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23a: Fysieke constructies (mechanica, tandwieloverbrenging) ontwerpen en combineren met digitale motoren.",
                    "Kerndoel 23b: Motoren aansturen met blokcode en sensoren gebruiken voor voorwaardelijke acties (stop bij rood, start bij groen).",
                    "Kerndoel 22a: De samenwerking tussen invoer (sensor), verwerking (hub) en uitvoer (motor) begrijpen."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een draaiende constructie bouwen met tandwielen. 2. Een motor programmeren op snelheid, richting en tijd. 3. Een kleurensensor inzetten als interactieve start/stop-knop."
            },
            "kistMateriaal": "LEGO Spike Essential sets (hub, kleine motor, kleursensor, bouwstenen, minifiguren)",
            "klasMateriaal": "Tablets met de LEGO Education SPIKE app geïnstalleerd",
            "voorbereiding": "Zorg dat de Spike hubs zijn opgeladen via de USB-kabel en leg de sorteertrays overzichtelijk klaar.",
            "inleiding": "Toon een filmpje van een reuzenrad in een pretpark. Vraag: 'Hoe weet de machinist wanneer het rad moet stoppen zodat mensen veilig kunnen in- en uitstappen? Doet hij alles met de hand, of helpen sensoren?' Demonstreer hoe de kleursensor van LEGO reageert op een rode en groene tegel.",
            "kern": "1. <strong>Bouwfase:</strong> Volg het model 'Reuzenrad' in de SPIKE app en bouw het stevige onderstel met tandwieloverbrenging.<br>2. <strong>Koppelen:</strong> Verbind de hub via Bluetooth met de tablet.<br>3. <strong>Motor Aansturen:</strong> Programmeer de motor: 'Start motor op snelheid 30, wacht 4 seconden, stop motor'.<br>4. <strong>Veiligheidssensor Toevoegen:</strong> Voeg de kleurensensor toe als noodknop: 'Als sensor = Rood, zet motor DIRECT stil; Als sensor = Groen, hervat draaien'.<br>5. <strong>Lichtshow:</strong> Programmeer de 3x3 LED-matrix op de hub zodat er knipperende kermiskleuren te zien zijn tijdens de rit.",
            "afsluiting": "Klassikale kermisparade: alle attracties draaien tegelijk! Reflectievragen: Wat gebeurt er als je een groot tandwiel aandrijft met een klein tandwiel? Hoe zorgen sensoren voor veiligheid in het dagelijks leven?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Laat het reuzenrad na elke halve slag 3 seconden automatisch stoppen voor het in- en uitstappen van de passagiers.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Laat leerlingen eerst de standaardmodel-instructie exact voltooien voordat ze eigen aanpassingen toevoegen."
            }
        }
    },
    {
        "id": 7,
        "titel": "LEGO Spike Prime: Geautomatiseerde Afvalsorteerder van de Toekomst",
        "kistNaam": "LEGO Spike Prime",
        "bouw": "Groep 7-8 (Bovenbouw)",
        "categorie": "Techniek & Bouwen",
        "afbeelding": "img/les_legospike_afval.jpg",
        "beschrijving": "Leerlingen lossen een wereldwijd duurzaamheidsprobleem op. Ze ontwerpen een gerobotiseerde sorteerstraat die met sensoren plastic, papier en restafval herkent en scheidt.",
        "link": "",
        "lesbrief": {
            "tijd": "90 minuten (of 2 dagdelen van 45 min)",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "45 min",
                "afsluiting": "20 min"
            },
            "organisatie": "Groepjes van 3: Constructeur, Software-engineer, Kwaliteitscontroleur",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23b: Complexe beslisstructuren (Als... Dan... Anders...), sensorkalibratie en servomotoraansturing in graden.",
                    "Kerndoel 23a: Iteratief ontwerpen en mechanische grijpers of duwers construeren.",
                    "Kerndoel 24c: De rol van robotica en automatisering in circulaire economie en milieubescherming onderzoeken."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een geautomatiseerde sorteermachine ontwerpen en bouwen. 2. Een if/else-algoritme programmeren op basis van sensordata. 3. Uitleggen hoe industriële automatisering bijdraagt aan recycling."
            },
            "kistMateriaal": "LEGO Spike Prime sets (grote hub, krachtige motoren, kleursensor, afstandssensor, tandwielen, hefbomen)",
            "klasMateriaal": "Laptops/Chromebooks met SPIKE app, gekleurde teststeentjes (geel = plastic, blauw = papier, rood = restafval)",
            "voorbereiding": "Laad de hubs op en zet bakjes klaar met 'afval'-blokjes in geel, blauw en rood.",
            "inleiding": "Bespreek de plasticsoep en moderne recyclingfabrieken: 'Elke dag gooien we duizenden tonnen afval weg. Mensen kunnen dat onmogelijk met de hand sorteren. Hoe herkent een sorteermachine wat plastic is en wat papier?' Introduceer optische sensoren en robotarmen.",
            "kern": "1. <strong>Mechanisch Ontwerp:</strong> Bouw een transportgoot of robotarm aangedreven door de medium servomotor.<br>2. <strong>Sensoropstelling:</strong> Monteer de kleurensensor precies boven de sorteerplek.<br>3. <strong>Beslisboom Programmeren:</strong> Programmeer: 'Als Kleur = Geel (plastic), draai motor A naar 60 graden (Bak 1); Als Kleur = Blauw (papier), draai motor A naar -60 graden (Bak 2); Anders naar Bak 3'.<br>4. <strong>Nulpunt Reset:</strong> Zorg dat de robotarm na het wegdrukken altijd weer keurig terugkeert naar 0 graden.<br>5. <strong>De 10-Stuks Stresstest:</strong> Voer 10 willekeurige steentjes snel achter elkaar in. Haalt de machine een 100% foutloze score? Optimaliseer de reactietijd!",
            "afsluiting": "Presentatie van de sorteerlijnen. Reflectievragen: Wat gebeurt er als een steentje vies of verkleurd is? Hoe lost AI-computervisie dit op in echte fabrieken?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Programmeer de ultrasone afstandssensor zodat de machine automatisch piept en stopt wanneer de opvangbak vol is.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Geef een schematisch stroomdiagram van het beslisalgoritme mee als visuele leidraad."
            }
        }
    },
    {
        "id": 8,
        "titel": "Podcast Studio: De Wonderwijs Nieuwsradio & Spraakmakende Interviews",
        "kistNaam": "Podcast Studio",
        "bouw": "Groep 6-8 (Bovenbouw)",
        "categorie": "Mediawijsheid",
        "afbeelding": "img/les_podcast_radio.jpg",
        "beschrijving": "Richt een professionele audio-opnamestudio in de klas in. Leerlingen interviewen de directeur, een leerkracht of elkaar over actuele thema's en monteren realtime jingles.",
        "link": "",
        "lesbrief": {
            "tijd": "75 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "35 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Redactiegroepjes van 4: Presentator/Interviewer, Gast, Geluidstechnicus, Redacteur/Tijdwaarnemer",
            "dgDoelen": {
                "domein": "Domein 1: Praktische Kennis — Kerndoel 22b Digitale Media & Informatie",
                "kerndoelenWonderwijs": [
                    "Kerndoel 22b: Journalistieke vaardigheden, open vragen formuleren, bronnen interviewen en de impact van audio op meningsvorming begrijpen.",
                    "Kerndoel 23a: Digitale audio-opnames maken, mengpaneel bedienen, volumes afstellen en sound effects mixen.",
                    "Kerndoel 24a: Auteursrecht van muziek/jingles respecteren en toestemming (privacy) vragen voor opname."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een journalistiek interview voorbereiden met open vragen. 2. Professionele audioapparatuur bedienen (microfoons, mixer, koptelefoons). 3. Een boeiende audio-opname maken met jingles en strakke timing."
            },
            "kistMateriaal": "Podcast mengtafel, condensatormicrofoons op bureauarmen, popfilters, over-ear koptelefoons, SD-kaart / USB-kabels",
            "klasMateriaal": "Laptop/Chromebook met Audacity of Soundtrap (of interne SD-opname van het mengpaneel), kladblokken voor het draaiboek",
            "voorbereiding": "Zet de podcastset klaar op een rustige tafel in een lege spreekkamer of rustige hoek van het lokaal.",
            "inleiding": "Luister klassikaal naar een fragment van 1 minuut uit een populaire jeugdpodcast. Vraag: 'Waarom trekt de jingle meteen je aandacht? Wat is het verschil tussen een open vraag (Waarom vind je...) en een gesloten vraag (Vind je het leuk: ja/nee)?' Bespreek microfoondiscipline: praat recht in het popfilter op een vuistafstand.",
            "kern": "1. <strong>Thema Kiezen:</strong> Kies een prikkelend thema (bijv. 'Moet huiswerk worden afgeschaft?' of 'Hoe ziet school eruit in 2050?').<br>2. <strong>Draaiboek Maken:</strong> Jingle (10 sec) -> Welkom & Intro -> 3 dieptevragen aan de gast -> Grappig dilemma van de week -> Outro & bedankje.<br>3. <strong>Soundpads Instellen:</strong> Wijs grappige geluidseffecten toe onder de gekleurde knoppen van de mengtafel (applaus, lachband, gong).<br>4. <strong>Geluidscheck:</strong> Test de niveaus op de koptelefoons tegen oversturing (rode balkjes voorkomen!).<br>5. <strong>Opname:</strong> Neem de podcast van maximaal 5 minuten op in één geconcentreerde live-take!",
            "afsluiting": "Klassikaal luistercafé: beluister de gemaakte podcasts. Beoordeel elkaar met tops en tips op interviewstijl, verstaanbaarheid en dynamiek.",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Monteer in Soundtrap een eigen gecomponeerde jingle met rechtenvrije loops onder het intro.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Geef een overzicht met 10 sterke starters voor open interviewvragen mee."
            }
        }
    },
    {
        "id": 9,
        "titel": "3D Pennen: Dragende Bruggen & Architectuur Challenge",
        "kistNaam": "3D Pennen",
        "bouw": "Groep 5-8 (Midden- & Bovenbouw)",
        "categorie": "Creatief",
        "afbeelding": "img/les_3dpen_brug.jpg",
        "beschrijving": "Teken letterlijk in 3D in de lucht! Leerlingen ontwerpen dragende vakwerkconstructies van bioplastic en testen welke brug het meeste gewicht kan dragen.",
        "link": "",
        "lesbrief": {
            "tijd": "60 minuten",
            "tijdsopbouw": {
                "voorbereiding": "5 min",
                "inleiding": "10 min",
                "kern": "35 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Duo's per 3D pen en hittebestendige tekenmat",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met Technologie",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23a: Van een 2D bouwtekening/blauwdruk naar een fysiek 3D-object transformeren; materiaaleigenschappen van thermoplastisch polymeer begrijpen.",
                    "Kerndoel 22a: Begrijpen hoe additive manufacturing (laag-voor-laag 3D-printen) in moderne technologie werkt.",
                    "Kerndoel 23b: Constructielogica en ruimtelijk inzicht toepassen (driehoeksverbindingen vs. vierkanten)."
                ],
                "leerlingDoelen": "De leerling kan: 1. Veilig werken met een 3D pen en PLA bioplastic. 2. Een dragend vakwerk ontwerpen met driehoeksconstructies. 3. Losse 2D-componenten in de ruimte aan elkaar lassen tot een stevig 3D-bouwwerk."
            },
            "kistMateriaal": "3D Pennen, stroomadapters, hittebestendige siliconen matten, vingerbeschermers, ontwerpsjablonen",
            "klasMateriaal": "PLA filament in diverse kleuren, scharen, testgewichtjes (waterflesjes/gewichten), twee houten blokken als overspanning",
            "voorbereiding": "Sluit de adapters aan op veilige stekkerdozen en leg de matjes klaar. Zorg voor goede ventilatie in het lokaal.",
            "inleiding": "Veiligheidsinstructie: de metalen penpunt wordt 190°C! Raak deze nooit aan en leg de pen altijd in de houder. Demonstreer de magie van 3D: teken een vierkant op de mat, teken vervolgens een stutbalkje recht omhoog in de lucht, blaas 2 seconden zachtjes en laat zien hoe het plastic direct stolt.",
            "kern": "1. <strong>De Challenge:</strong> Bouw een brug met een vrije overspanning van minstens 15 cm die minstens 250 gram kan dragen.<br>2. <strong>Blauwdruk Schetsen:</strong> Schets eerst het vakwerk op papier. Waarom gebruiken ingenieurs bij echte bruggen altijd driehoeken? (Driehoeken kunnen niet vervormen).<br>3. <strong>2D Zijkanten Tekenen:</strong> Teken eerst de twee platte zijkanten van de brug op het siliconenmatje.<br>4. <strong>3D Assemblage:</strong> Zodra de zijkanten zijn afgekoeld, zet je ze rechtop en 'las' je dwarse stutbalken ertussen met een drupje vloeibaar filament.<br>5. <strong>Afwerken:</strong> Controleer alle lasnaden op stevigheid.",
            "afsluiting": "De Grote Sterktemeting! Plaats de bruggen tussen twee tafels. Hang een emmertje met gewichten aan het midden van de brug. Welke brug houdt het langst stand en waarom?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Bouw een beweegbare ophaalbrug of een brug met een boogconstructie.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Laat leerlingen overtrekken van voorgedrukte vakwerksjablonen onder een transparant bakpapiertje."
            }
        }
    },
    {
        "id": 10,
        "titel": "Piximakey: Magische Stop-Motion Animatie & Storytelling",
        "kistNaam": "Piximakey",
        "bouw": "Groep 3-8 (Alle bouwen)",
        "categorie": "Creatief",
        "afbeelding": "img/les_piximakey_animatie.jpg",
        "beschrijving": "Breng kleifiguurtjes en legopoppetjes tot leven beeldje voor beeldje. Leerlingen creëren hun eigen animatiefilm met de houten Piximakey studio koffer.",
        "link": "",
        "lesbrief": {
            "tijd": "75 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "15 min",
                "kern": "35 min",
                "afsluiting": "15 min"
            },
            "organisatie": "Groepjes van 3: Regisseur/Scenarioschrijver, Animator/Poppenspeler, Cameraman/Editor",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23a Creëren met Technologie",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23a: Een multimediaal verhaal (storyboard, personages, decors) digitaal vormgeven en produceren.",
                    "Kerndoel 22b: Begrijpen van filmische illusie, framerates (10-12 foto's per seconde = vloeiende beweging) en visuele dramaturgie.",
                    "Kerndoel 24b: Samenwerken in filmploegen met duidelijke taakverdeling en geduld."
                ],
                "leerlingDoelen": "De leerling kan: 1. Een kort storyboard maken met begin, midden en eind. 2. De techniek van stop-motion en onion skinning toepassen. 3. Geluidseffecten en titels toevoegen aan een digitale animatie."
            },
            "kistMateriaal": "Piximakey houten koffers (uitklapbaar tot ministudio), houten iPad standaards met vaste hoek",
            "klasMateriaal": "Tablets met de gratis Piximakey app, plasticine boetseerklei, gekleurd achtergrondpapier, lego poppetjes",
            "voorbereiding": "Klap de houten koffers open op stevige tafels en plak ze vast met een klein stukje schilderstape zodat de camera absoluut stilstaat.",
            "inleiding": "Toon een kort fragment van Shaun the Sheep of Buurman & Buurman. Vraag: 'Hoe kunnen kleipoppetjes rennen als ze geen motortje hebben?' Leg het principe van stop-motion uit: film is een snelle reeks foto's (12 frames per seconde).",
            "kern": "1. <strong>Kort Verhaal:</strong> Bedenk een verhaaltje van max. 15 seconden (Begin -> Verrassing -> Oplossing).<br>2. <strong>Karakters Maken:</strong> Boetseer 1 of 2 kleikarakters met een stevige, platte voet zodat ze niet omvallen.<br>3. <strong>De Gouden Regel:</strong> Beweeg het figuurtje slechts 2 millimeter, haal alle handen uit beeld, en druk op de rode fotoknop.<br>4. <strong>Onion Skinning:</strong> Gebruik de schaduwfunctie van het vorige beeldje om te controleren of de beweging vloeiend is.<br>5. <strong>Geluid & Effecten:</strong> Voeg in de app passende geluidseffecten toe (bijv. een 'boing', voetstappen of een plons).",
            "afsluiting": "De Wonderwijs Filmpremière op het digibord met applaus! Bespreek: wat maakte een animatie vloeiend en wat maakte het schokkerig?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Laat een voorwerp 'vliegen' of transformeren van vorm door tussenbeeldjes slim aan te passen.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Gebruik kant-en-klare LEGO minifiguren in plaats van klei voor snellere stabiliteit."
            }
        }
    },
    {
        "id": 11,
        "titel": "Ozobot: Kleurcodes & Doolhof Navigatie",
        "kistNaam": "Ozobot",
        "bouw": "Groep 3-5 (Middenbouw)",
        "categorie": "Programmeren",
        "afbeelding": "img/les_ozobot_doolhof.jpg",
        "beschrijving": "Teken met stiften routes en kleurcodes op papier. De minirobot herkent kleurenvolgordes met optische sensoren en voert acties uit zoals turboversnelling, omkeren en pirouettes.",
        "link": "",
        "lesbrief": {
            "tijd": "50 minuten",
            "tijdsopbouw": {
                "voorbereiding": "5 min",
                "inleiding": "10 min",
                "kern": "25 min",
                "afsluiting": "10 min"
            },
            "organisatie": "Tweetallen per Ozobot",
            "dgDoelen": {
                "domein": "Domein 2: Ontwerpen & Maken — Kerndoel 23b Programmeren",
                "kerndoelenWonderwijs": [
                    "Kerndoel 23b: Analoge en digitale codeerprincipes; algoritmes ontwerpen via visuele kleurencodes; oorzaak en gevolg.",
                    "Kerndoel 22a: Werking van optische sensoren en lijnvolgers begrijpen; input leidt tot output.",
                    "Kerndoel 22c: Kleurencodes als binaire/gecodeerde datataal ontcijferen."
                ],
                "leerlingDoelen": "De leerling kan: 1. De werking van optische sensoren uitleggen. 2. Nauwkeurige stiftlijnen en kleurcodes tekenen volgens specificaties. 3. Een logische route ontwerpen met vertakkingen en snelheidsveranderingen."
            },
            "kistMateriaal": "Ozobot Bit/Evo robots, speciale stiften (zwart, rood, groen, blauw), kleurcode referentiekaarten, kalibreerkaarten",
            "klasMateriaal": "Witte A3 tekenvellen, linialen, potloden, correctiestickers (witte tape)",
            "voorbereiding": "Kalibreer de Ozobots vooraf op de zwarte kalibratiestip en controleer of de viltstiften goed vloeien.",
            "inleiding": "Laat een Ozobot over een wit vel rijden. Teken met een dikke zwarte stift een lijn: de robot vindt direct de lijn en volgt hem! Teken nu een blokje [rood-groen-blauw] op de lijn: de robot begint ineens razendsnel te spinnen! Vraag: 'Hoe leest deze robot zonder scherm onze opdrachten?' (Optische kleurensensoren onder de buik).",
            "kern": "1. <strong>De Challenge:</strong> De Ozobot is een slimme reddingsrobot die door een gevaarlijk doolhof naar het veilige basiskamp moet navigeren.<br>2. <strong>Tekenregels:</strong> Zwarte lijnen moeten precies 5 mm dik zijn (de breedte van de stiftpunt). Bochten mogen niet haaks zijn.<br>3. <strong>Kleurcodes Invoegen:</strong> Plaats kleurcombinaties voor kruispunten (bijv. linksaf [groen-zwart-rood], turbo [blauw-groen-blauw], U-bocht [blauw-rood-blauw]).<br>4. <strong>Testen & Debuggen:</strong> Als de Ozobot stopt of de verkeerde kant op gaat, inspecteren leerlingen de stiftlijnen met een liniaal en overplakken ze foutjes met een wit stickertje.",
            "afsluiting": "Wissel banen uit tussen de teams! Laat elkaars doolhoven kraken. Reflectievragen: Waarom kan een computer niet tegen onduidelijke instructies (zoals een vage stiftlijn)? Hoe verhoudt dit zich tot echte barcode- en QR-scanners in de supermarkt?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Programmeer de Ozobot vervolgens via het digitale platform OzoBlockly op de tablet.",
                "ondersteuning": "<strong>Ondersteuning:</strong> Geef doolhofbladen met voorgedrukte stippellijnen en vakjes voor de kleurcodes."
            }
        }
    },
    {
        "id": 12,
        "titel": "ClassVR: Virtuele Expeditie door het Menselijk Lichaam & Ruimte",
        "kistNaam": "VR Brillen",
        "bouw": "Groep 6-8 (Bovenbouw)",
        "categorie": "Mediawijsheid",
        "afbeelding": "img/les_classvr_expeditie.jpg",
        "beschrijving": "Stap fysiek in de menselijke bloedbaan of zweef langs de ringen van Saturnus. Leerlingen ervaren Virtual Reality en ontdekken hoe immersieve 3D-simulaties werken.",
        "link": "",
        "lesbrief": {
            "tijd": "60 minuten",
            "tijdsopbouw": {
                "voorbereiding": "10 min",
                "inleiding": "10 min",
                "kern": "30 min",
                "afsluiting": "10 min"
            },
            "organisatie": "Tweetallen: om en om 10 minuten kijken en 10 minuten observeren/verslagleggen",
            "dgDoelen": {
                "domein": "Domein 1: Praktische Kennis — Kerndoel 22b Digitale Media & Informatie",
                "kerndoelenWonderwijs": [
                    "Kerndoel 22b: Kritisch onderzoeken hoe virtuele werelden (VR, AR, simulaties) worden gecreëerd en onze waarneming beïnvloeden.",
                    "Kerndoel 22a: Begrijpen hoe gyroscopen en stereoscopische lenzen een 3D-diepte-illusie en 360-graden tracking creëren.",
                    "Kerndoel 24b: Schermtijd, kijkdiscipline en het effect van immersieve technologie op het menselijk brein analyseren."
                ],
                "leerlingDoelen": "De leerling kan: 1. Uitleggen hoe Virtual Reality een 3D-diepte illusie wekt. 2. Gerichte onderzoeksvragen beantwoorden op basis van een virtuele verkenning. 3. Kritisch reflecteren op de kansen en gevaren van meeslepende virtuele werelden."
            },
            "kistMateriaal": "ClassVR brillenset in koffer met laadsysteem, leerkracht tablet voor het ClassVR beheerportaal",
            "klasMateriaal": "Klassikale werkbladen 'Expeditie Menselijk Lichaam / Zonnestelsel', potloden",
            "voorbereiding": "Zet de brillen aan in de koffer, controleer of ze verbonden zijn met het schoolnetwerk en laad de playlist klaar in het leerkrachtportaal.",
            "inleiding": "Veiligheids- en kijkprotocol: 1. Altijd rustig zittend op een stoel rondkijken (niet rondlopen om valgevaar te voorkomen). 2. Bril met beide handen vasthouden. 3. Hand opsteken bij lichte duizeligheid (motion sickness). Leg kort uit hoe stereoscopisch zicht werkt: twee verschillende camerahoeken die in onze hersenen samensmelten tot diepte.",
            "kern": "1. <strong>Synchrone Lancering:</strong> De leerkracht lanceert via het portaal synchroon de 360-graden ervaring (bijv. 'Binnenkant van een kloppend menselijk hart' of 'Het oppervlak van Mars').<br>2. <strong>Onderzoeker A:</strong> Leerling A zet de bril op en verkent de omgeving. De leerkracht plaatst een digitaal 'focuspunt' (POI) op een hartklep of krater.<br>3. <strong>Co-Piloot B:</strong> Leerling B fungeert als Co-Piloot op aarde en stelt gerichte onderzoeksvragen vanaf het werkblad.<br>4. <strong>Rollen Wisselen:</strong> Na 10 minuten wisselen de rollen om zodat beide leerlingen actief kijken én noteren.<br>5. <strong>Verslaglegging:</strong> Leerlingen schetsen en benoemen de onderdelen die ze in 3D rondom zich zagen zweven.",
            "afsluiting": "Klassikaal napraten: Hoe voelde het om 'in' het hart te staan in vergelijking met een plaatje in een schoolboek? Waarvoor wordt VR tegenwoordig gebruikt buiten school (bijv. chirurgen die operaties oefenen, piloten in vluchtsimulators)?",
            "differentiatie": {
                "uitdaging": "<strong>Steropdracht:</strong> Laat leerlingen nadenken over een ethisch dilemma: Zou je een VR-bril 8 uur per dag op willen hebben in een virtuele wereld (Metaverse)? Waarom wel/niet?",
                "ondersteuning": "<strong>Ondersteuning:</strong> Begeleid leerlingen die gevoelig zijn voor beweging met kortere kijktijden van 3 tot 5 minuten."
            }
        }
    }
];
window.standaardLesideeen = standaardLesideeen;

window.verrijkLesideeen = function(ideeenLijst) {
    if (!ideeenLijst || ideeenLijst.length === 0) {
        return [...standaardLesideeen];
    }
    return ideeenLijst.map(idee => {
        const tekst = ((idee.titel || '') + ' ' + (idee.beschrijving || '') + ' ' + (idee.kistNaam || '')).toLowerCase();

        // 1. Zoek match in standaardLesideeen
        let match = standaardLesideeen.find(s => s.id == idee.id);
        if (!match) {
            match = standaardLesideeen.find(s => {
                const sTitel = s.titel.toLowerCase();
                const sKist = s.kistNaam.toLowerCase();
                return (idee.titel && sTitel.includes(idee.titel.toLowerCase())) ||
                       (idee.titel && idee.titel.toLowerCase().includes(sKist)) ||
                       (idee.titel && sTitel.includes(idee.titel.toLowerCase().split(':')[0])) ||
                       (idee.kistNaam && sKist === idee.kistNaam.toLowerCase());
            });
        }

        // 2. Bepaal canonieke kistNaam
        let kistNaam = match ? match.kistNaam : window.detecteerKistNaam(idee.titel, idee.beschrijving);
        // Corrigeer als idee.kistNaam foutief '3d pen' bevat voor een heel ander onderwerp (bijv. greenscreen of dash)
        if (idee.kistNaam && !(idee.kistNaam.toLowerCase().includes('3d') && (tekst.includes('green screen') || tekst.includes('dash') || tekst.includes('bee-bot') || tekst.includes('makey') || tekst.includes('micro:bit')))) {
            kistNaam = idee.kistNaam;
        }

        const template = window.getTemplateLesbriefVoorKist(kistNaam, idee);
        const afbeelding = (match ? match.afbeelding : (idee.afbeelding && !idee.afbeelding.includes('dashrobot') && !idee.afbeelding.includes('beebot') ? idee.afbeelding : window.getAfbeeldingVoorKist(kistNaam)));

        // 3. Zorg dat lesbrief compleet is en nooit '3d pennen' bevat voor andere lessen
        let lesbrief = idee.lesbrief;
        if (!lesbrief || !lesbrief.kistMateriaal || !lesbrief.dgDoelen || (lesbrief.kistMateriaal.toLowerCase().includes('3d pen') && !kistNaam.toLowerCase().includes('3d pen'))) {
            lesbrief = match ? match.lesbrief : template;
        }

        const bouw = match ? match.bouw : (idee.bouw || idee.doelgroep || "Alle groepen");
        const titel = match ? match.titel : idee.titel;
        const beschrijving = match ? match.beschrijving : idee.beschrijving;
        const categorie = match ? match.categorie : (idee.categorie || "Programmeren");
        const moeilijkheid = match && match.moeilijkheid ? match.moeilijkheid : (idee.moeilijkheid || (bouw.includes("1-2") ? "Beginner ⭐" : (bouw.includes("7-8") ? "Uitdagend ⭐⭐⭐" : "Gemiddeld ⭐⭐")));

        return {
            ...idee,
            id: idee.id,
            titel: titel,
            beschrijving: beschrijving,
            kistNaam: kistNaam,
            afbeelding: afbeelding,
            lesbrief: lesbrief,
            bouw: bouw,
            doelgroep: bouw,
            moeilijkheid: moeilijkheid,
            categorie: categorie
        };
    });
};

let lesideeen = window.verrijkLesideeen(safeGetLocal('ww_lesideeen_v16', standaardLesideeen));

window.cloudLeerlijnen = []; 
let actieveLesideeFilter = 'Alle';
let actieveLesideeZoekterm = '';
let actieveDocentFilter = 'Alle';
let actieveDocentZoekterm = '';
let currentPdfs = [];

const ictTips = [
    "Gebruik Canva Education (gratis voor scholen) om leerlingen zelf interactieve posters of presentaties te laten ontwerpen.",
    "Laat kleuters bij de Bee-Bot eerst de route met hun eigen voeten lopen: dit 'embodied learning' versterkt het ruimtelijk inzicht.",
    "Met de greenscreen-methode en de app DoInk nemen leerlingen binnen 15 minuten een live nieuwsjournaal of boekbespreking op.",
    "Gebruik de Micro:bit versnellingsmeter als een stappenteller tijdens de gymles om bewegen en coderen direct te combineren.",
    "Met Makey Makey en aluminiumfolie maken leerlingen in groep 5 binnen no-time een werkend drumstel of interactieve quizvloer.",
    "Laat leerlingen bij LEGO Spike altijd in tweetallen werken met een vaste rol: één 'Bouwmeester' en één 'Programmeur' die per missie wisselen.",
    "Bij stop-motion animatie met Piximakey geldt de gouden regel: 12 foto's per seconde zorgt voor een vloeiende, magische kinderfilm!",
    "Bespreek tijdens een podcast-les ook online privacy: wie mag jouw stem horen en welke persoonlijke gegevens deel je liever niet online?"
];
window.ictTips = ictTips;

window.updateAftelkalender = function() {
    const daysEl = document.getElementById('countdownDaysValue');
    const unitEl = document.getElementById('countdownDaysUnit');
    const badgeEl = document.getElementById('countdownTrendBadge');
    const infoEl = document.getElementById('countdownPeriodeInfo');
    const barEl = document.getElementById('countdownProgressBar');
    const startEl = document.getElementById('countdownStartDatum');
    const eindEl = document.getElementById('countdownEindDatum');

    if (!daysEl) return;

    if (!periodes || periodes.length === 0) {
        daysEl.innerText = "--";
        if (infoEl) infoEl.innerText = "Geen actieve uitleenperiode ingesteld.";
        return;
    }

    const nu = new Date();
    // 1. Zoek actieve periode van dit moment
    let actievePeriode = periodes.find(p => {
        const s = new Date(p.start);
        const e = new Date(p.eind);
        e.setHours(23, 59, 59, 999);
        return nu >= s && nu <= e;
    });

    // 2. Zo niet actief, neem eerstvolgende toekomstige periode
    if (!actievePeriode) {
        actievePeriode = periodes.filter(p => new Date(p.start) > nu).sort((a,b) => new Date(a.start) - new Date(b.start))[0];
    }
    // 3. Fallback naar eerste periode
    if (!actievePeriode) {
        actievePeriode = periodes[0];
    }

    if (actievePeriode) {
        const startDatum = new Date(actievePeriode.start);
        const eindDatum = new Date(actievePeriode.eind);
        eindDatum.setHours(23, 59, 59, 999);

        const totaalDagen = Math.max(1, Math.round((eindDatum - startDatum) / (1000 * 60 * 60 * 24)));
        const resterendeMs = eindDatum - nu;
        const resterendeDagen = Math.max(0, Math.ceil(resterendeMs / (1000 * 60 * 60 * 24)));
        const verstrekenDagen = Math.max(0, Math.min(totaalDagen, totaalDagen - resterendeDagen));
        const percentageVerstreken = Math.min(100, Math.max(5, Math.round((verstrekenDagen / totaalDagen) * 100)));

        daysEl.innerText = resterendeDagen;
        if (unitEl) unitEl.innerText = resterendeDagen === 1 ? "dag tot inleverdag" : "dagen tot inleverdag";
        if (badgeEl) {
            badgeEl.innerText = resterendeDagen <= 5 ? "⚠️ Inleverweek!" : "⏳ Lopende periode";
            badgeEl.style.color = resterendeDagen <= 5 ? "#ef4444" : "#166534";
        }
        if (infoEl) infoEl.innerText = `Periode: ${actievePeriode.naam} • Breng kisten compleet retour`;
        if (barEl) barEl.style.width = percentageVerstreken + '%';
        if (startEl) startEl.innerText = `Start: ${actievePeriode.start}`;
        if (eindEl) eindEl.innerText = `Inleverdag: ${actievePeriode.eind}`;
    }
};

window.toonWillekeurigeTip = function() { 
    const tipElement = document.getElementById('bentoTipText') || document.getElementById('tipText'); 
    const tips = (window.ictTips && window.ictTips.length > 0) ? window.ictTips : (typeof ictTips !== 'undefined' ? ictTips : []);
    if (tipElement && tips.length > 0) {
        const gekozen = tips[Math.floor(Math.random() * tips.length)];
        tipElement.innerText = `"${gekozen.replace(/^Tip:\s*/i, '')}"`;
    } 
};

function slaDataOp() {
    try {
        localStorage.setItem('ww_periodes_v11', JSON.stringify(periodes));
        localStorage.setItem('ww_reserveringen_v11', JSON.stringify(reserveringen));
        localStorage.setItem('ww_leskisten_v15', JSON.stringify(leskisten)); 
        localStorage.setItem('ww_lesideeen_v16', JSON.stringify(lesideeen));
        localStorage.setItem('ww_scholen_v1', JSON.stringify(scholen));
        localStorage.setItem('ww_beheerders_v1', JSON.stringify(beheerdersLijst));
        localStorage.setItem('ww_favorieten_v1', JSON.stringify(mijnFavorieten));
        localStorage.setItem('ww_meldingen_v1', JSON.stringify(meldingen));
        localStorage.setItem('ww_feedback_v1', JSON.stringify(feedbackLijst));
        localStorage.setItem('ww_feedback_config_v1', JSON.stringify(feedbackConfig));
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
        onSnapshot(collection(db, "periodes"), (snapshot) => { if(!snapshot.empty) { periodes = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst(); if(typeof window.updateAftelkalender === "function") window.updateAftelkalender(); } }, checkError);
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
        onSnapshot(collection(db, "feedback"), (snapshot) => { if(!snapshot.empty) { feedbackLijst = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);
        onSnapshot(doc(db, "instellingen", "feedback_config"), (snap) => {
            if (snap.exists()) {
                const cloudConfig = snap.data();
                if (cloudConfig) {
                    feedbackConfig = { ...defaultFeedbackConfig, ...cloudConfig };
                    if (!feedbackConfig.secties) feedbackConfig.secties = defaultFeedbackConfig.secties;
                    if (!feedbackConfig.extraVragen) feedbackConfig.extraVragen = [];
                    localStorage.setItem('ww_feedback_config_v1', JSON.stringify(feedbackConfig));
                    if (typeof window.renderFeedbackConfigTab === "function") {
                        window.renderFeedbackConfigTab();
                    }
                }
            }
        }, checkError);

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
        window.saveLesideeToCloud = async function(newData) {
            try {
                if (newData.bestanden && Array.isArray(newData.bestanden) && typeof ref === 'function' && typeof uploadString === 'function') {
                    let finalFiles = [];
                    for (let i = 0; i < newData.bestanden.length; i++) {
                        let f = newData.bestanden[i];
                        if (f.data && f.data.startsWith('data:')) {
                            try {
                                const safeExt = (f.naam && f.naam.includes('.')) ? f.naam.split('.').pop() : 'bin';
                                const fileRef = ref(storage, `lesideeen_bestanden/${newData.id}_${Date.now()}_${i}.${safeExt}`);
                                await uploadString(fileRef, f.data, 'data_url');
                                finalFiles.push({ naam: f.naam, grootte: f.grootte, type: f.type, data: await getDownloadURL(fileRef) });
                            } catch(upErr) {
                                console.warn("Storage upload fallback naar DataURL:", upErr);
                                finalFiles.push(f);
                            }
                        } else {
                            finalFiles.push(f);
                        }
                    }
                    newData.bestanden = finalFiles;
                }
                await setDoc(doc(db, "lesideeen", newData.id.toString()), newData);
            } catch(e) {
                console.error("Opslaan Lesidee Cloud Mislukt:", e);
            }
        };
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
        window.saveFeedbackToCloud = async function(newData) { await setDoc(doc(db, "feedback", newData.id.toString()), newData); };
        window.saveFeedbackConfigToCloud = async function(cfg) { await setDoc(doc(db, "instellingen", "feedback_config"), cfg, { merge: true }); };

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
        if (typeof window.updateAftelkalender === "function") window.updateAftelkalender();
        if (typeof window.toonWillekeurigeTip === "function") window.toonWillekeurigeTip();

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

window.initMobileNavigation = function() {
    // 1. Zorg voor mobiele toggle knop in de sidebar header op mobiele schermen
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        let headerRow = sidebar.querySelector('.sidebar-header-row');
        const logo = sidebar.querySelector('.logo');
        if (!headerRow && logo) {
            headerRow = document.createElement('div');
            headerRow.className = 'sidebar-header-row';
            logo.parentNode.insertBefore(headerRow, logo);
            headerRow.appendChild(logo);

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.id = 'mobileMenuToggleBtn';
            toggleBtn.className = 'mobile-menu-toggle-btn';
            toggleBtn.setAttribute('aria-label', 'Toggle navigatie menu');
            toggleBtn.innerHTML = '<span class="toggle-icon">☰</span> <span>Menu</span>';
            toggleBtn.onclick = function() {
                const isOpen = sidebar.classList.toggle('mobile-menu-open');
                toggleBtn.classList.toggle('active', isOpen);
                toggleBtn.innerHTML = isOpen 
                    ? '<span class="toggle-icon">✕</span> <span>Sluit</span>' 
                    : '<span class="toggle-icon">☰</span> <span>Menu</span>';
            };
            headerRow.appendChild(toggleBtn);
        }
    }

    // 2. Sluit mobiel menu automatisch zodra op een menulink geklikt wordt
    document.querySelectorAll('.sidebar .menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (sidebar && sidebar.classList.contains('mobile-menu-open')) {
                sidebar.classList.remove('mobile-menu-open');
                const btn = document.getElementById('mobileMenuToggleBtn');
                if (btn) {
                    btn.classList.remove('active');
                    btn.innerHTML = '<span class="toggle-icon">☰</span> <span>Menu</span>';
                }
            }
        });
    });

    // 3. Zorg voor de vaste Mobile Bottom Navigation bar onderin het scherm
    let bottomNav = document.getElementById('mobileBottomNav');
    if (!bottomNav) {
        bottomNav = document.createElement('nav');
        bottomNav.id = 'mobileBottomNav';
        bottomNav.className = 'mobile-bottom-nav';
        
        const path = window.location.pathname.toLowerCase();
        const isDashboard = path.endsWith('index.html') || path.endsWith('/') || path === '';
        const isReserveren = path.endsWith('reserveren.html');
        const isLesideeen = path.endsWith('lesideeen.html');
        const isLeerlijnen = path.endsWith('leerlijnen.html');
        const isHandreiking = path.endsWith('handreiking.html');
        const isProfiel = path.endsWith('profiel.html');

        bottomNav.innerHTML = `
            <a href="index.html" class="bottom-nav-item ${isDashboard ? 'active' : ''}">
                <span class="nav-icon">🏠</span>
                <span>Home</span>
            </a>
            <a href="reserveren.html" class="bottom-nav-item ${isReserveren ? 'active' : ''}">
                <span class="nav-icon">📅</span>
                <span>Reserveren</span>
            </a>
            <a href="leerlijnen.html" class="bottom-nav-item ${isLeerlijnen ? 'active' : ''}">
                <span class="nav-icon">🎯</span>
                <span>Leerlijnen</span>
            </a>
            <a href="handreiking.html" class="bottom-nav-item ${isHandreiking ? 'active' : ''}">
                <span class="nav-icon">📖</span>
                <span>Handreiking</span>
            </a>
            <a href="lesideeen.html" class="bottom-nav-item ${isLesideeen ? 'active' : ''}">
                <span class="nav-icon">💡</span>
                <span>Lesideeën</span>
            </a>
            <a href="profiel.html" class="bottom-nav-item ${isProfiel ? 'active' : ''}">
                <span class="nav-icon">👤</span>
                <span>Profiel</span>
            </a>
        `;
        document.body.appendChild(bottomNav);
    }
};

document.addEventListener('DOMContentLoaded', () => {
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
    if(typeof window.updateAftelkalender === "function") window.updateAftelkalender();

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
    const ingelogdeEmail = localStorage.getItem('ww_huidige_email');
    const mijnReserveringen = (reserveringen && ingelogdeEmail) ? reserveringen.filter(r => r.aanvragerEmail === ingelogdeEmail) : [];

    // Dynamische teller updates voor bento KPI kaarten
    const statCountEl = document.getElementById('statReserveringenCount');
    if (statCountEl) {
        statCountEl.innerText = mijnReserveringen.length || 0;
    }
    const statKistenEl = document.getElementById('statLeskistenCount');
    if (statKistenEl && typeof leskisten !== 'undefined') {
        statKistenEl.innerText = leskisten.length || 34;
    }

    if (!teacherList) return;

    if (mijnReserveringen.length === 0) {
        teacherList.innerHTML = `
        <div style="padding: 28px 20px; text-align: center; background: rgba(248, 250, 252, 0.7); border-radius: var(--radius-md); border: 1.5px dashed rgba(203, 213, 225, 0.8);">
            <div style="font-size: 28px; margin-bottom: 8px;">📦</div>
            <p style="color: var(--slate-600); font-size: 14px; font-weight: 600; margin: 0 0 6px 0;">Geen actieve reserveringen</p>
            <p style="color: var(--slate-400); font-size: 12.5px; margin: 0 0 16px 0;">Kies een leskist of digitaal leermiddel voor jouw klas.</p>
            <a href="reserveren.html" class="pill-btn pill-btn-primary" style="display: inline-flex; font-size: 12.5px; padding: 8px 18px;">
                <span>Bekijk leskisten & reserveer</span>
                <span class="pill-arrow">→</span>
            </a>
        </div>`;
    } else {
        teacherList.innerHTML = mijnReserveringen.map(r => {
            const periode = periodes.find(p => p.id == r.periodeId);
            const isGeaccepteerd = r.status === "Geaccepteerd";
            const isAfgewezen = r.status === "Afgewezen";
            let statusColor = isGeaccepteerd ? "#6fa62c" : (isAfgewezen ? "#ef4444" : "#d97706");
            let statusBg = isGeaccepteerd ? "rgba(140, 198, 63, 0.14)" : (isAfgewezen ? "rgba(239, 68, 68, 0.12)" : "rgba(245, 158, 11, 0.14)");
            let statusBorder = isGeaccepteerd ? "rgba(140, 198, 63, 0.3)" : (isAfgewezen ? "rgba(239, 68, 68, 0.3)" : "rgba(245, 158, 11, 0.3)");
            let statusIcon = isGeaccepteerd ? "✓" : (isAfgewezen ? "✕" : "⏳");
            return `
            <div class="task-item" style="border-left: 4px solid ${statusColor};">
                <div class="task-info">
                    <strong>${r.kist}</strong>
                    <span>Periode: ${periode ? periode.naam : 'Lopend schooljaar'} • Wonderwijs</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; font-size: 11.5px; padding: 4px 10px; border-radius: var(--radius-full); font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                        <span>${statusIcon}</span>
                        <span>${r.status}</span>
                    </span>
                </div>
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

window.openLesModal = function(id) {
    const idee = lesideeen.find(i => i.id == id);
    if (!idee) return;

    // 1. Zoek de echte kist via vindKistVoorIdee (NOOIT blind terugvallen op leskisten[0]!)
    const kist = window.vindKistVoorIdee(idee);
    const kistNaam = kist ? kist.naam : (idee.kistNaam || window.detecteerKistNaam(idee.titel, idee.beschrijving));
    const kistIdParam = (kist && kist.id) ? (kist.id || encodeURIComponent(kist.naam)) : encodeURIComponent(kistNaam);
    const reserveerUrl = `reserveren.html?kist=${encodeURIComponent(kistIdParam)}`;

    const titleEl = document.getElementById('lesModalTitle');
    if (titleEl) titleEl.innerText = idee.titel;

    const bodyEl = document.getElementById('lesModalBody');
    if (!bodyEl) return;

    // 2. Haal lesbrief op of vul aan met authentiek template voor deze specifieke kist
    const template = window.getTemplateLesbriefVoorKist(kistNaam, idee);
    let lb = idee.lesbrief || {};
    
    // Voorkom '3d pennen' verontreiniging op niet-3d lessen
    if (!lb.kistMateriaal || (lb.kistMateriaal.toLowerCase().includes('3d pen') && !kistNaam.toLowerCase().includes('3d pen'))) {
        lb = { ...template, ...lb, kistMateriaal: template.kistMateriaal, klasMateriaal: template.klasMateriaal || lb.klasMateriaal };
    }

    const doelgroep = idee.doelgroep || idee.bouw || 'Alle groepen';
    const moeilijkheid = idee.moeilijkheid || (doelgroep.includes('1-2') ? 'Beginner ⭐' : (doelgroep.includes('7-8') ? 'Uitdagend ⭐⭐⭐' : 'Gemiddeld ⭐⭐'));
    const tijdOpbouw = lb.tijdsopbouw || template.tijdsopbouw || {};
    const dg = lb.dgDoelen || template.dgDoelen || {};
    const bestanden = idee.bestanden || [];

    let filesHtml = '';
    if (bestanden && bestanden.length > 0) {
        filesHtml = `
        <div class="les-downloads-box">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <strong style="color: var(--slate-900); font-size: 14px; display: flex; align-items: center; gap: 7px;">
                    <span>📎</span> <span>Lesbijlagen & Werkbladen (${bestanden.length})</span>
                </strong>
                <span style="font-size: 11px; color: var(--slate-500);">Direct te downloaden voor in de klas</span>
            </div>
            <div class="downloads-grid">
                ${bestanden.map((f) => {
                    const icon = (f.naam && f.naam.toLowerCase().endsWith('.pdf')) ? '📄' : ((f.naam && f.naam.toLowerCase().match(/\.(doc|docx)$/)) ? '📝' : ((f.naam && f.naam.toLowerCase().match(/\.(ppt|pptx)$/)) ? '📊' : '📁'));
                    return `
                    <div class="download-file-card">
                        <div class="download-file-info">
                            <span class="download-file-icon">${icon}</span>
                            <div style="overflow: hidden;">
                                <div class="download-file-name" title="${f.naam}">${f.naam}</div>
                                <div class="download-file-size">${f.grootte || 'Bijlage'}</div>
                            </div>
                        </div>
                        <a href="${f.data}" download="${f.naam}" target="_blank" class="btn-download-action">
                            <span>📥 Download</span>
                        </a>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    } else {
        filesHtml = `
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: var(--radius-md); padding: 12px 16px; margin-top: 15px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 13px; color: var(--slate-500); display: flex; align-items: center; gap: 6px;">
                <span>📎</span> <span>Nog geen bestanden of werkbladen geüpload voor deze les.</span>
            </span>
            <span style="font-size: 11.5px; color: var(--slate-400);">Kan worden toegevoegd in het beheer</span>
        </div>`;
    }

    const dgKerndoelen = (dg.kerndoelenWonderwijs && Array.isArray(dg.kerndoelenWonderwijs) && dg.kerndoelenWonderwijs.length > 0)
        ? dg.kerndoelenWonderwijs
        : (template.dgDoelen && template.dgDoelen.kerndoelenWonderwijs ? template.dgDoelen.kerndoelenWonderwijs : []);

    bodyEl.innerHTML = `
        <!-- Meta badges rij -->
        <div class="les-meta-badges" style="margin-bottom: 18px;">
            <span class="les-meta-badge primary">🎯 Bouw: ${doelgroep}</span>
            <span class="les-meta-badge accent">⚡ Niveau: ${moeilijkheid}</span>
            <span class="les-meta-badge">⏱️ Duur: ${lb.tijd || template.tijd || '60 min'}</span>
            <span class="les-meta-badge">👥 ${lb.organisatie || template.organisatie || 'In tweetallen'}</span>
            <span class="les-meta-badge" style="background: #e0e7ff; color: #3730a3;">🏷️ ${idee.categorie || 'Lesidee'}</span>
        </div>

        <!-- Reserveer Kist Callout -->
        <div style="background: linear-gradient(135deg, rgba(140, 198, 63, 0.12), rgba(22, 163, 74, 0.08)); border: 1.5px solid rgba(140, 198, 63, 0.4); border-radius: var(--radius-lg); padding: 14px 18px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 26px;">📦</span>
                <div>
                    <strong style="color: #14532d; font-size: 14px; display: block;">Benodigde leskist: ${kistNaam}</strong>
                    <span style="color: #166534; font-size: 12.5px;">Beschikbaar via het Verwonderlab uitleensysteem</span>
                </div>
            </div>
            <a href="${reserveerUrl}" class="btn-direct-reserve" style="width: auto; padding: 9px 20px; font-size: 13px; text-decoration: none;">
                <span>📅 Reserveer deze kist direct</span>
            </a>
        </div>

        <!-- Korte introductie -->
        ${idee.beschrijving ? `
        <div style="margin-bottom: 22px;">
            <h4 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 800; color: var(--slate-400); margin: 0 0 6px 0;">Lesomschrijving & Doel</h4>
            <p style="color: var(--slate-700); font-size: 14px; line-height: 1.65; margin: 0;">${idee.beschrijving}</p>
        </div>` : ''}

        <!-- Doelen Digitale Geletterdheid (Wonderwijs) -->
        <div class="lesbrief-section">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                <h4 style="font-size: 15px; font-weight: 800; color: var(--slate-900); margin: 0; display: flex; align-items: center; gap: 8px;">
                    <span>🧠</span> <span>Raakvlakken met de Wonderwijs Leerlijn Digitale Geletterdheid</span>
                </h4>
                <span style="font-size: 11px; font-weight: 700; background: rgba(140, 198, 63, 0.18); color: #166534; padding: 4px 10px; border-radius: 9999px;">Wonderwijs Curriculum 2026</span>
            </div>
            <div class="lesbrief-dg-box">
                <div class="dg-domain-badge">
                    <span>${dg.domein || template.dgDoelen.domein || 'Domein 2: Ontwerpen & Maken'}</span>
                </div>
                ${dgKerndoelen && dgKerndoelen.length > 0 ? `
                <div style="margin-top: 12px;">
                    <strong style="color: #0f172a; font-size: 13px; display: block; margin-bottom: 8px;">🎯 Gekoppelde kerndoelen & domeinen uit de leerlijn:</strong>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${dgKerndoelen.map(k => `
                            <div class="dg-kerndoel-chip-card">
                                <span style="color: #16a34a; font-size: 15px; font-weight: 900; line-height: 1;">✓</span>
                                <span style="font-size: 13px; color: #1e293b; line-height: 1.5; font-weight: 600;">${k}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                ${(dg.leerlingDoelen || template.dgDoelen.leerlingDoelen) ? `
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1.5px dashed #cbd5e1;">
                    <strong style="color: #166534; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                        <span>🌱</span> <span>Wat leert de leerling tijdens deze les?</span>
                    </strong>
                    <p style="margin: 6px 0 0 0; color: #334155; font-size: 13px; line-height: 1.6;">${dg.leerlingDoelen || template.dgDoelen.leerlingDoelen}</p>
                </div>` : ''}
            </div>
        </div>

        <!-- Benodigdheden & Praktische Voorbereiding -->
        <div class="lesbrief-section">
            <h4 style="font-size: 15px; font-weight: 800; color: var(--slate-900); margin: 0 0 10px 0;">🧰 Benodigdheden & Voorbereiding</h4>
            <div class="lesbrief-materials-card">
                <div class="material-col">
                    <span class="mat-label">📦 Uit het Verwonderlab (${kistNaam}):</span>
                    <p style="font-weight: 600; color: #1e293b;">${lb.kistMateriaal || template.kistMateriaal || kistNaam}</p>
                </div>
                <div class="material-col">
                    <span class="mat-label">🏫 In het eigen klaslokaal aanwezig:</span>
                    <p>${lb.klasMateriaal || template.klasMateriaal || 'Tablets of laptops, digibord, schrijfspullen'}</p>
                </div>
                <div class="prep-note">
                    <strong>💡 Praktische voorbereiding leerkracht (${tijdOpbouw.voorbereiding || lb.voorbereidingTijd || template.tijdsopbouw.voorbereiding || '10 min'}):</strong>
                    <span>${lb.voorbereiding || template.voorbereiding || 'Zet de materialen klaar en controleer de acculading.'}</span>
                </div>
            </div>
        </div>

        <!-- Lesverloop in fasen -->
        <div class="lesbrief-section">
            <h4 style="font-size: 15px; font-weight: 800; color: var(--slate-900); margin: 0 0 10px 0;">🚀 Volledig Stapsgewijs Lesverloop</h4>
            <div class="lesbrief-step-card step-inleiding">
                <div class="step-header">
                    <span class="step-num">1</span>
                    <strong style="color: #1e3a8a;">Inleiding & Prikkeling (${tijdOpbouw.inleiding || lb.inleidingTijd || template.tijdsopbouw.inleiding || '15 min'})</strong>
                </div>
                <div class="step-content">${lb.inleiding || template.inleiding || 'Introduceer het onderwerp en activeer voorkennis bij de leerlingen.'}</div>
            </div>
            <div class="lesbrief-step-card step-kern">
                <div class="step-header">
                    <span class="step-num">2</span>
                    <strong style="color: #14532d;">Kernactiviteit & Challenge (${tijdOpbouw.kern || lb.kernTijd || template.tijdsopbouw.kern || '30 min'})</strong>
                </div>
                <div class="step-content">${lb.kern || template.kern || 'Leerlingen gaan actief en zelfstandig of in tweetallen aan de slag met de opdracht.'}</div>
            </div>
            <div class="lesbrief-step-card step-afsluiting">
                <div class="step-header">
                    <span class="step-num">3</span>
                    <strong style="color: #78350f;">Demonstratie, Evaluatie & Reflectie (${tijdOpbouw.afsluiting || lb.afsluitingTijd || template.tijdsopbouw.afsluiting || '15 min'})</strong>
                </div>
                <div class="step-content">${lb.afsluiting || template.afsluiting || 'Presenteer resultaten klassikaal en bespreek wat er goed ging en wat beter kon.'}</div>
            </div>
        </div>

        <!-- Differentiatie & Tips -->
        ${(lb.differentiatie || lb.tips || template.differentiatie) ? `
        <div class="lesbrief-section">
            <h4 style="font-size: 15px; font-weight: 800; color: var(--slate-900); margin: 0 0 10px 0;">🌟 Differentiatie & Verdieping</h4>
            <div class="lesbrief-diff-card">
                ${(lb.differentiatie && lb.differentiatie.uitdaging) ? `<div class="diff-star">${lb.differentiatie.uitdaging}</div>` : (template.differentiatie ? `<div class="diff-star">${template.differentiatie.uitdaging}</div>` : '')}
                ${(lb.differentiatie && lb.differentiatie.ondersteuning) ? `<div class="diff-support">${lb.differentiatie.ondersteuning}</div>` : (template.differentiatie ? `<div class="diff-support">${template.differentiatie.ondersteuning}</div>` : '')}
                ${(!lb.differentiatie && lb.tips) ? `<div>💡 ${lb.tips}</div>` : ''}
            </div>
        </div>` : ''}

        <!-- Bestanden & Bijlagen Downloads -->
        <div class="lesbrief-section">
            <h4 style="font-size: 15px; font-weight: 800; color: var(--slate-900); margin: 0 0 4px 0;">📥 Lesmateriaal & Documenten</h4>
            ${filesHtml}
        </div>

        ${idee.link ? `
        <div style="margin-top: 18px;">
            <a href="${idee.link}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: #2563eb; font-weight: 700; text-decoration: none; font-size: 13.5px;">
                <span>🌐 Open externe online handleiding & tools →</span>
            </a>
        </div>` : ''}

        <!-- Footer CTA -->
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--slate-200); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
            <button type="button" onclick="window.sluitAlleModals()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;">
                Sluiten
            </button>
            <a href="${reserveerUrl}" class="btn-direct-reserve" style="width: auto; padding: 11px 26px; font-size: 14px; text-decoration: none;">
                <span>📅 Reserveer direct '${kistNaam}'</span>
            </a>
        </div>
    `;

    const modal = document.getElementById('lesModal');
    if (modal) modal.style.display = 'flex';
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
            <input type="text" id="lesideeZoekInput" placeholder="🔍 Zoek op titel, leskist of doelgroep..." value="${actieveLesideeZoekterm}" onkeyup="window.zoekLesideeen(this.value)" style="padding: 8px 16px; border: 1px solid #cbd5e1; border-radius: 20px; outline: none; font-size: 13px; width: 260px; background: #f8fafc;">
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

    let gridHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; width: 100%;">';
    
    if(gefilterdeIdeeen.length === 0) {
        gridHtml += "<div style='grid-column: 1 / -1; padding: 40px; text-align: center; background: white; border-radius: 12px; color: #64748b; border: 1px solid #e2e8f0;'>Geen lesideeën gevonden voor de huidige selectie.</div>";
    } else {
        gefilterdeIdeeen.forEach(idee => {
            const kistObj = window.vindKistVoorIdee(idee);
            const kistNaam = kistObj.naam || idee.kistNaam || window.detecteerKistNaam(idee.titel, idee.beschrijving);
            const primaireDoel = window.getPrimaireDgDoelVoorIdee(idee);
            const bouwBadge = idee.doelgroep || idee.bouw || "Alle groepen";
            const categorieBadge = idee.categorie || "Inspiratie";
            const moeilijkheid = idee.moeilijkheid || (bouwBadge.includes("1-2") ? "Beginner ⭐" : (bouwBadge.includes("7-8") ? "Uitdagend ⭐⭐⭐" : "Gemiddeld ⭐⭐"));
            
            let diffClass = "gemiddeld";
            if (moeilijkheid.includes("Beginner") || bouwBadge.includes("1-2") || bouwBadge.includes("3-4")) diffClass = "beginner";
            else if (moeilijkheid.includes("Uitdagend") || bouwBadge.includes("7-8")) diffClass = "uitdagend";

            const reserveerUrl = `reserveren.html?kist=${encodeURIComponent(kistNaam)}`;
            const detailId = `lesbrief-detail-${idee.id}`;

            gridHtml += `
            <div class="idea-card" id="idea-card-${idee.id}">
                <div class="idea-card-body" style="padding: 24px;">
                    <!-- Badges balk: Categorie, Doelgroep en Moeilijkheidsgraad (Geen afbeelding!) -->
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; align-items: center;">
                        <span class="idea-badge" style="background: rgba(15, 23, 42, 0.05); color: var(--slate-700);">${categorieBadge}</span>
                        <span class="idea-badge bouw">🎯 ${bouwBadge}</span>
                        <span class="idea-badge moeilijkheid ${diffClass}">⚡ ${moeilijkheid}</span>
                    </div>

                    <h3 style="font-size: 18px; font-weight: 800; color: var(--slate-950); margin: 0 0 10px 0; line-height: 1.35;">${idee.titel}</h3>
                    
                    <div class="idea-material-tag" style="margin-bottom: 8px;">
                        <span>📦</span> <span>Leskist: <strong>${kistNaam}</strong></span>
                    </div>

                    <div class="idea-dg-goal-tag" style="margin-bottom: 14px;">
                        <span style="font-size: 14px; line-height: 1;">🎯</span>
                        <span>Doel DG: <strong>${primaireDoel}</strong></span>
                    </div>

                    <p style="color: var(--slate-600); font-size: 13.5px; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${idee.beschrijving || ""}</p>

                    <!-- Actieknoppen rij: Pop-up Lesbrief & Direct Reserveren -->
                    <div class="idea-actions-row">
                        <button type="button" onclick="window.openLesModal(${idee.id})" class="btn-open-les">
                            <span>📖 Open les</span>
                        </button>
                        <a href="${reserveerUrl}" class="btn-direct-reserve">
                            <span>📅 Reserveer kist</span>
                        </a>
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
        periodesBody.innerHTML = periodes.map(p => `<tr>
            <td style="padding: 14px 18px;"><strong>${p.naam}</strong></td>
            <td style="padding: 14px 18px; color: #475569;">${p.start}</td>
            <td style="padding: 14px 18px; color: #475569;">${p.eind}</td>
            <td style="text-align: right; padding: 14px 18px; white-space: nowrap;">
                <button class="btn-table-edit" onclick="window.openPeriodeModal(${p.id})">✏️ Bewerken</button>
                <button class="btn-table-delete" onclick="window.deletePeriode(${p.id})">🗑️ Verwijderen</button>
            </td>
        </tr>`).join('');
    }

    const scholenBody = document.getElementById('adminScholenBody');
    if (scholenBody) {
        scholenBody.innerHTML = scholen.map(s => `<tr>
            <td style="padding: 14px 18px;"><strong>${s.naam}</strong></td>
            <td style="text-align: right; padding: 14px 18px; white-space: nowrap;">
                <button class="btn-table-edit" onclick="window.openSchoolModal(${s.id})">✏️ Bewerken</button>
                <button class="btn-table-delete" onclick="window.deleteSchool(${s.id})">🗑️ Verwijderen</button>
            </td>
        </tr>`).join('');
    }

    const gebruikersBody = document.getElementById('adminGebruikersBody');
    if (gebruikersBody) {
        if (beheerdersLijst.length === 0) {
            gebruikersBody.innerHTML = `<tr><td colspan="2" style="text-align: center; padding: 25px; color: #64748b;">Nog geen extra beheerders toegevoegd.</td></tr>`;
        } else {
            gebruikersBody.innerHTML = beheerdersLijst.map(b => `<tr>
                <td style="padding: 14px 18px; font-family: monospace; font-size: 13.5px;"><strong>${b.email}</strong></td>
                <td style="text-align: right; padding: 14px 18px; white-space: nowrap;">
                    <button class="btn-table-delete" onclick="window.verwijderBeheerder(${b.id})">🗑️ Rechten Intrekken</button>
                </td>
            </tr>`).join('');
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
                    statusHTML = `<div class="status-actions" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <button class="btn-table-accept" onclick="window.beoordeelReservering(${r.id}, 'Geaccepteerd')">✔ Accepteren</button>
                        <button class="btn-table-reject" onclick="window.beoordeelReservering(${r.id}, 'Afgewezen')">✖ Afwijzen</button>
                    </div>`;
                } else {
                    let statusColor = r.status === "Geaccepteerd" ? "#8CC63F" : (r.status === "Afgewezen" ? "#ef4444" : "#f59e0b");
                    statusHTML = `<span style="background: ${statusColor}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">${r.status}</span>`;
                    
                    if (r.status === "Geaccepteerd") {
                        let feedbackBtnHTML = '';
                        if (r.feedbackVerstuurd) {
                            feedbackBtnHTML = `<button type="button" class="btn-feedback-action sent" onclick="window.stuurFeedbackFormulier(${r.id})" title="Formulier reeds verstuurd op ${r.feedbackVerstuurdOp || 'onlangs'}. Klik om opnieuw te mailen via Outlook."><span>✅</span> Feedbackformulier verstuurd</button>`;
                        } else {
                            feedbackBtnHTML = `<button type="button" class="btn-feedback-action" onclick="window.stuurFeedbackFormulier(${r.id})" title="Stuur feedbackformulier direct via Outlook naar ${r.aanvragerEmail || 'de leerkracht'}"><span>✉️</span> Stuur feedbackformulier</button>`;
                        }

                        if (r.feedbackOntvangen) {
                            feedbackBtnHTML += `<button type="button" class="btn-view-feedback" onclick="window.bekijkIngevuldeFeedback(${r.id})" title="Bekijk de ingevulde evaluatie en foto's">⭐ Bekijk feedback</button>`;
                        }

                        statusHTML += `
                        <div style="margin-top: 15px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 12px; font-weight: bold; color: #334155; margin-bottom: 8px;">📋 Logboek / Status Kist</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; align-items: center;">
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.klaar ? '#8CC63F' : '#fff'}; color: ${r.klaar ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'klaar', this.checked)" ${r.klaar ? 'checked' : ''}>📦 Klaarzetten</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.opgehaald ? '#8CC63F' : '#fff'}; color: ${r.opgehaald ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'opgehaald', this.checked)" ${r.opgehaald ? 'checked' : ''}>🤝 Opgehaald</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.ingeleverd ? '#8CC63F' : '#fff'}; color: ${r.ingeleverd ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'ingeleverd', this.checked)" ${r.ingeleverd ? 'checked' : ''}>🔙 Ingeleverd</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.compleet ? '#8CC63F' : '#fff'}; color: ${r.compleet ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'compleet', this.checked)" ${r.compleet ? 'checked' : ''}>✅ Compleet</label>
                                <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; background: ${r.schade ? '#ef4444' : '#fff'}; color: ${r.schade ? '#fff' : '#333'}; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 20px;"><input type="checkbox" style="display: none;" onchange="window.updateChecklist(${r.id}, 'schade', this.checked)" ${r.schade ? 'checked' : ''}>⚠️ Schade</label>
                                ${feedbackBtnHTML}
                            </div>
                            <input type="text" placeholder="✏️ Ruimte voor toelichting..." value="${r.toelichting || ''}" onchange="window.updateChecklist(${r.id}, 'toelichting', this.value)" style="width: 100%; padding: 8px; font-size: 12px; border: 1px solid #cbd5e1; border-radius: 6px;">
                        </div>`;
                    }
                }
                
                let actieMenuHTML = `<button class="btn-table-delete-icon" title="Reservering verwijderen" onclick="window.actieReserveringVerwijderen(${r.id}, event)">🗑️</button>`;
                
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
            let statusBadge = kist.beschikbaar === false 
                ? `<span style="background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239,68,68,0.25); padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700;">In reparatie</span>` 
                : `<span style="background: rgba(140, 198, 63, 0.12); color: var(--ww-green-dark); border: 1px solid rgba(140, 198, 63, 0.3); padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700;">Actief</span>`;
            let imgSource = kist.afbeelding && kist.afbeelding.startsWith('data:image') ? kist.afbeelding : (kist.afbeelding || defaultImg);
            return `<tr>
                <td style="padding: 12px 18px;"><img src="${imgSource}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);"></td>
                <td style="padding: 12px 18px;"><strong>${kist.naam}</strong><br><span style="font-size:12px; color:#64748b;">${kist.tag || ''}</span></td>
                <td style="padding: 12px 18px;">${kist.doelgroep || 'Alle groepen'}<br><div style="margin-top: 4px;">${statusBadge}</div></td>
                <td style="text-align: right; padding: 12px 18px; white-space: nowrap;">
                    <button class="btn-table-edit" onclick="window.openMateriaalModal(${kist.id})">✏️ Bewerken</button>
                    <button class="btn-table-delete" onclick="window.deleteMateriaal(${kist.id})">🗑️ Verwijderen</button>
                </td>
            </tr>`;
        }).join('');
    }

    const lesideeenBody = document.getElementById('adminLesideeenBody');
    if (lesideeenBody) {
        if (lesideeen.length === 0) {
            lesideeenBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#64748b; padding:25px;">Nog geen lesideeën toegevoegd.</td></tr>`;
        } else {
            lesideeenBody.innerHTML = lesideeen.map(idee => {
                const veiligeBeschrijving = idee.beschrijving || "";
                const korteBeschrijving = veiligeBeschrijving.length > 70 ? veiligeBeschrijving.substring(0,70) + '...' : veiligeBeschrijving;
                return `<tr>
                    <td style="padding: 14px 18px;"><strong>${idee.titel}</strong><br><span style="font-size:12px; color:#64748b;">${idee.categorie || ''}</span></td>
                    <td style="padding: 14px 18px; color: #475569;">${korteBeschrijving}</td>
                    <td style="text-align: right; padding: 14px 18px; white-space: nowrap;">
                        <button class="btn-table-edit" onclick="window.openLesideeModal(${idee.id})">✏️ Bewerken</button>
                        <button class="btn-table-delete" onclick="window.deleteLesidee(${idee.id})">🗑️ Verwijderen</button>
                    </td>
                </tr>`;
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
            const kistIdVal = getVal('editLesideeKistSelect');
            const kerndoelenRaw = getVal('editLesideeDgKerndoelen');
            const kerndoelenArr = kerndoelenRaw ? kerndoelenRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];
            const doelgroepVal = getVal('editLesideeDoelgroep', 'Groep 5-6 (Midden/Bovenbouw)');

            const existingIdee = lesideeen.find(i => i.id == ideeId) || {};
            const existingLb = existingIdee.lesbrief || {};

            let kistObj = null;
            if (kistIdVal) {
                kistObj = leskisten.find(k => k.id == kistIdVal);
            }

            const newData = { 
                id: ideeId, 
                titel: getVal('editLesideeTitel', 'Naamloos Idee'), 
                categorie: getVal('editLesideeCategorie', 'Wonderwijs'), 
                kistId: kistIdVal ? parseInt(kistIdVal) : (existingIdee.kistId || null),
                kistNaam: kistObj ? kistObj.naam : (existingIdee.kistNaam || ''),
                doelgroep: doelgroepVal,
                bouw: doelgroepVal,
                moeilijkheid: getVal('editLesideeMoeilijkheid', 'Gemiddeld ⭐⭐'),
                beschrijving: getVal('editLesideeBeschrijving'), 
                link: getVal('editLesideeLink'),
                bestanden: (currentLesideeFiles && currentLesideeFiles.length > 0) ? currentLesideeFiles : (existingIdee.bestanden || []),
                lesbrief: {
                    tijd: getVal('editLesideeTijd', existingLb.tijd || '60 min'),
                    organisatie: getVal('editLesideeOrganisatie', existingLb.organisatie || 'In tweetallen'),
                    dgDoelen: {
                        domein: getVal('editLesideeDgDomein', (existingLb.dgDoelen && existingLb.dgDoelen.domein) || 'Wonderwijs Digitale Geletterdheid'),
                        kerndoelenWonderwijs: kerndoelenArr.length > 0 ? kerndoelenArr : ((existingLb.dgDoelen && existingLb.dgDoelen.kerndoelenWonderwijs) || []),
                        leerlingDoelen: getVal('editLesideeDgLeerlingDoelen', (existingLb.dgDoelen && existingLb.dgDoelen.leerlingDoelen) || '')
                    },
                    kistMateriaal: getVal('editLesideeKistMateriaal', existingLb.kistMateriaal || (kistObj ? kistObj.naam : '')),
                    klasMateriaal: getVal('editLesideeKlasMateriaal', existingLb.klasMateriaal || 'Tablets of laptops, digibord'),
                    voorbereiding: getVal('editLesideeVoorbereiding', existingLb.voorbereiding || 'Zet de materialen klaar en controleer de acculading.'),
                    inleiding: getVal('editLesideeInleiding', existingLb.inleiding || 'Introduceer het onderwerp en activeer voorkennis bij de leerlingen.'),
                    kern: getVal('editLesideeKern', existingLb.kern || 'Leerlingen gaan actief en zelfstandig of in tweetallen aan de slag met de opdracht.'),
                    afsluiting: getVal('editLesideeAfsluiting', existingLb.afsluiting || 'Presenteer resultaten klassikaal en bespreek wat er goed ging en wat beter kon.'),
                    differentiatie: {
                        uitdaging: getVal('editLesideeDiffUitdaging', (existingLb.differentiatie && existingLb.differentiatie.uitdaging) || ''),
                        ondersteuning: getVal('editLesideeDiffOndersteuning', (existingLb.differentiatie && existingLb.differentiatie.ondersteuning) || '')
                    }
                }
            }; 
            const idx = lesideeen.findIndex(i => i.id == ideeId); 
            if(idx > -1) lesideeen[idx] = { ...lesideeen[idx], ...newData }; else lesideeen.push(newData); 
            slaDataOp(); 
            if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); 
            if(window.renderLesideeenGrid) window.renderLesideeenGrid(); 
            if(window.saveLesideeToCloud) await window.saveLesideeToCloud(newData); 
            window.sluitAlleModals(); 
            alert("✅ Lesidee inclusief bijlagen en leerlijndoelen succesvol opgeslagen!"); 
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
    if (tabId === 'tab-feedbackformulier' && typeof window.renderFeedbackConfigTab === 'function') {
        window.renderFeedbackConfigTab();
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

    // 3. VISUELE GRAFIEKEN & DIAGRAMMEN (Chart.js)
    if (typeof Chart !== 'undefined') {
        window._chartInstances = window._chartInstances || {};
        ['materialen', 'scholen', 'periodes', 'status'].forEach(k => {
            if (window._chartInstances[k]) {
                try { window._chartInstances[k].destroy(); } catch(e){}
                window._chartInstances[k] = null;
            }
        });

        // Grafiek 1: Populairste Materialen (Horizontal Bar Chart)
        const canvasMat = document.getElementById('chartMaterialen');
        if (canvasMat) {
            const topKistenSlice = sortedKisten.slice(0, 6);
            const matLabels = topKistenSlice.map(x => x[0].length > 22 ? x[0].substring(0, 20) + '...' : x[0]);
            const matCounts = topKistenSlice.map(x => x[1]);

            window._chartInstances.materialen = new Chart(canvasMat.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: matLabels.length > 0 ? matLabels : ['Nog geen data'],
                    datasets: [{
                        label: 'Aantal aanvragen',
                        data: matCounts.length > 0 ? matCounts : [0],
                        backgroundColor: 'rgba(140, 198, 63, 0.85)',
                        hoverBackgroundColor: '#8CC63F',
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#0f172a',
                            padding: 10,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: { precision: 0, font: { family: 'Plus Jakarta Sans', size: 11 } },
                            grid: { color: 'rgba(226, 232, 240, 0.6)' }
                        },
                        y: {
                            ticks: { font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 } },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Grafiek 2: Verdeling per School (Doughnut Chart)
        const canvasScholen = document.getElementById('chartScholen');
        if (canvasScholen) {
            const schoolLabels = sortedScholen.slice(0, 6).map(x => x[0]);
            const schoolData = sortedScholen.slice(0, 6).map(x => x[1]);
            const palette = ['#8CC63F', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#64748b'];

            window._chartInstances.scholen = new Chart(canvasScholen.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: schoolLabels.length > 0 ? schoolLabels : ['Nog geen scholen'],
                    datasets: [{
                        data: schoolData.length > 0 ? schoolData : [1],
                        backgroundColor: schoolData.length > 0 ? palette.slice(0, schoolLabels.length) : ['#e2e8f0'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 12,
                                padding: 12,
                                font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
                            }
                        }
                    },
                    cutout: '62%'
                }
            });
        }

        // Grafiek 3: Aanvraagtrend per Periode (Bar Chart)
        const canvasPeriodes = document.getElementById('chartPeriodes');
        if (canvasPeriodes) {
            const pLabels = (periodes || []).map(p => p.naam);
            const pCounts = (periodes || []).map(p => reserveringen.filter(r => r.periodeId == p.id).length);

            window._chartInstances.periodes = new Chart(canvasPeriodes.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: pLabels.length > 0 ? pLabels : ['Periode 1'],
                    datasets: [{
                        label: 'Reserveringen',
                        data: pCounts.length > 0 ? pCounts : [0],
                        backgroundColor: 'rgba(59, 130, 246, 0.85)',
                        hoverBackgroundColor: '#2563eb',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { precision: 0, font: { family: 'Plus Jakarta Sans', size: 11 } },
                            grid: { color: 'rgba(226, 232, 240, 0.6)' }
                        },
                        x: {
                            ticks: { font: { family: 'Plus Jakarta Sans', weight: '600', size: 11 } },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Grafiek 4: Statusverdeling (Doughnut Chart)
        const canvasStatus = document.getElementById('chartStatus');
        if (canvasStatus) {
            const inBehandeling = reserveringen.filter(r => r.status === 'In behandeling' || !r.status).length;
            const afgewezen = reserveringen.filter(r => r.status === 'Afgewezen').length;

            window._chartInstances.status = new Chart(canvasStatus.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Geaccepteerd', 'In behandeling', 'Afgewezen'],
                    datasets: [{
                        data: totaal > 0 ? [geaccepteerd, inBehandeling, afgewezen] : [0, 0, 0],
                        backgroundColor: ['#8CC63F', '#f59e0b', '#ef4444'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 12,
                                padding: 12,
                                font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
                            }
                        }
                    },
                    cutout: '62%'
                }
            });
        }
    }

    // 4. Ranglijst Scholen
    if (topScholenLijst) {
        if (sortedScholen.length === 0) {
            topScholenLijst.innerHTML = `<p style="color: #888; font-size: 13px;">Nog geen locaties geregistreerd.</p>`;
        } else {
            const medailles = ['🥇', '🥈', '🥉'];
            topScholenLijst.innerHTML = sortedScholen.slice(0, 5).map(([schoolNaam, count], i) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                        <span style="font-size: 16px;">${medailles[i] || '🏫'}</span>
                        <strong style="font-size: 13px; color: #1e293b; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${schoolNaam}</strong>
                    </div>
                    <span style="background: rgba(140, 198, 63, 0.15); color: #4d7c0f; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; flex-shrink: 0;">${count}x</span>
                </div>
            `).join('');
        }
    }

    // 5. Top Aanvragers (Leerkrachten)
    if (topDocentenLijst) {
        if (sortedDocenten.length === 0) {
            topDocentenLijst.innerHTML = `<p style="color: #888; font-size: 13px;">Nog geen leerkrachten geregistreerd.</p>`;
        } else {
            topDocentenLijst.innerHTML = sortedDocenten.slice(0, 5).map(([key, count], i) => {
                const [naam, email] = key.split('###');
                return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
                    <div style="overflow: hidden;">
                        <strong style="font-size: 13px; color: #1e293b; display: block; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${naam}</strong>
                        <span style="font-size: 11px; color: #64748b;">${email || 'Geen email'}</span>
                    </div>
                    <span style="background: rgba(59, 130, 246, 0.12); color: #1d4ed8; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; flex-shrink: 0;">${count}x</span>
                </div>`;
            }).join('');
        }
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

window.stuurFeedbackFormulier = function(resId) {
    const r = reserveringen.find(res => res.id == resId);
    if (!r) {
        alert("Reservering niet gevonden.");
        return;
    }

    let email = (r.aanvragerEmail || "").trim();
    if (!email) {
        const ingevuldeMail = prompt("Er is nog geen e-mailadres gekoppeld aan deze leerkracht. Vul het e-mailadres in om het feedbackformulier te versturen:", "naam@wonderwijs.nl");
        if (!ingevuldeMail || !ingevuldeMail.includes('@')) {
            alert("⚠️ Geen geldig e-mailadres opgegeven.");
            return;
        }
        email = ingevuldeMail.trim();
        r.aanvragerEmail = email;
        slaDataOp();
    }

    const per = periodes.find(p => p.id == r.periodeId);
    const periodeNaam = per ? per.naam : (r.periodeNaam || "afgelopen periode");
    const kistNaam = r.kist || "de leskist";
    const docentNaam = r.leerkracht || "collega";
    const schoolNaam = r.school || "";

    // Genereer de unieke URL naar het feedbackformulier
    const currentUrl = new URL(window.location.href);
    const basePath = currentUrl.pathname.substring(0, currentUrl.pathname.lastIndexOf('/') + 1);
    const feedbackUrl = `${currentUrl.origin}${basePath}feedback.html?resId=${encodeURIComponent(r.id)}&kist=${encodeURIComponent(kistNaam)}&periode=${encodeURIComponent(periodeNaam)}&docent=${encodeURIComponent(docentNaam)}&email=${encodeURIComponent(email)}&school=${encodeURIComponent(schoolNaam)}`;

    const subject = `Hoe is ${kistNaam} bevallen? Deel je ervaring en foto's met het Verwonderlab!`;

    const body = `Beste ${docentNaam},

Wat ontzettend leuk dat je onlangs ${kistNaam} hebt gebruikt in de klas tijdens ${periodeNaam}!

Om het Verwonderlab en ons aanbod binnen Stichting Wonderwijs continu te verbeteren en inspiratie te verzamelen voor collega-leerkrachten, zijn we erg benieuwd naar jouw ervaringen. 

Zou je via onderstaande link ons korte feedbackformulier willen invullen?
${feedbackUrl}

In het formulier kun je onder andere delen:
• Hoe het materiaal is bevallen en hoe enthousiast de leerlingen waren
• Aan welke kerndoelen van Digitale Geletterdheid (DG) er is gewerkt
• Eventuele leuke foto's of quotes uit de les (optioneel)

Het invullen duurt slechts 2 minuten en je helpt het Verwonderlab en je collega's er enorm mee!

Alvast hartelijk dank voor je inzet en enthousiasme!

Met vriendelijke groet,

Het Verwonderlab Team
Stichting Wonderwijs
verwonderlab@wonderwijs.nl`;

    // 1. Open direct in Outlook (Microsoft 365)
    window.openInOutlook(email, subject, body);

    // 2. Registreer verzendstatus
    r.feedbackVerstuurd = true;
    r.feedbackVerstuurdOp = new Date().toISOString().split('T')[0];
    slaDataOp();
    if (typeof window.updateChecklistInCloud === "function") {
        window.updateChecklistInCloud(r.id, { 
            feedbackVerstuurd: true, 
            feedbackVerstuurdOp: r.feedbackVerstuurdOp,
            aanvragerEmail: email
        });
    }

    if (typeof window.renderBeheerdersTabellen === "function") {
        window.renderBeheerdersTabellen();
    }
};

window.bekijkIngevuldeFeedback = function(resId) {
    const r = reserveringen.find(res => res.id == resId);
    let item = (feedbackLijst || []).find(f => f.resId == resId);
    if (!item && r && r.feedbackData) item = r.feedbackData;

    if (!item) {
        alert("Er is nog geen ingevulde evaluatie gevonden voor deze reservering.");
        return;
    }

    const modal = document.getElementById('feedbackDetailModal');
    if (!modal) return;

    if (document.getElementById('feedbackModalKist')) document.getElementById('feedbackModalKist').innerText = item.kist || (r ? r.kist : "Leskist");
    if (document.getElementById('feedbackModalDocent')) document.getElementById('feedbackModalDocent').innerText = `${item.docent || ''} (${item.email || ''}) • ${item.school || ''}`;
    if (document.getElementById('feedbackModalPeriode')) document.getElementById('feedbackModalPeriode').innerText = item.periode || '';

    // Sterren
    const sterrenAantal = item.sterren || 5;
    let sterrenHTML = '';
    for (let i = 1; i <= 5; i++) {
        sterrenHTML += `<span style="font-size: 22px; color: ${i <= sterrenAantal ? '#f59e0b' : '#cbd5e1'};">★</span>`;
    }
    if (document.getElementById('feedbackModalSterren')) {
        document.getElementById('feedbackModalSterren').innerHTML = `${sterrenHTML} <strong style="margin-left: 8px; color: #b45309; font-size: 13.5px;">${sterrenAantal} / 5 sterren</strong>`;
    }

    if (document.getElementById('feedbackModalEnthousiasme')) document.getElementById('feedbackModalEnthousiasme').innerText = item.enthousiasme || 'Niet ingevuld';
    if (document.getElementById('feedbackModalCompleet')) document.getElementById('feedbackModalCompleet').innerText = item.compleetheid || 'Niet ingevuld';
    if (document.getElementById('feedbackModalToelichting')) document.getElementById('feedbackModalToelichting').innerText = item.toelichting || '(Geen toelichting opgegeven)';

    // DG Doelen
    const domeinen = item.dgDomeinen || [];
    const doelenContainer = document.getElementById('feedbackModalDoelen');
    if (doelenContainer) {
        if (domeinen.length > 0) {
            doelenContainer.innerHTML = domeinen.map(d => `<span style="background: rgba(140, 198, 63, 0.15); color: #166534; font-weight: 700; padding: 4px 10px; border-radius: 9999px; font-size: 12px; display: inline-block; margin: 3px;">🎯 ${d}</span>`).join('');
        } else {
            doelenContainer.innerText = 'Geen specifieke domeinen aangevinkt.';
        }
    }

    if (document.getElementById('feedbackModalOpdracht')) document.getElementById('feedbackModalOpdracht').innerText = item.specifiekeOpdracht || 'Geen specifieke opdracht vermeld.';

    // Foto's
    const fotos = item.fotos || [];
    const fotoContainer = document.getElementById('feedbackModalFotos');
    if (fotoContainer) {
        if (fotos.length > 0) {
            fotoContainer.innerHTML = fotos.map(src => `
                <a href="${src}" target="_blank" style="display: block; width: 110px; height: 85px; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 1px solid #cbd5e1;">
                    <img src="${src}" style="width: 100%; height: 100%; object-fit: cover;">
                </a>
            `).join('');
        } else {
            fotoContainer.innerHTML = '<span style="color: #64748b; font-size: 13px;">Geen foto\'s geüpload bij deze evaluatie.</span>';
        }
    }

    const onedriveEl = document.getElementById('feedbackModalOneDrive');
    if (onedriveEl) {
        if (item.onedriveLink) {
            onedriveEl.innerHTML = `🔗 <a href="${item.onedriveLink}" target="_blank" style="color: #0284c7; font-weight: 700; text-decoration: underline;">Open gedeelde SharePoint / OneDrive fotomap</a>`;
            onedriveEl.style.display = 'block';
        } else {
            onedriveEl.style.display = 'none';
        }
    }

    const quoteBox = document.getElementById('feedbackModalQuoteContainer');
    if (quoteBox) {
        if (item.quote) {
            document.getElementById('feedbackModalQuote').innerText = `"${item.quote}"`;
            quoteBox.style.display = 'block';
        } else {
            quoteBox.style.display = 'none';
        }
    }

    const extraVragenContainer = document.getElementById('feedbackModalExtraVragenContainer');
    const extraVragenList = document.getElementById('feedbackModalExtraVragenList');
    if (extraVragenContainer && extraVragenList) {
        const extraAntwoorden = item.extraAntwoorden || [];
        if (Array.isArray(extraAntwoorden) && extraAntwoorden.length > 0) {
            extraVragenList.innerHTML = extraAntwoorden.map(ea => `
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px 14px;">
                    <div style="font-size: 11.5px; font-weight: 700; color: #475569; margin-bottom: 3px;">${ea.vraag}</div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #0f172a;">${ea.antwoord || '<em style="color:#94a3b8; font-weight:normal;">Niet beantwoord</em>'}</div>
                </div>
            `).join('');
            extraVragenContainer.style.display = 'block';
        } else {
            extraVragenContainer.style.display = 'none';
        }
    }

    modal.style.display = 'flex';
};

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
let currentLesideeFiles = [];

window.handleLesideeFilesUpload = function(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        const fileSizeStr = file.size > 1024 * 1024 
            ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
            : Math.max(1, Math.round(file.size / 1024)) + ' KB';
        
        reader.onload = (e) => {
            currentLesideeFiles.push({
                naam: file.name,
                type: file.type || 'application/octet-stream',
                grootte: fileSizeStr,
                data: e.target.result
            });
            window.updateLesideeFilesPreview();
        };
        reader.readAsDataURL(file);
    });
    event.target.value = '';
};

window.updateLesideeFilesPreview = function() {
    const container = document.getElementById('lesideeFilesPreviewContainer');
    if (!container) return;
    if (!currentLesideeFiles || currentLesideeFiles.length === 0) {
        container.innerHTML = `<div style="font-size: 12.5px; color: var(--slate-400); font-style: italic; padding: 6px 0;">Geen bestanden of werkbladen gekoppeld aan deze les.</div>`;
        return;
    }
    container.innerHTML = currentLesideeFiles.map((f, idx) => `
        <div class="les-file-preview-item">
            <div class="les-file-preview-name">
                <span style="font-size: 16px;">📄</span>
                <strong style="color: var(--slate-900);">${f.naam}</strong>
                <span style="font-size: 11px; color: var(--slate-400);">(${f.grootte || 'Bijlage'})</span>
            </div>
            <button type="button" class="btn-remove-file" onclick="window.removeLesideeFile(${idx})" title="Verwijder bestand">🗑️</button>
        </div>
    `).join('');
};

window.removeLesideeFile = function(idx) {
    if (idx >= 0 && idx < currentLesideeFiles.length) {
        currentLesideeFiles.splice(idx, 1);
        window.updateLesideeFilesPreview();
    }
};

window.openLesideeModal = function(id = null) {
    const form = document.getElementById('editLesideeForm');
    if (!form) return;
    form.reset();

    // Vul dropdown met actieve leskisten
    const kistSelect = document.getElementById('editLesideeKistSelect');
    if (kistSelect) {
        kistSelect.innerHTML = '<option value="">-- Geen specifieke kist --</option>' + 
            leskisten.map(k => `<option value="${k.id}">${k.naam}</option>`).join('');
    }

    if (id) {
        document.getElementById('modalLesideeTitle').innerText = "Lesidee & Lesbrief Bewerken";
        const idee = lesideeen.find(i => i.id == id);
        if (!idee) return;

        const lb = idee.lesbrief || {};
        const dg = lb.dgDoelen || {};
        const diff = lb.differentiatie || {};

        if (document.getElementById('editLesideeId')) document.getElementById('editLesideeId').value = idee.id;
        if (document.getElementById('editLesideeTitel')) document.getElementById('editLesideeTitel').value = idee.titel || "";
        if (document.getElementById('editLesideeCategorie')) document.getElementById('editLesideeCategorie').value = idee.categorie || "";
        if (kistSelect && idee.kistId) kistSelect.value = idee.kistId;
        if (document.getElementById('editLesideeDoelgroep')) document.getElementById('editLesideeDoelgroep').value = idee.doelgroep || idee.bouw || "Groep 5-6 (Midden/Bovenbouw)";
        if (document.getElementById('editLesideeMoeilijkheid')) document.getElementById('editLesideeMoeilijkheid').value = idee.moeilijkheid || "Gemiddeld ⭐⭐";
        if (document.getElementById('editLesideeBeschrijving')) document.getElementById('editLesideeBeschrijving').value = idee.beschrijving || "";
        if (document.getElementById('editLesideeLink')) document.getElementById('editLesideeLink').value = idee.link || "";

        // DG doelen
        if (document.getElementById('editLesideeDgDomein')) document.getElementById('editLesideeDgDomein').value = dg.domein || "";
        if (document.getElementById('editLesideeDgKerndoelen')) {
            document.getElementById('editLesideeDgKerndoelen').value = Array.isArray(dg.kerndoelenWonderwijs) ? dg.kerndoelenWonderwijs.join('\n') : (dg.kerndoelenWonderwijs || "");
        }
        if (document.getElementById('editLesideeDgLeerlingDoelen')) document.getElementById('editLesideeDgLeerlingDoelen').value = dg.leerlingDoelen || lb.doelen || "";

        // Tijd & materialen
        if (document.getElementById('editLesideeTijd')) document.getElementById('editLesideeTijd').value = lb.tijd || "60 min";
        if (document.getElementById('editLesideeOrganisatie')) document.getElementById('editLesideeOrganisatie').value = lb.organisatie || "In tweetallen";
        if (document.getElementById('editLesideeKistMateriaal')) document.getElementById('editLesideeKistMateriaal').value = lb.kistMateriaal || "";
        if (document.getElementById('editLesideeKlasMateriaal')) document.getElementById('editLesideeKlasMateriaal').value = lb.klasMateriaal || "";
        if (document.getElementById('editLesideeVoorbereiding')) document.getElementById('editLesideeVoorbereiding').value = lb.voorbereiding || "";

        // Fasen
        if (document.getElementById('editLesideeInleiding')) document.getElementById('editLesideeInleiding').value = lb.inleiding || "";
        if (document.getElementById('editLesideeKern')) document.getElementById('editLesideeKern').value = lb.kern || "";
        if (document.getElementById('editLesideeAfsluiting')) document.getElementById('editLesideeAfsluiting').value = lb.afsluiting || "";

        // Differentiatie
        if (document.getElementById('editLesideeDiffUitdaging')) document.getElementById('editLesideeDiffUitdaging').value = diff.uitdaging || "";
        if (document.getElementById('editLesideeDiffOndersteuning')) document.getElementById('editLesideeDiffOndersteuning').value = diff.ondersteuning || lb.tips || "";

        // Bestanden
        currentLesideeFiles = (idee.bestanden && Array.isArray(idee.bestanden)) ? JSON.parse(JSON.stringify(idee.bestanden)) : [];
    } else {
        document.getElementById('modalLesideeTitle').innerText = "Nieuw Lesidee Toevoegen";
        if (document.getElementById('editLesideeId')) document.getElementById('editLesideeId').value = "";
        currentLesideeFiles = [];
    }

    window.updateLesideeFilesPreview();
    const m = document.getElementById('editLesideeModal');
    if (m) m.style.display = 'flex';
};

// ==========================================
// LEERLIJNEN VOORTGANG & CLOUD SYNCHRONISATIE
// ==========================================
document.addEventListener('change', (e) => { 
    if (e.target.type === 'checkbox' && e.target.id && e.target.id.startsWith('check-domein')) { 
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
        
        let huidigeEmail = localStorage.getItem('ww_huidige_email'); 
        if(huidigeEmail && typeof window.saveVoortgangToCloud === 'function') {
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

// ==========================================
// FEEDBACKFORMULIER CONFIGURATIE & BEHEER
// ==========================================

window.renderFeedbackConfigTab = function() {
    if (!feedbackConfig) feedbackConfig = defaultFeedbackConfig;
    if (!feedbackConfig.secties) feedbackConfig.secties = defaultFeedbackConfig.secties;
    if (!feedbackConfig.extraVragen) feedbackConfig.extraVragen = [];

    // Blok 1: Algemene Titels & Teksten
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val !== undefined ? val : ''; };
    const setCheck = (id, val) => { const el = document.getElementById(id); if (el) el.checked = !!val; };

    setVal('cfgFormTitel', feedbackConfig.titel || defaultFeedbackConfig.titel);
    setVal('cfgFormOndertitel', feedbackConfig.ondertitel || defaultFeedbackConfig.ondertitel);
    setVal('cfgBedankTitel', feedbackConfig.bedankTitel || defaultFeedbackConfig.bedankTitel);
    setVal('cfgBedankTekst', feedbackConfig.bedankTekst || defaultFeedbackConfig.bedankTekst);

    const s = feedbackConfig.secties;

    // Vraag 1: Sterren
    const sterrenSec = s.sterren || defaultFeedbackConfig.secties.sterren;
    setCheck('cfgSecSterrenActief', sterrenSec.actief !== false);
    setVal('cfgSecSterrenTitel', sterrenSec.titel || defaultFeedbackConfig.secties.sterren.titel);
    setVal('cfgSecSterrenToelichting', sterrenSec.toelichting || defaultFeedbackConfig.secties.sterren.toelichting);

    // Vraag 2: Enthousiasme
    const enthSec = s.enthousiasme || defaultFeedbackConfig.secties.enthousiasme;
    setCheck('cfgSecEnthousiasmeActief', enthSec.actief !== false);
    setVal('cfgSecEnthousiasmeTitel', enthSec.titel || defaultFeedbackConfig.secties.enthousiasme.titel);
    setVal('cfgSecEnthousiasmeToelichting', enthSec.toelichting || defaultFeedbackConfig.secties.enthousiasme.toelichting);
    setVal('cfgSecEnthousiasmeOpties', Array.isArray(enthSec.opties) ? enthSec.opties.join(', ') : (enthSec.opties || defaultFeedbackConfig.secties.enthousiasme.opties.join(', ')));

    // Vraag 3: Compleetheid
    const complSec = s.compleetheid || defaultFeedbackConfig.secties.compleetheid;
    setCheck('cfgSecCompleetheidActief', complSec.actief !== false);
    setVal('cfgSecCompleetheidLabel', complSec.label || defaultFeedbackConfig.secties.compleetheid.label);
    setVal('cfgSecCompleetheidOpties', Array.isArray(complSec.opties) ? complSec.opties.join(', ') : (complSec.opties || defaultFeedbackConfig.secties.compleetheid.opties.join(', ')));

    // Vraag 4: Toelichting
    const toelSec = s.toelichting || defaultFeedbackConfig.secties.toelichting;
    setCheck('cfgSecToelichtingActief', toelSec.actief !== false);
    setVal('cfgSecToelichtingLabel', toelSec.label || defaultFeedbackConfig.secties.toelichting.label);
    setVal('cfgSecToelichtingPlaceholder', toelSec.placeholder || defaultFeedbackConfig.secties.toelichting.placeholder);

    // Vraag 5: DG Doelen
    const dgSec = s.dgDoelen || defaultFeedbackConfig.secties.dgDoelen;
    setCheck('cfgSecDgActief', dgSec.actief !== false);
    setVal('cfgSecDgTitel', dgSec.titel || defaultFeedbackConfig.secties.dgDoelen.titel);
    setVal('cfgSecDgToelichting', dgSec.toelichting || defaultFeedbackConfig.secties.dgDoelen.toelichting);
    setVal('cfgSecDgOpdrachtLabel', dgSec.opdrachtLabel || defaultFeedbackConfig.secties.dgDoelen.opdrachtLabel);
    setVal('cfgSecDgOpdrachtPlaceholder', dgSec.opdrachtPlaceholder || defaultFeedbackConfig.secties.dgDoelen.opdrachtPlaceholder);

    // Vraag 6: Foto's
    const fotosSec = s.fotos || defaultFeedbackConfig.secties.fotos;
    setCheck('cfgSecFotosActief', fotosSec.actief !== false);
    setVal('cfgSecFotosTitel', fotosSec.titel || defaultFeedbackConfig.secties.fotos.titel);
    setVal('cfgSecFotosToelichting', fotosSec.toelichting || defaultFeedbackConfig.secties.fotos.toelichting);
    setVal('cfgSecFotosAvg', fotosSec.avg || defaultFeedbackConfig.secties.fotos.avg);

    // Vraag 7: OneDrive / SharePoint
    const odSec = s.onedrive || defaultFeedbackConfig.secties.onedrive;
    setCheck('cfgSecOnedriveActief', odSec.actief !== false);
    setVal('cfgSecOnedriveLabel', odSec.label || defaultFeedbackConfig.secties.onedrive.label);

    // Vraag 8: Quote
    const quoteSec = s.quote || defaultFeedbackConfig.secties.quote;
    setCheck('cfgSecQuoteActief', quoteSec.actief !== false);
    setVal('cfgSecQuoteLabel', quoteSec.label || defaultFeedbackConfig.secties.quote.label);
    setVal('cfgSecQuotePlaceholder', quoteSec.placeholder || defaultFeedbackConfig.secties.quote.placeholder);

    // Render sublijsten
    window.renderConfigDgDomeinen();
    window.renderConfigExtraVragen();
};

window.renderConfigDgDomeinen = function() {
    const container = document.getElementById('cfgDgDomeinenContainer');
    if (!container) return;

    if (!feedbackConfig.secties.dgDoelen.domeinen) {
        feedbackConfig.secties.dgDoelen.domeinen = defaultFeedbackConfig.secties.dgDoelen.domeinen;
    }
    const domeinen = feedbackConfig.secties.dgDoelen.domeinen;

    container.innerHTML = domeinen.map((d, idx) => `
        <div class="dg-domain-item-row">
            <span style="font-size: 18px; width: 24px; text-align: center;">${d.icoon || '🎯'}</span>
            <input type="text" id="cfgDgTitel_${idx}" value="${(d.titel || '').replace(/"/g, '&quot;')}" placeholder="Domeintitel..." style="max-width: 200px; font-weight: 700;">
            <input type="text" id="cfgDgSub_${idx}" value="${(d.sub || '').replace(/"/g, '&quot;')}" placeholder="Toelichting van het domein...">
            <button type="button" class="btn-icon-action danger" onclick="window.deleteDgDomainRow(${idx})" title="Domein verwijderen">🗑️</button>
        </div>
    `).join('');
};

window.addDgDomainRow = function() {
    if (!feedbackConfig.secties.dgDoelen.domeinen) feedbackConfig.secties.dgDoelen.domeinen = [];
    feedbackConfig.secties.dgDoelen.domeinen.push({
        icoon: "💡",
        titel: "Nieuw Domein",
        sub: "Beschrijf hier de vaardigheden die binnen dit domein vallen."
    });
    window.renderConfigDgDomeinen();
};

window.deleteDgDomainRow = function(idx) {
    if (feedbackConfig.secties.dgDoelen.domeinen && feedbackConfig.secties.dgDoelen.domeinen.length > 0) {
        feedbackConfig.secties.dgDoelen.domeinen.splice(idx, 1);
        window.renderConfigDgDomeinen();
    }
};

window.renderConfigExtraVragen = function() {
    const container = document.getElementById('cfgExtraVragenLijst');
    if (!container) return;

    const vragen = feedbackConfig.extraVragen || [];
    if (vragen.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px 20px; background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 14px; color: #64748b;">
                <span style="font-size: 28px; display: block; margin-bottom: 6px;">📋</span>
                <strong style="color: #334155; font-size: 14px;">Nog geen aanvullende vragen toegevoegd</strong>
                <p style="margin: 4px 0 14px 0; font-size: 12.5px;">Wil je een extra vraag stellen over bijvoorbeeld een specifiek vakgebied, aanbevelingen of leerlingreacties?</p>
                <button type="button" class="btn-green-action" onclick="window.openExtraVraagModal()" style="font-size: 12.5px; padding: 7px 16px;">
                    <span>➕</span> Voeg eerste vraag toe
                </button>
            </div>
        `;
        return;
    }

    const typeLabels = {
        'tekst': 'Korte open tekst',
        'textarea': 'Uitgebreide open tekst',
        'radio': 'Meerkeuze (1 keuze)',
        'checkbox': 'Selectievakjes',
        'sterren': '1-5 Sterren',
        'janee': 'Ja / Nee'
    };

    container.innerHTML = vragen.map((v, idx) => `
        <div class="custom-question-card">
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                    <strong style="font-size: 14px; color: #0f172a;">${v.vraag}</strong>
                    <span class="badge-question-type">${typeLabels[v.type] || v.type}</span>
                    ${v.verplicht ? '<span class="badge-required">Verplicht</span>' : ''}
                </div>
                ${v.toelichting ? `<p style="margin: 0; font-size: 12.5px; color: #64748b;">${v.toelichting}</p>` : ''}
                ${(v.type === 'radio' || v.type === 'checkbox') && v.opties ? `
                    <div style="margin-top: 6px; font-size: 11.5px; color: #475569;">
                        <strong>Opties:</strong> ${Array.isArray(v.opties) ? v.opties.join(' • ') : v.opties}
                    </div>
                ` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
                ${idx > 0 ? `<button type="button" class="btn-icon-action" onclick="window.moveExtraVraag(${v.id}, -1)" title="Omhoog verplaatsen">⬆️</button>` : ''}
                ${idx < vragen.length - 1 ? `<button type="button" class="btn-icon-action" onclick="window.moveExtraVraag(${v.id}, 1)" title="Omlaag verplaatsen">⬇️</button>` : ''}
                <button type="button" class="btn-icon-action" onclick="window.openExtraVraagModal(${v.id})" title="Vraag bewerken">✏️</button>
                <button type="button" class="btn-icon-action danger" onclick="window.deleteExtraVraag(${v.id})" title="Vraag verwijderen">🗑️</button>
            </div>
        </div>
    `).join('');
};

window.openExtraVraagModal = function(id = null) {
    const form = document.getElementById('extraVraagForm');
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById('modalExtraVraagTitle');
    const idInput = document.getElementById('editExtraVraagId');
    const titelInput = document.getElementById('extraVraagTitel');
    const toelichtingInput = document.getElementById('extraVraagToelichting');
    const typeSelect = document.getElementById('extraVraagType');
    const optiesInput = document.getElementById('extraVraagOpties');
    const verplichtCb = document.getElementById('extraVraagVerplicht');

    if (id) {
        if (titleEl) titleEl.innerText = "✏️ Vraag bewerken";
        const v = (feedbackConfig.extraVragen || []).find(x => x.id == id);
        if (v) {
            if (idInput) idInput.value = v.id;
            if (titelInput) titelInput.value = v.vraag || '';
            if (toelichtingInput) toelichtingInput.value = v.toelichting || '';
            if (typeSelect) typeSelect.value = v.type || 'tekst';
            if (optiesInput) optiesInput.value = Array.isArray(v.opties) ? v.opties.join(', ') : (v.opties || '');
            if (verplichtCb) verplichtCb.checked = !!v.verplicht;
        }
    } else {
        if (titleEl) titleEl.innerText = "➕ Aanvullende Vraag toevoegen";
        if (idInput) idInput.value = "";
        if (typeSelect) typeSelect.value = "tekst";
        if (verplichtCb) verplichtCb.checked = false;
    }

    window.toggleExtraVraagOptiesVeld();
    const modal = document.getElementById('extraVraagModal');
    if (modal) modal.style.display = 'flex';
};

window.toggleExtraVraagOptiesVeld = function() {
    const type = document.getElementById('extraVraagType') ? document.getElementById('extraVraagType').value : 'tekst';
    const optiesGroep = document.getElementById('extraVraagOptiesGroep');
    if (optiesGroep) {
        optiesGroep.style.display = (type === 'radio' || type === 'checkbox') ? 'block' : 'none';
    }
};

window.saveExtraVraag = function(e) {
    if (e && e.preventDefault) e.preventDefault();

    const rawId = document.getElementById('editExtraVraagId') ? document.getElementById('editExtraVraagId').value : '';
    const vraagId = rawId ? parseInt(rawId) : Date.now();
    const titel = (document.getElementById('extraVraagTitel') ? document.getElementById('extraVraagTitel').value : '').trim();
    const toelichting = (document.getElementById('extraVraagToelichting') ? document.getElementById('extraVraagToelichting').value : '').trim();
    const type = document.getElementById('extraVraagType') ? document.getElementById('extraVraagType').value : 'tekst';
    const rawOpties = document.getElementById('extraVraagOpties') ? document.getElementById('extraVraagOpties').value : '';
    const verplicht = document.getElementById('extraVraagVerplicht') ? document.getElementById('extraVraagVerplicht').checked : false;

    if (!titel) {
        alert("⚠️ Vul alstublieft een vraagstelling in.");
        return;
    }

    let parsedOpties = [];
    if (type === 'radio' || type === 'checkbox') {
        parsedOpties = rawOpties.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (parsedOpties.length === 0) {
            parsedOpties = ["Optie 1", "Optie 2"];
        }
    }

    if (!feedbackConfig.extraVragen) feedbackConfig.extraVragen = [];

    const existingIdx = feedbackConfig.extraVragen.findIndex(v => v.id == vraagId);
    const questionObj = {
        id: vraagId,
        vraag: titel,
        toelichting: toelichting,
        type: type,
        opties: parsedOpties,
        verplicht: verplicht
    };

    if (existingIdx > -1) {
        feedbackConfig.extraVragen[existingIdx] = questionObj;
    } else {
        feedbackConfig.extraVragen.push(questionObj);
    }

    slaDataOp();
    if (window.saveFeedbackConfigToCloud) window.saveFeedbackConfigToCloud(feedbackConfig);
    window.sluitAlleModals();
    window.renderConfigExtraVragen();
};

window.deleteExtraVraag = function(id) {
    if (confirm("Weet je zeker dat je deze vraag wilt verwijderen?")) {
        feedbackConfig.extraVragen = (feedbackConfig.extraVragen || []).filter(v => v.id != id);
        slaDataOp();
        if (window.saveFeedbackConfigToCloud) window.saveFeedbackConfigToCloud(feedbackConfig);
        window.renderConfigExtraVragen();
    }
};

window.moveExtraVraag = function(id, direction) {
    const list = feedbackConfig.extraVragen || [];
    const idx = list.findIndex(v => v.id == id);
    if (idx === -1) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const item = list.splice(idx, 1)[0];
    list.splice(targetIdx, 0, item);
    feedbackConfig.extraVragen = list;
    slaDataOp();
    if (window.saveFeedbackConfigToCloud) window.saveFeedbackConfigToCloud(feedbackConfig);
    window.renderConfigExtraVragen();
};

window.saveFeedbackConfig = async function() {
    const getVal = (id, def = "") => { const el = document.getElementById(id); return el ? el.value.trim() : def; };
    const getCheck = (id, def = true) => { const el = document.getElementById(id); return el ? el.checked : def; };

    // 1. Titels
    feedbackConfig.titel = getVal('cfgFormTitel', defaultFeedbackConfig.titel);
    feedbackConfig.ondertitel = getVal('cfgFormOndertitel', defaultFeedbackConfig.ondertitel);
    feedbackConfig.bedankTitel = getVal('cfgBedankTitel', defaultFeedbackConfig.bedankTitel);
    feedbackConfig.bedankTekst = getVal('cfgBedankTekst', defaultFeedbackConfig.bedankTekst);

    // 2. Secties
    feedbackConfig.secties = feedbackConfig.secties || {};

    feedbackConfig.secties.sterren = {
        actief: getCheck('cfgSecSterrenActief', true),
        titel: getVal('cfgSecSterrenTitel', '⭐ 1. Algemene beoordeling'),
        toelichting: getVal('cfgSecSterrenToelichting', 'Hoe beoordeel je deze leskist over het geheel genomen?')
    };

    feedbackConfig.secties.enthousiasme = {
        actief: getCheck('cfgSecEnthousiasmeActief', true),
        titel: getVal('cfgSecEnthousiasmeTitel', '👥 2. Ervaring & enthousiasme in de klas'),
        toelichting: getVal('cfgSecEnthousiasmeToelichting', 'Hoe hebben de leerlingen het werken met dit materiaal ervaren?'),
        opties: getVal('cfgSecEnthousiasmeOpties', '').split(',').map(s => s.trim()).filter(s => s.length > 0)
    };

    feedbackConfig.secties.compleetheid = {
        actief: getCheck('cfgSecCompleetheidActief', true),
        label: getVal('cfgSecCompleetheidLabel', 'Kwaliteit & compleetheid van de kist:'),
        opties: getVal('cfgSecCompleetheidOpties', '').split(',').map(s => s.trim()).filter(s => s.length > 0)
    };

    feedbackConfig.secties.toelichting = {
        actief: getCheck('cfgSecToelichtingActief', true),
        label: getVal('cfgSecToelichtingLabel', 'Toelichting of ervaringen uit de les:'),
        placeholder: getVal('cfgSecToelichtingPlaceholder', '')
    };

    // DG Domeinen ophalen uit de bewerkbare inputs
    const domeinen = feedbackConfig.secties.dgDoelen ? (feedbackConfig.secties.dgDoelen.domeinen || []) : [];
    const updatedDomeinen = domeinen.map((d, idx) => {
        const titelEl = document.getElementById(`cfgDgTitel_${idx}`);
        const subEl = document.getElementById(`cfgDgSub_${idx}`);
        return {
            icoon: d.icoon || "🎯",
            titel: titelEl ? titelEl.value.trim() : d.titel,
            sub: subEl ? subEl.value.trim() : d.sub
        };
    });

    feedbackConfig.secties.dgDoelen = {
        actief: getCheck('cfgSecDgActief', true),
        titel: getVal('cfgSecDgTitel', '🎯 3. Doelen Digitale Geletterdheid (DG)'),
        toelichting: getVal('cfgSecDgToelichting', 'Aan welke domeinen en vaardigheden uit de leerlijn Digitale Geletterdheid is tijdens dit project gewerkt?'),
        domeinen: updatedDomeinen.length > 0 ? updatedDomeinen : defaultFeedbackConfig.secties.dgDoelen.domeinen,
        opdrachtLabel: getVal('cfgSecDgOpdrachtLabel', 'Specifieke lesopdracht of kerndoel (optioneel):'),
        opdrachtPlaceholder: getVal('cfgSecDgOpdrachtPlaceholder', '')
    };

    feedbackConfig.secties.fotos = {
        actief: getCheck('cfgSecFotosActief', true),
        titel: getVal('cfgSecFotosTitel', '📸 4. Foto\'s & Resultaten delen (Optioneel)'),
        toelichting: getVal('cfgSecFotosToelichting', 'Deel foto\'s van leerlingen aan het werk, van het bouwwerk of het eindresultaat.'),
        avg: getVal('cfgSecFotosAvg', defaultFeedbackConfig.secties.fotos.avg)
    };

    feedbackConfig.secties.onedrive = {
        actief: getCheck('cfgSecOnedriveActief', true),
        label: getVal('cfgSecOnedriveLabel', 'Of deel een link naar jullie school SharePoint / OneDrive foto-map:')
    };

    feedbackConfig.secties.quote = {
        actief: getCheck('cfgSecQuoteActief', true),
        label: getVal('cfgSecQuoteLabel', 'Quote van een leerling of gouden tip (optioneel):'),
        placeholder: getVal('cfgSecQuotePlaceholder', '')
    };

    slaDataOp();

    const saveIcon = document.getElementById('saveConfigIcon');
    if (saveIcon) saveIcon.innerText = '⏳';

    if (window.saveFeedbackConfigToCloud) {
        await window.saveFeedbackConfigToCloud(feedbackConfig);
    }

    if (saveIcon) saveIcon.innerText = '✅';
    setTimeout(() => { if (saveIcon) saveIcon.innerText = '💾'; }, 2000);

    alert("✅ Feedbackformulier configuratie succesvol opgeslagen!\n\nAlle wijzigingen in vragen, titels en opties zijn nu direct actief in het live feedbackformulier.");
};

window.resetFeedbackConfig = async function() {
    if (confirm("Weet je zeker dat je alle vragen en instellingen van het feedbackformulier wilt resetten naar de standaard Wonderwijs waarden?")) {
        feedbackConfig = JSON.parse(JSON.stringify(defaultFeedbackConfig));
        slaDataOp();
        if (window.saveFeedbackConfigToCloud) {
            await window.saveFeedbackConfigToCloud(feedbackConfig);
        }
        window.renderFeedbackConfigTab();
        alert("🔄 Feedbackformulier instellingen zijn succesvol hersteld naar standaard!");
    }
};

// Start eventuele deep link routering bij het laden
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.checkUrlReservationParam === 'function') {
        window.checkUrlReservationParam();
    }
});