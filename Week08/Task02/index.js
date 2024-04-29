//Width and height
var w = 500;
var h = 300;

//Define map projection
var projection = d3.geoMercator()
                .center([145, -36.5])
                .translate([w / 2, h / 2])
                .scale(2450);

//Define path generator
var path = d3.geoPath()
                 .projection(projection);
                 
//Define quantize scale 
var color = d3.scaleQuantize()
                    .range(['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f']);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");


//Load in unemployment data
d3.csv("VIC_LGA_unemployment.csv").then((data) => {

    //Set input domain for color scale
    color.domain([
        d3.min(data, (d) => { return d.unemployed; }), 
        d3.max(data, (d) => { return d.unemployed; })
    ]);

    //Load in GeoJSON data
    d3.json("LGA_VIC.json").then((json) => {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {
    
            //Grab LGA and parsed unemployment value
            var dataLGA = data[i].LGA;
            var dataValue = parseInt(data[i].unemployed);
    
            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
            
                var jsonState = json.features[j].properties.LGA_name;
    
                if (dataLGA == jsonState) {
                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    break;
                }
            }		
        }

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .attr("fill", (d) => {
                   //Get data value
                   var value = d.properties.value;
                   
                   if (value) {
                       return color(value);
                   } else {
                       return "#ccc";
                   }
           });

        //Load in cities data
        d3.csv("VIC_city.csv").then((data) => {
            
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", (d) => {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 5)
                .style("fill", "red")
                .style("opacity", 0.75)
                .append("title")			//Simple tooltip
                .text(function(d) {
                    return d.place;
                });
           
                //Add labels for the cities
                svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("y", (d, i) => {
                    return projection([d.lon, d.lat])[1];
                })
                .style("z-index", 1)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "6px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text((d) => {
                    return d.place;
                });
        });
    });

});