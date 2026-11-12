/* Narrow Path Medical Transport
   Trip estimate tool (hero card).

   What it does: takes two addresses, asks Google for the driving route,
   and prices the trip with the rules in js/pricing-rules.js.

   What it never does: store anything, send anything to Narrow Path, ask for a
   name or medical detail, take payment, or claim a trip is booked. Only the
   two addresses go to Google. Booking happens in Microsoft Bookings. */

(function () {
  "use strict";

  var cfg = window.NPT_QUOTE || {};
  var P = window.NPTPricing;
  var root = document.getElementById("estimator");
  var hero = document.querySelector(".hero");

  /* Feature switch: no key, no tool. The hero stays exactly as it was. */
  if (!root || !hero || !P || !cfg.googleApiKey) { return; }

  var BOOKINGS_URL = "https://outlook.office.com/book/NarrowPathTransport@narrowpathtransport.com/?ismsaljsauthenabled";
  var PHONE_TEXT = "(513) 463-7284";
  var PHONE_HREF = "tel:+15134637284";

  /* Service area: four Ohio counties. Anything else is a phone call. */
  var COUNTIES = ["Hamilton County", "Butler County", "Warren County", "Clermont County"];
  var STATE = "OH";

  /* Bias suggestions toward Cincinnati without blocking other addresses, so
     an out-of-area address can be recognised and handled politely. */
  var BIAS = { circle: { center: { latitude: 39.1031, longitude: -84.512 }, radius: 50000 } };

  var KEY = cfg.googleApiKey;
  var state = {
    service: "wheelchair",
    tripType: "oneway",
    pickup: null,
    dest: null,
    route: null,
    busy: false,
    seq: 0
  };

  var els = {
    result: root.querySelector("#estimatorResult"),
    mapWrap: root.querySelector("#estimatorMapWrap"),
    map: root.querySelector("#estimatorMap")
  };

  /* ------------------------------------------------------------ helpers */
  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) { return crypto.randomUUID(); }
    return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
  }

  function post(url, body, fieldMask) {
    var headers = { "Content-Type": "application/json", "X-Goog-Api-Key": KEY };
    if (fieldMask) { headers["X-Goog-FieldMask"] = fieldMask; }
    return fetch(url, { method: "POST", headers: headers, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) { throw new Error("HTTP " + r.status); } return r.json(); });
  }

  function get(url, fieldMask) {
    return fetch(url, { headers: { "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": fieldMask } })
      .then(function (r) { if (!r.ok) { throw new Error("HTTP " + r.status); } return r.json(); });
  }

  function inServiceArea(place) {
    var county = "", st = "";
    (place.addressComponents || []).forEach(function (c) {
      var t = c.types || [];
      if (t.indexOf("administrative_area_level_2") !== -1) { county = c.longText; }
      if (t.indexOf("administrative_area_level_1") !== -1) { st = c.shortText; }
    });
    return st === STATE && COUNTIES.indexOf(county) !== -1;
  }

  /* Standard encoded polyline decoder (precision 5). */
  function decodePolyline(str) {
    var i = 0, lat = 0, lng = 0, out = [];
    while (i < str.length) {
      var b, shift = 0, result = 0;
      do { b = str.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      lat += (result & 1) ? ~(result >> 1) : (result >> 1);
      shift = 0; result = 0;
      do { b = str.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      lng += (result & 1) ? ~(result >> 1) : (result >> 1);
      out.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return out;
  }

  /* ------------------------------------------------- address autocomplete */
  function Combo(inputId, listId, onPick, onClear) {
    var input = root.querySelector("#" + inputId);
    var list = root.querySelector("#" + listId);
    var token = uuid();
    var items = [];
    var active = -1;
    var timer = null;
    var reqSeq = 0;

    function close() {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      active = -1;
    }

    function setActive(i) {
      var opts = list.querySelectorAll("[role=option]");
      Array.prototype.forEach.call(opts, function (o, idx) {
        o.setAttribute("aria-selected", idx === i ? "true" : "false");
      });
      active = i;
      if (i >= 0 && opts[i]) {
        input.setAttribute("aria-activedescendant", opts[i].id);
        opts[i].scrollIntoView({ block: "nearest" });
      } else {
        input.removeAttribute("aria-activedescendant");
      }
    }

    function render() {
      list.textContent = "";
      items.forEach(function (it, i) {
        var li = h("li", "estimator__option");
        li.setAttribute("role", "option");
        li.id = listId + "-" + i;
        li.setAttribute("aria-selected", "false");
        li.appendChild(h("span", "estimator__option-main", it.main));
        if (it.secondary) { li.appendChild(h("span", "estimator__option-sub", it.secondary)); }
        /* mousedown, not click, so the input does not blur first */
        li.addEventListener("mousedown", function (e) { e.preventDefault(); choose(i); });
        list.appendChild(li);
      });
      list.hidden = !items.length;
      input.setAttribute("aria-expanded", items.length ? "true" : "false");
      active = -1;
    }

    function choose(i) {
      var it = items[i];
      if (!it) { return; }
      close();
      input.value = it.label;
      input.setAttribute("aria-busy", "true");
      var url = "https://places.googleapis.com/v1/places/" + encodeURIComponent(it.placeId) +
        "?sessionToken=" + encodeURIComponent(token);
      get(url, "id,formattedAddress,location,addressComponents")
        .then(function (p) {
          token = uuid(); /* a session ends when details are fetched */
          input.removeAttribute("aria-busy");
          onPick({
            id: p.id,
            address: p.formattedAddress || it.label,
            lat: p.location.latitude,
            lng: p.location.longitude,
            addressComponents: p.addressComponents
          });
        })
        .catch(function () {
          input.removeAttribute("aria-busy");
          onClear();
          showProblem("We could not look up that address. Please try again, or call us at");
        });
    }

    function search(q) {
      var mine = ++reqSeq;
      post("https://places.googleapis.com/v1/places:autocomplete", {
        input: q,
        sessionToken: token,
        includedRegionCodes: ["us"],
        locationBias: BIAS
      }).then(function (data) {
        if (mine !== reqSeq) { return; }
        items = (data.suggestions || [])
          .filter(function (s) { return s.placePrediction; })
          .slice(0, 5)
          .map(function (s) {
            var p = s.placePrediction;
            var sf = p.structuredFormat || {};
            return {
              placeId: p.placeId,
              label: p.text && p.text.text ? p.text.text : "",
              main: sf.mainText && sf.mainText.text ? sf.mainText.text : (p.text && p.text.text) || "",
              secondary: sf.secondaryText && sf.secondaryText.text ? sf.secondaryText.text : ""
            };
          });
        render();
      }).catch(function () { if (mine === reqSeq) { items = []; render(); } });
    }

    input.addEventListener("input", function () {
      onClear();
      var q = input.value.trim();
      window.clearTimeout(timer);
      if (q.length < 3) { reqSeq++; items = []; render(); return; }
      timer = window.setTimeout(function () { search(q); }, 250);
    });

    input.addEventListener("keydown", function (e) {
      if (list.hidden || !items.length) { return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((active + 1) % items.length); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive((active - 1 + items.length) % items.length); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(active); }
      else if (e.key === "Escape") { close(); }
    });

    input.addEventListener("blur", function () { window.setTimeout(close, 120); });
  }

  /* -------------------------------------------------------------- results */
  function clearResult(keepMap) {
    els.result.textContent = "";
    els.result.removeAttribute("data-state");
    if (!keepMap) { els.mapWrap.hidden = true; }
  }

  function showHint() {
    clearResult();
    els.result.setAttribute("data-state", "hint");
    els.result.appendChild(h("p", "estimator__hint", "Choose a pickup and a destination from the lists to see your estimate."));
  }

  function showProblem(message) {
    clearResult();
    els.result.setAttribute("data-state", "problem");
    var p = h("p", "estimator__problem", message + " ");
    els.result.appendChild(p);
    var a = h("a", "estimator__phone", PHONE_TEXT);
    a.href = PHONE_HREF;
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
  }

  function row(label, value, cls) {
    var r = h("div", "estimator__row" + (cls ? " " + cls : ""));
    r.appendChild(h("dt", null, label));
    r.appendChild(h("dd", null, value));
    return r;
  }

  function tripDetailsText(est) {
    return [
      "Narrow Path Transport trip details",
      "Service: " + est.label + ", " + (est.tripType === "roundtrip" ? "round trip" : "one way"),
      "Pickup: " + state.pickup.address,
      "Destination: " + state.dest.address,
      "Estimated loaded miles each way: " + est.loadedMiles.toFixed(1),
      "Estimate: " + P.formatMoney(est.total) + " (final price confirmed in writing)"
    ].join("\n");
  }

  function renderEstimate() {
    if (!state.route) { return; }
    var est = P.estimate(state.service, state.tripType, state.route.miles);

    clearResult(true);
    els.result.setAttribute("data-state", "estimate");

    var head = h("div", "estimator__head");
    head.appendChild(h("span", "estimator__badge", "Estimate"));
    head.appendChild(h("span", "estimator__route", est.loadedMiles.toFixed(1) + " loaded miles each way"));
    els.result.appendChild(head);

    var dl = h("dl", "estimator__lines");
    dl.appendChild(row("Pickup fee", P.formatMoney(est.pickupFee)));
    dl.appendChild(row(
      est.loadedMiles.toFixed(1) + " miles × " + P.formatMoney(est.perMile) + " per mile",
      P.formatMoney(est.mileageCost)
    ));
    dl.appendChild(row("One way", P.formatMoney(est.oneWay), "estimator__row--sub"));
    if (est.legs === 2) {
      dl.appendChild(row("Round trip: 2 × " + P.formatMoney(est.oneWay), P.formatMoney(est.total), "estimator__row--sub"));
    }
    els.result.appendChild(dl);

    var total = h("p", "estimator__total");
    total.appendChild(h("span", "estimator__total-label", est.legs === 2 ? "Estimated round trip" : "Estimated one way"));
    total.appendChild(h("span", "estimator__total-amount", P.formatMoney(est.total)));
    els.result.appendChild(total);

    els.result.appendChild(h("p", "estimator__note",
      "This is an estimate based on the driving route shown. We confirm your final price in writing before your trip. A route change or an added stop can change it."));
    els.result.appendChild(h("p", "estimator__note estimator__note--strong",
      "No payment is due until after your ride."));

    var actions = h("div", "estimator__actions");
    var book = h("a", "btn btn--light", "Request a ride");
    book.href = BOOKINGS_URL;
    book.target = "_blank";
    book.rel = "noopener noreferrer";
    var copy = h("button", "btn btn--outline-light", "Copy trip details");
    copy.type = "button";
    var fallback = h("textarea", "estimator__fallback");
    fallback.readOnly = true;
    fallback.rows = 6;
    fallback.hidden = true;
    fallback.setAttribute("aria-label", "Trip details to paste into your ride request");
    var status = h("p", "estimator__copied");
    status.setAttribute("role", "status");

    copy.addEventListener("click", function () {
      var text = tripDetailsText(est);
      function manual() {
        fallback.value = text;
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        status.textContent = "Select and copy the text below.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          status.textContent = "Copied. Paste it into the notes when you request your ride.";
        }, manual);
      } else { manual(); }
    });

    actions.appendChild(book);
    actions.appendChild(copy);
    els.result.appendChild(actions);
    els.result.appendChild(status);
    els.result.appendChild(fallback);

    els.result.appendChild(h("p", "estimator__privacy",
      "Distances are measured with Google Maps. Please do not enter names or medical details here."));
  }

  /* ------------------------------------------------------------------ map */
  var mapsPromise = null;
  function loadMaps() {
    if (mapsPromise) { return mapsPromise; }
    mapsPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(KEY) + "&v=weekly&loading=async";
      s.async = true;
      s.onload = function () {
        Promise.all([google.maps.importLibrary("maps"), google.maps.importLibrary("marker")]).then(resolve, reject);
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return mapsPromise;
  }

  var mapObj = null, overlays = [];
  function drawMap(route) {
    /* The map is a convenience. If it fails, the estimate still stands. */
    loadMaps().then(function (libs) {
      var path = decodePolyline(route.polyline);
      if (!path.length) { return; }
      els.mapWrap.hidden = false;
      if (!mapObj) {
        mapObj = new libs[0].Map(els.map, {
          mapId: cfg.mapId || "DEMO_MAP_ID",
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          clickableIcons: false
        });
      }
      overlays.forEach(function (o) { o.map = null; if (o.setMap) { o.setMap(null); } });
      overlays = [];

      var line = new google.maps.Polyline({
        path: path, map: mapObj, strokeColor: "#E4B869", strokeOpacity: 0.95, strokeWeight: 5
      });
      overlays.push(line);

      function pin(pos, letter) {
        var d = h("div", "estimator__pin", letter);
        var m = new libs[1].AdvancedMarkerElement({ map: mapObj, position: pos, content: d, title: letter === "A" ? "Pickup" : "Destination" });
        overlays.push(m);
      }
      pin({ lat: state.pickup.lat, lng: state.pickup.lng }, "A");
      pin({ lat: state.dest.lat, lng: state.dest.lng }, "B");

      var bounds = new google.maps.LatLngBounds();
      path.forEach(function (p) { bounds.extend(p); });
      mapObj.fitBounds(bounds, 36);
    }).catch(function () { els.mapWrap.hidden = true; });
  }

  /* ---------------------------------------------------------------- route */
  function computeRoute() {
    state.route = null;
    if (!state.pickup || !state.dest) { showHint(); return; }

    if (!inServiceArea(state.pickup) || !inServiceArea(state.dest)) {
      showProblem("One of these addresses is outside the four counties we serve (Hamilton, Butler, Warren and Clermont). Please call us at");
      return;
    }

    var mine = ++state.seq;
    clearResult();
    els.result.setAttribute("data-state", "loading");
    els.result.appendChild(h("p", "estimator__hint", "Measuring the route…"));

    post("https://routes.googleapis.com/directions/v2:computeRoutes", {
      origin: { location: { latLng: { latitude: state.pickup.lat, longitude: state.pickup.lng } } },
      destination: { location: { latLng: { latitude: state.dest.lat, longitude: state.dest.lng } } },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      polylineQuality: "OVERVIEW",
      polylineEncoding: "ENCODED_POLYLINE",
      units: "IMPERIAL"
    }, "routes.distanceMeters,routes.polyline.encodedPolyline").then(function (data) {
      if (mine !== state.seq) { return; }
      var r = data.routes && data.routes[0];
      if (!r || typeof r.distanceMeters !== "number") { throw new Error("No route"); }
      state.route = {
        miles: P.milesFromMeters(r.distanceMeters),
        polyline: r.polyline && r.polyline.encodedPolyline ? r.polyline.encodedPolyline : ""
      };
      renderEstimate();
      if (state.route.polyline) { drawMap(state.route); }
    }).catch(function () {
      if (mine !== state.seq) { return; }
      showProblem("We could not measure that route. Please call us at");
    });
  }

  /* --------------------------------------------------------------- wiring */
  Combo("estimatorPickup", "estimatorPickupList",
    function (p) { state.pickup = p; computeRoute(); },
    function () { if (state.pickup) { state.pickup = null; state.seq++; showHint(); } });
  Combo("estimatorDest", "estimatorDestList",
    function (p) { state.dest = p; computeRoute(); },
    function () { if (state.dest) { state.dest = null; state.seq++; showHint(); } });

  /* Price changes with service or trip type never need a new route. */
  root.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "estimatorService") { state.service = t.value; renderEstimate(); }
    if (t.name === "estimatorTrip") { state.tripType = t.value; renderEstimate(); }
  });

  root.hidden = false;
  hero.classList.add("hero--estimator");
  showHint();
})();
