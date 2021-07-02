const canvas = createCanvas(1920 , 1088);
const gridSize = 64;

var currentDir = [1, 0];
var currentSize = 4; //510
var coveredTiles = [vectorToIndex(5, 8)];
var applePosition = vectorToIndex(21, 8);

function createCanvas(width, height) {
    var c = document.createElement('canvas');
    c.setAttribute('width', width);
    c.setAttribute('height', height);
    return c;
}

function resize(arr, newSize, defaultValue) {
    while(newSize > arr.length)
        arr.push(defaultValue);
    arr.length = newSize;
}

document.body.appendChild(canvas);
document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowUp") {
        currentDir = [0, -1]
    }
    else if(event.key == "ArrowRight") {
        currentDir = [1, 0]
    }
    else if(event.key == "ArrowDown") {
        currentDir = [0, 1]
    }
    else if(event.key == "ArrowLeft") {
        currentDir = [-1, 0]
    }
});

setInterval(
  function() {
    var currentPos = coveredTiles[0];
    var newPos = currentPos + vectorToIndex(currentDir[0], currentDir[1]);

    if(!coveredTiles.includes(newPos) && !(Math.abs(indexToVector(currentPos)[0] - indexToVector(newPos)[0] + indexToVector(currentPos)[1] - indexToVector(newPos)[1]) > 1)) {
      coveredTiles.unshift(newPos);
      coveredTiles.length = currentSize;
    } else {
      alert("You Died!")
      coveredTiles = [vectorToIndex(5, 8)];
      currentDir = [1, 0]
      currentSize = 4;
      applePosition = vectorToIndex(21, 8)
    }

    if(coveredTiles.includes(applePosition)) {
      currentSize++
      while(coveredTiles.includes(applePosition)) {
        applePosition = Math.floor(canvas.width * canvas.height / gridSize / gridSize * Math.random())
      }
    }

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#666666";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < Math.floor(canvas.width / gridSize); x++) {
      for (let y = 0; y < Math.floor(canvas.height / gridSize); y++) {
        ctx.fillStyle = "#00000000"
        if(coveredTiles[0] == vectorToIndex(x, y)) {
          ctx.fillStyle = "#ffffff";
        } else if(coveredTiles.includes(vectorToIndex(x, y))) {
          ctx.fillStyle = "#88ff88";
        } else if(vectorToIndex(x, y) == applePosition) {
          ctx.fillStyle = "#ff8888";
        }
        ctx.fillRect(
          x * gridSize,
          y * gridSize,
          gridSize,
          gridSize
        );
      }
    }
  },
  100
);

function vectorToIndex(x, y) {
  return (x + y * Math.floor(canvas.width / gridSize))
}

function indexToVector(index) {
  index %= (canvas.width * canvas.height / gridSize / gridSize);
  return [
    Math.floor(index % (canvas.width / gridSize)),
    Math.floor(index / (canvas.width / gridSize))
  ];
}
