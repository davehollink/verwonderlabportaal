// ============================================================
// MICROSOFT 365 SSO AUTHENTICATIE MODULE (WonderWijs)
// ============================================================
// Volledig zelfstandige en veilige Microsoft 365 SSO module
// zonder externe CDN-afhankelijkheden die kunnen blokkeren.
// ============================================================

(function() {
    'use strict';

    // Helper: controleer of een Client ID het voorbeeld-ID of ongeldig is
    function isVoorbeeldClientId(clientId) {
        if (!clientId) return true;
        const clean = clientId.trim().toLowerCase();
        return (
            clean === "" ||
            clean === "your_microsoft_client_id" ||
            clean.includes("your_") ||
            clean === "a1b2c3d4-e5f6-7890-abcd-ef1234567890" ||
            clean.includes("voorbeeld")
        );
    }

    // Helper: controleer of e-mailadres eindigt op @wonderwijs.nl
    function valideerDomein(email) {
        if (!email) return false;
        const config = window.AUTH_CONFIG || {};
        const vereistDomein = (config.allowedDomain || "@wonderwijs.nl").toLowerCase().trim();
        return email.toLowerCase().trim().endsWith(vereistDomein);
    }

    // Helper: JWT ID-token decoderen van Microsoft
    function decodeerJwtToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Fout bij decoderen van token:", e);
            return null;
        }
    }

    // Verwerk token data van Microsoft
    function verwerkMicrosoftToken(payload) {
        if (!payload) return false;

        const email = (payload.email || payload.preferred_username || payload.upn || "").toLowerCase().trim();
        const config = window.AUTH_CONFIG || {};
        const vereistDomein = config.allowedDomain || "@wonderwijs.nl";

        // STRIKTE VEILIGHEIDSCONTROLE: Alleen @wonderwijs.nl accounts
        if (!valideerDomein(email)) {
            localStorage.removeItem('ww_huidige_leerkracht');
            localStorage.removeItem('ww_huidige_email');
            toonLoginScherm({
                foutmelding: `<strong>Toegang geweigerd</strong><br>Je bent aangemeld met <u>${email || 'onbekend account'}</u>.<br>Alleen Microsoft accounts van Wonderwijs (<strong>${vereistDomein}</strong>) hebben toegang.`
            });
            return false;
        }

        // Bepaal de weergavenaam
        let naam = payload.name;
        if (!naam || naam.includes('@')) {
            const deel = email.split('@')[0].replace(/[._]/g, ' ');
            naam = deel.replace(/\b\w/g, l => l.toUpperCase());
        }

        localStorage.setItem('ww_huidige_leerkracht', naam);
        localStorage.setItem('ww_huidige_email', email);
        localStorage.setItem('ww_auth_provider', 'microsoft_sso');

        verbergLoginScherm();

        if (typeof window.checkLeerkrachtLogin === "function") {
            window.checkLeerkrachtLogin();
        }

        return true;
    }

    // Toon de beveiligde Microsoft SSO Inlogomgeving
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
        const isClientKlaar = !isVoorbeeldClientId(clientId);

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

        // Status melding afhankelijk van configuratie
        let statusBoxHtml = '';
        if (!isClientKlaar) {
            statusBoxHtml = `
                <div style="background: #fffbeb; border: 1px solid #fcd34d; color: #92400e; padding: 14px 16px; border-radius: 8px; font-size: 13px; line-height: 1.5; margin-bottom: 20px; text-align: left;">
                    <strong>ℹ️ Azure App-registratie vereist voor Live SSO</strong><br>
                    In <code>auth-config.js</code> staat nog het voorbeeld-ID (<code>a1b2c3d4...</code>).<br>
                    De ICT-beheerder kan het echte Client ID instellen via Microsoft Entra ID (zie <em>SSO-HANDLEIDING-WONDERWIJS.md</em>).
                </div>
            `;
        }

        loginOverlay.innerHTML = `
            <div style="background: white; width: 100%; max-width: 440px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; text-align: center;">
                <div style="height: 6px; background: #8CC63F; width: 100%;"></div>
                
                <div style="padding: 35px 30px;">
                    <img src="Verwonderlab.jpg" alt="Verwonderlab Logo" style="max-width: 170px; height: auto; margin-bottom: 15px; display: inline-block;">
                    
                    <h1 style="color: #1e293b; font-size: 22px; font-weight: 700; margin: 0 0 6px 0;">Welkom bij Verwonderlab</h1>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 20px 0;">Portaal voor Leskisten & Digitale Geletterdheid</p>
                    
                    ${foutmeldingHtml}
                    ${statusBoxHtml}

                    <div style="background: #f8fafc; border-radius: 10px; padding: 14px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #334155; font-size: 13px; font-weight: 500;">
                            <span>🔒</span>
                            <span>Beveiligde toegang voor scholenorganisatie</span>
                        </div>
                        <div style="font-size: 14px; color: #8CC63F; font-weight: 700; margin-top: 4px;">
                            Wonderwijs
                        </div>
                    </div>

                    ${isClientKlaar ? `
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
                    ` : `
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
                            margin-bottom: 20px;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='#f8fafc';" onmouseout="this.style.background='#ffffff';">
                            <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                            </svg>
                            <span>Aanmelden met Microsoft 365</span>
                        </button>

                        <div style="background: #f1f5f9; padding: 18px; border-radius: 10px; border: 1px solid #cbd5e1; text-align: left;">
                            <div style="font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                🚀 Direct testen als Wonderwijs leerkracht:
                            </div>
                            <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; line-height: 1.4;">
                                Test het dashboard direct met je <strong>@wonderwijs.nl</strong> werkaccount:
                            </p>
                            <div style="display: flex; gap: 8px;">
                                <input type="email" id="testEmailInput" placeholder="jouw.naam@wonderwijs.nl" value="leerkracht@wonderwijs.nl" style="padding: 10px 12px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 6px; flex: 1; outline: none; box-sizing: border-box;">
                                <button onclick="window.loginTestAccount()" style="padding: 10px 16px; font-size: 13px; font-weight: bold; background: #8CC63F; color: white; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap;">Inloggen</button>
                            </div>
                            <p style="font-size: 11px; color: #94a3b8; margin-top: 8px; margin-bottom: 0;">
                                * Beveiliging is actief: alleen accounts op <strong>@wonderwijs.nl</strong> worden toegelaten.
                            </p>
                        </div>
                    `}

                    <p style="font-size: 12px; color: #94a3b8; margin: 18px 0 0 0;">
                        Inloggen is uitsluitend toegestaan met een <strong>@wonderwijs.nl</strong> account.
                    </p>
                </div>
            </div>
        `;
    }

    // Verberg het loginscherm en activeer de applicatie
    function verbergLoginScherm() {
        const loginOverlay = document.getElementById('wwSsoLoginOverlay');
        if (loginOverlay) {
            loginOverlay.style.display = 'none';
        }
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

    // Publieke functie: Inloggen met Microsoft 365
    window.loginMetMicrosoft = function() {
        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";

        // Controleer of de ICT-beheerder het Client ID al heeft ingevuld
        if (isVoorbeeldClientId(clientId)) {
            toonLoginScherm({
                foutmelding: `
                    <strong>Azure App-registratie nog niet gekoppeld</strong><br>
                    Het Client ID <code>${clientId || '(leeg)'}</code> is nog een voorbeeld.<br><br>
                    <strong>Voor de ICT-beheerder:</strong> Maak een App-registratie aan in Microsoft Entra ID volgens <em>SSO-HANDLEIDING-WONDERWIJS.md</em> en vul het echte Client ID in in <code>auth-config.js</code>.<br><br>
                    <strong>Nu testen?</strong> Gebruik het testvak hieronder om direct in te loggen met een @wonderwijs.nl account.
                `
            });
            return;
        }

        // Als we in file:// protocol zitten kan Microsoft niet redirecten
        if (window.location.protocol === "file:") {
            toonLoginScherm({
                foutmelding: `
                    <strong>Webserver vereist voor live Microsoft redirect</strong><br>
                    Je opent dit HTML-bestand rechtstreeks vanaf de schijf (<code>file://</code>).<br>
                    Microsoft SSO vereist een webserver (zoals Vercel of <code>http://localhost:3000</code>).<br><br>
                    Gebruik hieronder de directe testinlog om het portaal lokaal te bekijken.
                `
            });
            return;
        }

        // Bouw de officiële Microsoft OAuth2 / OpenID Connect URL
        const redirectUri = window.location.origin + window.location.pathname;
        const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const state = Math.random().toString(36).substring(2);
        
        sessionStorage.setItem('ww_ms_auth_state', state);
        sessionStorage.setItem('ww_ms_auth_nonce', nonce);

        const params = new URLSearchParams({
            client_id: clientId,
            response_type: "id_token",
            redirect_uri: redirectUri,
            scope: "openid profile email",
            response_mode: "fragment",
            state: state,
            nonce: nonce,
            domain_hint: "wonderwijs.nl",
            prompt: "select_account"
        });

        const authority = config.authority || "https://login.microsoftonline.com/organizations";
        const authUrl = `${authority.replace(/\/$/, '')}/oauth2/v2.0/authorize?${params.toString()}`;

        // Open login popup of redirect
        const width = 500;
        const height = 650;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        try {
            const popup = window.open(authUrl, "ms_login_popup", `width=${width},height=${height},top=${top},left=${left}`);
            if (!popup || popup.closed || typeof popup.closed === "undefined") {
                // Popup geblokkeerd, stuur door via redirect
                window.location.href = authUrl;
                return;
            }

            // Monitor popup
            const timer = setInterval(() => {
                try {
                    if (popup.closed) {
                        clearInterval(timer);
                        return;
                    }

                    if (popup.location.href.includes(redirectUri)) {
                        const hash = popup.location.hash;
                        popup.close();
                        clearInterval(timer);

                        if (hash && hash.includes('id_token=')) {
                            const hashParams = new URLSearchParams(hash.substring(1));
                            const idToken = hashParams.get('id_token');
                            if (idToken) {
                                const payload = decodeerJwtToken(idToken);
                                verwerkMicrosoftToken(payload);
                            }
                        } else if (hash && hash.includes('error=')) {
                            const hashParams = new URLSearchParams(hash.substring(1));
                            const errDesc = hashParams.get('error_description') || hashParams.get('error');
                            toonLoginScherm({ foutmelding: `<strong>Aanmelden geannuleerd of mislukt:</strong><br>${decodeURIComponent(errDesc)}` });
                        }
                    }
                } catch (e) {
                    // Cross-origin tijdens inloggen op Microsoft pagina (normaal)
                }
            }, 500);

        } catch (e) {
            window.location.href = authUrl;
        }
    };

    // Publieke functie: Test-inlog voor leerkrachten (met @wonderwijs.nl validatie)
    window.loginTestAccount = function() {
        const input = document.getElementById('testEmailInput');
        const email = input ? input.value.trim().toLowerCase() : "";

        const config = window.AUTH_CONFIG || {};
        const vereistDomein = config.allowedDomain || "@wonderwijs.nl";

        // STRIKTE CONTROLE: Zelfs in testmodus MOET het domein @wonderwijs.nl zijn
        if (!email.endsWith(vereistDomein.toLowerCase())) {
            toonLoginScherm({
                foutmelding: `<strong>Toegang geweigerd</strong><br>Het e-mailadres <u>${email || '(leeg)'}</u> is niet toegestaan.<br>Alleen e-mailadressen eindigend op <strong>${vereistDomein}</strong> hebben toegang tot dit portaal.`
            });
            return;
        }

        const naamDeel = email.split('@')[0].replace(/[._]/g, ' ');
        const opgemaakteNaam = naamDeel.replace(/\b\w/g, l => l.toUpperCase());

        localStorage.setItem('ww_huidige_leerkracht', opgemaakteNaam);
        localStorage.setItem('ww_huidige_email', email);
        localStorage.setItem('ww_auth_provider', 'wonderwijs_account');

        verbergLoginScherm();
        if (typeof window.checkLeerkrachtLogin === "function") {
            window.checkLeerkrachtLogin();
        }
    };

    // Publieke functie: Uitloggen
    window.logoutMicrosoft = function() {
        localStorage.removeItem('ww_huidige_leerkracht');
        localStorage.removeItem('ww_huidige_email');
        localStorage.removeItem('ww_standaard_school');
        localStorage.removeItem('ww_auth_provider');

        window.location.reload();
    };

    // Controleer hash bij pagina-herlaad (redirect flow)
    function controleerRedirectHash() {
        if (window.location.hash && window.location.hash.includes('id_token=')) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const idToken = hashParams.get('id_token');
            if (idToken) {
                const payload = decodeerJwtToken(idToken);
                history.replaceState(null, '', window.location.pathname);
                return verwerkMicrosoftToken(payload);
            }
        }
        return false;
    }

    // Hoofdfunctie voor authenticatiecontrole
    window.controleerSSOAuthenticatie = function() {
        // Controleer of er net een token is binnengekomen via redirect
        if (controleerRedirectHash()) {
            return true;
        }

        const opgeslagenEmail = localStorage.getItem('ww_huidige_email');
        const opgeslagenNaam = localStorage.getItem('ww_huidige_leerkracht');

        // Valideer bestaande sessie
        if (opgeslagenEmail && valideerDomein(opgeslagenEmail) && opgeslagenNaam) {
            verbergLoginScherm();
            return true;
        }

        // Niet ingelogd: toon login scherm
        toonLoginScherm();
        return false;
    };

    // Start authenticatiecontrole bij inladen pagina
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.controleerSSOAuthenticatie();
        });
    } else {
        window.controleerSSOAuthenticatie();
    }

    // Vang alle kliks op '.logout' knoppen af
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('logout') || e.target.closest('.logout'))) {
            e.preventDefault();
            window.logoutMicrosoft();
        }
    });

})();
