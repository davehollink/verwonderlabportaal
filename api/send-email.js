// ============================================================
// VERWONDERLAB PORTAAL - BEVEILIGD E-MAIL ENDPOINT (VERCEL)
// ============================================================
// Alleen toegankelijk voor cryptografisch geverifieerde @wonderwijs.nl
// Microsoft 365 gebruikers en uitsluitend naar @wonderwijs.nl ontvangers.
// ============================================================

import crypto from 'crypto';

const ALLOWED_ORIGINS = [
    'https://verwonderlabportaal.vercel.app',
    'https://verwonderlab.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
];

const EXPECTED_CLIENT_ID = '201b68e3-bb8e-445f-af17-c04b36d5935f';
let cachedJwks = null;
let cachedJwksAt = 0;

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function getMicrosoftJwks() {
    if (cachedJwks && (Date.now() - cachedJwksAt) < 3600000) {
        return cachedJwks;
    }
    const resp = await fetch('https://login.microsoftonline.com/common/discovery/v2.0/keys');
    if (!resp.ok) throw new Error('Kan Microsoft JWKS sleutels niet ophalen.');
    const data = await resp.json();
    cachedJwks = data.keys || [];
    cachedJwksAt = Date.now();
    return cachedJwks;
}

async function verifyMicrosoftBearerToken(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authenticatie-token ontbreekt.');
    }
    const token = authHeader.slice(7).trim();
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Ongeldig tokenformaat.');

    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));

    if (header.alg !== 'RS256' || !header.kid) {
        throw new Error('Niet-ondersteund token-algoritme.');
    }
    if (payload.aud !== EXPECTED_CLIENT_ID) {
        throw new Error('Ongeldige token-audience.');
    }
    if (!payload.exp || (payload.exp * 1000) < Date.now()) {
        throw new Error('Sessie-token is verlopen.');
    }

    const email = (payload.email || payload.preferred_username || payload.upn || '').toLowerCase().trim();
    if (!email.endsWith('@wonderwijs.nl')) {
        throw new Error('Alleen @wonderwijs.nl accounts zijn geautoriseerd.');
    }

    const keys = await getMicrosoftJwks();
    const jwk = keys.find(k => k.kid === header.kid);
    if (!jwk) throw new Error('Publieke sleutel niet gevonden.');

    const keyObj = crypto.createPublicKey({ key: jwk, format: 'jwk' });
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(`${parts[0]}.${parts[1]}`);
    const sigOk = verifier.verify(keyObj, Buffer.from(parts[2], 'base64url'));
    if (!sigOk) {
        throw new Error('Ongeldige cryptografische handtekening.');
    }

    return { email, name: payload.name || email };
}

