/**
 * Expose wait
 */

module.exports = wait['default'] = wait

/**
 * wait function
 * @param  {Function} fn function that returns a conditional
 */
function wait (fn) {
  while (!fn()) {}
}
