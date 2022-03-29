var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var terrain = ctx.createImageData(1300, 800);

const data = terrain.data;

for (var i = 0; i < data.length; i += 1) {
  data[i] = 50;
}

ctx.putImageData(terrain, 0, 0);
