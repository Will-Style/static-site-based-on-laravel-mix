'use strict'

import '@babel/polyfill'

import lazysizes from "lazysizes"
import unveil from "lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js"

if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
require('intersection-observer');

import ReplaceHead from "./lib/ReplaceHead"
import GA from "./lib/GA"

import ViewportUnitsBuggyfill from "./lib/ViewportUnitsBuggyfill"
import IeFix from "./lib/IeFix"
import Svg from "./lib/Svg"
import Resources from "./lib/Resources"
// import Share from "./lib/Share"
import Drawer from "./lib/Drawer"
// import Form from "./lib/Form"
import Lightbox from "./lib/Lightbox"
import Headroom from "./lib/Headroom"
import ScrollTrigger from "./lib/ScrollTrigger"
import SmoothScroll from "./lib/SmoothScroll"
import Slider from "./lib/Slider"

import Dropdown from "./lib/Dropdown"

import Tab from "./lib/Tab"
// import Datepicker from "./lib/Datepicker"
import ObjectFitImages from "./lib/ObjectFitImages"
import Accordion from "./lib/Accordion"
import Barba from "./lib/Barba"
import Luxy from "./lib/Luxy"

// const enter



new ViewportUnitsBuggyfill
new Resources
new IeFix
new Svg
new ObjectFitImages

new GA
new ReplaceHead

// new Luxy
new Slider
new Drawer
new Dropdown
new Lightbox
// new Sticky

new Accordion
new Tab
new ScrollTrigger
new Headroom
new SmoothScroll
new Barba


