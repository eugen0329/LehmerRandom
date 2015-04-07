function LehmerRand(initVal, multiplier, divider) {
  val = initVal;
  multiplier = multiplier;
  divider = divider;

  normalized = function() {
    return (val = (multiplier * val) % divider) / divider;
  };

  return function() {
    return normalized();
  };
}
