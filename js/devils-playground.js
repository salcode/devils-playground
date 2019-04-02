/**
 * Devils Playground.
 * JavaScript Idle Detection
 * Version: 0.2.0
 * License: apache-2.0
 * Project URL: https://github.com/salcode/devils-playground
 * Author: Sal Ferrarello
 * Author URL: https://salferrarello.com
 *
 * Usage:
 *
 * var idle = new DevilsPlayground(
 *              function() {
 *                alert('You have been idle for 42 seconds!');
 *              },
 *              42,
 *              {
 *                'devMode': false, // console.log() counter.
 *              }
 *            );
 * idle.start();
 */
'use strict';

/**
 * Constructor.
 *
 * @param function idleFunction  The function to execute after the number of
 *                                idle seconds pass.
 * @param int      maxNumSeconds (optional) The maximum number of idle seconds
 *                                before the function is executed. Defaults
 *                                to 120 seconds (2 minutes).
 * @param object   options (optional)
 *                  - bool devMode If the current counter and calls to reset
 *                                should be displayed in the JavaScript
 *                                console. Defaultsthe version I grew up hearing was "Devil's Playground".
 */
function DevilsPlayground(idleFunction, maxNumSeconds = 120, options = {} ) {

  this.idleFunction  = idleFunction;
  this.maxNumSeconds = maxNumSeconds;
  this.secondCounter = 1;
  this.devMode       = options.devMode || false;

  this.addListeners();
}

/**
 * Start timer.
 *
 * Reset counter and start counting.
 */
DevilsPlayground.prototype.start = function() {
  this.stop();
  this.reset();
  this.continue();
};

/**
 * Stop timer.
 */
DevilsPlayground.prototype.stop = function() {
  clearTimeout(this.timer);
};

/**
 * Reset the second counter.
 */
DevilsPlayground.prototype.reset = function() {

  if(this.devMode) { console.log('reset'); }

  this.secondCounter = 1;
};

/**
 * Continue timer.
 *
 * Set the next tick to occur after delay.
 */
DevilsPlayground.prototype.continue = function() {
  var self = this;
  this.timer = setTimeout(function() {
    self.tick();
  }, 1000);
};

/**
 * Record time that has passed.
 */
DevilsPlayground.prototype.tick = function() {

  if(this.devMode) { console.log(this.secondCounter); }

  if (this.isSecondCounterMax()) {
    this.idleFunction();
    return;
  }

  this.secondCounter++;
  this.continue();
};

/**
 * Have we reached the maximum number of seconds?
 *
 * @return bool We are at the maximum number of seconds.
 */
DevilsPlayground.prototype.isSecondCounterMax = function() {
  return this.secondCounter >= this.maxNumSeconds;
};

/**
 * Assign listeners to note behavior that is not idle.
 */
DevilsPlayground.prototype.addListeners = function() {

  var options = this.isPassiveSupported() ? { passive: true } : false;

  document.addEventListener("mousemove", this.reset.bind(this), options);
  document.addEventListener("mousedown", this.reset.bind(this), options);
  document.addEventListener("keypress", this.reset.bind(this), options);
  document.addEventListener("DOMMouseScroll", this.reset.bind(this), options);
  document.addEventListener("mousewheel", this.reset.bind(this), options);
  document.addEventListener("touchmove", this.reset.bind(this), options);
  document.addEventListener("MSPointerMove", this.reset.bind(this), options);
};

/**
 * Is the options object supported for addEventListener in this browser?
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @return bool The options object is supported in this browser.
 */
DevilsPlayground.prototype.isPassiveSupported = function() {
  var passiveSupported = false;
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch(err) {
    passiveSupported = false;
  }
  return passiveSupported;
}
