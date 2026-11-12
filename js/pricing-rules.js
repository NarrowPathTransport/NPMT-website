/* Narrow Path Medical Transport
   Pricing rules for the website estimate tool.

   This file is the ONLY place rates live. The quote interface (js/quote.js)
   reads from it and never contains a number of its own, so a rate change is
   a one-file edit that can be reviewed on its own.

   Rates approved by Russ on November 11, 2026. The cost model that validates
   them is still to be built. Do not edit rates without Russ's approval. */

(function (root) {
  "use strict";

  var RATES = {
    wheelchair: { label: "Wheelchair", pickupFee: 75, perMile: 4.25 },
    ambulatory: { label: "Ambulatory", pickupFee: 65, perMile: 4.0 }
  };

  var METERS_PER_MILE = 1609.344;

  /* Loaded miles are the driving-route miles with the passenger aboard.
     Rounded to the nearest tenth of a mile so the customer can check the
     arithmetic on screen. */
  function milesFromMeters(meters) {
    return Math.round((meters / METERS_PER_MILE) * 10) / 10;
  }

  /* All money is handled in whole cents to avoid floating point drift.
     mileage cost = tenths of a mile x rate, rounded once to the nearest cent.
     One way = pickup fee + mileage cost.
     Round trip = 2 x one way (same loaded miles each direction, no extras). */
  function estimate(service, tripType, loadedMiles) {
    var rate = RATES[service];
    if (!rate) { throw new Error("Unknown service: " + service); }
    if (tripType !== "oneway" && tripType !== "roundtrip") {
      throw new Error("Unknown trip type: " + tripType);
    }
    if (typeof loadedMiles !== "number" || !isFinite(loadedMiles) || loadedMiles < 0) {
      throw new Error("Invalid loaded miles");
    }

    var tenths = Math.round(loadedMiles * 10);
    var pickupCents = Math.round(rate.pickupFee * 100);
    var perMileCents = Math.round(rate.perMile * 100);
    var mileageCents = Math.round((tenths * perMileCents) / 10);
    var oneWayCents = pickupCents + mileageCents;
    var totalCents = tripType === "roundtrip" ? oneWayCents * 2 : oneWayCents;

    return {
      service: service,
      label: rate.label,
      tripType: tripType,
      loadedMiles: tenths / 10,
      pickupFee: pickupCents / 100,
      perMile: perMileCents / 100,
      mileageCost: mileageCents / 100,
      oneWay: oneWayCents / 100,
      legs: tripType === "roundtrip" ? 2 : 1,
      total: totalCents / 100
    };
  }

  function formatMoney(amount) {
    return "$" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var api = {
    RATES: RATES,
    milesFromMeters: milesFromMeters,
    estimate: estimate,
    formatMoney: formatMoney
  };

  root.NPTPricing = api;
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})(typeof window !== "undefined" ? window : globalThis);
