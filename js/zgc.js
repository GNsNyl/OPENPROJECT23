// CHART
var zgcw,zgch;
// const zgc_width = document.getElementById('zgc-container').getBoundingClientRect().width - map_margin.left - map_margin.right;
// const zgc_height = document.getElementById('zgc-container').getBoundingClientRect().height - map_margin.top - map_margin.bottom;

let zgcsvg,zgcprojection,zgcland,zgcworld ;
let zgcroadsvg,zgcroadland,zgcroadworld ;
let zgcbuildingsvg,zgcbuildingland,zgcbuildingworld ;
let zgcfoodsvg,zgcfoodland,zgcfoodworld, zgcfoodSignsvg,zgcfoodSign,zgcfoodtextsvg ;
let zgccountland, zgccountsvg, zgccountworld;

let zgclusvg,zgcluland,zgcluworld ;



// let zgcroad,zgcbuilding,zgcfood,zgclanduse;
// zgcroad=d3.json("data/zgc/zgcroads.geojson")
// zgcbuilding=d3.json("data/zgc/zgcbuilding.geojson")
//
// zgcfood=d3.json("data/zgc/zgcfood.geojson")
// zgclanduse=d3.json("data/zgc/zgclanduse.geojson")


// console.log(zgc)
d3.json("data/zgc/zgc.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    // container zgcsvg
    zgcsvg = d3.select("#zgc-container")
        .append("svg")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.319,39.97]);

    zgcland = d3.geo.path()
        .projection(zgcprojection);

    zgcworld = zgcsvg.selectAll("#zgc-container > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", zgcland)
        .style("stroke-width", 1)
        // .style("fill","#ffffff")
        .style('stroke', "#ffffff");

});


d3.json("data/zgc/zgcroads.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    // container zgcsvg
    zgcroadsvg = d3.select("#zgc-road-container")
        .append("svg")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.319,39.97]);

    zgcroadland = d3.geo.path()
        .projection(zgcprojection);

    zgcroadworld = zgcroadsvg.selectAll("#zgc-road-container > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", zgcroadland)
        .style("stroke-width", function(d){
            if(d.properties.fclass=="primary"){
                return 1
            }else if(d.properties.fclass=="secondary") {
                return 0.7
            }else if(d.properties.fclass=="tertiary") {
                return 0.4
            }else{
                return 0.2}
        })
        // .style("fill","#ffffff")
        .style('stroke', "#ffffff");

});

d3.json("data/zgc/zgcbuilding.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    // container zgcsvg
    zgcbuildingsvg = d3.select("#zgc-building-container")
        .append("svg")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.319,39.97]);

    zgcbuildingland = d3.geo.path()
        .projection(zgcprojection);

    zgcbuildingworld = zgcbuildingsvg.selectAll("#zgc-building-container > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", zgcbuildingland)
        .style("stroke-width",0)
        .style("fill","#2d2d2d")
        // .style('stroke', "none");

});


d3.json("data/zgc/count.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    // container zgcsvg
    zgccountsvg = d3.select("#zgc-count-container")
        .append("svg")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.319,39.97]);

    zgccountland = d3.geo.path()
        .projection(zgcprojection);

    zgccountworld = zgccountsvg.selectAll("#zgc-count-container > path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", zgccountland)
        .style("stroke-width",0)
        .style("opacity", function(d){
            return d.properties.Count_*0.03
        })
        .style("fill","#ffffff")
    // .style('stroke', "none");

});

