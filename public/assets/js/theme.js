"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    setTimeout(fn, 1);
  }
};

var resize = function resize(fn) {
  return window.addEventListener("resize", fn);
};

var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf("#") === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#fff";
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var colors = {
  primary: "#2c7be5",
  secondary: "#748194",
  success: "#00d27a",
  info: "#27bcfd",
  warning: "#f5803e",
  danger: "#e63757",
  light: "#f9fafd",
  dark: "#000"
};
var grays = {
  white: "#fff",
  100: "#f9fafd",
  200: "#edf2f9",
  300: "#d8e2ef",
  400: "#b6c1d2",
  500: "#9da9bb",
  600: "#748194",
  700: "#5e6e82",
  800: "#4d5969",
  900: "#344050",
  1000: "#232e3c",
  1100: "#0b1727",
  black: "#000"
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(" ").filter(function (cls) {
      return cls.includes("navbar-expand-");
    }).pop().split("-").pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: "oxide"
  },
  chart: {
    borderColor: "rgba(255, 255, 255, 0.8)"
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext("2d");
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

var utils = {
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  colors: colors,
  grays: grays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
      is = _window.is;
  var html = document.querySelector("html");
  is.opera() && addClass(html, "opera");
  is.mobile() && addClass(html, "mobile");
  is.firefox() && addClass(html, "firefox");
  is.safari() && addClass(html, "safari");
  is.ios() && addClass(html, "ios");
  is.iphone() && addClass(html, "iphone");
  is.ipad() && addClass(html, "ipad");
  is.ie() && addClass(html, "ie");
  is.edge() && addClass(html, "edge");
  is.chrome() && addClass(html, "chrome");
  is.mac() && addClass(html, "osx");
  is.windows() && addClass(html, "windows");
  navigator.userAgent.match("CriOS") && addClass(html, "chrome");
};

var angels = [{
  name: "Stani Kulechov",
  title: "Aave & Lens Founder",
  image: "assets/img/angels/stani-kulechov.png",
  url: "https://twitter.com/StaniKulechov"
}, {
  name: "Sandeep Nailwal",
  title: "Polygon Co-Founder",
  image: "assets/img/angels/sandeep-nailwal.png",
  url: "https://twitter.com/sandeepnailwal"
}, {
  name: "Alex Gluchovski",
  title: "zkSync Co-Founder",
  image: "assets/img/angels/alex-gluchovski.png",
  url: "https://twitter.com/gluk64"
}, {
  name: "Emin Gün Sirer",
  title: "Avalanche Co-Founder",
  image: "assets/img/angels/emin-gun-sirer.png",
  url: "https://twitter.com/el33th4xor"
}, {
  name: "Coinflipcanada",
  title: "GMX Contributor",
  image: "assets/img/angels/coinflipcanada.png",
  url: "https://twitter.com/coinflipcanada"
}, {
  name: "Richard Ma",
  title: "Quantstamp CEO",
  image: "assets/img/angels/richard-ma.png",
  url: "https://www.linkedin.com/in/rtmtd/"
}, {
  name: "Jacob Blish",
  title: "Lido Head of BD",
  image: "assets/img/angels/jacob-blish.png",
  url: "https://twitter.com/chaingenius"
}, {
  name: "Marco Cora",
  title: "zkSync Head of BD",
  image: "assets/img/angels/marco-cora.png",
  url: "https://twitter.com/Be1garat"
}, {
  name: "Justin Reyes",
  title: "Lido Head of DeFi",
  image: "assets/img/angels/justin-reyes.png",
  url: "https://twitter.com/Justin_Stables"
}, {
  name: "Patrick Dai",
  title: "Qtum Founder",
  image: "assets/img/angels/patrick-dai.png",
  url: "https://twitter.com/PatrickXDai"
}];
var angelsSection = document.getElementById("cross-chain");

if (angelsSection) {
  var element = document.getElementById("angels");

  if (element.childNodes.length === 0) {
    angels.forEach(function (angel) {
      var angelItem = document.createElement("div");
      angelItem.classList.add("partner-item");
      angelItem.classList.add("mt-4");
      angelItem.innerHTML += "\n        <a\n          href=\"".concat(angel.url, "\"\n          role=\"button\"\n          target=\"_blank\"\n          rel=\"noreferrer noopener\"\n          class=\"link-like-text-button\"\n        >\n          <img\n            class=\"testimonial-image\"\n            loading=\"lazy\"\n            src=\"").concat(angel.image, "\"\n            alt=\"").concat(angel.name, " Logo\"\n          />\n          <p class=\"mb-0 mt-2\">").concat(angel.name, "</p>\n          <p class=\"mb-0 mt-0\" style=\"height: 75px;\">").concat(angel.title, "</p>\n        </a>\n      ");
      element.appendChild(angelItem);
    });
  }
}

function animateDataPoints(displayInterval, pointsPerDisplayInterval) {
  var referenceDataPoints = 269400336;
  var referenceTimestamp = 1630398567000;
  var fromReferenceToNow = Date.now() - referenceTimestamp;
  var pointsOnPageOpen = referenceDataPoints + fromReferenceToNow * (pointsPerDisplayInterval / displayInterval);

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function animateValue(htmlElement, startPoint, interval, pointsPerInterval) {
    var startTimestamp = null;
    var previousPoint = startPoint;
    var previousTimestamp = 0;

    var step = function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;

      if (timestamp - previousTimestamp > interval) {
        var progress = (timestamp - previousTimestamp) / interval * pointsPerInterval;
        var currentPoint = Math.floor(previousPoint + progress);
        htmlElement.innerHTML = numberWithSpaces(currentPoint);
        previousTimestamp = timestamp;
        previousPoint = currentPoint;
      }

      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  var obj = document.getElementById("data-points-number");
  animateValue(obj, pointsOnPageOpen, displayInterval, pointsPerDisplayInterval);
}

var auditorsPartners = [{
  name: "ABDK",
  image: "assets/img/auditors-partners/abdk.png"
}, {
  name: "Peckshield",
  image: "assets/img/auditors-partners/peckshield.png"
}, {
  name: "Piotr Szlachciak",
  image: "assets/img/auditors-partners/l2beat.png",
  title: "L2Beat Co-Founder"
}, {
  name: "AuditOne",
  image: "assets/img/auditors-partners/auditone.png"
}, {
  name: "Gelato",
  image: "assets/img/auditors-partners/gelato.png"
}, {
  name: "Quantstamp",
  image: "assets/img/auditors-partners/quantstamp.png"
}, {
  name: "Sygnum",
  image: "assets/img/auditors-partners/sygnum.png"
}, {
  name: "Caldera",
  image: "assets/img/auditors-partners/caldera.png"
}];
var auditorsPartnersChainsCrossChainSection = document.getElementById("cross-chain");

if (auditorsPartnersChainsCrossChainSection) {
  var _element = document.getElementById("auditors-partners");

  if (_element.childNodes.length === 0) {
    auditorsPartners.forEach(function (auditorsPartnersElement) {
      var _auditorsPartnersElem;

      var auditorsPartnersItem = document.createElement("div");
      auditorsPartnersItem.classList.add("tab-item");
      auditorsPartnersItem.innerHTML += "\n        <img\n          loading=\"lazy\"\n          src=\"".concat(auditorsPartnersElement.image, "\"\n          alt=\"").concat(auditorsPartnersElement.name, " Logo\"\n          height=\"60\"\n          width=\"60\"\n        />\n        <p class=\"mb-0 mt-2\">").concat(auditorsPartnersElement.name, "</p>\n        <p class=\"mb-0 mt-0\">").concat((_auditorsPartnersElem = auditorsPartnersElement === null || auditorsPartnersElement === void 0 ? void 0 : auditorsPartnersElement.title) !== null && _auditorsPartnersElem !== void 0 ? _auditorsPartnersElem : "", "</p>\n      ");

      _element.appendChild(auditorsPartnersItem);
    });
  }
}
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


var navbarInit = function navbarInit() {
  var Selector = {
    NAVBAR: "[data-navbar-on-scroll]",
    NAVBAR_COLLAPSE: ".navbar-collapse",
    NAVBAR_TOGGLER: ".navbar-toggler"
  };
  var ClassNames = {
    COLLAPSED: "collapsed"
  };
  var Events = {
    SCROLL: "scroll",
    SHOW_BS_COLLAPSE: "show.bs.collapse",
    HIDE_BS_COLLAPSE: "hide.bs.collapse",
    HIDDEN_BS_COLLAPSE: "hidden.bs.collapse"
  };
  var DataKey = {
    NAVBAR_ON_SCROLL: "navbar-light-on-scroll"
  };
  var navbar = document.querySelector(Selector.NAVBAR); // responsive nav collapsed

  navbar.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link") && window.innerWidth < utils.getBreakpoint(navbar)) {
      navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
    }
  });
  document.addEventListener("click", function (e) {
    if (navbar !== e.target && !navbar.contains(e.target)) {
      if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
      }
    }
  });

  if (navbar) {
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);

    var allColors = _objectSpread(_objectSpread({}, utils.colors), utils.grays);

    var name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
    var colorName = Object.keys(allColors).includes(name) ? name : "white";
    var color = allColors[colorName];
    var bgClassName = "bg-".concat(colorName);
    var shadowName = "shadow-transition";
    var colorRgb = utils.hexToRgb(color);

    var _window$getComputedSt = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt.backgroundImage;

    var transition = "background-color 0.35s ease";
    navbar.style.backgroundImage = "none"; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 0.15; // Add class on scroll

      navbar.classList.add("backdrop");

      if (alpha === 0) {
        navbar.classList.remove("backdrop");
      }

      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, "show") ? backgroundImage : "none";
      alpha > 0 || utils.hasClass(navbarCollapse, "show") ? navbar.classList.add(shadowName) : navbar.classList.remove(shadowName);
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : "none";
        navbar.style.transition = "none";
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.classList.add(bgClassName);
        navbar.classList.add(shadowName);
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, "show") ? transition : "none";
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(bgClassName);
      navbar.classList.add(shadowName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      navbar.classList.remove(bgClassName);
      navbar.classList.remove(shadowName);
      !html.scrollTop && (navbar.style.backgroundImage = "none");
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = "none";
    });
  }
};

