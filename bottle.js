img = "";
Status = "";
objects = [];

function preload() {
    img = loadImage("bottle.png");
}

function setup() {
    canvas = createCanvas(700, 490);
    canvas.center();
    coco = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelloaded() {
    console.log("model is loaded");
    Status = true;
    coco.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 700, 490);

    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 42, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 50, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}