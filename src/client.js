var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var terrain = ctx.createImageData(1300, 800);

const data = terrain.data;

for (let x = 0; x < terrain.width * 4; x++) {
  const altitude = terrain.height / 2;

  for (let y = terrain.height; y > altitude; y--) {
    data[4 * (x + y * terrain.width) + 1] = 120;
    data[4 * (x + y * terrain.width) + 3] = 255;
  }
}

ctx.putImageData(terrain, 0, 0);
