/* Narrow Path Medical Transport
   Configuration for the website estimate tool.

   The estimate tool stays completely hidden until googleApiKey is filled in,
   so nothing half-finished can reach visitors.

   A Google browser key is visible to anyone who views the page. That is how
   browser keys work, so protect it in the Google Cloud console instead:
   - Application restriction: websites (HTTP referrers) for
       https://narrowpathtransport.com/*
       https://www.narrowpathtransport.com/*
       the Netlify deploy preview address, while testing
   - API restriction: Places API (New), Routes API, Maps JavaScript API only
   - Budget alert and daily quota caps on each API

   Never put a server secret, Stripe secret key, or Microsoft secret here. */

window.NPT_QUOTE = {
  googleApiKey: "",
  mapId: ""
};
