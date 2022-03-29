var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var terrain = ctx.createImageData(1600, 800);

const data = terrain.data;
const width = terrain.width;
const height = terrain.height;
const altitude = height / 2;

const tankHeight = 12;
const tankWidth = 48;
const tankX = 200;
const tankY = altitude - tankHeight + 1;

const gunX = tankX + tankWidth / 2;
const gunY = tankY;

for (let x = 0; x < width * 4; x++) {
  for (let y = height; y > altitude; y--) {
    data[4 * (x + y * width) + 1] = 120;
    data[4 * (x + y * width) + 3] = 255;
  }
}

ctx.putImageData(terrain, 0, 0);
ctx.fillRect(tankX, tankY, tankWidth, tankHeight);
ctx.beginPath();
ctx.moveTo(gunX, gunY);
ctx.lineTo(gunX + 10, gunY - 10);
ctx.stroke();
