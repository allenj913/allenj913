let numberOfRectangles = hl.randomInt(3, 10);

let randomSaturation = hl.randomInt(100);

let randomBrightness = hl.randomInt(100);

let randomColors = [];
let backgroundColor;
let plexMono;

function preload() {
  plexMono = loadFont("fonts/IBMPlexMono-Regular.ttf");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noLoop();
  frameRate(60);
  pixelDensity(2);


  backgroundColor = hl.randomElement(["white", "black"]);


  for (let i = 0; i < numberOfRectangles; i++) {
    randomColors.push(
      color(hl.randomInt(0, 360), randomSaturation, randomBrightness)
    );
  }


  let traits = {
    "Number of Rectangles": numberOfRectangles,
    "Background Color": backgroundColor,
    "Color Saturation": randomSaturation,
    "Color Brightness": randomBrightness,
  };


  hl.token.setTraits(traits);


  hl.token.setName(`Example token #${hl.tx.tokenId}`);
  hl.token.setDescription(
    `This is an token generated as part of an example project for using hl-gen.js. It has ${numberOfRectangles} rectangles with random colors. The colors have a saturation of ${randomSaturation} and a brightness of ${randomBrightness}. The timestamp of the mint was ${hl.tx.timestamp}. The minting wallet address was ${hl.tx.walletAddress}`
  );
}


function draw() {
  noStroke();
  background(backgroundColor);

  let margin = width * 0.1;
  let gap = width * 0.01;
  let rectWidth =
    (width - margin * 2 - gap * (numberOfRectangles - 1)) / numberOfRectangles;


  for (let n = 0; n < numberOfRectangles; n++) {
    fill(randomColors[n]);
    rect(
      margin + rectWidth * n + gap * n,
      height * 0.1,
      rectWidth,
      height * 0.8
    );
  }


  let textColor = backgroundColor === "white" ? "black" : "white";
  fill(textColor);
  textFont(plexMono);
  textSize(width * 0.02);
  textAlign(CENTER, CENTER);

  text(`Minted by ${hl.tx.walletAddress}`, 0, 0, width, height * 0.1);

  text(`Token #${hl.tx.tokenId}`, 0, height * 0.9, width, height * 0.1);

  hl.token.capturePreview();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  switch (key) {
    case "s":
      saveCanvas();
      break;
    case "r":
      redraw();
      break;
  }
}
