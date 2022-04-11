var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var terrain = ctx.createImageData(1600, 800);

const data = terrain.data;
const width = terrain.width;
const height = terrain.height;
const altitude = height / 2;

const tankHeight = 12;
const tankWidth = 36;
const tankX = 200;
const tankY = altitude - tankHeight + 1;

const gunX = tankX + tankWidth / 2;
const gunY = tankY;

// draw terrain
for (let x = 0; x < width * 4; x++) {
  for (let y = height; y > altitude; y--) {
    data[4 * (x + y * width) + 1] = 120;
    data[4 * (x + y * width) + 3] = 255;
  }
}

// draw tank body
ctx.putImageData(terrain, 0, 0);
ctx.fillRect(tankX, tankY, tankWidth, tankHeight);

let gunAngle = -45;

function drawGun() {
  ctx.lineWidth = 2;
  ctx.fillStyle = "red";

  ctx.beginPath();
  ctx.translate(gunX, gunY);
  ctx.moveTo(0, 0);

  const radian = (gunAngle * Math.PI) / 180;

  ctx.rotate(radian);
  ctx.lineTo(15, 0);

  ctx.translate(-gunX, -gunY);

  ctx.stroke();

  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

drawGun();
updateAngleDisplay();

function updateAngleDisplay() {
  const angleDisplay = document.getElementById("angle");

  if (angleDisplay) {
    let displayAngle = Math.abs(gunAngle);

    if (displayAngle > 90) {
      displayAngle = 90 - (displayAngle - 90);
    }

    angleDisplay.innerText = `Angle: ${displayAngle}°`;
  }
}

function eraseGun() {
  ctx.clearRect(gunX - tankWidth / 2, gunY - 15, tankWidth, 15);
}

const handleLeftKeyPress = (event) => {
  eraseGun();
  gunAngle--;

  if (gunAngle < -180) {
    gunAngle = 0;
  }

  drawGun();
  updateAngleDisplay();
};

const handleRightKeyPress = (event) => {
  eraseGun();
  gunAngle++;

  if (gunAngle > 0) {
    gunAngle = -180;
  }

  drawGun();
  updateAngleDisplay();
};

const keyPressMap = {
  37: handleLeftKeyPress,
  39: handleRightKeyPress,
};

document.onkeydown = (event) => {
  if (keyPressMap[event.keyCode]) {
    keyPressMap[event.keyCode](event);
  }
};
