// ============================================================
// MICROSOFT 365 SSO AUTHENTICATIE MODULE (WonderWijs)
// ============================================================

(function() {
    'use strict';

    let msalInstance = null;
    let isInitialized = false;

    // Helper: MSAL script dynamisch inladen indien nog niet aanwezig
    async function laadMsalBibliotheek() {
        if (window.msal) return window.msal;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js";
            script.async = true;
            script.onload = () => resolve(window.msal);
            script.onerror = () => {
                console.warn("Kon MSAL CDN niet bereiken. Controleer netwerkverbinding.");
                resolve(null);
            };
            document.head.appendChild(script);
        });
    }

    // Helper: Valideer of een account toebehoort aan @wonderwijs.nl
    function valideerDomein(email) {
        if (!email) return false;
        const config = window.AUTH_CONFIG || {};
        const vereistDomein = (config.allowedDomain || "@wonderwijs.nl").toLowerCase().trim();
        return email.toLowerCase().trim().endsWith(vereistDomein);
    }

    // Initialiseer MSAL
    async function initialiseerMSAL() {
        if (isInitialized) return msalInstance;

        await laadMsalBibliotheek();

        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";

        if (!window.msal || !clientId || clientId === "YOUR_MICROSOFT_CLIENT_ID") {
            isInitialized = true;
            return null; // Nog geen actieve MSAL client ID geconfigureerd
        }

        try {
            const redirectUri = window.location.origin + window.location.pathname;
            const msalConfig = {
                auth: {
                    clientId: clientId,
                    authority: config.authority || "https://login.microsoftonline.com/organizations",
                    redirectUri: redirectUri
                },
                cache: {
                    cacheLocation: "localStorage",
                    storeAuthStateInCookie: false
                }
            };

            msalInstance = new window.msal.PublicClientApplication(msalConfig);
            if (typeof msalInstance.initialize === "function") {
                await msalInstance.initialize();
            }

            // Verwerk redirect callback indien van toepassing
            const response = await msalInstance.handleRedirectPromise();
            if (response && response.account) {
                await verwerkSuccesvolleLogin(response.account);
            }

            isInitialized = true;
            return msalInstance;
        } catch (err) {
            console.error("Fout bij initialiseren van Microsoft SSO (MSAL):", err);
            isInitialized = true;
            return null;
        }
    }

    // Verwerk een succesvolle login van een Microsoft account
    async function verwerkSuccesvolleLogin(account) {
        if (!account) return false;

        const email = (account.username || account.idTokenClaims?.preferred_username || account.idTokenClaims?.email || "").toLowerCase().trim();
        const config = window.AUTH_CONFIG || {};
        const vereistDomein = config.allowedDomain || "@wonderwijs.nl";

        // STRIKTE VEILIGHEIDSCONTROLE: Alleen @wonderwijs.nl accounts toegestaan
        if (!valideerDomein(email)) {
            // Niet geautoriseerd: direct uitloggen uit de sessie en foutmelding tonen
            if (msalInstance) {
                try {
                    await msalInstance.logoutPopup({ account: account });
                } catch (e) {
                    console.warn("Fout bij uitloggen niet-geautoriseerd account:", e);
                }
            }
            localStorage.removeItem('ww_huidige_leerkracht');
            localStorage.removeItem('ww_huidige_email');

            toonLoginScherm({
                foutmelding: `<strong>Toegang geweigerd</strong><br>Je bent aangemeld met <u>${email}</u>.<br>Dit portaal is strikt beveiligd en uitsluitend toegankelijk voor medewerkers van Wonderwijs met een <strong>${vereistDomein}</strong> account.`
            });
            return false;
        }

        // Bepaal de weergavenaam
        let naam = account.name;
        if (!naam || naam.includes('@')) {
            const deel = email.split('@')[0].replace(/[._]/g, ' ');
            naam = deel.replace(/\b\w/g, l => l.toUpperCase());
        }

        // Sessie opslaan
        localStorage.setItem('ww_huidige_leerkracht', naam);
        localStorage.setItem('ww_huidige_email', email);
        localStorage.setItem('ww_auth_provider', 'microsoft_sso');

        // Verberg login overlay en activeer dashboard
        verbergLoginScherm();

        // Werk UI bij
        if (typeof window.checkLeerkrachtLogin === "function") {
            window.checkLeerkrachtLogin();
        }

        return true;
    }

    // Toon de Microsoft SSO Inlogomgeving
    function toonLoginScherm(opties = {}) {
        let loginOverlay = document.getElementById('wwSsoLoginOverlay');
        if (!loginOverlay) {
            loginOverlay = document.createElement('div');
            loginOverlay.id = 'wwSsoLoginOverlay';
            document.body.appendChild(loginOverlay);
        }

        // Verberg applicatiecontainer zolang gebruiker niet is ingelogd
        const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
        if (mainApp) {
            mainApp.style.setProperty('display', 'none', 'important');
        }

        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";
        const isClientGeconfigureerd = clientId && clientId !== "YOUR_MICROSOFT_CLIENT_ID" && !clientId.includes("YOUR_");

        loginOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            z-index: 9999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 20px;
            box-sizing: border-box;
        `;

        const foutmeldingHtml = opties.foutmelding ? `
            <div style="background: #fef2f2; border: 1px solid #f87171; color: #991b1b; padding: 14px 16px; border-radius: 8px; font-size: 13px; line-height: 1.5; margin-bottom: 20px; text-align: left;">
                ${opties.foutmelding}
            </div>
        ` : '';

        const configWaarschuwingHtml = !isClientGeconfigureerd ? `
            <div style="background: #eff6ff; border: 1px solid #93c5fd; color: #1e40af; padding: 12px 14px; border-radius: 8px; font-size: 12px; line-height: 1.4; margin-bottom: 20px; text-align: left;">
                <strong>⚙️ SSO Configuratie vereist:</strong><br>
                Vul het Azure Entra Application Client ID in in <code>auth-config.js</code> om live in te loggen met Microsoft 365.
            </div>
        ` : '';

        const devModeKnop = (!isClientGeconfigureerd && config.allowDevModeWhenUnconfigured) ? `
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">🧪 Ontwikkelmodus (geen Azure ID nodig):</p>
                <div style="display: flex; gap: 8px;">
                    <input type="email" id="testEmailInput" placeholder="leerkracht@wonderwijs.nl" value="leerkracht@wonderwijs.nl" style="padding: 10px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 6px; flex: 1; outline: none;">
                    <button onclick="window.loginTestAccount()" style="padding: 10px 14px; font-size: 13px; font-weight: bold; background: #475569; color: white; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap;">Open Portaal</button>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 6px;">* Let op: ook hier wordt de domeinbeveiliging (@wonderwijs.nl) getest.</p>
            </div>
        ` : '';

        loginOverlay.innerHTML = `
            <div style="background: white; width: 100%; max-width: 440px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; text-align: center;">
                <div style="height: 6px; background: #8CC63F; width: 100%;"></div>
                
                <div style="padding: 35px 30px;">
                    <img src="Verwonderlab.jpg" alt="Verwonderlab Logo" style="max-width: 170px; height: auto; margin-bottom: 15px; display: inline-block;">
                    
                    <h1 style="color: #1e293b; font-size: 22px; font-weight: 700; margin: 0 0 6px 0;">Welkom bij Verwonderlab</h1>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 25px 0;">Portaal voor Leskisten & Digitale Geletterdheid</p>
                    
                    ${foutmeldingHtml}
                    ${configWaarschuwingHtml}

                    <div style="background: #f8fafc; border-radius: 10px; padding: 15px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #334155; font-size: 13px; font-weight: 500;">
                            <span>🔒</span>
                            <span>Beveiligde toegang voor scholenorganisatie</span>
                        </div>
                        <div style="font-size: 13px; color: #8CC63F; font-weight: 700; margin-top: 4px;">
                            Wonderwijs
                        </div>
                    </div>

                    <button id="msLoginBtn" onclick="window.loginMetMicrosoft()" style="
                        width: 100%;
                        background: #ffffff;
                        color: #1e293b;
                        border: 1.5px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 13px 20px;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
                        <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                        </svg>
                        <span>Aanmelden met Microsoft 365</span>
                    </button>

                    <p style="font-size: 12px; color: #94a3b8; margin: 15px 0 0 0;">
                        Inloggen is uitsluitend toegestaan met een <strong>@wonderwijs.nl</strong> account.
                    </p>

                    ${devModeKnop}
                </div>
            </div>
        `;
    }

    // Verberg het loginscherm en toon de hoofdapplicatie
    function verbergLoginScherm() {
        const loginOverlay = document.getElementById('wwSsoLoginOverlay');
        if (loginOverlay) {
            loginOverlay.style.display = 'none';
        }
        // Oude id voor de zekerheid ook verbergen
        const oudScherm = document.getElementById('emailLoginScherm');
        if (oudScherm) {
            oudScherm.style.display = 'none';
        }

        const mainApp = document.querySelector('.dashboard-container') || document.getElementById('mainApp');
        if (mainApp) {
            mainApp.style.removeProperty('display');
            mainApp.style.opacity = '1';
            mainApp.style.visibility = 'visible';
        }
    }

    // Publieke functie: Inloggen met Microsoft SSO
    window.loginMetMicrosoft = async function() {
        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";

        if (!clientId || clientId === "YOUR_MICROSOFT_CLIENT_ID" || clientId.includes("YOUR_")) {
            alert("⚠️ Microsoft 365 SSO configuratie ontbreekt.\n\nVoer het Azure Application (Client) ID in in het bestand 'auth-config.js'.\n\nAls je dit lokaal test, kun je eronder gebruikmaken van de ontwikkelmodus om het portaal te bekijken.");
            return;
        }

        const btn = document.getElementById('msLoginBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span>⏳ Verifiëren bij Microsoft 365...</span>`;
        }

        try {
            const msal = await initialiseerMSAL();
            if (!msal) {
                throw new Error("Kon MSAL niet initialiseren.");
            }

            const loginRequest = {
                scopes: ["User.Read"],
                prompt: "select_account"
            };

            let response;
            try {
                // Probeer popup flow voor een soepele gebruikservaring
                response = await msal.loginPopup(loginRequest);
            } catch (popupErr) {
                console.warn("Popup geblokkeerd of mislukt, redirect wordt gestart:", popupErr);
                // Val terug op redirect indien popup wordt geblokkeerd
                await msal.loginRedirect(loginRequest);
                return;
            }

            if (response && response.account) {
                await verwerkSuccesvolleLogin(response.account);
            }
        } catch (err) {
            console.error("Fout tijdens Microsoft 365 aanmelden:", err);
            toonLoginScherm({
                foutmelding: `<strong>Aanmelden mislukt</strong><br>${err.message || 'Er is een fout opgetreden bij het verbinden met Microsoft 365. Probeer het opnieuw.'}`
            });
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                        <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                        <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                        <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                    </svg>
                    <span>Aanmelden met Microsoft 365</span>
                `;
            }
        }
    };

    // Publieke functie: Ontwikkelmodus test-inlog
    window.loginTestAccount = function() {
        const input = document.getElementById('testEmailInput');
        const email = input ? input.value.trim().toLowerCase() : "";

        const config = window.AUTH_CONFIG || {};
        const vereistDomein = config.allowedDomain || "@wonderwijs.nl";

        // Test ook hier de domein restrictie!
        if (!email.endsWith(vereistDomein.toLowerCase())) {
            toonLoginScherm({
                foutmelding: `<strong>Toegang geweigerd</strong><br>Het e-mailadres <u>${email}</u> is niet toegestaan.<br>Alleen e-mailadressen eindigend op <strong>${vereistDomein}</strong> hebben toegang tot dit portaal.`
            });
            return;
        }

        const naamDeel = email.split('@')[0].replace(/[._]/g, ' ');
        const opgemaakteNaam = naamDeel.replace(/\b\w/g, l => l.toUpperCase());

        localStorage.setItem('ww_huidige_leerkracht', opgemaakteNaam);
        localStorage.setItem('ww_huidige_email', email);
        localStorage.setItem('ww_auth_provider', 'test_mode');

        verbergLoginScherm();
        if (typeof window.checkLeerkrachtLogin === "function") {
            window.checkLeerkrachtLogin();
        }
    };

    // Publieke functie: Uitloggen uit Microsoft SSO & Portaal
    window.logoutMicrosoft = async function() {
        localStorage.removeItem('ww_huidige_leerkracht');
        localStorage.removeItem('ww_huidige_email');
        localStorage.removeItem('ww_standaard_school');
        localStorage.removeItem('ww_auth_provider');

        try {
            if (msalInstance) {
                const accounts = msalInstance.getAllAccounts();
                if (accounts.length > 0) {
                    await msalInstance.logoutPopup({ account: accounts[0] });
                }
            }
        } catch (e) {
            console.warn("Fout bij uitloggen uit MSAL:", e);
        }

        window.location.reload();
    };

    // Hoofdfunctie voor authenticatiecontrole
    window.controleerSSOAuthenticatie = async function() {
        const opgeslagenEmail = localStorage.getItem('ww_huidige_email');
        const opgeslagenNaam = localStorage.getItem('ww_huidige_leerkracht');

        // Valideer opgeslagen sessie
        if (opgeslagenEmail && valideerDomein(opgeslagenEmail)) {
            verbergLoginScherm();
            return true;
        }

        // Probeer MSAL sessie
        const msal = await initialiseerMSAL();
        if (msal) {
            const accounts = msal.getAllAccounts();
            if (accounts.length > 0) {
                const account = accounts[0];
                const email = (account.username || account.idTokenClaims?.preferred_username || "").toLowerCase().trim();
                if (valideerDomein(email)) {
                    await verwerkSuccesvolleLogin(account);
                    return true;
                }
            }

            // Probeer Silent SSO indien ingeschakeld
            const config = window.AUTH_CONFIG || {};
            if (config.autoSSO) {
                try {
                    const silentResponse = await msal.ssoSilent({
                        scopes: ["User.Read"],
                        domainHint: "wonderwijs.nl"
                    });
                    if (silentResponse && silentResponse.account && valideerDomein(silentResponse.account.username)) {
                        await verwerkSuccesvolleLogin(silentResponse.account);
                        return true;
                    }
                } catch (silentErr) {
                    // Stille SSO vereist interactie, toon normaal loginscherm
                }
            }
        }

        // Indien niet ingelogd: toon het beveiligde login scherm
        toonLoginScherm();
        return false;
    };

    // Automatische start zodra de DOM klaar is
    document.addEventListener('DOMContentLoaded', () => {
        window.controleerSSOAuthenticatie();
    });

    // Vang alle kliks op '.logout' knoppen af
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('logout') || e.target.closest('.logout'))) {
            e.preventDefault();
            window.logoutMicrosoft();
        }
    });

})();
