//Width and height
var w = 500;
var h = 300;

var color = d3.scaleQuantize()  
            .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

var projection = d3.geoMercator()
                .center([145, -36.5])
                .translate([w / 2, h / 2])
                .scale(2450);

//Define path generator, using the Albers USA projection
var path = d3.geoPath()
              .projection(projection);

//Load in GeoJSON data
d3.json("LGA_VIC.json").then(function (json) {
    
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path);

});

d3.csv("VIC_LGA_unemployment.csv", () => {

})