var chains = [{
  name: "Ethereum",
  image: "assets/img/chains/eth.png"
}, {
  name: "Avalanche",
  image: "assets/img/chains/avax.png"
}, {
  name: "Polygon zkEVM & PoS",
  image: "assets/img/chains/polygon.png"
}, {
  name: "Celo",
  image: "assets/img/chains/celo.png"
}, {
  name: "BNB",
  image: "assets/img/chains/bnb.png"
}, {
  name: "Optimism",
  image: "assets/img/chains/optimism.png"
}, {
  name: "Arbitrum",
  image: "assets/img/chains/arbitrum.png"
}, {
  name: "zkSync Era",
  image: "assets/img/chains/zk-sync.png"
}, {
  name: "Base",
  image: "assets/img/chains/base.png"
}, {
  name: "Scroll",
  image: "assets/img/chains/scroll.png"
}, {
  name: "Starknet",
  image: "assets/img/chains/starknet.png"
}, {
  name: "Canto",
  image: "assets/img/chains/canto.png"
}, {
  name: "Fuel Network",
  image: "assets/img/chains/fuel-network.png"
}, {
  name: "TON",
  image: "assets/img/chains/ton.png"
}, {
  name: "Fantom",
  image: "assets/img/chains/fantom.png"
}, {
  name: "Evmos",
  image: "assets/img/chains/evmos.png"
}, {
  name: "Kava",
  image: "assets/img/chains/kava.png"
}, {
  name: "Gnosis",
  image: "assets/img/chains/gnosis.png"
}, {
  name: "Rootstock",
  image: "assets/img/chains/rootstock.png"
}, {
  name: "Klaytn",
  image: "assets/img/chains/klaytn.png"
}, {
  name: "Cronos",
  image: "assets/img/chains/cronos.png"
}, {
  name: "Metis",
  image: "assets/img/chains/metis.png"
}, {
  name: "Moonbeam",
  image: "assets/img/chains/moonbeam.png"
}, {
  name: "Aurora",
  image: "assets/img/chains/aurora.png"
}];
var chainsCrossChainSection = document.getElementById("cross-chain");

