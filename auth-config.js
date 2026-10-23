// ============================================================
// MICROSOFT 365 SSO CONFIGURATIE - VERWONDERLAB PORTAAL
// ============================================================
// Dit bestand regelt de beveiligde Single Sign-On (SSO) koppeling 
// met Microsoft 365 / Microsoft Entra ID voor Stichting Wonderwijs.
//
// ------------------------------------------------------------
// INSTRUCTIES VOOR DE ICT-BEHEERDER VAN WONDERWIJS:
// 1. Ga naar het Microsoft Entra admin center (https://entra.microsoft.com)
//    of de Azure Portal (https://portal.azure.com).
// 2. Navigeer naar: 'Identiteit' (Identity) -> 'App-registraties' (App registrations)
//    -> 'Nieuwe registratie' (New registration).
// 3. Vul de velden in:
//    - Naam: "Verwonderlab Portaal"
//    - Ondersteunde accounttypen: "Alleen accounts in deze organisatiemap (Wonderwijs)"
//      (of Multitenant / Accounts in elke organisatiemap).
//    - Omleidings-URI (Redirect URI):
//      * Selecteer een platform: kies "Single-page application (SPA)"
//      * Vul de URL van het portaal in (bijv. https://verwonderlab.vercel.app/ 
//        en voor lokaal testen http://localhost:3000/ of http://127.0.0.1:5500/).
// 4. Klik op "Registreren".
// 5. Kopieer op het overzichtsscherm het "Toepassings-id (client-id)" (Application ID)
//    en plak deze hieronder bij `clientId`.
// ============================================================

window.AUTH_CONFIG = {
    clientId: "201b68e3-bb8e-445f-af17-c04b36d5935f", // Wonderwijs Microsoft 365 Azure Client ID
    authority: "https://login.microsoftonline.com/organizations",
    allowedDomain: "@wonderwijs.nl",
    autoSSO: true
};
