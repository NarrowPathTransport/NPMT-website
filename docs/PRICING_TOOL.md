# Trip estimate tool (stage one prototype)

Status: built on branch `feature/pricing-quote-tool` (PR #2) with a restricted Google key in `js/quote-config.js`, so the tool shows on the deploy preview. Not on the live site. It goes live only when Russ approves the merge. Clearing the key hides it again.

## Approved for stage one

- Estimate tool in the homepage hero (glass card on the right, hero copy and look unchanged).
- Rates (approved by Russ, cost model to be built later). All rates live only in `js/pricing-rules.js`.
  - Ambulatory: $65 pickup + $4.00 per loaded mile.
  - Wheelchair: $75 pickup + $4.25 per loaded mile.
- One way = pickup fee + loaded miles x rate. Round trip = 2 x one way.
- Miles are measured by Google Maps driving route and rounded to the nearest tenth.
- "Request a ride" hands off to Microsoft Bookings. Bookings is the real availability check. The site has no live availability and takes no advance payment.
- Payment is after the trip (payment link or invoice). Early payment only after a trip is confirmed. Not built yet.

## Wording rules

- The tool says "estimate", never "quote" or "final price".
- Billing basis (approved by Russ, November 11, 2026): NPT bills the estimated miles shown by the tool, not odometer miles. If the pickup, destination, or stops change, NPT re-quotes before the trip.
- Final price is confirmed in writing before the trip. The tool does not promise there are no other charges.
- "No payment is due until after your ride."
- Do not enter names or medical details. The tool collects only two addresses, service type, and trip type. Nothing is stored or sent to NPT.

## Behavior

- Both addresses must be in Hamilton, Butler, Warren, or Clermont County, Ohio. Otherwise the tool shows the phone number and does not price the trip.
- Route failures also show the phone number.
- Maps JavaScript loads only after a route is computed, to limit map charges.

## Google setup (done November 11, 2026)

Project "Narrow Path Website", free trial through February 10, 2027. Key restricted to narrowpathtransport.com, www, and the PR #2 preview address, and to the three APIs below. $1 monthly budget alert. Remove the preview address from the key after launch. Still to do: a daily quota cap.

## Original setup steps

1. Create a Google Cloud project with billing and budget alerts.
2. Enable Places API (New), Routes API, and Maps JavaScript API.
3. Create a browser key restricted by HTTP referrer (narrowpathtransport.com, www, and the Netlify preview address) and by those three APIs.
4. Optional: create a Map ID.
5. Put the key (and map ID) in `js/quote-config.js`. Browser keys are public by design, so the restrictions are the protection.

## Open decisions (queued)

See the numbered queue in the session notes and `docs/BACKLOG.md` Priority 4.