if (chainsCrossChainSection) {
  var _element2 = document.getElementById("chains");

  if (_element2.childNodes.length === 0) {
    chains.forEach(function (chain) {
      var chainItem = document.createElement("div");
      chainItem.classList.add("tab-item");
      chainItem.innerHTML += "\n        <img\n          loading=\"lazy\"\n          src=\"".concat(chain.image, "\"\n          alt=\"").concat(chain.name, " Logo\"\n          height=\"60\"\n          width=\"60\"\n        />\n        <p class=\"mb-0 mt-2\">").concat(chain.name, "</p>\n      ");

      _element2.appendChild(chainItem);
    });
    var manyMoreItem = document.createElement("div");
    manyMoreItem.classList.add("d-flex", "col-lg-12", "justify-content-center", "mt-lg-0", "mt-n5");
    manyMoreItem.innerHTML += "\n      <a\n        class=\"mb-0 mt-2 fw-bold\"\n        href=\"https://docs.redstone.finance/docs/smart-contract-devs/supported-chains\"\n        target=\"_blank\"\n        role=\"button\"\n        referrerpolicy=\"no-referrer\"\n      >\n        Full list in Docs!\n      </a>\n    ";

    _element2.appendChild(manyMoreItem);
  }
}

var dataSources = [{
  name: "Uniswap",
  image: "/assets/img/data-sources/uniswap.png"
}, {
  name: "Sushiswap",
  image: "/assets/img/data-sources/sushiswap.png"
}, {
  name: "Coingecko",
  image: "/assets/img/data-sources/coingecko.png"
}, {
  name: "Binance",
  image: "/assets/img/data-sources/binance.png"
}, {
  name: "Coinbase",
  image: "/assets/img/data-sources/coinbase.svg"
}, {
  name: "Kraken",
  image: "/assets/img/data-sources/kraken.png"
}, {
  name: "Houbi",
  image: "/assets/img/data-sources/houbi.png"
}, {
  name: "Kucoin",
  image: "/assets/img/data-sources/kucoin.png"
}, {
  name: "Bitfinex",
  image: "/assets/img/data-sources/bitfinex.png"
}, {
  name: "Bittrex",
  image: "/assets/img/data-sources/bittrex.png"
}, {
  name: "Trader Joe",
  image: "/assets/img/data-sources/traderjoe.png"
}, {
  name: "Pangolin",
  image: "/assets/img/data-sources/pangolin.png"
}, {
  name: "Yahoo finance",
  image: "/assets/img/data-sources/yahoo-finance.png"
}, {
  name: "ECB",
  image: "/assets/img/data-sources/ecb.png"
}, {
  name: "Okcoin",
  image: "/assets/img/data-sources/okcoin.png"
}, {
  name: "Curve",
  image: "/assets/img/data-sources/curve.png"
}, {
  name: "Balancer",
  image: "/assets/img/data-sources/balancer.png"
}, {
  name: "Camelot",
  image: "/assets/img/data-sources/camelot.png"
}, {
  name: "Frax",
  image: "/assets/img/data-sources/frax.svg"
}, {
  name: "Coinmarketcap",
  image: "/assets/img/data-sources/coinmarketcap.png"
}, {
  name: "Lens",
  image: "/assets/img/data-sources/lens.png"
}, {
  name: "Twelve Data",
  image: "/assets/img/data-sources/twelve-data.png"
}, {
  name: "KAIKO",
  image: "/assets/img/data-sources/kaiko.png"
}, {
  name: "4SV",
  image: "/assets/img/data-sources/4sv.png"
}];
var dataSourcesCrossChainSection = document.getElementById("cross-chain");

