// CHART
var popw,poph;
// const pop_width = document.getElementById('pop-container').getBoundingClientRect().width - map_margin.left - map_margin.right;
// const pop_height = document.getElementById('pop-container').getBoundingClientRect().height - map_margin.top - map_margin.bottom;

let popsvg,popprojection,popland,popworld ;
const pop=[
  {
    "name": "学院路街道",
    "id": 9585,
    "num": 226315
  },
  {
    "name": "马连洼街道",
    "id": 24015,
    "num": 119022
  },
  {
    "name": "北下关街道",
    "id": 24019,
    "num": 146366
  },
  {
    "name": "田村路街道",
    "id": 24021,
    "num": 108088
  },
  {
    "name": "羊坊店街道",
    "id": 24022,
    "num": 120302
  },
  {
    "name": "东升镇",
    "id": 24234,
    "num": 58151
  },
  {
    "name": "上地街道",
    "id": 24239,
    "num": 67139
  },
  {
    "name": "海淀街道",
    "id": 24242,
    "num": 123191
  },
  {
    "name": "八里庄街道",
    "id": 37199,
    "num": 133400
  },
  {
    "name": "清河街道",
    "id": 40501,
    "num": 147395
  },
  {
    "name": "燕园街道",
    "id": 40539,
    "num": 29779
  },
  {
    "name": "万柳镇",
    "id": 40570,
    "num": 2022
  },
  {
    "name": "中关村街道",
    "id": 40620,
    "num": 130672
  },
  {
    "name": "永定路街道",
    "id": 40635,
    "num": 90879
  },
  {
    "name": "紫竹院街道",
    "id": 40647,
    "num": 129367
  },
  {
    "name": "清华园街道",
    "id": 40651,
    "num": 56592
  },
  {
    "name": "甘家口街道",
    "id": 40676,
    "num": 117946
  },
  {
    "name": "花园路街道",
    "id": 40677,
    "num": 139362
  },
  {
    "name": "北太平庄街道",
    "id": 40678,
    "num": 163920
  },
  {
    "name": "上庄镇",
    "id": 41167,
    "num": 71554
  },
  {
    "name": "温泉镇",
    "id": 41174,
    "num": 69165
  },
  {
    "name": "四季青镇",
    "id": 41175,
    "num": 162700
  },
  {
    "name": "曙光街道",
    "id": 41181,
    "num": 86181
  },
  {
    "name": "万寿路街道",
    "id": 41195,
    "num": 121453
  },
  {
    "name": "苏家坨镇",
    "id": 41201,
    "num": 78235
  },
  {
    "name": "西北旺镇",
    "id": 41202,
    "num": 164795
  },
  {
    "name": "香山街道",
    "id": 41203,
    "num": 27614
  },
  {
    "name": "青龙桥街道",
    "id": 41205,
    "num": 84221
  },
  {
    "name": "西三旗街道",
    "id": 41222,
    "num": 157643
  }
];



// console.log(pop)
d3.json("data/haidian.geojson", function(json) {

  // create a tooltip
  // var Tooltip = d3.select("#tool").append('g')
  //     .style("opacity", 1);

  var TooltipDiv = d3.select("#tool")
      .append("div")
      .style("opacity", 1)
      .attr("id", "tooltip1")
      .attr("class", "tooltip")
      // .style("background-color", "white")
      .style("color", "white");


  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var obj = d.properties;
    for (let q=0;q<pop.length;q++){
      if(pop[q].id==obj.id){
        TooltipDiv
            .html(
                "<h1 style='text-align: left;'>"+obj.name+"</h1>" +
                "<p>Population: "+pop[q].num
            );
      }
    };
    TooltipDiv
        .transition()
        .duration(50)
        .style('left', d3.event.pageX +120+ 'px')
        .style('top', d3.event.pageY + 'px')
        .style("opacity", 1);
    // Tooltip
    //     .transition()
    //     .style('left', d3.event.pageX +120+ 'px')
    //     .style('top', d3.event.pageY + 'px')
    //     .style("opacity", 1)
    // ;

    d3.select(this)
        .transition()
        .duration(50)
        .style("stroke-width", 3)

        // .style("stroke", "#ffffff")

        // .style("fill", "#36ff00")
  };

  var mouseleave = function(d) {

    // Tooltip
    //     .transition()
    //     .duration(50)
    //     .style("opacity", 0);
    TooltipDiv
        .transition()
        .duration(50)
        .style("opacity", 0);

    d3.select(this)
        // .style("stroke", "none")
        .transition()
        .duration(50)
        .style("stroke-width", 1)

        // .style("stroke", "#000000")

    // .style("fill", "#ffffff")

        // .style("opacity", function(d){
        //   for(let z=0;z<pop.length;z++){
        //     if(pop[z].id==d.properties.id){
        //       let op=(pop[z].num-2022)/224293;
        //       return op
        //     }
        //   }
        // })
  };

  // width and height
  popw = window.innerWidth;
  poph = window.innerHeight;;

  // container popsvg
  popsvg = d3.select("#pop-container")
              .append("svg")
              .attr("width", popw)
              .attr("height", poph)
  ;
  // PLOT MAP

  popprojection = d3.geo.mercator()
      .scale(130000)
      .translate([popw/2, poph/2])
      .center([116.259,40.02]);


  popland = d3.geo.path()
      .projection(popprojection);

  popworld = popsvg.selectAll("#pop-container > path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", popland)
    .style("stroke-width", 1)
      .style("fill","#ffffff")
    .style('stroke', "#ffffff")
    .style("opacity", function(d){
      // console.log(d.properties.id)
      // console.log(pop[0].id)
      for(let z=0;z<pop.length;z++){
        if(pop[z].id==d.properties.id){
          let op=(pop[z].num-2022)/224293;
          return op
        }

            }

    })
      .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
    // .transition()
    // .delay(1000)
    // .duration(2000)
    // .style("opacity", 1)
;


});




