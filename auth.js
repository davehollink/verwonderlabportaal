// ============================================================
// MICROSOFT 365 SSO AUTHENTICATIE MODULE (WonderWijs)
// ============================================================
// Volledig zelfstandige Microsoft 365 SSO module met
// PKCE Authorization Code flow (standaard voor Microsoft Entra SPA).
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

    // Helper: PKCE code verifier genereren
    function generateCodeVerifier() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let result = '';
        const randomVals = new Uint8Array(64);
        window.crypto.getRandomValues(randomVals);
        for (let i = 0; i < 64; i++) {
            result += chars[randomVals[i] % chars.length];
        }
        return result;
    }

    // Helper: PKCE code challenge genereren (SHA-256 base64url)
    async function generateCodeChallenge(verifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    // Helper: JWT token decoderen
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

    // Helper: Wissel de autorisatiecode om voor tokens via Microsoft token endpoint (PKCE)
    async function wisselCodeOmVoorToken(code, codeVerifier, redirectUri) {
        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";
        const authority = config.authority || "https://login.microsoftonline.com/organizations";
        const tokenUrl = `${authority.replace(/\/$/, '')}/oauth2/v2.0/token`;

        const body = new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        });

        const res = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error_description || errorData.error || `HTTP ${res.status}`);
        }

        return await res.json();
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
                foutmelding: `<strong>Toegang geweigerd</strong><br>Je bent aangemeld met <u>${email || 'onbekend account'}</u>.<br>Alleen medewerkers met een <strong>${vereistDomein}</strong> account hebben toegang.`
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

        loginOverlay.innerHTML = `
            <div style="background: white; width: 100%; max-width: 440px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; text-align: center;">
                <div style="height: 6px; background: #8CC63F; width: 100%;"></div>
                
                <div style="padding: 35px 30px;">
                    <img src="Verwonderlab.jpg" alt="Verwonderlab Logo" style="max-width: 170px; height: auto; margin-bottom: 15px; display: inline-block;">
                    
                    <h1 style="color: #1e293b; font-size: 22px; font-weight: 700; margin: 0 0 6px 0;">Welkom bij Verwonderlab</h1>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 20px 0;">Portaal voor Leskisten & Digitale Geletterdheid</p>
                    
                    ${foutmeldingHtml}

                    <div style="background: #f8fafc; border-radius: 10px; padding: 14px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #334155; font-size: 13px; font-weight: 500;">
                            <span>🔒</span>
                            <span>Beveiligde toegang voor scholenorganisatie</span>
                        </div>
                        <div style="font-size: 14px; color: #8CC63F; font-weight: 700; margin-top: 4px;">
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

    // Publieke functie: Inloggen met Microsoft 365 via PKCE
    window.loginMetMicrosoft = async function() {
        const config = window.AUTH_CONFIG || {};
        const clientId = config.clientId ? config.clientId.trim() : "";

        if (isVoorbeeldClientId(clientId)) {
            toonLoginScherm({
                foutmelding: `<strong>Azure App-registratie vereist</strong><br>Client ID ontbreekt in <code>auth-config.js</code>.`
            });
            return;
        }

        if (window.location.protocol === "file:") {
            toonLoginScherm({
                foutmelding: `<strong>Webserver vereist</strong><br>Je opent dit HTML-bestand rechtstreeks vanaf de schijf (<code>file://</code>). Microsoft SSO vereist een webserver (zoals Vercel of <code>http://localhost:3000</code>).`
            });
            return;
        }

        const btn = document.getElementById('msLoginBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span>⏳ Verifiëren bij Microsoft 365...</span>`;
        }

        try {
            const redirectUri = config.redirectUri || (window.location.origin + window.location.pathname);
            const state = Math.random().toString(36).substring(2);
            const codeVerifier = generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);

            sessionStorage.setItem('ww_ms_code_verifier', codeVerifier);
            sessionStorage.setItem('ww_ms_redirect_uri', redirectUri);
            sessionStorage.setItem('ww_ms_auth_state', state);

            // Gebruik response_type="code" met PKCE (standaard voor Microsoft Entra SPA)
            const params = new URLSearchParams({
                client_id: clientId,
                response_type: "code",
                redirect_uri: redirectUri,
                scope: "openid profile email",
                response_mode: "query",
                code_challenge: codeChallenge,
                code_challenge_method: "S256",
                state: state,
                domain_hint: "wonderwijs.nl",
                prompt: "select_account"
            });

            const authority = config.authority || "https://login.microsoftonline.com/organizations";
            const authUrl = `${authority.replace(/\/$/, '')}/oauth2/v2.0/authorize?${params.toString()}`;

            const width = 500;
            const height = 650;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            const popup = window.open(authUrl, "ms_login_popup", `width=${width},height=${height},top=${top},left=${left}`);
            if (!popup || popup.closed || typeof popup.closed === "undefined") {
                // Popup geblokkeerd, val terug op redirect
                window.location.href = authUrl;
                return;
            }

            // Monitor popup
            const timer = setInterval(async () => {
                try {
                    if (popup.closed) {
                        clearInterval(timer);
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
                        return;
                    }

                    if (popup.location.href.includes(redirectUri)) {
                        const search = popup.location.search;
                        const hash = popup.location.hash;
                        popup.close();
                        clearInterval(timer);

                        const searchParams = new URLSearchParams(search);
                        const code = searchParams.get('code');

                        if (code) {
                            try {
                                const tokenData = await wisselCodeOmVoorToken(code, codeVerifier, redirectUri);
                                if (tokenData && tokenData.id_token) {
                                    const payload = decodeerJwtToken(tokenData.id_token);
                                    verwerkMicrosoftToken(payload);
                                }
                            } catch (tokenErr) {
                                toonLoginScherm({ foutmelding: `<strong>Token ophalen mislukt:</strong><br>${tokenErr.message}` });
                            }
                        } else if (searchParams.get('error')) {
                            const desc = searchParams.get('error_description') || searchParams.get('error');
                            toonLoginScherm({ foutmelding: `<strong>Aanmelden mislukt:</strong><br>${desc}` });
                        } else if (hash && hash.includes('id_token=')) {
                            // Fallback voor implicit flow indien actief
                            const hashParams = new URLSearchParams(hash.substring(1));
                            const idToken = hashParams.get('id_token');
                            if (idToken) {
                                const payload = decodeerJwtToken(idToken);
                                verwerkMicrosoftToken(payload);
                            }
                        }
                    }
                } catch (e) {
                    // Cross-origin tijdens inloggen op Microsoft domein
                }
            }, 500);

        } catch (err) {
            console.error("Fout tijdens Microsoft 365 login:", err);
            toonLoginScherm({ foutmelding: `<strong>Fout bij starten login:</strong><br>${err.message}` });
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `<span>Aanmelden met Microsoft 365</span>`;
            }
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

    // Controleer redirect (code of id_token in huidige URL)
    async function controleerRedirect() {
        // Controleer search params (?code=...)
        if (window.location.search && window.location.search.includes('code=')) {
            const searchParams = new URLSearchParams(window.location.search);
            const code = searchParams.get('code');
            const codeVerifier = sessionStorage.getItem('ww_ms_code_verifier');
            const redirectUri = sessionStorage.getItem('ww_ms_redirect_uri') || (window.location.origin + window.location.pathname);

            if (code && codeVerifier) {
                history.replaceState(null, '', window.location.pathname);
                try {
                    const tokenData = await wisselCodeOmVoorToken(code, codeVerifier, redirectUri);
                    if (tokenData && tokenData.id_token) {
                        const payload = decodeerJwtToken(tokenData.id_token);
                        return verwerkMicrosoftToken(payload);
                    }
                } catch (e) {
                    console.error("Fout bij omwisselen code na redirect:", e);
                    toonLoginScherm({ foutmelding: `<strong>Aanmelden mislukt:</strong><br>${e.message}` });
                    return false;
                }
            }
        }

        // Controleer hash (#id_token=...)
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
    window.controleerSSOAuthenticatie = async function() {
        // Controleer redirect response
        const viaRedirect = await controleerRedirect();
        if (viaRedirect) {
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