if (dataSourcesCrossChainSection) {
  var _element3 = document.getElementById("data-sources");

  if (_element3.childNodes.length === 0) {
    dataSources.forEach(function (dataSource) {
      var dataSourceItem = document.createElement("div");
      dataSourceItem.classList.add("tab-item");
      var isNonSquare = ["Coinbase"].includes(dataSource.name);
      dataSourceItem.innerHTML += "\n        <img\n          loading=\"lazy\"\n          src=\"".concat(dataSource.image, "\"\n          alt=\"").concat(dataSource.name, " Logo\"\n          height=\"60\"\n          width=\"").concat(isNonSquare ? 80 : 60, "\"\n        />\n        <p class=\"mb-0 mt-2\">").concat(dataSource.name, "</p>\n    ");

      _element3.appendChild(dataSourceItem);
    });

    var _manyMoreItem = document.createElement("div");

    _manyMoreItem.classList.add("d-flex", "col-lg-12", "justify-content-center", "mt-lg-0", "mt-n5");

    _manyMoreItem.innerHTML += "\n      <p class=\"mb-0 mt-2 fw-bold\">And many more!</p>\n    ";

    _element3.appendChild(_manyMoreItem);
  }
}

function fetchData() {
  var preloader = "<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>";
  var sourcesNumberElement = document.getElementById("sources-number");
  var tokensNumberElement = document.getElementById("tokens-number");
  var dataPointsElement = document.getElementById("data-points-number");
  sourcesNumberElement.innerHTML = preloader;
  tokensNumberElement.innerHTML = preloader;
  dataPointsElement.innerHTML = preloader;
  fetch("https://raw.githubusercontent.com/redstone-finance/redstone-oracles-monorepo/main/packages/oracle-node/src/config/sources.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    sourcesNumberElement.innerHTML = Object.keys(data).length;
  });
  Promise.all([fetch("https://raw.githubusercontent.com/redstone-finance/redstone-oracles-monorepo/main/packages/oracle-node/manifests/data-services/main.json").then(function (r) {
    return r.json();
  })]).then(function (resp) {
    var tokensNumber = 0;
    resp.forEach(function (set) {
      tokensNumber += Object.keys(set.tokens).length;
    });
    tokensNumberElement.innerHTML = tokensNumber;
  });
  var milisecondInterval = 10;
  var pointsPerDisplayInterval = 0;
  Promise.all([fetch("https://arweave.net/SQqLyX5MKMRhfetfIJXJOqht8qPCJyxf1VIUOwIUjas").then(function (r) {
    return r.json();
  }), fetch("https://arweave.net/syqhA_uEcZ-okZ94NHZCcY3CuUW4aK2njwOp6xQpjSE").then(function (r) {
    return r.json();
  }), fetch("https://arweave.net/Q7qbcNnOrqFbI4K5vLOecPeZn2YXE8-lEpNmMCCw39w").then(function (r) {
    return r.json();
  })]).then(function (resp) {
    resp.forEach(function (manifest) {
      var pointsPerInterval = 0;
      Object.values(manifest.tokens).forEach(function (token) {
        pointsPerInterval += token.source ? Object.keys(token.source).length : 1;
      });
      pointsPerDisplayInterval += pointsPerInterval / manifest.interval * milisecondInterval;
    });
    animateDataPoints(milisecondInterval, pointsPerDisplayInterval);
  });
}

