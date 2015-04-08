var rand;
var DEFAULT = {
  initial:       27211.0,
  multiplier:    48271.0,
  divider:       2147483647.0,
  valuesCount:  1000000,
  barsCount:     20
};



$(document).ready(function() {

  var margin = {top: 10, right: 30, bottom: 30, left: 40},
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
    var a           = parseFloat($('.inp-a', this).val());
    var b           = parseFloat($('.inp-b', this).val());
    var valuescount = parseInt($('.inp-nvals', this).val());
    var nBars       = parseInt($('.inp-nbars', this).val());
    var target      = '.uniform-distribution .histogram-container';

    var mx = (a + b) / 2;
    $('.uniform-distribution .mx .value').html(mx);
    var dx = Math.pow(b - a, 2) / 12;
    $('.uniform-distribution .dx .value').html(dx);
    var sd = Math.sqrt(dx);
    $('.uniform-distribution .sd .value').html(sd);

    var values = d3.range(valuescount).map(rand.uniform(a, b));

    $(target).empty();
    var xdomain = expandRange([a,b], 0.2);
    appendHistogram(target, values, xdomain, nBars, size, margin);

    return false;
  });

  $('.gauss-distribution .inp-form').on('submit', function() {
    var mx = parseFloat($('.inp-mx', this).val());
    var sd = parseFloat($('.inp-sd', this).val());
    var n = parseFloat($('.inp-n', this).val());
    var valuesCount = parseInt($('.inp-val-count', this).val());
    var nBars = parseInt($('.inp-nbars', this).val());
    var target = '.gauss-distribution .histogram-container';

    var values = d3.range(valuesCount).map(rand.gauss(mx, sd, n));

    mx = values.sum() / values.length;
    $('.gauss-distribution .mx .value').html(mx);
    var dx = values.reduce(function(sum, cur) {
      return sum + (cur - mx).square() / (values.length - 1);
    }, 0);
    $('.gauss-distribution .dx .value').html(dx);
    sd = Math.sqrt(dx);
    $('.gauss-distribution .sd .value').html(sd);

    $(target).empty();
    var xDomain = [0, d3.max(values)];
    values = values.keepDomain(xDomain);
    appendHistogram(target, values, xDomain, nBars, size, margin);

    return false;
  });
}

