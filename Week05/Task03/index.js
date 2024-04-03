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

d3.select(".add").on("click", () => {


    // Add a new value to the set
    var newNum = Math.floor(Math.random() * 25);
    dataset.push(newNum);

    // Update scale domains
    xScale.domain(d3.range(dataset.length));

    // Rebind the new data to the existing bars, return the update selection
    var bars = svg.selectAll("rect").data(dataset);


    bars.enter()							
        .append("rect")							//Creates a new rect
        .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
        .attr("y", function(d) {				//Sets the y value, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
        .attr("height", function(d) {			//Sets the height value, based on the updated yScale
            return yScale(d);
        })
        .attr("fill", "lightblue")
        .merge(bars)							//Merges the enter selection with the update selection
        .transition()							//Initiate a transition on all elements in the update selection (all rects)
        .duration(500)
        .attr("x", function(d, i) {				//Set new x position, based on the updated xScale
            return xScale(i);
        })
        .attr("y", function(d) {				//Set new y position, based on the updated yScale
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
        .attr("height", function(d) {			//Set new height value, based on the updated yScale
            return yScale(d);
        });

        //Update all labels

					svg.selectAll("text")
                    .data(dataset)
                    .transition()
                    .duration(500)
                    .text(function(d) {
                            return d;
                    })
                    .attr("x", function(d, i) {
                         return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                         return h - yScale(d) + 14;
                    });
});

d3.select(".remove").on("click", () => {

        //Remove one value from dataset
        dataset.shift();
                            
        //Update scale domains
        xScale.domain(d3.range(dataset.length));	//Recalibrate the x scale domain, given the new length of dataset

        //Select…
        var bars = svg.selectAll("rect")			//Select all bars
            .data(dataset);							//Re-bind data to existing bars, return the 'update' selection
                                                    //'bars' is now the update selection

        //Enter…
        bars.enter()								//References the enter selection (a subset of the update selection)
            .append("rect")							//Creates a new rect
            .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
            .attr("y", function(d) {				//Sets the y value, based on the updated yScale
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
            .attr("height", function(d) {			//Sets the height value, based on the updated yScale
                return yScale(d);
            })
            .attr("fill", function(d) {				//Sets the fill value
                return "rgb(0, 0, " + Math.round(d * 10) + ")";
            })
            .merge(bars)							//Merges the enter selection with the update selection
            .transition()							//Initiate a transition on all elements in the update selection (all rects)
            .duration(500)
            .attr("x", function(d, i) {				//Set new x position, based on the updated xScale
                return xScale(i);
            })
            .attr("y", function(d) {				//Set new y position, based on the updated yScale
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
            .attr("height", function(d) {			//Set new height value, based on the updated yScale
                return yScale(d);
            });

        //Exit…
        bars.exit()				//References the exit selection (a subset of the update selection)
            .transition()		//Initiates a transition on the one element we're deleting
            .duration(500)
            .attr("x", w)		//Move past the right edge of the SVG
            .remove();   		//Deletes this element from the DOM once transition is complete



        //Update all labels
        //
        //Exercise: Modify this code to remove the correct label each time!
        //
        svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(500)
        .text(function(d) {
                return d;
        })
        .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
                return h - yScale(d) + 14;
            });

});


