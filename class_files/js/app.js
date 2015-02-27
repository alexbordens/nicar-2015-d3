// Our JavaScript 
function drawChart(dataset) {
  // TODO: Define dimensions
  // Define a couple variables we will use to set the dimensions of our chart
  // Margins is an object that contains four attributes that we'll use to calculate
  // the svg element and inner element's height and width
  var margin = {top: 20, right: 25, bottom: 30, left: 50},
      width = 1024 - margin.right - margin.left,
      height = 600 - margin.bottom - margin.top;

  // TODO: Define scales
  // Use d3's min and max methods to find the extent of our data we plan to display on each axis
  var xMin = d3.min(dataset, function(d) { return d.volume; }),
      xMax = d3.max(dataset, function(d) { return d.volume; }),
      yMin = d3.min(dataset, function(d) { return d.strength; }),
      yMax = d3.max(dataset, function(d) { return d.strength; });

  // Create a variable to store a function we will use to create our x scale
  // We first need to access d3's scale generator and the type of scale we want
  // In this case a linear scale to go with our continuous data
  // We will then chain additional methods to better define our scale
  var xScale = d3.scale.linear()
  // The input domain represents the range of possible input values, or the min and max of that data on the x axis
  // In most cases the domain method takes an array of two values
      .domain([xMin, xMax])
  // The output range represents the range of possible output values, or more simply the size of our visualization
  // as it renders on the page in pixels. In this case we want to start at 0 and end at the width of chart as defined earlier
      .range([0, width]);
                    
  var yScale = d3.scale.linear()
      .domain([yMin, yMax])
      .range([height, 0]);

  // TODO: Create axes
  var xAxis = d3.svg.axis()
  // Remember when I said the xScale is a function, well it's also an object with information
  // that tells our axis how tall or wide it should draw and also how to label it
      .scale(xScale)
      .ticks(10); // How many labels do we want on our axis?
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
      .attr("class", function(d) { 
        if (d.type === 'soda'){
          console.log(d)
        }
        return "dot " + d.type })
      .attr("cx", function(d) { return xScale(d.volume); })
      .attr("cy", function(d) { return yScale(d.strength); })
      .attr("r", function(d) { return d.caffeine/35 })
      .on('mouseover', function(d) { 
        // TODO: tooltips
        var dot = d3.select(this);
        dot.classed("active", true);
        //this line re-appends the hovered circle, which sends it to the front of the others and makes it easier to see
        this.parentNode.appendChild(this);
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

