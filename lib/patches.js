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

