$(document).ready(function() {
  var DEFAULT = {
    initial:       27211.0,
    multiplier:    48271.0,
    divider:       2147483647.0,
    randNumCount:  1000000,
    barsCount:     20
  };
  //$('.tabs-panel a[href="#tab1"]').click();

  var margin = {top: 10, right: 30, bottom: 30, left: 40},
      size = {
        width: $('.histogram-container').width() - margin.left - margin.right,
        height: $('.histogram-container').height() - margin.top - margin.bottom
      };

  var randNumCount = DEFAULT.randNumCount,
    initial        = DEFAULT.initial,
    multiplier     = DEFAULT.multiplier,
    divider        = DEFAULT.divider,
    nBars          = DEFAULT.barsCount;

  var rand = new LehmerRand(initial, multiplier, divider);

  var values = d3.range(randNumCount).map(rand);
  appendHistogram('.uniform-destribution .histogram-container', values, nBars, size, margin);

  bindEventHandlers();
});


function bindEventHandlers() {
  $('.tabs-panel a').on('click', function(e) {
      var currentAttrValue = $(this).attr('href');
      $('.tabs-wrapper ' + currentAttrValue).fadeIn(400).siblings().hide();
      $(this).parent('li').addClass('active').siblings().removeClass('active');
      $('.tabs-wrapper ' + currentAttrValue + 'submit-btn').click();
      e.preventDefault();
  });
}
