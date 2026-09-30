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

let periodes = safeGetLocal('ww_periodes_v11', [{ id: 1, naam: "Periode 1 schooljaar 2026/2027", start: "2026-08-31", eind: "2026-09-20" }]);
let scholen = safeGetLocal('ww_scholen_v1', [{ id: 1, naam: "Binnenstebuiten" }, { id: 2, naam: "De Wegwijzer" }]);
let reserveringen = safeGetLocal('ww_reserveringen_v11', []);
let beheerdersLijst = safeGetLocal('ww_beheerders_v1', []); 
let mijnFavorieten = safeGetLocal('ww_favorieten_v1', []); 
let meldingen = safeGetLocal('ww_meldingen_v1', []); 
let leskisten = safeGetLocal('ww_leskisten_v15', []);
let lesideeen = safeGetLocal('ww_lesideeen_v15', []);

window.cloudLeerlijnen = []; 
let actieveLesideeFilter = 'Alle';
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
        onSnapshot(collection(db, "lesideeen"), (snapshot) => { if(!snapshot.empty) { lesideeen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(window.renderLesideeenGrid) window.renderLesideeenGrid(); } }, checkError);
        onSnapshot(collection(db, "reserveringen"), (snapshot) => { if(!snapshot.empty) { reserveringen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst(); if(typeof window.renderMijnReserveringen === "function") window.renderMijnReserveringen(); } }, checkError);
        onSnapshot(collection(db, "meldingen"), (snapshot) => { if(!snapshot.empty) { meldingen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);
        
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
        window.saveVoortgangToCloud = async function(leerkracht, vinkjes) { await setDoc(doc(db, "voortgang", leerkracht), { vinkjes: vinkjes }); };
        window.deleteMeldingFromCloud = async function(id) { await deleteDoc(doc(db, "meldingen", id.toString())); };
        window.updateMeldingStatusInCloud = async function(id, status) { await setDoc(doc(db, "meldingen", id.toString()), {status: status}, {merge: true}); };

    } catch (error) { 
        console.error("Firebase module overgeslagen. Lokaal actief."); 
    }
})();

