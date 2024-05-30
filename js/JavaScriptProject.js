const canvas = createCanvas(1920 , 1088);
const gridSize = 64;

let currentDir = [1, 0];
const coveredTiles = [[5, 8], [4, 8], [3, 8]];
let applePosition = [21, 8];

function createCanvas(width, height) {
    let c = document.createElement('canvas');
    c.setAttribute('width', width);
    c.setAttribute('height', height);
    return c;
}

document.body.appendChild(canvas);

document.addEventListener('keydown', function(event) {
  let newDir = [0, 0];
  if(event.key === "ArrowUp") {
    newDir = [0, -1]
  } else if(event.key === "ArrowRight") {
    newDir = [1, 0]
  } else if(event.key === "ArrowDown") {
    newDir = [0, 1]
  } else if(event.key === "ArrowLeft") {
    newDir = [-1, 0]
  }

  if (coveredTiles[1][0] !== coveredTiles[0][0] + newDir[0] || coveredTiles[1][1] !== coveredTiles[0][1] + newDir[1]) {
    currentDir = newDir;
  }
});

function isValid(pos) {
  return isValidCoords(pos[0], pos[1]);
}
function isValidCoords(x, y) {
  for (let pos of coveredTiles) {
    if (pos[0] === x && pos[1] === y) {
      return false;
    }
  }
  return x >= 0 && y >= 0 && x < canvas.width / gridSize && y < canvas.height / gridSize;
}

function draw(canvas, position, colour, border) {
  canvas.fillStyle = border;
  canvas.fillRect(position[0] * gridSize, position[1] * gridSize, gridSize, gridSize);
  canvas.fillStyle = colour;
  canvas.fillRect(position[0] * gridSize + 8, position[1] * gridSize + 8, gridSize - 16, gridSize - 16);
}
setInterval(
  function() {
    let newPos = [coveredTiles[0][0] + currentDir[0], coveredTiles[0][1] + currentDir[1]];
    if (!isValid(newPos)) {
      alert(`Failed!\nScore: ${coveredTiles.length - 3}`);
      coveredTiles.length = 3;
      coveredTiles[0] = [5, 8];
      coveredTiles[1] = [4, 8];
      coveredTiles[2] = [3, 8];

      currentDir = [1, 0];
      applePosition = [21, 8];
      return;
    }
    coveredTiles.unshift(newPos);

    if (!isValid(applePosition)) {
      while(!isValid(applePosition)) {
        applePosition = [Math.floor(canvas.width / gridSize * Math.random()), Math.floor(canvas.height / gridSize * Math.random())]
      }
    } else {
      coveredTiles.pop();
    }
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#666666";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw(ctx, applePosition, '#AA4A44', '#8B0000');
    for (let v of coveredTiles) {
      draw(ctx, v, '#44AA4A', '#008B00');
    }
  },
  100
)
