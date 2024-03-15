//@ts-nocheck
export function safeAddFloats(a, b, c) {
  var scale = Math.pow(
    10,
    Math.max(decimalPlaces(a), decimalPlaces(b), decimalPlaces(c)),
  );
  return (a * scale + b * scale + c * scale) / scale;
}

function decimalPlaces(value) {
  var match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0),
  );
}