d3.json("data/zgc/zgcfood.geojson", function(json) {

    // width and height
    zgcw = window.innerWidth;
    zgch = window.innerHeight;;

    var mouseoverfood = function(d) {

        d3.selectAll('.c'+d.typecode)
            .transition()
            .duration(150)
            .attr("r", 55);


        d3.select(this)
            .transition()
            .duration(50)
            .style("stroke-width", 0.8)

        // .style("stroke", "#ffffff")

        // .style("fill", "#36ff00")
    };

    var mouseleavefood = function(d) {
        d3.selectAll('.rest')
            .transition()
            .duration(150)
            .attr("r", 0.5);

        d3.select(this)
            // .style("stroke", "none")
            .transition()
            .duration(50)
            .style("stroke-width", 0.2)

    };

    zgcfoodsvg = d3.select("#zgc-food-container")
        .append("svg")
        .style("background","none")
        .attr("width", zgcw)
        .attr("height", zgch)
    ;
    // PLOT MAP
    zgcprojection = d3.geo.mercator()
        .scale(570000)
        .translate([zgcw/2, zgch/2])
        .center([116.319,39.97]);

    zgcfoodland = d3.geo.path()
        .projection(zgcprojection);

    zgcfoodworld = zgcfoodsvg.selectAll("#zgc-food-container > circle")
        .data(json.features)
        .enter()

        .append("circle")
        .attr("class", function(d) {
            return "rest"+" c"+String(d.properties.typecode).slice(0, 4)
        })
        .style("stroke-width",0.2)
        .style("fill","none")
        .style('stroke', "#ffffff")
        .attr("r", function(d) {
            return 0.5
        })
        // .transition()
        // .delay(1000)
        // .duration(2000)
        .attr("cx", function(d) {
            return zgcprojection([d.properties.LONWGS84, d.properties.LATWGS84])[0];
        })
        .attr("cy", function(d) {
            return zgcprojection([d.properties.LONWGS84, d.properties.LATWGS84])[1];
        });
        // .transition()
        // .delay(1000)
        // .duration(2000)
        // .attr("r", function(d) {
        //     return 50
        // })
    zgcfoodSignsvg = d3.select("#zgc-food-container")
        .append("svg")
        .style("margin-top","-30vh")
        .attr("width", zgcw)
        .attr("height", zgch/2)
    ;
    zgcfoodSign=zgcfoodSignsvg.selectAll("circle")
        // .data([{"typecode":"0501","name":"Food 餐饮"},{"typecode":"0502","name":"Chinese Food 中餐"},{"typecode":"0503","name":"Fast Food 快餐"},{"typecode":"0504","name":"Foreign Food 外国餐饮"},{"typecode":"0505","name":"Coffee 咖啡厅"},{"typecode":"0506","name":"Tea House 茶艺"},{"typecode":"0507","name":"Beverage 冷饮"},{"typecode":"0508","name":"Pastry 糕点"}])
        .data([{"id":"0","typecode":"0500","name":"Food"},{"id":"1","typecode":"0501","name":"Chinese Food"},{"id":"2","typecode":"0502","name":"Fast Food"},{"id":"3","typecode":"0503","name":"Foreign Food"},{"id":"4","typecode":"0505","name":"Coffee"},{"id":"5","typecode":"0506","name":"Tea House"},{"id":"6","typecode":"0507","name":"Beverage"},{"id":"7","typecode":"0508","name":"Pastry"}])
        .enter()

        .append("circle")
        .style("stroke-width",0.2)
        .style("fill","#000000")
        .style('stroke', "#ffffff")
        .attr("r", 5)

        .attr("cx", function(d) {
            return zgcw/2+70*(d.id-3);})
        .attr("cy", 10)
        .on("mouseover", mouseoverfood)
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleavefood);


    zgcfoodtextsvg=zgcfoodSignsvg.selectAll("text")
        // .data([{"typecode":"0501","name":"Food 餐饮"},{"typecode":"0502","name":"Chinese Food 中餐"},{"typecode":"0503","name":"Fast Food 快餐"},{"typecode":"0504","name":"Foreign Food 外国餐饮"},{"typecode":"0505","name":"Coffee 咖啡厅"},{"typecode":"0506","name":"Tea House 茶艺"},{"typecode":"0507","name":"Beverage 冷饮"},{"typecode":"0508","name":"Pastry 糕点"}])
        .data([{"id":"0","typecode":"0500","name":"Food"},{"id":"1","typecode":"0501","name":"Chinese Food"},{"id":"2","typecode":"0502","name":"Fast Food"},{"id":"3","typecode":"0503","name":"Foreign Food"},{"id":"4","typecode":"0505","name":"Coffee"},{"id":"5","typecode":"0506","name":"Tea House"},{"id":"6","typecode":"0507","name":"Beverage"},{"id":"7","typecode":"0508","name":"Pastry"}])

        .enter()
        // .append("g")
        .append("text")
        .attr("fill","#ffffff")
        // .attr('x', 0)
        // .attr('y', 30)

        .attr("y", 30)
        .attr("x", function(d) {
            return zgcw/2+70*(d.id-3);})
        // .attr("dy", "0.8em")
        // .attr("dx", "-.5em")
        // .attr("text-anchor", "end")
        .style('text-anchor', 'middle')
        // .attr('transform', 'rotate(90 0 0)')
        .text(function(d){
            return d.name
        })
        .on("mouseover", mouseoverfood)
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleavefood)
        ;



});


// [
//     0500
//     "中餐" 0501
//     快餐 0503
//     外国餐厅 0502
//     咖啡 0505
//     茶艺 0506
//     冷饮 0507
//     高点 0508； 0509
// ]


