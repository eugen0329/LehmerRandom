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
