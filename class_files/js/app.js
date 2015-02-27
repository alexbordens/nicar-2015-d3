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

  // Create a variable to store a function we will use to translate our x data to the x axis of our chart
  // We first need to access d3's scale generator and the type of scale we want
  // In this case a linear scale to go with our continuous data
  // We will then chain additional methods to better define our scale
  var xScale = d3.scale.linear()
      .domain([xMin, xMax])
      .range([0, width]);
                    
  var yScale = d3.scale.linear()
      .domain([yMin, yMax])
      .range([height, 0]); // We need to flip the order of the values for the y or the data will be upside down

  // TODO: Create axes
  // Create a function to display the visual elements of our axis
  // We'll start with D3's basic axis function
  var xAxis = d3.svg.axis()
  // Remember when I said the xScale is a function, well it's also an object with information
  // that tells our axis how tall or wide it should draw and also how to label it
      .scale(xScale) // Tell our axis which scale we want
      .ticks(10); // How many labels do we want on our axis?

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(-width) // Draw our y axis lines all the way across our chart. The size needs to be negative since we flipped our chart to look right side up
      .ticks(7)
      .tickPadding(8) // Add a little spacing between the lines and labels
      .orient('left'); // Align our scale to the left

  // TODO: Create SVG
  // Create a variable for the svg element we are about to create
  // First we'll select the div on our page that we created as a target for our chart
  // Then nest an svg element inside
  var svg = d3.select("#chart-container").append('svg')
  // Add an element attribute to define the width of the svg; we want to add in our margins so the svg is at the maximum width
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom) // Same with the height
    .append("g") // Create a g element where we will group chart content
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Offset the g element to match our margins and reset our coordinate system to the group element

  // TODO: Draw axes
  // Create a g element to group eax axis
  svg.append("g")
    .attr("class", "x axis") // Add some CSS classes for styling selectors
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis); // Call our function to display axis elements

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
        if(d.type !== 'coffee' && d.type !== 'tea') {
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

