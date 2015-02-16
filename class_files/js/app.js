// Our JavaScript 
function drawChart(dataset) {
	// @TODO: Define dimensions
	var margin = {top: 20, right: 25, bottom: 30, left: 25},
			width = 1024 - margin.right - margin.left,
			height = 400 - margin.bottom - margin.top;

	// @TODO: Define scales
	var xMin = d3.min(dataset, function(d) { return d.value1; }),
			xMax = d3.max(dataset, function(d) { return d.value1; }),
			yMin = d3.min(dataset, function(d) { return d.value2; }),
			yMax = d3.max(dataset, function(d) { return d.value2; });

	var xScale = d3.scale.linear()
			.domain([xMin, xMax])
			.range([0, width]);
                    
	var yScale = d3.scale.linear()
			.domain([yMin, yMax])
			.range([0, height]);

	// @TODO: Define axes

	// @TODO: Create SVG
	var svg = d3.select("#chart-container").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// @TODO: Create axes

	// @TODO: Draw dots
	svg.selectAll(".dot")
			.data(dataset)
		.enter().append("circle")
			.attr("id", function(d) { return d.place; })
			.attr("class", "dot")
			.attr("cx", function(d) { return xScale(d.value1); })
			.attr("cy", function(d) { return yScale(d.value2); })
			.attr("r", 5);
}

// @TODO: Setup document ready function
$(document).ready(function() {

	// @TODO: Load data
	d3.csv('data/test.csv', function(error, data) {
		if(error) {
			console.log('BUSTED!'); 
		} else {
			data.forEach(function(d) {
				d.value1 = +d.value1;
				d.value2 = +d.value2;
			});
			drawChart(data);
		}
	});

});


// Refactor for reuse
// function drawChart(options) {

// }

// function createScales(options) {
// 	var yMin = options.yMin ? options.yMin : d3.min(options.dataset, function(d) { return d['yKey']; }),
// 			yMax = options.yMax ? options.yMax : d3.max(options.dataset, function(d) { return d['yKey']; }),
// 			xMin = options.xMin ? options.xMin : d3.min(options.dataset, function(d) { return d['xKey']; }),
// 			xMax = options.xMax ? options.xMax : d3.max(options.dataset, function(d) { return d['xKey']; });
// }

// Ways to call our function
// drawChart({
// 		el: '#chart-container',
// 		yScaleExtent: [0,10],
// 		xScaleExtent: [200, 1600],
//		dataset: data,
//		xValue: value1,
//		yValue: value2
// 	}
// );

// buildChart(el, xValue, yValue, dataset, xScaleExtent, yScaleExtent) {
//
//}

