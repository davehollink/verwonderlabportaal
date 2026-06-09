// Database met alle geëxtraheerde kerndoelen per bouw uit de Handreiking
const leerlijnenDB = {
    "groep1-2": [
        {
            domein: "1. Praktische kennis en vaardigheden",
            kerndoelen: [
                [cite_start]{ titel: "22a Digitale systemen", acties: ["Ontdekt dat apparaten zoals computers, tablets en smartphones verschillend werken, maar vergelijkbare functies hebben. [cite: 1144][cite_start]", "Leert apparaten aan- en uit te zetten en eenvoudige handelingen uit te voeren. [cite: 1144][cite_start]", "Herkent en benoemt digitale apparaten en begrijpt dat internet verbinding maakt met informatie. [cite: 1144]"] },
                [cite_start]{ titel: "22b Digitale media en info", acties: ["Ontdekt dat informatie uit verschillende bronnen kan komen. [cite: 1190][cite_start]", "Herkent dat digitale media verschillende doelen kunnen hebben. [cite: 1190][cite_start]", "Leert dat niet alles wat op een scherm staat echt of waar is. [cite: 1190]"] },
                [cite_start]{ titel: "22c Data", acties: ["Herkent en verzamelt eenvoudige data. [cite: 1240][cite_start]", "Ordent gegevens met fysieke materialen of pictogrammen. [cite: 1240][cite_start]", "Vergelijkt en benoemt 'meeste/minste'. [cite: 1240][cite_start]", "Herkent spelenderwijs patronen en voorkeuren. [cite: 1240]"] },
                [cite_start]{ titel: "22d Artificial Intelligence (AI)", acties: ["Herkent eenvoudige AI-toepassingen in het dagelijks leven. [cite: 1285][cite_start]", "Ontwikkelt een eerste begrip van 'slimme' technologie. [cite: 1285]"] }
            ]
        },
        {
            domein: "2. Ontwerpen en maken",
            kerndoelen: [
                [cite_start]{ titel: "23a Creëren met technologie", acties: ["Ontdekt dat je met technologie iets kunt maken. [cite: 1391][cite_start]", "Ervaart plezier in digitaal creëren. [cite: 1391]"] },
                [cite_start]{ titel: "23b Programmeren", acties: ["Ontdekt dat je een computer of robot kunt aansturen met instructies. [cite: 1439][cite_start]", "Leert dat je stappen in een bepaalde volgorde moet zetten. [cite: 1439][cite_start]", "Ervaart dat fouten horen bij uitproberen en verbeteren. [cite: 1439][cite_start]", "Herkent eenvoudige patronen. [cite: 1439][cite_start]", "Ziet in dat een reeks opdrachten samen een stappenplan/algoritme vormt. [cite: 1439]"] }
            ]
        },
        {
            domein: "3. De gedigitaliseerde wereld",
            kerndoelen: [
                [cite_start]{ titel: "24a Veiligheid & privacy", acties: ["Snapt dat niet alles op een scherm echt of veilig is. [cite: 1530][cite_start]", "Weet dat hij of zij niet alles over zichzelf hoeft te vertellen online. [cite: 1530][cite_start]", "Weet dat hulp vragen mag als iets spannend of raar voelt op het scherm. [cite: 1530]"] },
                [cite_start]{ titel: "24b Jezelf en de ander", acties: ["Snapt dat te lang naar een scherm kijken niet altijd gezond is. [cite: 1579][cite_start]", "Weet dat het goed is om af en toe pauze te nemen. [cite: 1579][cite_start]", "Weet dat niet alles wat online te zien is, echt of waar hoeft te zijn. [cite: 1579][cite_start]", "Oefent met aardig en respectvol communiceren, ook digitaal. [cite: 1579][cite_start]", "Snapt dat online gedrag invloed kan hebben op anderen. [cite: 1579]"] },
                [cite_start]{ titel: "24c Samenleving en wereld", acties: ["Snapt dat apparaten overal om ons heen zijn. [cite: 1619][cite_start]", "Weet dat apparaten helpen bij dagelijkse dingen zoals leren, spelen en communiceren. [cite: 1619]"] }
            ]
        }
    ],
    "groep3-4": [
        {
            domein: "1. Praktische kennis en vaardigheden",
            kerndoelen: [
                [cite_start]{ titel: "22a Digitale systemen", acties: ["Leert bestanden aan te maken, op te slaan en terug te vinden met begeleiding. [cite: 1144][cite_start]", "Begrijpt dat apps en programma's specifieke functies hebben en leert ze doelgericht te gebruiken. [cite: 1144][cite_start]", "Ontdekt het verschil tussen lokaal en online opslaan. [cite: 1144][cite_start]", "Ontdekt dat een computer reageert op signalen uit de omgeving. [cite: 1144]"] },
                [cite_start]{ titel: "22b Digitale media en info", acties: ["Leert eenvoudige informatievragen te stellen en passende zoektermen te gebruiken. [cite: 1190][cite_start]", "Begrijpt dat media commerciële doelen kunnen hebben. [cite: 1190][cite_start]", "Weet dat persoonlijke gegevens beschermd moeten blijven en waarom dat belangrijk is. [cite: 1190]"] },
                [cite_start]{ titel: "22c Data", acties: ["Verzamelt gegevens via vragenlijsten of observaties. [cite: 1240][cite_start]", "Ordent in lijsten of tabellen en maakt eenvoudige grafieken. [cite: 1240][cite_start]", "Trekt eenvoudige conclusies op basis van data en begrijpt dat meetresultaten kunnen verschillen. [cite: 1240]"] },
                [cite_start]{ titel: "22d Artificial Intelligence (AI)", acties: ["Begrijpt dat AI leert van data en kan voorbeelden geven in apps/games. [cite: 1285][cite_start]", "Denkt na over wat eerlijk of oneerlijk is bij slimme systemen. [cite: 1285][cite_start]", "Leren kritisch nadenken over wat AI wel en niet kan. [cite: 1285]"] }
            ]
        },
        {
            domein: "2. Ontwerpen en maken",
            kerndoelen: [
                [cite_start]{ titel: "23a Creëren met technologie", acties: ["Gebruikt eenvoudige digitale tools om ideeën vorm te geven. [cite: 1391][cite_start]", "Leert dat ontwerpen en verbeteren bij elkaar horen. [cite: 1391]"] },
                [cite_start]{ titel: "23b Programmeren", acties: ["Leert dat herhaling (loops) een kortere manier is om patronen en instructies weer te geven. [cite: 1439][cite_start]", "Gebruikt eigen woorden om uit te leggen wat een programma of route doet. [cite: 1439][cite_start]", "Ervaart dat een programma getest en aangepast moet worden om te werken. [cite: 1439]"] }
            ]
        },
        {
            domein: "3. De gedigitaliseerde wereld",
            kerndoelen: [
                [cite_start]{ titel: "24a Veiligheid & privacy", acties: ["Kan zeggen wat wel en niet gedeeld mag worden en stopt als iets niet goed voelt. [cite: 1530][cite_start]", "Snapt dat persoonlijke gegevens beschermd moeten worden en wat dit zijn. [cite: 1530][cite_start]", "Weet wat een goed wachtwoord is en dat dit privé blijft. [cite: 1530]"] },
                [cite_start]{ titel: "24b Jezelf en de ander", acties: ["Snapt dat schermtijd invloed heeft op hoe je je voelt. [cite: 1579][cite_start]", "Weet dat er een verschil is tussen de echte en de online versie van jezelf. [cite: 1579][cite_start]", "Herkent dat media invloed hebben op wat je denkt of leuk vindt. [cite: 1579][cite_start]", "Weet dat sommige games en apps expres proberen dat je blijft doorspelen. [cite: 1579]"] },
                [cite_start]{ titel: "24c Samenleving en wereld", acties: ["Snapt dat apparaten invloed hebben op het dagelijks leven. [cite: 1619][cite_start]", "Kan uitleggen wat er gebeurt als apparaten niet werken. [cite: 1619][cite_start]", "Denkt na over hoe technologie dingen makkelijker maakt, maar soms ook lastig. [cite: 1619]"] }
            ]
        }
    ],
    "groep5-6": [
        {
            domein: "1. Praktische kennis en vaardigheden",
            kerndoelen: [
                [cite_start]{ titel: "22a Digitale systemen", acties: ["Gebruikt digitale toepassingen om informatie te verwerken en schooltaken uit te voeren. [cite: 1149][cite_start]", "Leert persoonlijke bestanden zelfstandig te ordenen, kopiëren, delen en verwijderen. [cite: 1149][cite_start]", "Begrijpt basisprincipes van bestandsbeheer en online opslag (cloud). [cite: 1149][cite_start]", "Leert dat fysieke schakelingen digitale acties aansturen. [cite: 1149]"] },
                [cite_start]{ titel: "22b Digitale media en info", acties: ["Leert feiten en meningen in online informatie te onderscheiden. [cite: 1199][cite_start]", "Gebruikt betrouwbare bronnen doelgericht en beoordeelt ze op betrouwbaarheid en actualiteit. [cite: 1199][cite_start]", "Weet hoe digitale veiligheid werkt. [cite: 1199]"] },
                [cite_start]{ titel: "22c Data", acties: ["Verwerkt en voert data in met digitale tools (Excel, Forms). [cite: 1246][cite_start]", "Herkent en interpreteert verschillende grafieksoorten. [cite: 1246]", "Vergelijkt data en geeft verklaringen voor verschillen. [cite_start]Kijkt kritisch naar juistheid en herkomst. [cite: 1246]"] },
                [cite_start]{ titel: "22d Artificial Intelligence (AI)", acties: ["Begrijpt hoe AI beslissingen neemt op basis van data. [cite: 1292][cite_start]", "Herkent bias (vertekeningen) en fouten in AI systemen. [cite: 1292][cite_start]", "Stelt vragen over betrouwbaarheid van AI. [cite: 1292]"] }
            ]
        },
        {
            domein: "2. Ontwerpen en maken",
            kerndoelen: [
                [cite_start]{ titel: "23a Creëren met technologie", acties: ["Ontwerpt en maakt een digitaal product met een doel. [cite: 1400][cite_start]", "Gebruikt feedback om het product te verbeteren. [cite: 1400]"] },
                [cite_start]{ titel: "23b Programmeren", acties: ["Gebruikt basisconcepten: invoer, uitvoer, variabelen en operatoren. [cite: 1444][cite_start]", "Ontwerpt en bouwt een eigen eenvoudig programma of spel. [cite: 1444][cite_start]", "Werkt samen: uitleggen wat je hebt gemaakt en verwerkt feedback. [cite: 1444][cite_start]", "Test systematisch en debugt. [cite: 1444][cite_start]", "Begrijpt dat er verschillende manieren zijn om eenzelfde probleem op te lossen. [cite: 1444]"] }
            ]
        },
        {
            domein: "3. De gedigitaliseerde wereld",
            kerndoelen: [
                [cite_start]{ titel: "24a Veiligheid & privacy", acties: ["Snapt dat wachtwoorden geheim blijven om jezelf te beschermen. [cite: 1540][cite_start]", "Weet dat sommige berichten of websites nep of misleidend kunnen zijn. [cite: 1540][cite_start]", "Denkt na voordat hij of zij iets van zichzelf of anderen online deelt. [cite: 1540][cite_start]", "Herkent ongepaste berichten en gemanipuleerde beelden. [cite: 1540]"] },
                [cite_start]{ titel: "24b Jezelf en de ander", acties: ["Weet wat online identiteit is en waardoor die wordt beïnvloed. [cite: 1585][cite_start]", "Reflecteert op eigen schermgebruik en maakt keuzes die goed zijn voor gezondheid en balans. [cite: 1585][cite_start]", "Snapt dat beelden en media invloed hebben op het zelfbeeld. [cite: 1585]"] },
                [cite_start]{ titel: "24c Samenleving en wereld", acties: ["Snapt dat technologie invloed heeft op mensen, natuur en milieu. [cite: 1627][cite_start]", "Weet dat niet iedereen dezelfde toegang heeft tot internet en apparaten. [cite: 1627][cite_start]", "Denkt na over eerlijk en duurzaam gebruik van technologie. [cite: 1627]"] }
            ]
        }
    ],
    "groep7-8": [
        {
            domein: "1. Praktische kennis en vaardigheden",
            kerndoelen: [
                [cite_start]{ titel: "22a Digitale systemen", acties: ["Begrijpt hoe digitale systemen samenwerken en leert technische problemen oplossen. [cite: 1149][cite_start]", "Gebruikt geavanceerdere toepassingen zoals spreadsheets met eenvoudige formules. [cite: 1149][cite_start]", "Leert hoe onderdelen zoals processor, geheugen en router bijdragen aan apparaten. [cite: 1149][cite_start]", "Werkt samen in gedeelde documenten en past opmaak toe. [cite: 1149]"] },
                [cite_start]{ titel: "22b Digitale media en info", acties: ["Begrijpt hoe algoritmes en zoekmachines zoekresultaten beïnvloeden. [cite: 1199][cite_start]", "Leert informatie te beoordelen op betrouwbaarheid, actualiteit en bedoeling van de maker. [cite: 1199][cite_start]", "Onderzoekt de invloed van digitale media op privacy en samenleving. [cite: 1199][cite_start]", "Leert informatie visueel te verwerken in grafieken. [cite: 1199]"] },
                [cite_start]{ titel: "22c Data", acties: ["Ziet in dat verkeerde conclusies kunnen ontstaan door foutieve data. [cite: 1246][cite_start]", "Zet zelfstandig onderzoek op met dataverzameling en interpreteert complexe data. [cite: 1246][cite_start]", "Is ethisch bewust: data en privacy, digitale voetafdruk en keuzes in datadeling. [cite: 1246]"] },
                [cite_start]{ titel: "22d Artificial Intelligence (AI)", acties: ["Analyseert de werking en impact van AI op mens en maatschappij. [cite: 1292][cite_start]", "Reflecteert op ethische dilemma's (zoals privacy, autonomie, bias). [cite: 1292][cite_start]", "Ontwerpt of onderzoekt een AI-toepassing. [cite: 1292]"] }
            ]
        },
        {
            domein: "2. Ontwerpen en maken",
            kerndoelen: [
                [cite_start]{ titel: "23a Creëren met technologie", acties: ["Werkt zelfstandig of in groepjes aan een digitaal project. [cite: 1400][cite_start]", "Combineert verschillende tools en technieken. [cite: 1400][cite_start]", "Reflecteert op het resultaat. [cite: 1400]"] },
                [cite_start]{ titel: "23b Programmeren", acties: ["Ontwerpt een game of programma met meerdere programmeer-concepten. [cite: 1444][cite_start]", "Geeft complexere algoritmes schematisch weer en implementeert. [cite: 1444][cite_start]", "Begrijpt en past bestaande programma's aan en breidt uit. [cite: 1444][cite_start]", "Programma's koppelen aan fysieke robots of sensoren. [cite: 1444]"] }
            ]
        },
        {
            domein: "3. De gedigitaliseerde wereld",
            kerndoelen: [
                [cite_start]{ titel: "24a Veiligheid & privacy", acties: ["Gebruikt digitale omgevingen bewust en veilig. [cite: 1540][cite_start]", "Weet hoe bedrijven informatie verzamelen en maakt bewuste keuzes in delen. [cite: 1540][cite_start]", "Gaat veilig om met digitale identiteit, herkent nep-mails/scams en AI risico's. [cite: 1540]"] },
                [cite_start]{ titel: "24b Jezelf en de ander", acties: ["Begrijpt hoe platforms data gebruiken en hoe dit invloed heeft op online identiteit. [cite: 1585][cite_start]", "Denkt kritisch na over media en hoe ze gedachten sturen. [cite: 1585][cite_start]", "Reflecteert op de balans tussen online en offline leven. [cite: 1585][cite_start]", "Snapt dat algoritmes bepalen wat online zichtbaar wordt. [cite: 1585]"] },
                [cite_start]{ titel: "24c Samenleving en wereld", acties: ["Snapt dat technologie zowel kansen als risico's heeft voor mens en samenleving. [cite: 1627][cite_start]", "Weet hoe technologische ontwikkelingen invloed hebben op maatschappij, werk en milieu. [cite: 1627][cite_start]", "Kan een eigen mening vormen over nieuwe technologieën en deze onderbouwen. [cite: 1627]"] }
            ]
        }
    ]
};

