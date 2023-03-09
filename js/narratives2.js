const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

////////// HAND COORDINATES /////////////
let xCord;
let yCord;
let xCord2;
let yCord2;

////////// COLOR /////////////
let r;
let g;
let b;

////////// SOUND /////////////
let carrier; // the oscillator we will hear
let modulator; //  the frequency of the carrier
let carrierBaseFreq = 60; // frequency modulation

// min/max ranges for modulator
let modMaxFreq = 10;
let modMinFreq = 0;
let modMaxDepth = 850;
let modMinDepth = -150;



////////// HANDTRACK.JS /////////////

const modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.8, // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function(status) {
        // console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        }
    });
}

function runDetection() {
    model.detect(video).then(predictions => {


        if (predictions[0]) {

            // console.log("predictions[0].score " + predictions[0]);

            let bboxX = predictions[0].bbox[0]+ predictions[0].bbox[2] / 2;
            let bboxY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
            xCord = bboxX;
            yCord = bboxY;

            if (predictions[1]) {
                let bboxX = predictions[1].bbox[0] + predictions[1].bbox[2] / 2;
                let bboxY = predictions[1].bbox[1] + predictions[1].bbox[3] / 2;
                xCord2 = bboxX;
                yCord2 = bboxY;

            } else {
                xCord2 = null;
                yCord2 = null;
            }

        } else {
            xCord = null;
            yCord = null;
            xCord2 = null;
            yCord2 = null;
        }

        // console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
});


////////// DRAW TIME BABY /////////////

function setup() {
    // createCanvas(640, 480);
    // startVideo();

    // video.hide();


    let cnv = createCanvas(640, 480, WEBGL);
    startVideo();

    //
    // carrier = new p5.Oscillator('sine'); //waveform shape
    // carrier.amp(0); // volume
    // carrier.freq(carrierBaseFreq); // set frequency
    // carrier.start(); // start oscillating
    //
    // // Waveform
    // modulator = new p5.Oscillator('sawtooth');
    // modulator.start();
    //
    //
    // // add the modulator's output to modulate the carrier's frequency
    // modulator.disconnect();
    // carrier.freq(modulator);

    // fade carrier in/out on mouseover / touch start
    // toggleAudio(cnv);

}

function draw() {
    // background(220, 5);
    // noStroke();

    let sendCord = false;


    // DRAW TEST
    if(xCord != null && yCord != null){

        fill(0,255,100);
        // textFont(fontRegular);
        ellipse(xCord2, yCord2, 20, 20);

        sendCord = true;

    }

    if(xCord2 != null && yCord2 != null){

        fill(100,250,255);
        ellipse(xCord2, yCord2, 20, 20);

        sendCord = true;
    }


    // // DRAW SOUND + 3D
    // if(xCord != null && yCord != null){
    //
    //     this.b = map(xCord,0,190,0,283);
    //     background(238, yCord, this.b);
    //
    //     for (let i = 0; i < height; i += 20) {
    //
    //
    //         strokeWeight(1);
    //         normalMaterial(); // For effect
    //         rotateZ(frameCount * 0.001);
    //         rotateX(frameCount * 0.0001);
    //         rotateY(frameCount * 0.0005);
    //
    //         //this.rh = map(xCord2,0,40,0,250);
    //         //this.lh = map(yCord2,0,100,0,30);
    //
    //         torus(this.b, 10);
    //     }
    //
    //     //mapping the freq range with mouseX or left hand
    //     let modFreq = map(xCord, 0, width, modMinFreq, modMaxFreq);
    //     modulator.freq(modFreq); // to activate? not sure.
    //
    //     //mapping the volume of the depth with mouse y or right hand
    //     let modDepth = map(yCord,0,height,modMaxDepth, modMinDepth);
    //     modulator.amp(modDepth);
    //
    // }
    sendCord = true;

}




// // sound controller
// function toggleAudio(cnv) {
//   cnv.mouseOver(function() {
//     carrier.amp(1.0, 0.01);
//   });
//   cnv.touchStarted(function() {
//     carrier.amp(1.0, 0.01);
//   });
//   cnv.mouseOut(function() {
//     carrier.amp(0.01, 1.0);
//   });
// }


// sound controller
// function toggleAudio(cnv) {
//
//     carrier.amp(1.0, 0.01);
//
// }