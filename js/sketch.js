// online version: https://editor.p5js.org/garciadelcastillo/sketches/rufe1_uVr

/**
 * p5.js will always execute setup() **once**
 * at the beginning of the execution loop.
 */
const gear_margin = {top: 0, right: 0, bottom: 0, left: 0};
const gear_width = document.getElementById('gear-container').getBoundingClientRect().width - gear_margin.left - gear_margin.right;
const gear_height = document.getElementById('gear-container').getBoundingClientRect().height - gear_margin.top - gear_margin.bottom;

// const cWidth=1200;
// const cHeight=900;
let nodeNum = 25;
const nodesbegin = new Array();

const nodes = new Array();
const nodesGear = new Array();

// const timer = millis()
const radius=50;
let speedRate=0.005;
const splitline=0.65;


function setup() {
  // Create a canvas element and add it to the document
  const cns=createCanvas(gear_width, gear_height);
  cns.parent("#gear-container");


  for (let i = 0; i < nodeNum; i++) {
    let x = 0.85*(60+i/nodeNum * gear_width);
    let y = random(0.3*gear_height,0.7*gear_height);
    ellipse(x, y, 10, 10);
    nodesbegin.push(createVector(x, y));
    nodes.push(createVector(x, y));

    nodesGear.push(createVector(x, y-300));

  };



  // console.log(nodesbegin[1].x)

  // draw lines
  // for (let i = 0; i < nodeNum - 1; i++) {
  //   let n = nodes[i];
  //   for (let j = i + 1; j < nodeNum; j++) {
  //     let m = nodes[j];
  //     if (dist(n.x, n.y, m.x, m.y) < 400) {
  //       line(n.x, n.y, m.x, m.y);
  //     }
  //
  //     // line(n.x, n.y, m.x, m.y);
  //   }
  // }
}

/**
 * p5.js will always execute draw() **continuously**
 * during the execution loop at roughly 60fps.
 */
function draw() {
  // let time = millis();

  // All drawing instructions will go to the default canvas
  // background(0, 0, 0);
  clear()

  // strokeWeight(0.2);
  // setLineDash([2.5, 5, 15, 5]); //another dashed line pattern
  // line(splitline*cWidth, cHeight, splitline*cWidth, 0);

  setLineDash([1,2]);

  for (let i = 0; i < nodeNum; i++) {
    nodes[i].x = nodesbegin[i].x + radius*Math.sin(speedRate*frameCount+i);
    nodes[i].y = nodesbegin[i].y + radius*Math.cos(speedRate*frameCount+i);
    ellipse(nodes[i].x, nodes[i].y, 2, 2);
    let l= i%3;
    if(l==0){
      stroke(255, 255, 255)
      strokeWeight(0.15);
      fill(0,0,0);

      ellipse(nodesbegin[i].x, nodesbegin[i].y+200, 2*radius, 2*radius);

      fill(255,255,255);
      ellipse(nodes[i].x, nodes[i].y+200, 2, 2);
      strokeWeight(0.15);
      line(nodes[i].x,nodes[i].y+200,nodes[i].x,nodes[i].y)
      // strokeWeight(0.01);

    };
    // ellipse(nodes[i].x, nodes[i].y+200, 2, 2);

    // nodes.push(createVector(x, y));
  }
  // console.log(nodes[1].x)
  const w=10;
  const h=10;

  // draw lines
  for (let i = 0; i < nodeNum - 1; i++) {
    let n = nodes[i];
    for (let j = i + 1; j < nodeNum; j++) {
      let m = nodes[j];
      if (dist(n.x, n.y, m.x, m.y) < 300) {
        strokeWeight(0.3);
         //another dashed line pattern

        line(n.x, n.y, m.x, m.y);
        stroke(255, 255, 255)




      }}};




  speedRate=0.01+mouseX/15000;


}

/**
 * A function to define what to do whenever the mouse
 * is pressed over the canvas.
 */
function mousePressed() {
  console.log(mouseX + " " + mouseY);
};
function setLineDash(list) {
  drawingContext.setLineDash(list);
};