var _window2 = window,
    is = _window2.is;

function isDeviceMobile() {
  return is.mobile() || is.iphone() || is.androidPhone() || is.windowsPhone() || is.blackberry();
}

var openTab = function openTab(event, tabName) {
  var contentIndex;
  var linkIndex;
  var tabContents = document.getElementsByClassName("tab-content");

  for (contentIndex = 0; contentIndex < tabContents.length; contentIndex += 1) {
    tabContents[contentIndex].style.display = "none";
  }

  var tabLinks = document.getElementsByClassName("tab-button");

  for (linkIndex = 0; linkIndex < tabLinks.length; linkIndex += 1) {
    tabLinks[linkIndex].style["border-bottom"] = "1px solid #e5e7eb";
  }

  document.getElementById(tabName).style.display = "flex";
  event.currentTarget.style["border-bottom"] = "1px solid #FD627A";
};

var partners = [{
  name: "Lemniscap",
  url: "https://lemniscap.com/",
  image: "assets/img/partners/lemniscap.png"
}, {
  name: "Blockchain Capital",
  url: "https://blockchain.capital/",
  image: "assets/img/partners/blockchain-capital.png"
}, {
  name: "Coinbase Ventures",
  url: "https://www.coinbase.com/ventures",
  image: "assets/img/partners/coinbase-ventures.png"
}, {
  name: "Maven11",
  url: "https://www.maven11.com/",
  image: "assets/img/partners/maven11.svg"
}, {
  name: "Distributed Global",
  url: "http://www.distributedglobal.com/",
  image: "assets/img/partners/distributed-global.png"
}, {
  name: "Arweave",
  url: "https://www.arweave.org/",
  image: "assets/img/partners/arweave.svg"
}, {
  name: "Lattice",
  url: "https://lattice.fund/",
  image: "assets/img/partners/lattice.png"
}, {
  name: "SevenX",
  url: "https://7xvc.com/",
  image: "assets/img/partners/seven-x.png"
}, {
  name: "KR1",
  url: "https://www.kryptonite1.co/",
  image: "assets/img/partners/kr1.jpg"
}, {
  name: "BeringWaters",
  url: "https://beringwaters.com/",
  image: "assets/img/partners/beringwaters.png"
}, {
  name: "1KX",
  url: "https://twitter.com/1kxnetwork",
  image: "assets/img/partners/1kx.jpeg"
}, {
  name: "Collider Ventures",
  url: "https://www.collider.vc/",
  image: "assets/img/partners/collider.png"
}, {
  name: "Folius Ventures",
  url: "https://www.folius.ventures/",
  image: "assets/img/partners/folius-ventures.png"
}, {
  name: "TRGC",
  url: "https://trgc.io/",
  image: "assets/img/partners/trgc.svg"
}, {
  name: "Permanent Ventures",
  url: "https://twitter.com/permanentvc",
  image: "assets/img/partners/permanent-ventures.png"
}, {
  name: "4SV",
  url: "https://www.4sv.io/",
  image: "assets/img/partners/4sv.png"
}, {
  name: "Numeus",
  url: "https://numeus.xyz/",
  image: "assets/img/partners/numeus.svg"
}, {
  name: "The Graph",
  url: "https://thegraph.com/",
  image: "assets/img/partners/graph.png"
}];
var partnersSection = document.getElementById("partners");

