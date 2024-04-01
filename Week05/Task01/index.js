        var w = 500;
        var h = 100;

        var dataset = [14, 10, 12, 5, 13, 6, 9, 20, 25]

        var padding = 1;

        var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length ))
                    .rangeRound([0,w])
                    .paddingInner(0.05);

        var yScale = d3.scaleLinear()
                    .domain(d3.max(dataset))
                    .rangeRound([0,w])
                    .paddingInner(0.05);

        var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

        //Drawing the bars
        svg.selectAll("rect")
            .data(dataset).enter()
            .append("rect")
            .attr("x", (d, i) => {
                return xScale(i) ;
            })
            .attr("y", (d) => {
                return (h - d * 4); //set base line at the bottom
            })
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => {
                return d * 4;
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
            .attr("x", (d, i) => {
                return i * (w / dataset.length) + (w / dataset.length) / 2 - 5; //Position the text to be in the middle
            })
            .attr("y", (d) => {
                return h - (d * 4) + 15; //Text inside the column 
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");
        ;