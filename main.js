$(document).ready(function() {
  var DEFAULT = {
    initial:       27211.0,
    multiplier:    48271.0,
    divider:       2147483647.0,
    randNumCount:  1000000,
    barsCount:     20
  };

  var margin = {top: 10, right: 30, bottom: 30, left: 30},
      width  = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var randNumCount = DEFAULT.randNumCount,
    initial        = DEFAULT.initial,
    multiplier     = DEFAULT.multiplier,
    divider        = DEFAULT.divider,
    barsCount      = DEFAULT.barsCount;

  var rand = new LehmerRand(initial, multiplier, divider);

  var values = d3.range(randNumCount).map(rand);

  var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, width]),
    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var data = d3.layout.histogram()
    .bins(x.ticks(barsCount))(values)
    .map(function(a) {
      a.y /= randNumCount;
      return a;
    });

  var y = d3.scale.linear()
      .domain([0, 1.5 * d3.max(data, function(d) { return d.y; })])
      .range([height, 0]),
    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select(".histogram-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
    .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data[0].dx) - 1)
    .attr("height", function(d) { return height - y(d.y); });

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);
});

