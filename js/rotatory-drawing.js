const cx=500;
const cy=390;

function setup() {
    // Create a canvas element and add it to the document
    createCanvas(1200, 860);
    // cns.parent("#gear-container");


}


function draw() {
    // let time = millis();

    // All drawing instructions will go to the default canvas
    // background(0, 0, 0);
    clear()


    translate(cx,cy)
    strokeWeight(0.2);

    for(let i=0; i<36;i++){
        rotate(Math.PI/ 18);
        line(0,0,cx,cy)

    }
    // setLineDash([2.5, 5, 15, 5]); //another dashed line pattern
    // line(splitline*cWidth, cHeight, splitline*cWidth, 0);
    // setLineDash([1,2]);


}

function mousePressed() {
    // console.log(mouseX + " " + mouseY);
};
function setLineDash(list) {
    drawingContext.setLineDash(list);
};


