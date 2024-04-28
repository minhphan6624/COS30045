var w = 500;
var h = 300;

var projection = d3.geoMercator()
                .center([145, -36.5])
                .translate([w / 2, h / 2])
                .scale(2450);

//Define path generator
var path = d3.geoPath()
              .projection(projection);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

//Load in GeoJSON data
d3.json("LGA_VIC.json").then(function (json) {
    
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path);

});