export default async function handler(req, res) {
    // Strikte CORS headers
    const origin = req.headers.origin || '';
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type, X-Requested-With'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Alleen POST verzoeken zijn toegestaan.' });
    }

    try {
        // Verifieer Microsoft SSO sessie-token server-side
        await verifyMicrosoftBearerToken(req.headers.authorization);
    } catch (authErr) {
        return res.status(401).json({ sent: false, error: 'Geen geldige autorisatie: ' + authErr.message });
    }

    try {
        const { to, leerkracht, kist, periode, school, approvedBy } = req.body || {};

        const cleanTo = (to || '').toLowerCase().trim();
        if (!cleanTo || !cleanTo.includes('@') || !cleanTo.endsWith('@wonderwijs.nl')) {
            return res.status(400).json({ error: 'Geldig @wonderwijs.nl e-mailadres ontvanger ontbreekt.' });
        }

        const docentNaam = escapeHtml(leerkracht || 'collega');
        const kistNaam = escapeHtml(kist || 'Lesmateriaal');
        const periodeTekst = escapeHtml(periode || 'de gekozen periode');
        const schoolTekst = escapeHtml(school || 'je schoollocatie');
        const beheerderNaam = escapeHtml(approvedBy || 'Het Verwonderlab Team');

        const subject = `✅ Goedgekeurd: Reservering ${String(kist || 'Lesmateriaal').replace(/[\r\n]/g, '')} - Verwonderlab Wonderwijs`;

        // Mobielvriendelijke HTML e-mailtemplate
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Reservering Goedgekeurd</title>
            <style type="text/css">
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
                body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
                
                .wrapper { width: 100%; table-layout: fixed; background-color: #f1f5f9; padding: 25px 12px; }
                .email-container { max-width: 580px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
                
                .header { background: linear-gradient(135deg, #8CC63F 0%, #6fa828 100%); padding: 30px 20px; text-align: center; color: #ffffff; }
                .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; line-height: 1.3; }
                .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.95; }
                
                .content { padding: 25px 22px; color: #1e293b; line-height: 1.6; font-size: 15px; }
                
                .detail-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #8CC63F; border-radius: 8px; padding: 16px; margin: 20px 0; }
                .detail-row { display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
                .detail-row:last-child { border-bottom: none; padding-bottom: 0; }
                .detail-row:first-child { padding-top: 0; }
                .detail-label { font-weight: 600; color: #475569; width: 40%; }
                .detail-val { font-weight: 700; color: #0f172a; width: 60%; text-align: right; word-break: break-word; }
                
                .status-badge { display: inline-block; background-color: #8CC63F; color: #ffffff; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; }
                
                .checklist-box { background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin: 20px 0; }
                .checklist-box h3 { margin: 0 0 10px 0; font-size: 14px; color: #0f172a; }
                .checklist-box ul { margin: 0; padding-left: 20px; font-size: 13px; color: #475569; }
                .checklist-box li { margin-bottom: 6px; }
                .checklist-box li:last-child { margin-bottom: 0; }
                
                .btn-container { text-align: center; margin: 25px 0 15px 0; }
                .btn-link { display: inline-block; background-color: #8CC63F; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; text-align: center; box-shadow: 0 3px 8px rgba(140, 198, 63, 0.4); }
                
                .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 15px; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5; }
                
                /* Mobiel-specifieke stijlen */
                @media only screen and (max-width: 480px) {
                    .wrapper { padding: 10px 6px !important; }
                    .email-container { width: 100% !important; border-radius: 10px !important; }
                    .header { padding: 24px 15px !important; }
                    .header h1 { font-size: 19px !important; }
                    .content { padding: 18px 15px !important; font-size: 14px !important; }
                    
                    /* Kolommen op mobiel verticaal stapelen */
                    .detail-row { display: block !important; padding: 8px 0 !important; }
                    .detail-label { width: 100% !important; display: block !important; margin-bottom: 2px !important; font-size: 12px !important; text-transform: uppercase; color: #64748b !important; }
                    .detail-val { width: 100% !important; display: block !important; text-align: left !important; font-size: 14px !important; }
                    
                    .btn-link { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 14px 10px !important; font-size: 15px !important; }
                    .footer { padding: 16px 12px !important; font-size: 11px !important; }
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <div class="email-container">
                                <!-- HEADER -->
                                <div class="header">
                                    <h1>Reservering Goedgekeurd! 🎉</h1>
                                    <p>Verwonderlab &bull; Stichting Wonderwijs</p>
                                </div>
                                
                                <!-- CONTENT -->
                                <div class="content">
                                    <p>Beste <strong>${docentNaam}</strong>,</p>
                                    <p>Goed nieuws! Je reserveringsaanvraag voor <strong>${kistNaam}</strong> is goedgekeurd door de beheerder.</p>
                                    
                                    <!-- OVERZICHT DETAILS (Responsive Kolommen) -->
                                    <div class="detail-box">
                                        <div class="detail-row">
                                            <div class="detail-label">📦 Materiaal:</div>
                                            <div class="detail-val">${kistNaam}</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">📅 Periode:</div>
                                            <div class="detail-val">${periodeTekst}</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">🏫 Locatie / School:</div>
                                            <div class="detail-val">${schoolTekst}</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">✅ Status:</div>
                                            <div class="detail-val"><span class="status-badge">Goedgekeurd</span></div>
                                        </div>
                                    </div>

                                    <!-- CHECKLIST / INSTRUCTIES -->
                                    <div class="checklist-box">
                                        <h3>📌 Belangrijk bij het gebruik:</h3>
                                        <ul>
                                            <li>Je kunt het materiaal ophalen vanaf de startdatum van de periode.</li>
                                            <li>Zorg dat alle onderdelen aan het einde van de periode weer compleet en netjes worden ingeleverd.</li>
                                            <li>Ontbreekt er iets of is er schade? Meld dit direct in het portaal via <strong>Storing / Schade Melden</strong>.</li>
                                        </ul>
                                    </div>

                                    <!-- ACTIEKNOP -->
                                    <div class="btn-container">
                                        <a href="https://verwonderlabportaal.vercel.app/" class="btn-link">Naar Verwonderlab Portaal →</a>
                                    </div>

                                    <p style="margin-top: 25px; font-size: 13px; color: #64748b; line-height: 1.5;">
                                        Met vriendelijke groet,<br>
                                        <strong>${beheerderNaam}</strong><br>
                                        Verwonderlab &bull; Stichting Wonderwijs<br>
                                        <a href="mailto:verwonderlab@wonderwijs.nl" style="color: #8CC63F; text-decoration: none;">verwonderlab@wonderwijs.nl</a>
                                    </p>
                                </div>
                                
                                <!-- FOOTER -->
                                <div class="footer">
                                    Verzonden door <strong>Verwonderlab Wonderwijs</strong> (<a href="mailto:verwonderlab@wonderwijs.nl" style="color: #64748b;">verwonderlab@wonderwijs.nl</a>)<br>
                                    Dit is een automatisch bericht vanuit het Verwonderlab Dashboard van Stichting Wonderwijs.
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
        `;

        // Afzender: verwonderlab@wonderwijs.nl
        const resendApiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.EMAIL_FROM || 'Verwonderlab Wonderwijs <verwonderlab@wonderwijs.nl>';

        if (resendApiKey) {
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: fromEmail,
                    reply_to: 'verwonderlab@wonderwijs.nl',
                    to: [to],
                    subject: subject,
                    html: htmlContent
                })
            });

            if (!resendResponse.ok) {
                const resendError = await resendResponse.json();
                console.error("Resend API Fout:", resendError);
                return res.status(500).json({ sent: false, error: resendError });
            }

            const data = await resendResponse.json();
            return res.status(200).json({ sent: true, data });
        }

        // Indien er geen RESEND_API_KEY is ingesteld in Vercel
        return res.status(200).json({
            sent: false,
            configured: false,
            message: 'Geen RESEND_API_KEY gevonden in omgevingsvariabelen. Client fallback (Outlook mailto) wordt gebruikt.'
        });

    } catch (err) {
        console.error("Fout in send-email handler:", err);
        return res.status(500).json({ error: err.message, sent: false });
    }
}