// Functie om de juiste data in de HTML te injecteren als er op een tab wordt geklikt
function laadLeerlijn(bouw, knop) {
    // 1. Maak de juiste knop 'actief' (groen)
    const knoppen = document.querySelectorAll('.tab-btn');
    knoppen.forEach(k => k.classList.remove('active'));
    knop.classList.add('active');

    // 2. Haal de juiste data op uit de database
    const data = leerlijnenDB[bouw];
    const container = document.getElementById('kerndoelenContainer');
    container.innerHTML = ''; // Maak de container leeg

    // 3. Bouw de HTML kaarten op per domein
    data.forEach(domeinInfo => {
        let domeinHTML = `
            <div class="domain-card">
                <div class="domain-header">
                    <div class="domain-title">
                        <h3>${domeinInfo.domein}</h3>
                    </div>
                </div>
                <div class="goal-list">
        `;

        domeinInfo.kerndoelen.forEach(doel => {
            // Maak een lijstje van alle acties/leerdoelen
            let actiesHTML = doel.acties.map(actie => `<li>${actie}</li>`).join('');

            domeinHTML += `
                <div class="goal-item" style="align-items: flex-start;">
                    <div class="goal-content">
                        <span class="goal-icon document">📄</span>
                        <div class="goal-text">
                            <strong>${doel.titel}</strong>
                            <ul style="margin-top: 5px; padding-left: 15px; font-size: 13px; color: var(--text-muted);">
                                ${actiesHTML}
                            </ul>
                        </div>
                    </div>
                    <button class="btn-action">Doel bewerken</button>
                </div>
            `;
        });

        domeinHTML += `</div></div>`;
        container.innerHTML += domeinHTML;
    });
}

// Zorg ervoor dat Groep 1-2 standaard is geladen als de pagina opent
document.addEventListener('DOMContentLoaded', () => {
    const eersteKnop = document.querySelector('.tab-btn');
    laadLeerlijn('groep1-2', eersteKnop);
});