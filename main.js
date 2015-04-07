$(document).ready(function() {
  var DEFAULT = {
    initial:       27211.0,
    multiplier:    48271.0,
    divider:       2147483647.0,
    randNumCount:  1000000,
    barsCount:     20
  };

  var margin = {top: 10, right: 30, bottom: 30, left: 30},
      size = {
        width: 960 - margin.left - margin.right,
        height: 500 - margin.top - margin.bottom
      };

  var randNumCount = DEFAULT.randNumCount,
    initial        = DEFAULT.initial,
    multiplier     = DEFAULT.multiplier,
    divider        = DEFAULT.divider,
    nBars          = DEFAULT.barsCount;

  var rand = new LehmerRand(initial, multiplier, divider);

  var values = d3.range(randNumCount).map(rand);
  appendHistogram('.histogram-container', values, nBars, size, margin);

});

