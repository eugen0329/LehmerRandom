$(document).ready(function() {
  var DEFAULT = {initial: 1, multiplier: 48271.0, divider: 2147483647.0};

  var rand = new LehmerRand(
      DEFAULT.initial,
      DEFAULT.multiplier,
      DEFAULT.divider
  );

  var series = [];
  for (var i = 0, len = 10; i < len; i++) {
    series.push(rand.generate());
  }

  console.log(series);
});

