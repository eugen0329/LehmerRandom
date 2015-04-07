function LehmerRand(initVal, multiplier, divider) {
  val = initVal;
  multiplier = multiplier;
  divider = divider;

  this.generate = function() {
    return (val = (multiplier * val) % divider);
  };

  this.last = function() {
    return val;
  };
}
