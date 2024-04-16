function init() {
    const w = 300;
    const h = 300;

    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    var stack = d3.stack()
        .keys(["apples", "oranges", "grapes"])

    var series = stack(dataset);

    // Draw a svg
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Set up scales
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => {
            return d.apples + d.oranges + d.grapes;
        })])
        .range([0, h]);

    // Color picking function
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add a group for each row(category) of the data
    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", (d, i) => {
            return color(i);
        });

    // Bind the rectangles to the groups
    var rects = groups.selectAll("rect")
        .data((d) => {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return xScale(i);
        })
        .attr("y", (d) => {
            return h - yScale(d[1]); //Baseline of the category
        })
        .attr("width", (d, i) => {
            return xScale.bandwidth();
        })
        .attr("height", (d) => {
            return yScale(d[1]) - yScale(d[0]); //Topline - baseline
        });

}
window.onload = init();