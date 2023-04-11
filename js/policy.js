
const policyWord=[
    {
        'rot': '3',
        'x':0.75,
        'y':0.4,
        'fill':'#ffffff',
        'border':'solid',
        'borderColor':'#36ff00',
        "font": "Geostar_Fill",
        "size": "10",
        "link":"there must be a daily rest of eleven consecutive hours per 24-hour period. must ensure weekly working time is limited by law or collective agreement. ",
    },{
        'rot': '3',
        'x':0.75,
        'y':0.4,
        'fill':'#ffffff',
        'border':'solid',
        'borderColor':'#36ff00',
        "font": "Geostar_Fill",
        "size": "10",
        "link":"free health assessments for workers. workers who risk health can be given guarantees.",
    },{
        'rot': '3',
        'x':0.75,
        'y':0.4,
        'fill':'#ffffff',
        'border':'solid',
        'borderColor':'#36ff00',
        "font": "Geostar_Fill",
        "size": "10",
        "link":'higher basic salary and rate for each order. '
    },{
        'rot': '3',
        'x':0.75,
        'y':0.4,
        'fill':'#ffffff',
        'border':'solid',
        'borderColor':'#36ff00',
        "font": "Geostar_Fill",
        "size": "10",
        "link":'Workers must have the chance to file an appeal after a customer complaint'
    },{
        'rot': '3',
        'x':0.75,
        'y':0.4,
        'fill':'#ffffff',
        'border':'solid',
        'borderColor':'#36ff00',
        "font": "Geostar_Fill",
        "size": "10",
        "link":'the platform shall have workshops or training sessions.'
    },
]


// const fontL=['Hnalei','Monoton','Press_Start_2P','Fredericka_the_Great','Libre_Barcode_39','Rampart_One','Rubik_80s_Fade','Zen_Kaku_Gothic_New']

// set the dimensions and margins of the graph
var plcmargin = {top: 0, right: 0, bottom: 0, left: 0},
    plcwidth = document.getElementById('policy-container').getBoundingClientRect().width - plcmargin.left - plcmargin.right,
    plcheight = document.getElementById('policy-container').getBoundingClientRect().height - plcmargin.top - plcmargin.bottom;
let plcCldsvg,plcsvg;
function draw(w,h,plcs) {
    plcCldsvg = d3.select ("#policy-container")
        .append ("svg")
        .attr ("width" , w + plcmargin.left + plcmargin.right)
        .attr ("height" , h + plcmargin.top + plcmargin.bottom);

    plcsvg = plcCldsvg.append ("g")
        .selectAll (".plc>text")
        .data (plcs)
        .enter ()
        .append ("text")
        // .style('width','500')
        .attr('stroke-width',function(d){
            return d.border
        })
        .attr('stroke','#ffffff')
        .style ("font-size" , function(d) {
            return (Math.random()+0.6)*50
        })
        .style ("fill" , function(d) {
            return d.tcolor
        })
        .style ("opacity" , 1)
        // .attr ("text-anchor" , "right")
        .attr("class", "plc")
        .attr ("display" , "block")
        .attr ("font-family" , 'Impact')
        .attr ("transform" , function(d,i) {
            return "translate(" + [15, 39*i] + ")rotate(" + d.rot * 0 + ")"
        })
        .text (function(d) {
            return d.link
        })
}

draw(plcwidth,plcheight,policyWord)

