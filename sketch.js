var XYModel;
var canvas;
var slider1, slider2, slider3;
var T, J, B;
var button;
var toneDrone;
var number = 200;
var running = false;
var context;
// var info;

function overlay() {
	// el = document.getElementById("overlay");
	// el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function setup() {
    // Disable scrolling.
    // document.ontouchmove = function(e) {
    //     e.preventDefault();
    // }

    noStroke();

    Tone.Transport.start();
    Tone.Master.volume.value = -Infinity;

    // Tone.context.start();
    // Tone.Master.volume.rampTo(-1, 0.5);

    slider1 = createSlider(0.001, 1.0, 0.1, 0.001);
    slider2 = createSlider(-0.5, 0.5, 0.0, 0.01);
    slider3 = createSlider(-0.5, 0.5, 0.0, 0.01);
    slider4 = createSlider(0.0, 100.0, 0.0, 1.0);
    slider5 = createSlider(0.0, 360.0, 0.0, 1.0);
    button = createButton('Start');
		button.id("start");
    // info = createButton('Info');
    // info.mouseClicked(overlay);
    button.style("color: white; background-color: black; font-family: 'Roboto', sans-serif; width: 70px; border: solid #ffffff 1px;");
    // info.style("color: white; background-color: black; font-family: 'Roboto', sans-serif; width: 70px; border: solid #ffffff 1px;");


    // console.log(windowWidth);
    // var devicePixelRatio = window.devicePixelRatio || 1;
    // console.log(devicePixelRatio);
    colorMode(HSB);


    // if (windowWidth <= 960 && windowWidth !== 768) {
        // button.touchStarted(toggle);
        button.mouseClicked(toggle);


        let spacing = 30;
        let margin = windowHeight / 20;
        canvas = createCanvas(windowWidth - 170, windowHeight);
        XYModel = new XYModel(windowWidth * 0.8 * (2 / number), number, canvas);
        slider1.position(10, 40 + 1 * spacing - margin);
        slider2.position(10, 40 + 2 * spacing - margin);
        slider3.position(10, 40 + 3 * spacing - margin);
        slider4.position(10, 40 + 4 * spacing - margin);
        slider5.position(10, 40 + 5 * spacing - margin);
        button.position(10, 40 + 6 * spacing - margin)
        // info.position(windowWidth / 2 +30, windowHeight - 6 * spacing - margin)

        var x = (windowWidth - width);
        var y = (windowHeight - height) / 4;
        canvas.position(x, y);



    // } else if (windowWidth === 768) {
    //     // button.touchStarted(toggle);
    //     button.mouseClicked(toggle);


    //     // console.log("Hit");
    //     let spacing = windowHeight / 20;
    //     let margin = windowHeight / 20;
    //     canvas = createCanvas(windowWidth * 0.85, windowWidth * 0.85);
    //     XYModel = new XYModel(windowWidth * 0.85 * (1 / number), number, canvas);
    //     slider1.position(windowWidth / 4 - slider1.width * 0.5, windowHeight - 2 * spacing - margin);
    //     slider2.position(windowWidth / 4 - slider1.width * 0.5, windowHeight - 1 * spacing - margin);
    //     slider3.position(3 * windowWidth / 4 - slider1.width * 0.5, windowHeight - 2 * spacing - margin);
    //     slider4.position(3 * windowWidth / 4 - slider1.width * 0.5, windowHeight - 1 * spacing - margin);
    //     button.position(windowWidth / 2 - 80, windowHeight - 2 * spacing - margin)
    //     // info.position(windowWidth / 2 + 20, windowHeight - 2 * spacing - margin)

    //     var x = (windowWidth - width) / 2;
    //     var y = (windowHeight - height) / 3;
    //     canvas.position(x, y);

    // } else if (windowWidth >= 1300) {
    //     button.mouseClicked(toggle);

    //     let spacing = 40;
    //     let margin = 100;
    //     canvas = createCanvas(windowWidth * 0.4, windowWidth * 0.4);
    //     XYModel = new XYModel(windowWidth * 0.4 * (1 / number), number, canvas);
    //     slider1.position(slider1.width * 0.5, windowHeight / 2 - spacing);
    //     slider2.position(slider1.width * 0.5, windowHeight / 2);
    //     slider3.position(slider1.width * 0.5, windowHeight / 2 + spacing);
    //     slider4.position(slider1.width * 0.5, windowHeight / 2 + 2 * spacing);
    //     button.position(slider1.width * 0.5, windowHeight / 2 + 3 * spacing)
    //     // info.position(slider1.width + 30, windowHeight / 2 + 3 * spacing)

    //     var x = (windowWidth - width) / 2;
    //     var y = (windowHeight - height) / 2;
    //     canvas.position(x, y);

    // } else {
    //     button.mouseClicked(toggle);
    //     // console.log("Clled");
    //     let spacing = 40;
    //     let margin = 100
    //     canvas = createCanvas(windowWidth * 0.45, windowWidth * 0.45);
    //     XYModel = new XYModel(windowWidth * 0.45 * (1 / number), number, canvas);
    //     slider1.position(slider1.width * 0.5, windowHeight / 2 - spacing);
    //     slider2.position(slider1.width * 0.5, windowHeight / 2);
    //     slider3.position(slider1.width * 0.5, windowHeight / 2 + spacing);
    //     slider4.position(slider1.width * 0.5, windowHeight / 2 + 2 * spacing);
    //     button.position(slider1.width * 0.5, windowHeight / 2 + 3 * spacing)
    //     // info.position(slider1.width + 30, windowHeight / 2 + 3 * spacing)

    //     var x = (windowWidth - width) / 2;
    //     var y = (windowHeight - height) / 2;
    //     canvas.position(x, y);
    // }
    // noStroke();
    noFill();
    XYModel.randomInit();
    XYModel.draw();
		StartAudioContext(Tone.context, '#start').then(function(){
			//started
			// console.log("Context started");
		})

		toneDrone = new ToneDrone();
		toneDrone.connectComponents();

    // frameRate(30);

    var loop = new Tone.Loop(function(time) {
        //triggered every eighth note.
        play();
    }, "2n").start("+0.50");
}

