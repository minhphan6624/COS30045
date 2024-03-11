function init() {
    const w = 500;
    const h = 100;

    var wombatSightings;

    const padding = 1;

    d3.csv("Task_2.4_Data.csv").then((data) => {
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings);
    });

    // Draw a bar chart based on a given dataset
    function barChart(dataset) {

        //Select the <p> element to create an svg
        var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

        //Create the bar chart
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
            .attr("fill", (d) => {   //Color dependent on data value: The bigger the number, the lighter the shade of blue
                if (d.wombats <= 5)
                    return "darkblue";
                else if (d.wombats > 10)
                    return "lightblue";
                else
                    return "blue";
            });
    }
}

window.onload = init();