if (partnersSection) {
  var _element4 = document.getElementById("backed-by");

  if (_element4.childNodes.length === 0) {
    partners.forEach(function (partner) {
      var partnerItem = document.createElement("div");
      partnerItem.classList.add("partner-item");
      var isBlackBackgroundRequired = partner.name === "Distributed Global";
      partnerItem.innerHTML += "\n        <a\n          href=\"".concat(partner.url, "\"\n          role=\"button\"\n          target=\"_blank\"\n          rel=\"noreferrer noopener\"\n        >\n          <img\n            src=\"").concat(partner.image, "\"\n            width=\"120px\"\n            alt=\"").concat(partner.name, " Logo\"\n            style=\"").concat(isBlackBackgroundRequired ? "background: black; padding: 6px" : "", "\"\n          />\n        </a>\n      ");

      _element4.appendChild(partnerItem);
    });
  }
}

var pictures = [{
  image: "/assets/img/pictures/1.jpg"
}, {
  image: "/assets/img/pictures/2.jpg"
}, {
  image: "/assets/img/pictures/3.jpg"
}, {
  image: "/assets/img/pictures/4.jpg"
}, {
  image: "/assets/img/pictures/5.jpg"
}, {
  image: "/assets/img/pictures/6.jpg"
}, {
  image: "/assets/img/pictures/7.jpg"
}, {
  image: "/assets/img/pictures/8.jpg"
}, {
  image: "/assets/img/pictures/9.jpg"
}, {
  image: "/assets/img/pictures/10.jpeg"
}, {
  image: "/assets/img/pictures/11.jpeg"
}, {
  image: "/assets/img/pictures/12.jpeg"
}, {
  image: "/assets/img/pictures/13.jpeg"
}, {
  image: "/assets/img/pictures/14.jpeg"
}, {
  image: "/assets/img/pictures/15.jpeg"
}, {
  image: "/assets/img/pictures/16.jpeg"
}];
var pictureSection = document.getElementById("gallery");

if (pictureSection) {
  pictures.forEach(function (picture) {
    var pictureItem = document.createElement("img");
    pictureItem.src = picture.image;
    pictureSection.appendChild(pictureItem);
  });
}
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */


var scrollToTop = function scrollToTop() {
  document.querySelectorAll("[data-anchor] > a, [data-scroll-to]").forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var _utils$getData;

      e.preventDefault();
      var el = e.target;
      var id = utils.getData(el, "scroll-to") || el.getAttribute("href");
      window.scroll({
        top: (_utils$getData = utils.getData(el, "offset-top")) !== null && _utils$getData !== void 0 ? _utils$getData : utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: "smooth"
      });
      window.location.hash = id;
    });
  });
};

var slideIndex = 1;

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");

  if (slides.length > 0 && dots.length > 0) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    } // eslint-disable-next-line no-plusplus


    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    } // eslint-disable-next-line no-plusplus


    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
}

showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

