function LCRand(initVal, multiplier, divider) {
  val = initVal;
  multiplier = multiplier;
  divider = divider;

  normalized = function() {
    return (val = (multiplier * val) % divider) / divider;
  };

  this.uniform = function(a, b) {
    return function() { return a + (b - a) * normalized(); } ;
  };

  this.gauss = function(mx, sd, n) {
    return function() {
      var randSum = n.times().reduce(function(sum,r) {
        return sum + normalized();
      }, 0);
      return mx + sd * Math.sqrt(12/n) * (randSum - n/2);
    };
  };

  return this;
}

