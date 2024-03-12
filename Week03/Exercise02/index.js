function init() {
    var padding = 10;

    var w = 600;
    var h = 200;

    var dataset = [
        [5, 20, 5],
        [500, 90, 8],
        [250, 50, 10],
        [100, 33, 5],
        [330, 95, 8],
        [410, 12, 4],
        [475, 44, 15],
        [25, 67, 5],
        [85, 21, 5],
        [220, 88, 10],
        [600, 35, 10],
        [700, 50, 10]
    ];

    var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h); //Creating the SVG

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d => { return d[0]; })), d3.max(dataset, (d => { return d[0]; }))])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([d3.max(dataset, (d => { return d[1]; })), d3.min(dataset, (d => { return d[1]; }))])
        .range([padding, h - padding]);


    svg.selectAll("circle")
        .data(dataset).enter()
        .append("circle")
        .attr("cx", (d, i) => { //x coordinate of the data point
            return xScale(d[0]);
        })
        .attr("cy", (d, i) => { //y coordinate of the data point
            return yScale(d[1]);
        })
        .attr("r", (d) => { //Radius
            return d[2];
        })
        .attr("fill", (d) => {
            return (d[0] < (w / 2)) ? "red" : "grey"; // Data points on the left half of the svg turns red
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) => {
            return d[0] + "," + d[1];
        })
        .attr("x", (d, i) => {
            return xScale(d[0]) - 5;
        })
        .attr("y", (d) => {
            return yScale(d[1]);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "blue");

}

window.onload = init();