if (document.getElementById("members")) {
  var members = [{
    name: "Jakub",
    role: "Founder CEO",
    img: "/assets/img/team/jakub.png",
    twitter: "https://twitter.com/kuba_eth",
    linkedin: "https://www.linkedin.com/in/jakub-wojciechowski-5901b68/"
  }, {
    name: "Marcin",
    role: "Co-Founder COO",
    img: "/assets/img/team/marcin.jpg",
    twitter: "https://twitter.com/Marcin_Kaz13",
    linkedin: "https://www.linkedin.com/in/marcin-kazmierczak1/"
  }, {
    name: "Alex",
    role: "Co-Founder RedStone Lead Dev",
    img: "/assets/img/team/alex.png",
    twitter: "https://twitter.com/hatskier_me",
    linkedin: "https://www.linkedin.com/in/alex-suvorov/"
  }, {
    name: "Piotr",
    role: "Co-Founder Warp Lead Dev",
    img: "/assets/img/team/ppe.jpeg",
    twitter: "https://twitter.com/ppe_warp",
    linkedin: "https://www.linkedin.com/in/piotr-p%C4%99dziwiatr-2ab105215/"
  }, {
    name: "Matt",
    role: "RedStone Head of BD",
    img: "/assets/img/team/matt.png",
    twitter: "https://twitter.com/mattgurbiel",
    linkedin: "https://pl.linkedin.com/in/mateuszgurbiel"
  }, {
    name: "Filip",
    role: "DeFi Degen",
    img: "/assets/img/team/filip.png",
    twitter: "https://twitter.com/Hundert1000",
    linkedin: "https://www.linkedin.com/in/filip-rogalski-0020611b3"
  }, {
    name: "Maja",
    role: "RedStone Marketing Lead",
    img: "/assets/img/team/maja.png",
    twitter: "https://twitter.com/MajaCholewka",
    linkedin: "https://www.linkedin.com/in/majacholewka/"
  }, {
    name: "Wolf",
    role: "Warp Marketing Lead",
    img: "/assets/img/team/wolf.png",
    twitter: "https://twitter.com/warcin101",
    linkedin: "https://www.linkedin.com/in/marcin-wilk-73895a1a2/"
  }];

  var _element5 = document.getElementById("members");

  members.forEach(function (member) {
    var card = document.createElement("div");
    card.classList.add("col-12", "col-sm-5", "col-md-4", "col-lg-3");
    card.innerHTML += "\n      <img class=\"member-picture\" src=\"".concat(member.img, "\"/>\n      <div class=\"member-info fw-medium\">\n        <p class=\"mb-0 fs-0\">").concat(member.name, "</p>\n        <p  class=\"mb-0 fs-0\">").concat(member.role, "</p>\n        <div class=\"member-social\">\n        <a\n          href=\"").concat(member.twitter, "\"\n          target=\"_blank\"\n          referrerpolicy=\"no-referrer\"\n        >\n          <img\n            class=\"big-button-image\"\n            src=\"/assets/img/icons/twitter.svg\"\n          >\n        </a>\n        <a\n          href=\"").concat(member.linkedin, "\"\n          style=\"color: #616368\n          target=\"_blank\"\n          referrerpolicy=\"no-referrer\"\n        >\n          <img\n            class=\"big-button-image\"\n            src=\"/assets/img/icons/linkedin.svg\"\n          >\n        </a>\n      </div>");

    _element5.appendChild(card);
  });
}

