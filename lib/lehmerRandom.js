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

  this.exponential = function(l) {
    return function() { return - Math.log(normalized()) / l; };
  };

  this.gamma = function(l, eta) {
    return function() {
      var randMul = eta.times().reduce(function(mul, r) {
        return mul * normalized();
      }, 1);
      return - Math.log(randMul) / l;
    };
  };

  this.triangle = function(a, b) {
    return function() { return a + (b - a) * [normalized(), normalized()].max(); } ;
  };

  this.simpson = function(a, b) {
      var rand = uniform(a/2, b/2);
    return function() { return rand() + rand(); };
  };

  return this;
}

