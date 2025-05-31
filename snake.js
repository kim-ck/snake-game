const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
let apple = { x: 320, y: 320 };

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++count < 4) return;
  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0) snake.x = canvas.width - grid;
  if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  if (snake.y >= canvas.height) snake.y = 0;
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) snake.cells.pop();
  ctx.fillStyle = 'yellow';
  // 마름모(다이아몬드)로 먹이 그리기
  ctx.save();
  ctx.translate(apple.x + grid/2, apple.y + grid/2);
  ctx.rotate(Math.PI/4);
  ctx.fillRect(-grid/2 + 1, -grid/2 + 1, grid-2, grid-2);
  ctx.restore();
  ctx.fillStyle = 'green';
  snake.cells.forEach((cell, index) => {
    // 동그라미로 지렁이 그리기
    ctx.beginPath();
    ctx.arc(cell.x + grid/2, cell.y + grid/2, (grid-2)/2, 0, 2 * Math.PI);
    ctx.fill();
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
      }
    }
  });
}
document.addEventListener('keydown', function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(gameLoop);