var projects = [{
  name: "DeltaPrime",
  image: "assets/img/trusted-by/delta-prime.png",
  url: "https://deltaprime.io/"
}, {
  name: "ZKX",
  image: "assets/img/trusted-by/zkx.png",
  url: "https://zkx.fi/"
}, {
  name: "Moola Market",
  image: "assets/img/trusted-by/moola.png",
  url: "https://moola.market/"
}, {
  name: "FujiDAO",
  image: "assets/img/trusted-by/fuji.png",
  url: "https://www.fujidao.org/"
}, {
  name: "DLC.link",
  image: "assets/img/trusted-by/dlc-link.png",
  url: "https://www.dlc.link/"
}, {
  name: "Bundlr Network",
  image: "assets/img/trusted-by/bundlr.png",
  url: "https://bundlr.network/"
}, {
  name: "ArDrive",
  image: "assets/img/trusted-by/ardrive.png",
  url: "https://ardrive.io/"
}, {
  name: "Brightpool Finance",
  image: "assets/img/trusted-by/brightpool.png",
  url: "https://brightpool.finance/"
}, {
  name: "Prime Protocol",
  image: "assets/img/trusted-by/prime-protocol.png",
  url: "https://www.primeprotocol.xyz/"
}, {
  name: "Mento Finance",
  image: "assets/img/trusted-by/mento-finance.svg",
  url: "https://mento.finance/"
}, {
  name: "Lido",
  image: "assets/img/trusted-by/lido.png",
  url: "https://lido.fi/"
}, {
  name: "Gamma",
  image: "assets/img/trusted-by/gamma.png",
  url: "https://www.gamma.xyz/"
}, {
  name: "Vesta Finance",
  image: "assets/img/trusted-by/vesta-finance.png",
  url: "https://vestafinance.xyz/"
}, {
  name: "Y2K",
  image: "assets/img/trusted-by/y2k.png",
  url: "https://www.y2k.finance/"
}, {
  name: "Yield Yak",
  image: "assets/img/trusted-by/yield-yak.png",
  url: "https://twitter.com/yieldyak_/"
}, {
  name: "Float Capital",
  image: "assets/img/trusted-by/float-capital.png",
  url: "https://float.capital/"
}, {
  name: "Cadence Protocol",
  image: "assets/img/trusted-by/cadence-protocol.png",
  url: "https://twitter.com/CadenceProtocol"
}, {
  name: "Silo",
  image: "assets/img/trusted-by/silo.png",
  url: "https://www.silo.finance/"
}, {
  name: "Raft",
  image: "assets/img/trusted-by/raft.png",
  url: "https://www.raft.fi/"
}, {
  name: "Nostra",
  image: "assets/img/trusted-by/nostra.png",
  url: "https://nostra.finance/"
}, {
  name: "Hubble Exchange",
  image: "assets/img/trusted-by/hubble-exchange.png",
  url: "https://twitter.com/HubbleExchange/"
}, {
  name: "EMDX",
  image: "assets/img/trusted-by/emdx.png",
  url: "https://twitter.com/emdx_io/"
}, {
  name: "Voltz",
  image: "assets/img/trusted-by/voltz.png",
  url: "https://twitter.com/voltz_xyz/"
}, {
  name: "Swell",
  image: "assets/img/trusted-by/swell.png",
  url: "https://twitter.com/swellnetworkio/photo"
}];
var trustedByCrossChainSection = document.getElementById("cross-chain");

if (trustedByCrossChainSection) {
  var _element6 = document.getElementById("trusted-by");

  if (_element6.childNodes.length === 0) {
    projects.forEach(function (project) {
      var projectItem = document.createElement("div");
      projectItem.classList.add("tab-item");
      var isBlackBackgroundRequired = project.name === "Prime Protocol";
      projectItem.innerHTML += "\n        <a\n          href=\"".concat(project.url, "\"\n          role=\"button\"\n          target=\"_blank\"\n          rel=\"noreferrer noopener\"\n          class=\"link-like-text-button\"\n        >\n          <img\n            loading=\"lazy\"\n            src=\"").concat(project.image, "\"\n            alt=\"").concat(project.name, " Logo\"\n            height=\"60\"\n            width=\"60\"\n            style=\"").concat(isBlackBackgroundRequired ? "background: black; padding: 6px" : "", "\"  \n          />\n          <p class=\"mb-0 mt-2\">").concat(project.name, "</p>\n        </a>\n      ");

      _element6.appendChild(projectItem);
    });

    var _manyMoreItem2 = document.createElement("div");

    _manyMoreItem2.classList.add("d-flex", "col-lg-12", "justify-content-center", "mt-lg-0", "mt-n5");

    _manyMoreItem2.innerHTML += "\n    <p class=\"mb-0 mt-2 fw-bold\">\n      And many more!\n    </p>\n  ";

    _element6.appendChild(_manyMoreItem2);
  }
} // /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */


docReady(fetchData);
docReady(navbarInit);
docReady(detectorInit);
docReady(scrollToTop);
var videoElem = document.getElementById("redstone-video");

if (videoElem) {
  videoElem.innerHTML = "<iframe style=\"border: none; position: relative; width: 100%; height: 100%;\" scrolling=\"no\" frameborder=\"0\" src=\"https://rive.app/community/5039-10212-redstone-interactive-animation/embed\"></iframe>";
}

var cookieScript = document.getElementById("cookie-script");
cookieScript.addEventListener("load", function () {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: "#24355B",
        text: "#FFFFFF"
      },
      button: {
        background: "#FD627A",
        text: "#FFFFFF"
      }
    },
    showLink: false,
    theme: "classic",
    content: {
      message: "This site uses cookies to analyze traffic and offer a better browsing experience.",
      dismiss: "Agree"
    }
  });
});
//# sourceMappingURL=theme.js.map