// ==========================================
// 3. E-MAIL LOGIN EN VEILIGHEID
// ==========================================
window.toonEmailLogin = function() {
    let loginScherm = document.getElementById('emailLoginScherm');
    
    // Als het formulier niet hard-coded in index.html staat, bouwen we het hier in JS op
    if (!loginScherm) {
        loginScherm = document.createElement('div');
        loginScherm.id = 'emailLoginScherm';
        document.body.appendChild(loginScherm);
    }
    
    // Dwing de opmaak af
    loginScherm.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(241, 245, 249, 0.98); z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Ubuntu', sans-serif;";
    loginScherm.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; max-width: 90%; width: 400px;">
            <h2 style="color: #1e293b; margin-bottom: 10px;">Welkom bij het Verwonderlab</h2>
            <p style="color: #64748b; margin-bottom: 20px; font-size: 14px;">Vul je werk e-mailadres in om je persoonlijke dashboard te openen.</p>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <input type="email" id="gebruikerEmailInput" placeholder="bijv. b.jansen@wonderwijs.nl" style="padding: 12px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; width: 100%; box-sizing: border-box;">
                <button onclick="window.loginMetEmail()" style="background-color: #8CC63F; padding: 12px 24px; font-size: 16px; cursor: pointer; border: none; border-radius: 6px; color: white; font-weight: bold; width: 100%;">Inloggen</button>
            </div>
        </div>
    `;
    
    // Verberg het dashboard volledig
    const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
    if (mainApp) mainApp.style.setProperty('display', 'none', 'important');
};

window.loginMetEmail = function() {
    const emailInput = document.getElementById('gebruikerEmailInput');
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!email || !email.includes('@')) {
        alert("Vul een geldig e-mailadres in om verder te gaan.");
        return;
    }

    const naamDeel = email.split('@')[0];
    const opgemaakteNaam = naamDeel.charAt(0).toUpperCase() + naamDeel.slice(1);

    localStorage.setItem('ww_huidige_leerkracht', opgemaakteNaam);
    localStorage.setItem('ww_huidige_email', email);

    window.location.reload();
};

window.checkLeerkrachtLogin = function() {
    let huidigeNaam = localStorage.getItem('ww_huidige_leerkracht');
    let huidigeEmail = localStorage.getItem('ww_huidige_email');

    // Als de browser nog een oud test-account herkent, verwijderen we deze direct
    if (huidigeEmail === "gast@wonderwijs.nl" || huidigeEmail === "undefined" || !huidigeEmail || huidigeEmail.trim() === "") {
        localStorage.removeItem('ww_huidige_leerkracht');
        localStorage.removeItem('ww_huidige_email');
        toonEmailLogin();
        return; 
    }

    // Als we wél een geldig e-mailadres hebben:
    setTimeout(() => {
        const pageTitle = document.getElementById('pageTitle');
        if(pageTitle) pageTitle.innerText = 'Welkom, ' + huidigeNaam + '!';

        // Check Beheerdersrechten
        const isBeheerder = beheerdersLijst.some(b => b.email === huidigeEmail);
        const adminBtn = document.getElementById('adminLoginBtn');
        if(adminBtn) adminBtn.style.display = isBeheerder ? 'inline-block' : 'none';

        // Inladen van alle lijsten nu we geautoriseerd zijn
        if(typeof window.renderReserveringsGrid === "function") window.renderReserveringsGrid();
        if(typeof window.renderLesideeenGrid === "function") window.renderLesideeenGrid();
        if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst();
        if(typeof window.renderMijnReserveringen === "function") window.renderMijnReserveringen();
        if(typeof window.reproduceerVinkjes === "function") window.reproduceerVinkjes();
    }, 200);
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('logout')) {
        e.preventDefault();
        localStorage.removeItem('ww_huidige_leerkracht');
        localStorage.removeItem('ww_huidige_email');
        window.location.reload(); 
    }
});

// ==========================================
// 4. DOMCONTENTLOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.opacity = '1';
        mainApp.style.visibility = 'visible';
    }

    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.menu-item').forEach(item => {
        if(!item.classList.contains('logout')) {
            item.classList.remove('active'); 
            const itemPage = item.getAttribute('href');
            if (itemPage === currentPage || (currentPage === '' && itemPage === 'index.html')) {
                item.classList.add('active'); 
            }
        }
    });
    
    // Altijd login check uitvoeren zodra pagina laadt
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
};

window.renderLesideeenGrid = function() {
    const container = document.getElementById('lesideeenContainer');
    if(!container) return;
    
    container.style.display = 'block';
    if(lesideeen.length === 0) {
        container.innerHTML = "<p style='color:#64748b; padding: 20px 0;'>Er staan nog geen lesideeën in de database.</p>";
        return;
    }

    const uniekeCategorieen = ['Alle', ...new Set(lesideeen.map(i => i.categorie))];
    let filterHtml = '<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px;">';
    uniekeCategorieen.forEach(cat => {
        const isActive = actieveLesideeFilter === cat;
        const bg = isActive ? '#8CC63F' : '#f1f5f9';
        const color = isActive ? 'white' : '#64748b';
        filterHtml += `<button onclick="window.filterLesideeen('${cat}')" style="background: ${bg}; color: ${color}; border: none; padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: ${isActive ? '0 4px 6px rgba(140, 198, 63, 0.3)' : 'none'};">${cat}</button>`;
    });
    filterHtml += '</div>';

    const categoryColors = {
        "Programmeren": "linear-gradient(135deg, #6366f1, #3b82f6)",
        "Mediawijsheid": "linear-gradient(135deg, #f59e0b, #ef4444)",
        "Creatief": "linear-gradient(135deg, #ec4899, #8b5cf6)",
        "Techniek": "linear-gradient(135deg, #14b8a6, #0ea5e9)",
        "Standaard": "linear-gradient(135deg, #8CC63F, #22c55e)"
    };

    const gefilterdeIdeeen = actieveLesideeFilter === 'Alle' ? lesideeen : lesideeen.filter(i => i.categorie === actieveLesideeFilter);
    let gridHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; width: 100%;">';
    
    if(gefilterdeIdeeen.length === 0) {
        gridHtml += "<p style='color:#64748b; grid-column: 1 / -1;'>Geen lesideeën gevonden.</p>";
    } else {
        gefilterdeIdeeen.forEach(idee => {
            let linkHtml = idee.link ? `<a href="${idee.link}" target="_blank" class="idea-btn" style="display: inline-block; margin-top: 15px; padding: 8px 15px; background: #f1f5f9; color: #334155; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold;">🔗 Bekijk Lesmateriaal</a>` : '';
            let bgGradient = categoryColors[idee.categorie] || categoryColors["Standaard"];
            const veiligeBeschrijving = idee.beschrijving || "";
            
            gridHtml += `
            <div class="idea-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div class="idea-card-header" style="background: ${bgGradient}; padding: 15px; color: white;">
                    <span class="idea-badge" style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${idee.categorie}</span>
                </div>
                <div class="idea-card-body" style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
                    <h3 style="margin-top: 0; font-size: 18px; color: #1e293b; margin-bottom: 10px;">${idee.titel}</h3>
                    <p style="font-size: 13px; color: #64748b; line-height: 1.5; flex-grow: 1; margin: 0;">${veiligeBeschrijving}</p>
                    ${linkHtml}
                </div>
            </div>`;
        });
    }
    gridHtml += '</div>';
    container.innerHTML = filterHtml + gridHtml;
}

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
        if (reserveringen.length === 0) {
            reserveringenBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: #888;">Geen reserveringen in het systeem.</td></tr>`;
        } else {
            reserveringenBody.innerHTML = reserveringen.map(r => {
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
                let schoolWeergave = r.school ? `${r.school} - ${r.leerkracht}` : r.leerkracht;
                
                return `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="vertical-align: top; padding: 15px;"><strong>${r.kist}</strong></td>
                    <td style="vertical-align: top; padding: 15px;">${schoolWeergave}</td>
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
            
            const nieuweMelding = { 
                id: Date.now(), 
                kist: kistSelect, 
                soort: soortMelding, 
                beschrijving: beschrijving, 
                foto: imgData, 
                leerkracht: localStorage.getItem('ww_huidige_leerkracht') || "Onbekende Leerkracht", 
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
            alert('✅ Je melding is succesvol verzonden. Bedankt voor het doorgeven!'); 
        } 
    } catch(err) { 
        alert("❌ Er is iets misgegaan tijdens het verwerken: " + err.message); 
        console.error(err); 
    } finally { 
        if (btnElement) { btnElement.innerText = originalText; btnElement.disabled = false; } 
    } 
}

// Hulpmiddelen
window.filterLesideeen = function(categorie) { actieveLesideeFilter = categorie; window.renderLesideeenGrid(); }
window.filterDocentKisten = function(doelgroep) { actieveDocentFilter = doelgroep; document.querySelectorAll('#docentKistFilters .filter-btn').forEach(btn => { btn.style.background = btn.innerText.includes(doelgroep) ? (doelgroep === 'Favorieten' ? '#ef4444' : '#8CC63F') : 'white'; btn.style.color = btn.innerText.includes(doelgroep) ? 'white' : '#64748b'; }); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); };
window.zoekDocentKisten = function() { const input = document.getElementById('docentKistZoekInput'); if(input) { actieveDocentZoekterm = input.value.toLowerCase(); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); } };
window.toggleFavoriet = function(id, event) { event.stopPropagation(); if(mijnFavorieten.includes(id)) { mijnFavorieten = mijnFavorieten.filter(favId => favId !== id); } else { mijnFavorieten.push(id); } slaDataOp(); if(window.renderReserveringsGrid) window.renderReserveringsGrid(); };
window.sluitAlleModals = function() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); const vid = document.getElementById('modalVideo'); if(vid) vid.src = ""; }; 
window.onclick = function(event) { if (event.target.classList.contains('modal')) window.sluitAlleModals(); };
window.switchAdminTab = function(tabId, btnElement) { document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none'); document.getElementById(tabId).style.display = 'block'; document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active')); if(btnElement) btnElement.classList.add('active'); }

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

    if(document.getElementById('geselecteerdeKistId')) document.getElementById('geselecteerdeKistId').value = kist.id;
    if(document.getElementById('geselecteerdeKistNaam')) document.getElementById('geselecteerdeKistNaam').value = kist.naam;
    
    const schoolSelect = document.getElementById('schoolSelect');
    if (schoolSelect) {
        schoolSelect.innerHTML = '<option value="" disabled selected>-- Kies een locatie --</option>';
        scholen.forEach(s => schoolSelect.innerHTML += `<option value="${s.naam}">${s.naam}</option>`);
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
window.beoordeelReservering = async function(id, nieuweStatus) { let r = reserveringen.find(x => x.id == id); if(r) r.status = nieuweStatus; slaDataOp(); if(window.renderBeheerdersTabellen) window.renderBeheerdersTabellen(); if(window.updateChecklistInCloud) { await window.updateChecklistInCloud(id, { status: nieuweStatus }); const per = periodes.find(p => p.id == r?.periodeId); if(nieuweStatus === 'Geaccepteerd' && r && per) alert(`📧 MAIL NAAR LEERKRACHT:\n\nJe reservering voor '${r.kist}' is GEACCEPTEERD voor ${per.naam}.`); } }
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