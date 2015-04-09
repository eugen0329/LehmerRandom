Number.prototype.times = function(callback) {
  var i;
  if(typeof callback === 'undefined') {
    var array = [];
    for(i = 0; i < this; i++) array.push(i);
    return array;
  }  else if(typeof callback === 'function')  {
    for(i = 0; i < this; i++) callback(i);
  } else {
    throw new Error("Wrong .times usage");
  }

  return null;
};

Number.prototype.square = function() {
  return this * this;
};

Array.prototype.sum = function() {
  var sum = 0;
  for (var i = 0; i < this.length; i++) {
    sum += this[i];
  }

  return sum;
};


Array.prototype.keepDomain = function(domain) {
  return this.filter(function(a) {
    return a < domain[0] || a > domain[1] ? false : true;
  });
};

// Here used the cycle 'for' as it is possible of stack oveflow
// when function Math.max.apply is used (error occurs only with
// array of huge sizes)
Array.prototype.max = function() {
  var max = this[0];
  for (var i = 0; i < this.length; i++) if(this[i] > max) max = this[i];

  return max;
};

// And here too
Array.prototype.min = function() {
  var min = this[0];
  for (var i = 0; i < this.length; i++) if(this[i] < min) min = this[i];

  return min;
};
