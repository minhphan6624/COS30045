var w = 700;
var h = 200;

var dataset = [14, 10, 12, 5, 13, 6, 9, 20, 25, 40];

// X axis scale
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

// Y Axis scale
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

// Create the SVG
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
    .attr("fill", "grey")
    // .on("mouseover", function () {
    //     d3.select(this)
    //         .transition()
    //         .duration(250)
    //         .attr("fill", "orange");
    // })
    // .on("mouseout", function () {
    //     d3.select(this)
    //         .transition()
    //         .duration(250)
    //         .attr("fill", "grey");
    // })
    // .append("title")
    // .text((d) => {
    //     return "This value is " + d;
    // })
    .on("mouseover", function(event, d) {

        d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", "orange");

        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
        
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "middle")
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("font-weight", "bold")
           .attr("fill", "black")
            .text(d);
    })
    .on("mouseout", function() {
        d3.select(this)
        .transition()
        .duration(250)
        .attr("fill", "grey");

        d3.select("#tooltip").remove();
   })
    ;

d3.select(".add").on("click", () => {
    // Add a new value to the set
    var newNum = Math.floor(Math.random() * 25);
    dataset.push(newNum);

    // Update scale domains
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Rebind the new data to the existing bars and labels, return the update selection
    var bars = svg.selectAll("rect").data(dataset);
    var labels = svg.selectAll("text").data(dataset);

    bars.enter()
        .append("rect")							//Creates a new rect
        .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
        .attr("y", function (d) {				//Sets the y value, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
        .attr("height", function (d) {			//Sets the height value, based on the updated yScale
            return yScale(d);
        })
        .attr("fill", "grey")
        .merge(bars)							//Merges the enter selection with the update selection
        .transition()							//Initiate a transition on all elements in the update selection (all rects)
        .duration(500)
        .attr("x", function (d, i) {				//Set new x position, based on the updated xScale
            return xScale(i);
        })
        .attr("y", function (d) {				//Set new y position, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
        .attr("height", function (d) {			//Set new height value, based on the updated yScale
            return yScale(d);
        })
    
    var bars = svg.selectAll("rect").data(dataset);

    bars
    // .on("mouseover", function () {
    //     d3.select(this)
    //         .transition()
    //         .duration(250)
    //         .attr("fill", "orange");
    // })
    // .on("mouseout", function () {
    //     d3.select(this)
    //         .transition()
    //         .duration(250)
    //         .attr("fill", "grey");
    // })
    // .append("title")
    // .text((d) => {
    //     return "This value is " + d;
    // })
    .on("mouseover", function(event, d) {

        d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", "orange");

        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
        
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "middle")
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("font-weight", "bold")
           .attr("fill", "black")
            .text(d);
    })
    .on("mouseout", function() {
        d3.select(this)
        .transition()
        .duration(250)
        .attr("fill", "grey");

        d3.select("#tooltip").remove();
   })
    ;

});

d3.select(".remove").on("click", () => {

    //Remove one value from dataset
    dataset.pop();

    //Update scale domains
    xScale.domain(d3.range(dataset.length));	//Recalibrate the x scale domain, given the new length of dataset
    yScale.domain([0, d3.max(dataset)]);	//Recalibrate the x scale domain, given the new length of dataset

    //Select…
    var bars = svg.selectAll("rect")			//Select all bars
        .data(dataset);							//Re-bind data to existing bars, return the 'update' selection
    //'bars' is now the update selection
    var labels = svg.selectAll("text")
        .data(dataset)

    //Enter…
    bars.enter()								//References the enter selection (a subset of the update selection)
        .append("rect")							//Creates a new rect
        .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
        .attr("y", (d) => {				//Sets the y value, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
        .attr("height", (d) => {			//Sets the height value, based on the updated yScale
            return yScale(d);
        })
        .attr("fill", "grey")
        .merge(bars)							//Merges the enter selection with the update selection
        .transition()							//Initiate a transition on all elements in the update selection (all rects)
        .duration(500)
        .attr("x", function (d, i) {				//Set new x position, based on the updated xScale
            return xScale(i);
        })
        .attr("y", function (d) {				//Set new y position, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
        .attr("height", function (d) {			//Set new height value, based on the updated yScale
            return yScale(d);
        });

    //Exit…
    bars.exit()				//References the exit selection (a subset of the update selection)
        .transition()		//Initiates a transition on the one element we're deleting
        .duration(500)
        .attr("x", w)		//Move past the right edge of the SVG
        .remove();   		//Deletes this element from the DOM once transition is complete

});


