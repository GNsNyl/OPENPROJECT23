var bmargin  = {top: 20, right: 20, bottom: 100, left: 60},
    bwidth   = document.getElementById('restaurant-bar-container').getBoundingClientRect().width - bmargin.left - bmargin.right,
    bheight  = 600 - bmargin.top - bmargin.bottom,
    x       = d3.scale.ordinal().rangeRoundBands([0,bwidth], 0.5),
    y       = d3.scale.linear().range([bheight,0]);


// const count_button_chart = document.getElementsByName('rest-count');
// let button_chart_count_yr = '2022';
//
// function displayRestCount() {
//     for (let i = 0; i < count_button_chart.length; i++) {
//         if (count_button_chart[i].checked){
//             button_chart_count_yr = count_button_chart[i].value;
//             d3.selectAll("."+"button_chart_count_yr")
//                 .style(opacity,1);
//         }
//     }
// };





var xAxis   = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis   = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .innerTickSize(-bwidth)
    .outerTickSize(0)
    .tickPadding(10);

var barsvg     = d3.select("#restaurant-bar-container")
    .append("svg")
    .attr("width", bwidth + bmargin.left + bmargin.right)
    .attr("height", bheight + bmargin.top + bmargin.bottom)
    .append("g")
    .attr("transform", "translate(" + bmargin.left + "," + bmargin.top + ")");


d3.json("data/foodtype_both.json", function (data)
{
    x.domain(data.map(function (d)
    {
        return d.typecode;
    }));

    y.domain([0, d3.max(data, function (d)
    {
        return d["2022"];
    })]);

    barsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + bheight + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("dx", "-2.5em")
        .attr("dy", "-2.9em")
        .attr("y", 30)
        .attr("transform", "rotate(-90)" );

    barsvg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -10)
        .attr("dy", "0.8em")
        .attr("dx", "-.5em")

        .attr("text-anchor", "end")
        .text("Count");

    barsvg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .style("fill", "#36ff00")
        .attr("class","2022")
        .attr("x", function(d)
        {
            return x(d.typecode);
        })
        .attr("width", x.rangeBand()/10)
        .attr("y", function (d)
        {
            return y(d["2022"]);
        })
        .attr("height", function (d)
        {
            return bheight - y(d["2022"]);
        })

    barsvg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .style("fill", "#ffffff")
        .attr("class","2012")
        .attr("x", function(d)
        {
            return x(d.typecode)-x.rangeBand()/2;
        })
        .attr("width", x.rangeBand()/10)
        .attr("y", function (d)
        {
            return y(d["2012"]);
        })
        .attr("height", function (d)
        {
            return bheight - y(d["2012"]);
        })
    barsvg.append('svg:image')
        .attr('x',60)
        .attr('y',0)
        // .attr('width',500)
        .attr('height',500)
        .style('z-index',-2)
        .attr('xlink:href','./img/waimai_7.png')


})
