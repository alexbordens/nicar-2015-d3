// Our JavaScript 
function drawChart(dataset) {
  // TODO: Define dimensions
  var margin = {top: 20, right: 25, bottom: 30, left: 50},
      width = 1024 - margin.right - margin.left,
      height = 600 - margin.bottom - margin.top;

  // TODO: Define scales
  var xMin = d3.min(dataset, function(d) { return d.volume; }),
      xMax = d3.max(dataset, function(d) { return d.volume; }),
      yMin = d3.min(dataset, function(d) { return d.strength; }),
      yMax = d3.max(dataset, function(d) { return d.strength; });

  var xScale = d3.scale.linear()
      .domain([xMin, xMax])
      .range([0, width]);
                    
  var yScale = d3.scale.linear()
      .domain([yMin, yMax])
      .range([height, 0]);

  // TODO: Create axes
  var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(6)
        .ticks(5);
        //.tickFormat(function(d){return years[d]});

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .ticks(7)
        .tickPadding(8)
        .orient("left");

  // TODO: Create SVG
  var svg = d3.select("#chart-container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // TODO: Draw axes
  svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  // TODO: Draw dots
  svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle")
      .attr("id", function(d) { return d.place; })
      .attr("class", function(d) { return "dot " + d.type })
      .attr("cx", function(d) { return xScale(d.volume); })
      .attr("cy", function(d) { return yScale(d.strength); })
      .attr("r", function(d) { return d.caffeine/35 })
      .on('mouseover', function(d) { 
        d3.select(this).classed("active", true);
        console.log(d)
      })
      .on('mouseout', function(d) { 
        d3.select(this).classed("active", false); 
      });

}

// TODO: Setup document ready function
$(document).ready(function() {

  var test = [];

  // TODO: Load data
  d3.csv('data/caffeine.csv', function(error, data) {
    if(error) {
      console.log('BUSTED!'); 
    } else {
      data.forEach(function(d) {
        d.volume = +d.volume;
        d.caffeine = +d.caffeine;
        d.strength = +d.strength;

        // Filtering data types looking for something possibly interesting
        // Can edit the csv once we decide on something and ditch all this
        // test array business
        if(d.type !== 'energydrink' && d.type !== 'shots') {
          test.push(d);
        }
      });
      drawChart(test);
    }
  });

});


// Refactor for reuse
// function drawChart(options) {

// }

// function createScales(options) {
//  var yMin = options.yMin ? options.yMin : d3.min(options.dataset, function(d) { return d['yKey']; }),
//      yMax = options.yMax ? options.yMax : d3.max(options.dataset, function(d) { return d['yKey']; }),
//      xMin = options.xMin ? options.xMin : d3.min(options.dataset, function(d) { return d['xKey']; }),
//      xMax = options.xMax ? options.xMax : d3.max(options.dataset, function(d) { return d['xKey']; });
// }

// Ways to call our function
// drawChart({
//    el: '#chart-container',
//    yScaleExtent: [0,10],
//    xScaleExtent: [200, 1600],
//    dataset: data,
//    xValue: value1,
//    yValue: value2
//  }
// );

// buildChart(el, xValue, yValue, dataset, xScaleExtent, yScaleExtent) {
//
//}