function draw() {

    if (running) {

        fill(0, 0.4);
        rect(0, 0, width, height);
        XYModel.draw();

        XYModel.T = slider1.value();
        XYModel.J = slider2.value();
        XYModel.B = slider3.value();

        adjustDrone(slider1.value(), slider2.value(), slider3.value());
        changeColor(slider4.value());
        changeHue(slider5.value());
    }

}

function toggle() {
    if (running) {
        //Pause the system
        button.html("Start");
        Tone.Master.volume.rampTo(-Infinity, 0.5);

        running = false;
        console.log(running);
    } else if (!running) {
        //Start the system
        Tone.Master.volume.rampTo(-1, 0.5);


        button.html("Pause");
        running = true;
        console.log(running);


    }
}

function adjustDrone(val1, val2, val3) {
    toneDrone.synth.harmonicity.value = map(val2, -1.0, 1.0, 1.0, 10.0);
    toneDrone.synth.modulationIndex.value = map(val3, -1.0, 1.0, 1.0, 50.0);

    toneDrone.dist.distortion = map(val1, 0.001, 1.0, 0.10, 0.80);
    toneDrone.vibrato.depth.value = map(val2, -1.0, 1.0, 0.0, 1.0);

    toneDrone.vibrato.frequency.value = map(val3, -1.0, 1.0, 1.0, 500.0);
}

function changeColor(val) {
    XYModel.sat = val;
}
function changeHue(val) {
    XYModel.hue = val;
}

function update_temp() {
    let gTval = parseFloat(document.getElementById('temp').value);
    XYModel.T = gTval;


}

function update_field() {
    let gBval = parseFloat(document.getElementById('field').value);
    XYModel.B = gBval;
    console.log(gBval);

}

function update_K() {
    gJval = parseFloat(document.getElementById('correlation').value);
    XYModel.J = gJval;
    console.log(gJval);

}

function play() {
    toneDrone.play();
}
