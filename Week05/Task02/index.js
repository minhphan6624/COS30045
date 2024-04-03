var w = 700;
var h = 200;

var dataset = [14, 10, 12, 5, 13, 6, 9, 20, 25, 40];

var padding = 1;

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//Drawing the bars
svg.selectAll("rect")
    .data(dataset).enter()
    .append("rect")
    .attr("x", (d, i) => {
        return xScale(i);
    })
    .attr("y", (d) => {
        return h - yScale(d); //set base line at the bottom
    })
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => {
        return yScale(d);
    })
    .attr("fill", "lightblue");

//Drawing the labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d) => {
        return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => {
        return xScale(i) + xScale.bandwidth() / 2; //Position the text to be in the middle
    })
    .attr("y", (d) => {
        return h - yScale(d) + 14; //Text inside the column 
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "black");
;

//Transition 1
d3.select(".update").on("click", () => {

    let numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
        var newNum = Math.floor(Math.random() * 25);
        dataset.push(newNum);
    }

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i/dataset.length * 100;
        })
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("y", (d) => {
            return h - yScale(d); //set base line at the bottom
        })
        .attr("height", (d) => {
            return yScale(d);
        })
        .attr("fill", "lightblue");

    svg.selectAll("text")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i/dataset.length * 100;
        })
        .duration(1000)
        .ease(d3.easeBounceOut)
        .text((d) => {
            return d;
        })
        .attr("x", (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", (d) => {
            return h - yScale(d) + 14;
        });
});

//Transition 2
d3.select(".trans1").on("click", () => {

    let numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
        var newNum = Math.floor(Math.random() * 25);
        dataset.push(newNum);
    }

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i/dataset.length * 100;
        })
        .duration(1000)
        .ease(d3.easePolyInOut)
        .attr("y", (d) => {
            return h - yScale(d); //set base line at the bottom
        })
        .attr("height", (d) => {
            return yScale(d);
        })
        .attr("fill", "pink");

    svg.selectAll("text")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i/dataset.length * 100;
        })
        .duration(1000)
        .ease(d3.easePolyInOut)
        .text((d) => {
            return d;
        })
        .attr("x", (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", (d) => {
            return h - yScale(d) + 14;
        });
});

//Transition 2
d3.select(".trans2").on("click", () => {

    let numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
        var newNum = Math.floor(Math.random() * 25);
        dataset.push(newNum);
    }

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i * 100;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr("y", (d) => {
            return h - yScale(d); //set base line at the bottom
        })
        .attr("height", (d) => {
            return yScale(d);
        })
        .attr("fill", "green");

    svg.selectAll("text")
        .data(dataset)
        .transition()
        .delay((d, i) => {
            return i * 100;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text((d) => {
            return d;
        })
        .attr("x", (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", (d) => {
            return h - yScale(d) + 14;
        });
});
