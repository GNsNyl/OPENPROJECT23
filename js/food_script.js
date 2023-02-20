// CHART
var w,h;
const map_margin = {top: 0, right: 0, bottom: 0, left: 0};
const map_width = document.getElementById('map').getBoundingClientRect().width - map_margin.left - map_margin.right;
const map_height = document.getElementById('map').getBoundingClientRect().height - map_margin.top - map_margin.bottom;

let svg,projection,land,world ;
var food_12;

var food3;

const button_chart = document.getElementsByName('rest-map');
let button_chart_value_yr = '2022';
let foodData="data/food2022.json";
const colorPalette=['#36ff00','#ffffff']
plotMap(foodData,colorPalette[0]);

function displayRestValue() {
    // console.log(foodData);

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

function plotMap(foodData,color){


    d3.json("data/beijing-municipality_1140 copy.geojson", function(json) {
  
  // width and height
  w = window.innerWidth;
  h = window.innerHeight;;
  
  // container svg
  svg = d3.select("#map")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              // .classed("chart-wrap", true)
              // .call(d3.behavior.zoom().on("zoom", function () {
              //   svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
              // }))
              // .append("g")
  ;
  
  // PLOT MAP

  projection = d3.geo.mercator()
      // .scale([2])
      .scale(130000)
      // .translate([200, 280])
      .translate([w/2, h/2])
      .center([116.259,40.02]);
  land = d3.geo.path()
      .projection(projection);
  world = svg.selectAll("path")
    .data(json.features)
    .enter()

    .append("path")
    .attr("d", land)
    // .style("fill", "#000000")

      .style("stroke-width", 0.6)

      .style('stroke', "#ffffff")
      .style("opacity", 0)

      .transition()
      .delay(1000)
      .duration(2000)
      .style("opacity", 1)
  ;


  // projection.fitExtent([[116.2202,40.0239], [116.1214,40.1159]]);

    // var food_12;
    // d3.json("data/2012_food.json", function(data) {
    //     food_12 = svg.selectAll("circle")
    //         .data(data.features)
    //         .enter()
    //         .append("circle")
    //         .style("opacity", 0.5)
    //
    //         .attr("r", function(d) {
    //             return 50
    //         })
    //         .attr("cx", function(d) {
    //             return projection([d.LON, d.LAT])[0];
    //         })
    //         .attr("cy", function(d) {
    //             return projection([d.LON, d.LAT])[1];
    //         })
    //         .style("fill", "none")
    //
    //         .style("stroke", "#ff7c7c")
    //         .style("stroke-width", 0.1)
    // });
  // food
  // var food;
  // d3.json("data/food.json", function(data) {
  //   food = svg.selectAll("circle")
  //     .data(data.features)
  //     .enter()
  //     .append("circle")
  //       // .attr("cx", function(d) {
  //       //   return projection([116.4, 40.02])[0];
  //       // })
  //       // .attr("cy", function(d) {
  //       //   return projection([116.4, 40.02])[1];
  //       // })
  //       .attr("cx", function(d) {
  //           return 800+100*Math.sin(2*Math.random()*Math.PI)
  //
  //       })
  //       .attr("cy", function(d) {
  //           return 500+100*Math.cos(2*Math.random()*Math.PI)
  //       })
  //       .style("opacity", 1)
  //       .attr("r", function(d) {
  //           return 5
  //       })
  //       .transition()
  //       .delay(6000)
  //       .duration(2000)
  //       // .style("opacity", 0)
  //       .style("fill", "#ffffff")
  //       // .style("opacity", 1)
  //       .attr("r", function(d) {
  //           return 0.2
  //       })
  //       .attr("cx", function(d) {
  //           return projection([d.LONGCJ02, d.LATGCJ02])[0];
  //       })
  //       .attr("cy", function(d) {
  //           return projection([d.LONGCJ02, d.LATGCJ02])[1];
  //       })
  //   ;
  // });

    d3.json(foodData, function(data) {
        food3 = svg.selectAll("#map > circle")
            .data(data.features)
            .enter()
            .append("circle")
            // .transition()
            //   .delay(3000)
            //   .duration(2000)
            .style("opacity", 0.5)
            //
            // .attr("r", function(d) {
            //     return 220
            // })
            .attr("cx", function(d) {
                return map_width/2;
            })
            .attr("cy", function(d) {
                return map_height/2;
            })

            .style("fill", "none")

            .style("stroke", color)
            .style("stroke-width", 0.1)


            .attr("r", function(d) {
                return 50
            })
            .transition()
            .delay(1000)
            .duration(2000)
            .attr("cx", function(d) {
                return projection([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return projection([d.LON, d.LAT])[1];
            })
        ;
    });


    // setTimeout(addTravel,8000)
    // addTravel()
    // function addTravel(){
    //     var travelLine;
    //     d3.json("img/csvjson.json", function(data) {
    //         travelLine = svg.selectAll("line")
    //
    //             .data(data.features)
    //             // .attr("d",line)
    //             .enter()
    //             .append("line")
    //             .style("stroke", "#ffffff")
    //             .style("stroke-width", 0.1)
    //             // .style("opacity", 0)
    //             //
    //             // // .attr("x1", function(d) {
    //             // //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // // })
    //             // // .attr("x2", function(d) {
    //             // //     return projection([116+d.order/13333, d.LATGCJ02])[0]
    //             // // })
    //             // // .attr("y1", function(d) {
    //             // //     return projection([d.LONGCJ02, 40.02])[1];
    //             // // })
    //             // // .attr("y2", function(d) {
    //             // //     return projection([d.LONGCJ02, 40.02])[1]+80*(0.5-Math.random());
    //             // // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .style("opacity", 1)
    //
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1]+50*(0.5-Math.random());
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .attr("x1", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([116+d.order/13333+0.2, d.LATGCJ02])[0]
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02+0.2])[1];
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             // .attr("x1", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([d.LONGCJ02+0.2, d.LATGCJ02])[0];
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, d.LATGCJ02+0.2])[1];
    //             // })
    //             // .transition()
    //             // .delay(2000)
    //             // .duration(4000)
    //             .attr("x1", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[0];
    //             })
    //             .attr("x2", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 50*(0.5-Math.random());
    //             })
    //             .attr("y1", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[1];
    //             })
    //             .attr("y2", function(d) {
    //                 return projection([d.LONGCJ02, d.LATGCJ02])[1]+50*(0.5-Math.random());
    //             })
    //             .style("opacity", 0)
    //
    //             // .attr("x1", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0];
    //             // })
    //             // .attr("x2", function(d) {
    //             //     return projection([116+d.order/13333, d.LATGCJ02])[0]
    //             // })
    //             // .attr("y1", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1];
    //             // })
    //             // .attr("y2", function(d) {
    //             //     return projection([d.LONGCJ02, 40.02])[1]+80*(0.5-Math.random());
    //             // })
    //             .transition()
    //             // .delay(2000)
    //             .duration(4000)
    //             .style("opacity", 1)
    //
    //
    //
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 1*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+1*(0.5-Math.random());
    //         //     })
    //         //     .transition()
    //         //     .delay(2000)
    //         //     .duration(4000)
    //         //
    //         //     .attr("x2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[0]+ 10*(0.5-Math.random());
    //         //     })
    //         //
    //         //     .attr("y2", function(d) {
    //         //         return projection([d.LONGCJ02, d.LATGCJ02])[1]+10*(0.5-Math.random());
    //         //     })
    //         // .attr("x1", function(d) {
    //         //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
    //         // })
    //         // .attr("x2", function(d) {
    //         //     return projection([116.4+3*(Math.random() - 0.3), 40.02+1.5*(Math.random() - 0.35)])[0];
    //         // })
    //         // .attr("y1", function(d) {
    //         //     return projection([116.4, 40.02])[1]
    //         // })
    //         // .attr("y2", function(d) {
    //         //     return projection([116.4, 40.02])[1]+10*(0.5-Math.random());
    //         // })
    //         ;});
    // }

  // RESPONSIVE WIDTH
  // window.onresize = function(){
  //   // new width
  //   var width = window.innerWidth;
  //   svg.attr("width", width);
  //   // new map
  //     projection = d3.geo.mercator().translate([width/2, h/2]);
  //   land.projection(newProjection);
  //   world.attr("d", land);
  //   food3.attr("cx", function(d) {
  //     return newProjection([d.LONGCJ02, d.LATGCJ02])[0];
  //   });
  // };



});


// window.onresize=function updateWindow(){
//     w = window.innerWidth || e.clientWidth || g.clientWidth;
//     h = window.innerHeight|| e.clientHeight|| g.clientHeight;
//
//     svg.attr("width", w).attr("height", h);
//     projection = d3.geo.mercator().translate([w/2, h/2]);
//     land.projection(projection);
//     world.attr("d", land);
//     // food3.attr("cx", function(d) {
//     //     return projection([d.LONGCJ02, d.LATGCJ02])[0];
//     // });
// };

}