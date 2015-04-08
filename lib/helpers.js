function expandRange(range, factor) {
  var delta = (range[1] - range[0]) * factor;
  return [range[0] - delta, range[1] + delta];
}
