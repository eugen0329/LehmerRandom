var DEFAULT = {
  initial:       27211.0,
  multiplier:    48271.0,
  divider:       2147483647.0,
  valuesCount:  1000000,
  barsCount:     20
};

var PARAMS = {
  uniform: {
    a:       { selector: '.inp-a',     parser: parseFloat},
    b:       { selector: '.inp-b',     parser: parseFloat},
    nBars:   { selector: '.inp-nbars', parser: parseInt},
    nValues: { selector: '.inp-nvals', parser: parseInt}
  },
  gauss: {
    mx: { selector: '.inp-mx', parser: parseFloat},
    sd: { selector: '.inp-sd', parser: parseFloat},
    n: { selector: '.inp-n', parser: parseInt},
    nValues: { selector: '.inp-nvals', parser: parseInt},
    nBars: { selector: '.inp-nbars', parser: parseInt}
  }

};

var rand, margin, size;

$(document).ready(function() {
  margin = {top: 10, right: 30, bottom: 30, left: 40};
  size = {
    width: $('.histogram-container').width() - margin.left - margin.right,
    height: $('.histogram-container').height() - margin.top - margin.bottom
  };

  var valuescount  = DEFAULT.valuescount,
    initial        = DEFAULT.initial,
    multiplier     = DEFAULT.multiplier,
    divider        = DEFAULT.divider;

  rand = LCRand(initial, multiplier, divider);

  bindeventhandlers(size, margin);
});

function bindeventhandlers(size, margin) {
  $('.tabs-panel a').on('click', function(e) {
      var currentAttrValue = $(this).attr('href');
      $('.tabs-wrapper ' + currentAttrValue).fadeIn(400).siblings().hide();
      $(this).parent('li').addClass('active').siblings().removeClass('active');
      $('.tabs-wrapper ' + currentAttrValue + 'submit-btn').click();
      e.preventDefault();
  });

  $('.uniform-distribution .inp-form').on('submit', function() {
    var target  = '.uniform-distribution';
    var p      = getParams(PARAMS.uniform, this);
    var values = d3.range(p.nValues).map(rand.uniform(p.a, p.b));
    var xDomain = expandRange([p.a, p.b], 0.2);

    appendEvaluations(values, target);
    appendHistogram(target + '.histogram-container', values, xDomain, p.nBars, size, margin);

    return false;
  });

  $('.gauss-distribution .inp-form').on('submit', function() {
    var target = '.gauss-distribution';
    var p = getParams(PARAMS.gauss);
    var values = d3.range(p.nValues).map(rand.gauss(p.mx, p.sd, p.n));
    var xDomain = [0, d3.max(values)];

    appendEvaluations(values, target);
    values = values.keepDomain(xDomain);
    appendHistogram(target + ' .histogram-container', values, xDomain, p.nBars, size, margin);

    return false;
  });
}

function getParams(list, object) {
  var params = {};
  $.each(list, function(name, p) {
    params[name] = p.parser($(p.selector, object).val());
  });

  return params;
}

function appendEvaluations(values, target) {
  var mx = values.sum() / values.length;
  var dx = values.reduce(function(sum, cur) {
    return sum + (cur - mx).square() / (values.length - 1);
  }, 0);
  var sd = Math.sqrt(dx);

  $(target + ' .mx .value').html(mx);
  $(target + ' .dx .value').html(dx);
  $(target + ' .sd .value').html(sd);
}
