// ============================================================
// VERWONDERLAB PORTAAL - E-MAIL NOTIFICATIE ENDPOINT (VERCEL)
// ============================================================
// Dit endpoint verstuurt een automatische bevestigingsmail naar
// de leerkracht zodra een reservering door een beheerder is goedgekeurd.
//
// Indien er een RESEND_API_KEY is ingesteld in Vercel Environment Variables,
// wordt de e-mail direct en betrouwbaar verzonden.
// ============================================================

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Alleen POST verzoeken zijn toegestaan.' });
    }

    try {
        const { to, leerkracht, kist, periode, school, approvedBy } = req.body || {};

        if (!to || !to.includes('@')) {
            return res.status(400).json({ error: 'Geldig e-mailadres ontvanger ontbreekt.' });
        }

        const docentNaam = leerkracht || 'collega';
        const kistNaam = kist || 'Lesmateriaal';
        const periodeTekst = periode || 'de gekozen periode';
        const schoolTekst = school || 'je schoollocatie';
        const beheerderNaam = approvedBy || 'Het Verwonderlab Team';

        const subject = `✅ Goedgekeurd: Reservering ${kistNaam} - Verwonderlab Wonderwijs`;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
                .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
                .header { background: linear-gradient(135deg, #8CC63F 0%, #76ab33 100%); padding: 30px 25px; text-align: center; color: white; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
                .header p { margin: 8px 0 0 0; font-size: 15px; opacity: 0.95; }
                .content { padding: 30px 25px; line-height: 1.6; }
                .card { background: #f1f5f9; border-left: 4px solid #8CC63F; padding: 18px; border-radius: 6px; margin: 20px 0; }
                .card-row { display: flex; margin-bottom: 8px; font-size: 14px; }
                .card-row:last-child { margin-bottom: 0; }
                .card-label { font-weight: bold; width: 140px; color: #475569; }
                .card-value { color: #0f172a; font-weight: 600; }
                .status-badge { display: inline-block; background: #8CC63F; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
                .instructions { font-size: 14px; color: #64748b; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px; }
                .btn { display: inline-block; background: #8CC63F; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; margin-top: 20px; text-align: center; }
                .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Reservering Goedgekeurd! 🎉</h1>
                    <p>Verwonderlab &bull; Stichting Wonderwijs</p>
                </div>
                <div class="content">
                    <p>Beste <strong>${docentNaam}</strong>,</p>
                    <p>Goed nieuws! Je reserveringsaanvraag voor <strong>${kistNaam}</strong> is goedgekeurd door de beheerder.</p>
                    
                    <div class="card">
                        <div class="card-row"><span class="card-label">📦 Materiaal:</span> <span class="card-value">${kistNaam}</span></div>
                        <div class="card-row"><span class="card-label">📅 Periode:</span> <span class="card-value">${periodeTekst}</span></div>
                        <div class="card-row"><span class="card-label">🏫 Locatie:</span> <span class="card-value">${schoolTekst}</span></div>
                        <div class="card-row"><span class="card-label">✅ Status:</span> <span class="card-value"><span class="status-badge">Goedgekeurd</span></span></div>
                    </div>

                    <div class="instructions">
                        <strong>📌 Belangrijk bij het gebruik:</strong>
                        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                            <li>Je kunt het materiaal ophalen vanaf de startdatum van de periode.</li>
                            <li>Zorg dat alles aan het einde van de periode weer compleet en netjes wordt ingeleverd voor de volgende school/collega.</li>
                            <li>Is er onverhoopt iets kapot of incompleet? Meld dit direct in het portaal via <em>Storing / Schade Melden</em>.</li>
                        </ul>
                    </div>

                    <div style="text-align: center;">
                        <a href="https://verwonderlabportaal.vercel.app/" class="btn">Ga naar het Verwonderlab Portaal →</a>
                    </div>

                    <p style="margin-top: 30px; font-size: 13px; color: #64748b;">
                        Met vriendelijke groet,<br>
                        <strong>${beheerderNaam}</strong><br>
                        Verwonderlab &bull; Stichting Wonderwijs<br>
                        <a href="mailto:verwonderlab@wonderwijs.nl" style="color: #8CC63F;">verwonderlab@wonderwijs.nl</a>
                    </p>
                </div>
                <div class="footer">
                    Dit is een automatisch bericht verzonden door het Verwonderlab Dashboard van Stichting Wonderwijs.
                </div>
            </div>
        </body>
        </html>
        `;

        // Als er een Resend API Key is geconfigureerd, verstuur direct via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.EMAIL_FROM || 'Verwonderlab <onboarding@resend.dev>';

        if (resendApiKey) {
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: fromEmail,
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
