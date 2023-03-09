// CHART
let popw, poph,pop;
const map_margin = {top: 0, right: 0, bottom: 0, left: 0};
const pop_width = document.getElementById('pop-container').getBoundingClientRect().width - map_margin.left - map_margin.right;
const pop_height = document.getElementById('pop-container').getBoundingClientRect().height - map_margin.top - map_margin.bottom;

let popsvg,popprojection,popland,popworld ;


d3.json("data/haidian-pop.json", function(json) {

    // width and height
    popw = window.innerWidth;
    poph = window.innerHeight;
    ;

    // container svg
    popsvg = d3.select ("#pop-container")
        .append ("svg")
        .attr ("width" , pop_width)
        .attr ("height" , pop_height)
    // .classed("chart-wrap", true)
    // .call(d3.behavior.zoom().on("zoom", function () {
    //   svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    // }))
    // .append("g")
    ;

    popprojection = d3.geo.mercator ()
        // .scale([2])
        .scale (130000)
        // .translate([200, 280])
        .translate ([w / 2 , h / 2])
        .center ([116.259 , 40.02]);
    popland = d3.geo.path ()
        .projection (popprojection);
    popworld = popsvg.selectAll ("path")
        .data (json.features)
        .enter ()
        .append ("path")
        .attr ("d" , popland)
        // .style("fill", "#000000")

        .style ("stroke-width" , 3)

        .style ('stroke' , "#ffffff")
        .style ("opacity" , 0)

        .transition ()
        .delay (1000)
        .duration (2000)
        .style ("opacity" , 1)
    ;
})