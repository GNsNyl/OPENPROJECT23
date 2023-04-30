var surveydata = [
   [ {"type":"education","id": 0, "name": "elementary", "r": 0.05},
    {"id": 0, "name": "junior high", "r": 0.24 },
    {"id": 0, "name": "senior high", "r": 0.471},
    {"id": 0, "name": "technical school", "r": 0.168 },
    {"id": 0, "name": "college", "r": 0.071}],

    [{"type":"age","id": 1, "name": "18-20", "r": 0.054 },
    {"id": 1, "name": "21-30", "r": 0.51 },
    {"id": 1, "name":"31-40", "r": 0.371 },
    {"id": 1, "name":"41-45", "r": 0.065 }],

    [{"type":"salary rmb","id": 2, "name": "¥<2000", "r": 0.04 },
    {"id": 2, "name": "¥2000-3999", "r": 0.26 },
    {"id": 2, "name":"¥4000-5999", "r": 0.44 },
    {"id": 2, "name":"¥6000-7999", "r": 0.19 },
    {"id": 2, "name":"¥8000-9999", "r": 0.05 },
    {"id": 2, "name":"¥>10000", "r": 0.02 }],

   [{"type":"recreation","id": 3, "name": "video", "r": 0.363 },
    {"id": 3, "name": "video game", "r": 0.292 },
    {"id": 3, "name": "music", "r": 0.282 }],

    [{"type":"unpleasant","id": 4, "name": "discrimination", "r": 0.36 },
    {"id": 4, "name": "traffic accident", "r": 0.293 },
    {"id": 4, "name": "scolded by customer", "r": 0.257 }],

    [{"type":"rating","id": 5, "name": "coworker relation", "r": 0.81 },
    {"id": 5, "name": "flexible working time", "r": 0.76 },
    {"id": 5, "name": "working environment", "r": 0.74},
    {"id": 5, "name": "income and benefit", "r": 0.70},
    {"id": 5, "name": "promotion", "r": 0.65 },
    {"id": 5, "name": "social status", "r": 0.60 }],

    //   {"id": 6, "name": "coworker relation", "r": 6.5 },
    //  {"id": 6, "name": "flexible working hour", "r": 6.5 },
    //  {"id": 6, "name": "working environment", "r": 6.5 },
    // {"id": 6, "name": "income", "r": 6.5 },
    //  {"id": 6, "name": "social status", "r": 6.5 },
    [{"type":"seeking help","id": 6, "name": "media", "r": 0.3 },
    {"id": 6, "name": "internet", "r": 0.4 },
    {"id": 6, "name": "social group", "r": 0.13 },
    {"id": 6, "name": "family", "r": 0.29},
    {"id": 6, "name": "friend", "r": 0.35 },
    {"id": 6, "name": "company", "r": 0.62 }],

    [{"type":"confidence", "id": 7, "name": "confident", "r": 0.761 },
    {"id": 7, "name": "no increase", "r": 0.732 },
    {"id": 7, "name": "being replaced", "r": 0.8 }],

    [{"type":"demand gov", "id": 5, "name": "insurance", "r": 0.487 },
    {"id": 5, "name": "labor right", "r": 0.451 },
    {"id": 5, "name": "income security", "r": 0.348 }],

    [{"type":"demand company", "id": 8, "name": "higher salary", "r": 0.644 },
    {"id": 8, "name": "humane treatment", "r": 0.567 },
    {"id": 8, "name": "policy", "r": 0.244 }],

];

let demand_width = document.getElementById('demand').getBoundingClientRect().width;
let demand_height = document.getElementById('demand').getBoundingClientRect().height;
let nodedemand;
// var fill = d3.scale.category10();
let len=surveydata.length;
let spacing=demand_width/len;
var svgdemand = d3.select("#demand").append("svg")
    .attr("width", demand_width)
    .attr("height", demand_height);

nodedemand = svgdemand.selectAll("#demand>g")
    .data(surveydata)
    .enter()
    .append('g')
    .attr('id', function (datum,i){
        return 'no'+i
    })
    .attr("transform", function (datum,i){
     return 'translate('+spacing*i +',100)'});


for(let i=0;i<surveydata.length;i++){
    var eachArc=d3.select('#no'+i);

    for(let j=0;j<surveydata[i].length;j++){
     eachArc.append('text')
         .text(function (){
          return surveydata[i][0].type
         })
         .attr("transform",'translate(0,100)');
     var endAngle=surveydata[i][j].r*Math.PI;
        var arc = d3.arc()
            .innerRadius(spacing/5+6*j)
            .outerRadius(spacing/5+5+6*j)
            .startAngle(0)
            .endAngle(endAngle);
        eachArc.append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .attr("fill","#000000");

    }
 for(let j=0;j<surveydata[i].length;j++){

  eachArc.append('text')
      .text(function (){
       return surveydata[i][j].name
      })
      .attr("transform",'translate(5,'+1+(j+1)*10+')');}
}
function resize(){
demand_width = document.getElementById('demand').getBoundingClientRect().width;
    // let demand_height = document.getElementById('demand').getBoundingClientRect().height;

    svgdemand
        .attr("width", demand_width)
        .attr("height", demand_height);
 spacing=demand_width/len
 nodedemand.attr("transform", function (datum,i){
  return 'translate('+spacing*i +',100)'});
 // arc = d3.arc()
 //     .innerRadius(spacing/5+6*j)
 //     .outerRadius(spacing/5+5+6*j)
 //     .startAngle(0)
 //     .endAngle(endAngle);
 eachArc.append("path")
     .attr("class", "arc")
     .attr("d", arc)
     .attr("fill","#000000");
}

d3.select(window).on('resize', resize);

