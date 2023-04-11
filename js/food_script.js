// CHART
var w,h;
let svg0,projection,land,world ;
var food3;
const button_chart = document.getElementsByName('rest-map');
let button_chart_value_yr = '2022';
let foodData="data/food2022.json";

function displayRestValue() {
    for (let i = 0; i < button_chart.length; i++) {
        if (button_chart[i].checked){
            button_chart_value_yr = button_chart[i].value;
            // console.log(button_chart_value_yr);
            foodData="data/food"+button_chart_value_yr+".json";
            // console.log(foodData);
            d3.selectAll("#map > *").remove();
            plotMap(foodData,colorPalette[i]);
        }
    }
};

d3.json("data/beijing-municipality_1140 copy.geojson", function(json) {
  // width and height
  w = window.innerWidth;
  h = window.innerHeight;
    svg0 = d3.select("#map")
          .append("svg")
          .attr("width", w)
          .attr("height", h);
  projection = d3.geo.mercator()
      .scale(130000)
      .translate([w/2, h/2])
      .center([116.259,40.02]);
  land = d3.geo.path()
      .projection(projection);
  world = svg0.selectAll(".world>path")
    .data(json.features)
    .enter()
    .append("path")
      .attr('class','world')
    .attr("d", land)
    .style("fill", "#ffffff")
      .style("stroke-width", 3)
      .style('stroke', "#000000")
      .style("opacity", 1);

    d3.json(foodData, function(data) {
        food3 = svg0.selectAll("#map > circle")
            .data(data.features)
            .enter()
            .append("circle")
            .style("opacity", 0.5)
            .style("fill", "none")
            .style("stroke", "#000000")
            .style("stroke-width", 0.1)
            .attr("r", 50)
            .attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            });
    });
// });
})


window.addEventListener('resize', function(){
    w = window.innerWidth;
    h = window.innerHeight;
    svg0.attr("width", w)
        .attr("height", h);
    projection.translate([w/2, h/2]);
    land.projection(projection);
    world.attr("d", land);
    food3.attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
        .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            });

})