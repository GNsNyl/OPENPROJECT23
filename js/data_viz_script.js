
// GROUPS:  0 Web | 1: Adobe | 2: hybrid
var data = [
  {"id": 0, "name": "elementary", "r": 0.05},
  {"id": 0, "name": "junior high", "r": 0.24 },
  {"id": 0, "name": "senior high", "r": 0.471},
  {"id": 0, "name": "technical school", "r": 0.168 },
  {"id": 0, "name": "college", "r": 0.071},

  {"id": 1, "name": "18-20", "r": 0.054 },
  {"id": 1, "name": "21-30", "r": 0.51 },
  {"id": 1, "name":"31-40", "r": 0.371 },
  {"id": 1, "name":"41-45", "r": 0.065 },

  {"id": 2, "name": "¥<2000", "r": 0.04 },
  {"id": 2, "name": "¥2000-3999", "r": 0.26 },
  {"id": 2, "name":"¥4000-5999", "r": 0.44 },
  {"id": 2, "name":"¥6000-7999", "r": 0.19 },
  {"id": 2, "name":"¥8000-9999", "r": 0.05 },
  {"id": 2, "name":"¥>10000", "r": 0.02 },

  {"id": 3, "name": "video", "r": 0.363 },
  {"id": 3, "name": "video game", "r": 0.292 },
  {"id": 3, "name": "music", "r": 0.282 },

  {"id": 4, "name": "discrimination", "r": 0.36 },
  {"id": 4, "name": "traffic accident", "r": 0.293 },
  {"id": 4, "name": "scolded by customer", "r": 0.257 },

  {"id": 5, "name": "coworker relation", "r": 0.81 },
  {"id": 5, "name": "flexible working time", "r": 0.76 },
  {"id": 5, "name": "working environment", "r": 0.74},
  {"id": 5, "name": "income and benefit", "r": 0.70},
  {"id": 5, "name": "promotion", "r": 0.65 },
    {"id": 5, "name": "social status", "r": 0.60 },

  //   {"id": 6, "name": "coworker relation", "r": 6.5 },
  //  {"id": 6, "name": "flexible working hour", "r": 6.5 },
  //  {"id": 6, "name": "working environment", "r": 6.5 },
  // {"id": 6, "name": "income", "r": 6.5 },
  //  {"id": 6, "name": "social status", "r": 6.5 },
  {"id": 6, "name": "media", "r": 0.3 },
  {"id": 6, "name": "internet", "r": 0.4 },
  {"id": 6, "name": "social group", "r": 0.13 },
  {"id": 6, "name": "family", "r": 0.29},
  {"id": 6, "name": "friend", "r": 0.35 },
  {"id": 6, "name": "company", "r": 0.62 },

  {"id": 7, "name": "confident", "r": 0.761 },
  {"id": 7, "name": "no increase", "r": 0.732 },
  {"id": 7, "name": "being replaced", "r": 0.8 },

  {"id": 5, "name": "insurance", "r": 0.487 },
  {"id": 5, "name": "labor right", "r": 0.451 },
  {"id": 5, "name": "income security", "r": 0.348 },

  {"id": 8, "name": "higher salary", "r": 0.644 },
  {"id": 8, "name": "humane treatment", "r": 0.567 },
  {"id": 8, "name": "policy", "r": 0.244 },

];

// var width = window.innerWidth,
    // height = 750;
const demand_width = document.getElementById('demand').getBoundingClientRect().width;
const demand_height = document.getElementById('demand').getBoundingClientRect().height;

// var fill = d3.scale.category10();

var nodes = [], labels = [],
    foci = [{x: 0.05*demand_width, y: 500}, {x: 0.15*demand_width, y: 170}, {x: 0.3*demand_width, y: 500},
      {x: 0.3*demand_width, y: 170}, {x: 0.45*demand_width, y: 170},{x: 0.45*demand_width, y: 500}, {x: 0.57*demand_width, y: 170},
      {x: 0.6*demand_width, y: 500}, {x: 0.86*demand_width, y: 170}, {x: 0.9*demand_width, y: 500}];
// function dataViz(){


  var svgdemand = d3.select("#demand").append("svg")
      .attr("width", demand_width)
      .attr("height", demand_height)
  //.attr("domflag", '');

  var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .charge(-1000)
      //.chargeDistance(200)
      .gravity(0.1)
      .friction(0.8)
      .size([demand_width, demand_height])
      .on("tick", tick);

  //var node = svg.selectAll("circle");
  var nodedemand = svgdemand.selectAll("#demand>g");

  var counter = 0;

  function tick(e) {
    var k = 0.21 * e.alpha;

    // Push nodes toward their designated focus.
    nodes.forEach(function(o, i) {
      o.y += (foci[o.id].y - o.y) * k;
      o.x += (foci[o.id].x - o.x) * k;
    });

    nodedemand.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  }


  var timer = setInterval(function(){

    if (nodes.length > data.length-1) { clearInterval(timer); return;}

    var item = data[counter];
    nodes.push({id: item.id, r: item.r, name: item.name});
    force.start();
    // console.log(force.drag)

    nodedemand = nodedemand.data(nodes);

    var n = nodedemand.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style('cursor', 'pointer')
        .on('mousedown', function() {
          var sel = d3.select(this);
          sel.moveToFront();
        })
        .call(force.drag);

    n.append("circle")
        .attr("r",  function(d) { return 100*d.r; })
        .style("stroke", "none")
        .style("opacity", 0.5)

        // .style("stroke-dasharray",3)
        .style("fill", "#a2a2a2")
        .style("stroke-width", 6.61);


    // .style("fill", function(d) { return fill(d.id); })

    n.append("text")
        .text(function(d){
          return d.name;
        })
        .style("fill", "#ffffff")

        .style("font-size", function(d) {
          return 15;
        })
        .attr("dy", "0.35em");
    // +"~"+d.r
    // Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px"
    counter++;
  }, 100);


  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
};
  function resize() {
    force.size([demand_width, demand_height]);
    force.start();
  }

  d3.select(window).on('resize', resize);
// };

