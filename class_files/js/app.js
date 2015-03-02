// Our JavaScript 

// TODO: Setup document ready function
// TODO: Load data
// TODO: Create a chart function
// TODO: Define dimensions
// TODO: Define scales
// TODO: Create axes
// TODO: Create SVG
// TODO: Draw axes
// TODO: Draw dots
// TODO: Create mouse events
// TODO: Create tooltips



function drawChart(dataset) {

  var $tooltip = $('#tooltip');

  var margin = {top: 20, right: 25, bottom: 30, left: 50},
      width = 1024 - margin.right - margin.left,
      height = 600 - margin.bottom - margin.top;

  var xMin = d3.min(dataset, function(d) { return d['volume']; }), // Accessing the attribute, volume, via bracke notation
      xMax = d3.max(dataset, function(d) { return d['volume']; }),
      yMin = d3.min(dataset, function(d) { return d['strength']; }),
      yMax = d3.max(dataset, function(d) { return d['strength']; });

  var xScale = d3.scale.linear()
      .domain([xMin, xMax])
      .range([0, width]);
                    
  var yScale = d3.scale.linear()
      .domain([yMin, yMax])
      .range([height, 0]);

  
  var xAxis = d3.svg.axis()
      .scale(xScale)
      .ticks(10);

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(-width)
      .ticks(7)
      .tickPadding(8)
      .orient('left');

  var svg = d3.select('#chart-container').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  svg.selectAll('circle')
      .data(dataset)
      .enter()
    .append('circle')
      .attr('class', function(d) { 
        return "dot " + d['type'];
      })
      .attr('cx', function(d) { return xScale(d['volume']); })
      .attr('cy', function(d) { return yScale(d['strength']); })
      .attr('r', function(d) { return d['caffeine']/15 })
      .on('mouseover', function(d) { 

        var dot = d3.select(this);
        dot.classed('active', true);

        //this.parentNode.appendChild(this);

        $tooltip.find('.beverage').html(d['drink']);
        $tooltip.find('.volume').html("Volume: " + '<span>'+ d['volume'] + '</span>');
        $tooltip.find('.caffeine').html("Caffeine: " + '<span>'+ d['caffeine'] + '</span>');
        $tooltip.find('.strength').html("Strength: " + '<span>'+ d['strength'] + '</span>');

        return $tooltip.css('visibility', 'visible');
      })
      .on('mousemove', function(){

        var tipWidth = $tooltip.width();

        if (d3.event.offsetX > ((width - tipWidth))) {
          return $tooltip
            .css('top', (d3.event.pageY - 40) + 'px')
            .css('left',(d3.event.pageX - (tipWidth + 32)) + 'px');
        } else {
          return $tooltip
            .css('top', (d3.event.pageY - 40) + 'px')
            .css('left',(d3.event.pageX + 10) + 'px');
        }
      })
      .on('mouseout', function(d) {
        var dot = d3.select(this); 
        d3.select(this).classed("active", false);

        return $tooltip.css('visibility', 'hidden');
      });

}

$(document).ready(function() {

  d3.csv('data/caffeine.csv', function(error, data) {

    if(error) {
      console.log('BUSTED!'); 
    } else {
      var test = [];

      data.forEach(function(d) {
        d.volume = +d.volume;
        d.caffeine = +d.caffeine;
        d.strength = +d.strength;

        if(d.type !== 'tea' && d.type !== 'coffee') {
          test.push(d);
        }
      });

      drawChart(test);
    }
  });

});


