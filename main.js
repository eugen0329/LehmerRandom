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

  var valuesCount  = DEFAULT.valuesCount,
    initial        = DEFAULT.initial,
    multiplier     = DEFAULT.multiplier,
    divider        = DEFAULT.divider;

  rand = new LehmerRand(initial, multiplier, divider);


  bindEventHandlers(size, margin);
});

function bindEventHandlers(size, margin) {
  $('.tabs-panel a').on('click', function(e) {
      var currentAttrValue = $(this).attr('href');
      $('.tabs-wrapper ' + currentAttrValue).fadeIn(400).siblings().hide();
      $(this).parent('li').addClass('active').siblings().removeClass('active');
      $('.tabs-wrapper ' + currentAttrValue + 'submit-btn').click();
      e.preventDefault();
  });

  $('.uniform-distribution .inp-form').on('submit', function() {
    var a = parseFloat($('.inp-a', this).val());
    var b = parseFloat($('.inp-b', this).val());
    var valuesCount = parseInt($('.inp-n', this).val());
    var nBars = parseInt($('.inp-k', this).val());
    var target = '.uniform-distribution .histogram-container';

    var mx = (a + b) / 2;
    $('.uniform-distribution .mx .value').html(mx);
    var dx = Math.pow(b - a, 2) / 12;
    $('.uniform-distribution .dx .value').html(dx);
    var sd = Math.sqrt(dx);
    $('.uniform-distribution .sd .value').html(sd);

    var values = d3.range(valuesCount).map(function() {
      return a + (b - a) * rand();
    });

    $(target).empty();
    var xDomain = expandRange([a,b], 0.2);
    appendHistogram(target, values, xDomain, nBars, size, margin);

    return false;
  });
}

