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
        onSnapshot(collection(db, "reserveringen"), (snapshot) => { if(!snapshot.empty) { reserveringen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); if(typeof window.updateKalenderEnLijst === "function") window.updateKalenderEnLijst(); if(typeof window.renderMijnReserveringen === "function") window.renderMijnReserveringen(); if(typeof window.renderStatistiekenTab === "function") window.renderStatistiekenTab(); } }, checkError);
        onSnapshot(collection(db, "meldingen"), (snapshot) => { if(!snapshot.empty) { meldingen = snapshot.docs.map(d => d.data()); slaDataOp(); if(typeof renderBeheerdersTabellen === "function") renderBeheerdersTabellen(); } }, checkError);
// Voortgang realtime ophalen en direct toepassen op de vinkjes
        onSnapshot(collection(db, "voortgang"), (snapshot) => { 
            let huidigeEmail = localStorage.getItem('ww_huidige_email'); 
            if (huidigeEmail) { 
                const veiligId = huidigeEmail.replace(/[@.]/g, '_');
                const docSnap = snapshot.docs.find(d => d.id === veiligId); 
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
            try {
                const veiligId = email.replace(/[@.]/g, '_');
                await setDoc(doc(db, "voortgang", veiligId), { 
                    email: email, 
                    vinkjes: vinkjes,
                    laatsteUpdate: new Date().toISOString()
                }, { merge: true }); 
            } catch(e) {
                console.error("Opslaan voortgang in cloud mislukt:", e);
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
        window.saveVoortgangToCloud = async function(leerkracht, vinkjes) { await setDoc(doc(db, "voortgang", leerkracht), { vinkjes: vinkjes }); };
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
        
        // NIEUW: Maak de e-mail op en open het mailprogramma van de gebruiker
        const mailOnderwerp = encodeURIComponent(`Storing / Schade: ${kistSelect}`);
        const mailBody = encodeURIComponent(
            `Beste beheerder,\n\nEr is zojuist een nieuwe storingsmelding gedaan via het Verwonderlab Portaal.\n\n` +
            `Materiaal: ${kistSelect}\n` +
            `Soort melding: ${soortMelding}\n` +
            `Gemeld door: ${melderNaam} (${melderEmail})\n\n` +
            `Beschrijving:\n${beschrijving}\n\n` +
            `(De eventuele foto en huidige status kun je bekijken in het Beheerders Dashboard)`
        );
        
        // Dit opent Outlook/Mail met alles al ingevuld
        window.location.href = `mailto:verwonderlab@wonderwijs.nl?subject=${mailOnderwerp}&body=${mailBody}`;

        alert('✅ Je melding is opgeslagen in het systeem en je e-mailprogramma wordt nu geopend om de melding te versturen!'); 
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
        // 2. Client fallback: Open het mailprogramma (Outlook) met alles al kant-en-klaar ingevuld
        const mailToUrl = `mailto:${encodeURIComponent(docentEmail)}?subject=${encodeURIComponent(mailOnderwerp)}&body=${encodeURIComponent(mailTekst)}`;
        window.location.href = mailToUrl;

        alert(`✅ Reservering voor '${kistNaam}' is goedgekeurd!\n\nJe e-mailprogramma (Outlook) wordt nu geopend met de kant-en-klare bevestigingsmail voor ${docentNaam} (${docentEmail}).\n\nKlik in Outlook op 'Verzenden' om de mail te versturen.`);
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
            alert("⚠️ Je bent niet ingelogd met een e-mailadres. Je voortgang kan zo niet in de cloud worden opgeslagen.");
            return;
        }
        
        const checkboxStates = JSON.parse(localStorage.getItem('ww_vinkjes')) || {}; 
        checkboxStates[e.target.id] = e.target.checked; 
        const strState = JSON.stringify(checkboxStates); 
        
        localStorage.setItem('ww_vinkjes', strState); 
        
        // Sla direct op in de Firebase cloud gekoppeld aan het e-mailadres
        if(window.saveVoortgangToCloud) {
            window.saveVoortgangToCloud(huidigeEmail, strState); 
        }
    } 
});

window.reproduceerVinkjes = function() { 
    const savedChecks = JSON.parse(localStorage.getItem('ww_vinkjes')) || {}; 
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