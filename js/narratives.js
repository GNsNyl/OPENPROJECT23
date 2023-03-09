
const nt_margin = {top: 0, right: 0, bottom: 0, left: 0};
const nt_width = document.getElementById('narratives-container').getBoundingClientRect().width - nt_margin.left - nt_margin.right;
const nt_height = document.getElementById('narratives-container').getBoundingClientRect().height - nt_margin.top - nt_margin.bottom;
var video;
var scaler = 10;
var preFrame;

// const nodesop = new Array();
// const nodesGear = new Array();

// const timer = millis()
// let speedRate=0.005;
// const splitline=0.65;


function setup() {
  // Create a canvas element and add it to the document
  const ntcns=createCanvas(nt_width, nt_height);
    ntcns.parent("#narratives-container");
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(nt_width / scaler, nt_height / scaler);
    video.hide();
    preFrame = createImage(video.width, video.height);

}


function draw() {
    video.loadPixels();
    preFrame.loadPixels();

    for (let y = 0; y < video.height; y++) {
        for (let x = 0; x < video.width; x++) {
            var index = (x + y * video.width) * 4
            let pr = preFrame.pixels[index + 0];
            let pg = preFrame.pixels[index + 1];
            let pb = preFrame.pixels[index + 2];
            let pbright = (pr + pg + pb) / 3;

            let r = video.pixels[index + 0];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];
            let bright = (r + g + b) / 3;

            var diff = dist(r, g, b, pr, pg, pb);
            if (diff<55){
                fill(bright);
            } else {
                // fill(255, 0, 0);
            }
            noStroke();
            rect(x * scaler, y * scaler, scaler, scaler);
        }
    }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);


}

/**
 * A function to define what to do whenever the mouse
 * is pressed over the canvas.
 */
//
function setLineDash(list) {
  drawingContext.setLineDash(list);
};



