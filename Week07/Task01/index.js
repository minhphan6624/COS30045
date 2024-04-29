function init() {
    const w = 600;
    const h = 300;

    const padding = 60;
    var dataset;

    d3.csv("Unemployment_78-95.csv", (d) => {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        }
    }).then((data) => {
        dataset = data;
        lineChart(dataset);
        areaChart(dataset);

    });

    //Draw a line chart for a given dataset
    function lineChart(dataset) {
        
        // Create the svg
        var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

        // console.table(dataset, ["date", "number"]);

        // Scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, (d) => { return d.date; }),
                d3.max(dataset, (d) => { return d.date; })]
            )
            .range([padding, w]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => { return d.number; })])
            .range([h - padding, 0]);

        // Drawing the axes
        var xAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);

        var yAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        // Create the line
        var line = d3.line()
            .x((d) => { return xScale(d.date) })
            .y((d) => { return yScale(d.number) });

        //Draw the line with data
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);

        // Draw the half mil unemployed line
        svg.append("line")
            .attr("class", "halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 5)
            .text("Half a million unemployed");

    }

    function areaChart(dataset) {
        // Create the svg
        var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

        // console.table(dataset, ["date", "number"]);

        // Scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, (d) => { return d.date; }),
                d3.max(dataset, (d) => { return d.date; })]
            )
            .range([padding, w]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => { return d.number; })])
            .range([h - padding, 0]);

        // Drawing the axes
        var xAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);

        var yAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        // Drawing the area
        var area = d3.area()
            .x((d) => { return xScale(d.date) })
            .y0((d) => { return yScale.range()[0] })
            .y1((d) => { return yScale(d.number) });

        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area);

        // Draw the half mil unemployed line
        svg.append("line")
            .attr("class", "halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 5)
            .text("Half a million unemployed");
    }
}

window.onload = init();