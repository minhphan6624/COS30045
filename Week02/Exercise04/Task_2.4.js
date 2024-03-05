const w = 500;
const h = 100;

var wombatSightings;

const padding = 1;

d3.csv("Task_2.4_Data.csv").then((data) => {
    console.log(data);
    wombatSightings = data;

    barChart(wombatSightings);
});

function barChart(dataset) {

    var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return (i * (w / dataset.length));
        })
        .attr("y", (d) => {
            return (h - (d.wombats * 4));
        })
        .attr("width", (d) => {
            return ((w / dataset.length) - padding);
        })
        .attr("height", (d) => {
            return d.wombats * 4;
        })
        .attr("fill", (d) => {
            if (d.wombats <= 5)
                return "darkblue";
            else if (d.wombats > 10)
                return "lightblue";
            else
                return "blue";
        });
}
