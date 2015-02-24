function debug(logString) {
  DEBUG = (typeof DEBUG === "undefined") ? true : DEBUG;
  if (DEBUG)
    console.log('DEBUG: ' + logString);
}

function checkArrayForDuplicates(array, arrayNameStr) {
  // return false if no dups, return array of error strings if dups
  // parameters:
  //   array        | required | Array with potential duplicates
  //   arrayNameStr | optional | String describing the array
  arrayNameStr = (typeof arrayNameStr === "undefined") ? 'unnamed array' : arrayNameStr;
  var duplicates = [], errors = [];
  array.forEach(function (element) {
    if (duplicates.indexOf(element) !== -1)
      errors.push(arrayNameStr + ' duplicate found: ' + element);
    duplicates.push(element);
  });
  if (errors.length === 0)
    return false;
  else
    return errors;
}

function highlightCode() {
    $('pre code').each(function(i, block) {
        block.innerHTML = block.innerHTML
        hljs.highlightBlock(block);
        debug('highlighted block: ' + block);
    });
}

function getProp(object, prop, norm) {
  // return the value of object.prop, or the value of norm if undefined.
  // norm is optional, and defaults to null
  // parameters:
  //   object | required | Object
  //   prop   | required | String
  //   norm   | optional | any type, defaults to null
  norm = (typeof norm === "undefined") ? null : norm;
  if (object.hasOwnProperty(prop))
    return object[prop];
  else
    return norm;
}

var spinnerOpts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 100, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
