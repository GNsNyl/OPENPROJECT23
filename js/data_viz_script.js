RadarChart.defaultConfig.color = function() {};
RadarChart.defaultConfig.radius = 3;
RadarChart.defaultConfig.w = 200;
RadarChart.defaultConfig.h = 200;

var data_education = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "elementary", value: 0.05},
      {axis: "junior high", value: 0.24},
      {axis: "senior high", value: 0.471},
      {axis: "technical school", value: 0.168},
      {axis: "college", value: 0.071}
    ]
  },
];
var data_age = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "18-20", value: 0.054},
      {axis: "21-30", value: 0.51},
      {axis: "31-40", value: 0.371},
      {axis: "41-45", value: 0.065},
    ]
  },
];
var data_income = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "<2000", value: 0.04},
      {axis: "2000-3999", value: 0.26},
      {axis: "4000-5999", value: 0.44},
      {axis: "6000-7999", value: 0.19},
      {axis: "8000-9999", value: 0.05},
      {axis: ">10000", value: 0.02},

    ]
  },
];
var data_activity = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "video", value: 0.363},
      {axis: "game", value: 0.292},
      {axis: "music", value: 0.282},

    ]
  },
];
var data_unpleasant = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "discrimination", value: 0.36},
      {axis: "traffic accident", value: 0.293},
      {axis: "scolded by customer", value: 0.257},
    ]
  },
];
var data_rating = [
  {
    className: 'grade', // optional can be used for styling
    axes: [
      {axis: "coworker relation", value: 8.1},
      {axis: "flexible working time", value: 7.6},
      {axis: "working environment", value: 7.4},
      {axis: "income and benefit", value: 7.0},
      {axis: "promotion", value: 6.5},
      {axis: "social status", value: 6.0},

    ]
  },
  {
    className: 'grade_bj', // optional can be used for styling
    axes: [
      {axis: "coworker relation", value: 7.8},
      {axis: "flexible working time", value: 7.1},
      {axis: "working environment", value: 7.2},
      {axis: "income and benefit", value: 7.1},
      {axis: "promotion", value: 6.2},
      {axis: "social status", value: 5.4},

    ]
  },
];
var data_help = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "media", value: 0.3},
      {axis: "internet", value: 0.4},
      {axis: "social group", value: 0.13},
      {axis: "family", value: 0.29},
      {axis: "friend", value: 0.35},
      {axis: "company", value: 0.62},

    ]
  },
];

var data_confidence = [
  {
    className: 'percent', // optional can be used for styling
    axes: [
      {axis: "confident", value: 0.761},
      {axis: "no increase", value: 0.732},
      {axis: "replaced", value: 0.8},


    ]
  },
];

var data_asking = [
  {
    className: 'all', // optional can be used for styling
    axes: [
      {axis: "insurance", value: 0.487},
      {axis: "labor right", value: 0.451},
      {axis: "income security", value: 0.348},

    ]
  },
  {
    className: 'bj', // optional can be used for styling
    axes: [
      {axis: "insurance", value: 0.485},
      {axis: "labor right", value: 0.485},
      {axis: "income security", value: 0.362},


    ]
  },
];
var data_asking_employer = [
  {
    className: 'all', // optional can be used for styling
    axes: [
      {axis: "higher salary", value: 0.644},
      {axis: "humanitarian benefit", value: 0.567},
      {axis: "better policy", value: 0.244},
    ]
  },
  {
    className: 'bj', // optional can be used for styling
    axes: [
      {axis: "higher salary", value: 0.678},
      {axis: "humanitarian benefit", value: 0.66},
      {axis: "better policy", value: 0.234},
    ]
  },
];

dataList=[data_education,data_age,data_income,data_unpleasant,data_rating,data_help,data_confidence,data_activity,data_asking,data_asking_employer]
datanameList=["education","age","income","unpleasant","rating","resort to help","confidence level","activities in spare time","demand for government","demand for employer"]

let coords;
for (let i=0;i<dataList.length;i++){
  var chart = RadarChart.chart();
  var cfg = chart.config();

  var group = d3.select('body').append('g')
      .attr('width', cfg.w )
      .attr('height', cfg.h );
  var text = group
      .append("text")
      .attr("class","caption")
      .text(datanameList[i]);
  var svg = group.append('svg')
      .attr('width', cfg.w )
      .attr('height', cfg.h );
  // group.append(svg)// retrieve default config

      // .attr("cx",coords[0])
      // .attr("cy",coords[1])
  svg.append('g').classed('single', 1)
      .datum(dataList[i])
      .call(chart);
}

// render();