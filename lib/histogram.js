function appendHistogram(container, values, xDomain, nBars, size, margin) {

  var valuesCount = values.length;
  var x = d3.scale.linear()
      .domain(xDomain)
      .range([0, size.width]),
    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var data = d3.layout.histogram()
    .bins(x.ticks(nBars))(values)
    .map(function(a) {
      a.y /= valuesCount;
      return a;
    });

  var y = d3.scale.linear()
      .domain([0, 1.35 * d3.max(data, function(d) { return d.y; })])
      .range([size.height, 0]),
    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  $(container).empty();
  var svg = d3.select(container).append("svg")
    .attr("width", size.width + margin.left + margin.right)
    .attr("height", size.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
    .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  var barWidth = x(xDomain[0] + data[0].dx) - 1;
  bar.append("rect")
    .attr("x", 1)
    .attr("width", barWidth)
    .attr("height", function(d) { return size.height - y(d.y); });

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + size.height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);
}

