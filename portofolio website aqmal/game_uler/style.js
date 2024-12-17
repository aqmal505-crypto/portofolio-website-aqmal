const board = document.getElementById('game-board');
const boardSize = 20;

// Membuat grid
for (let i = 0; i < boardSize * boardSize; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  board.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

// Posisi awal ular dan makanan
let snake = [2, 1, 0]; // Index grid
let direction = 1; // Bergerak ke kanan
let food = Math.floor(Math.random() * cells.length);
let score = 0;

function draw() {
  cells.forEach(cell => cell.classList.remove('snake', 'food'));
  snake.forEach(index => cells[index].classList.add('snake'));
  cells[food].classList.add('food');
}

function move() {
  let head = snake[0] + direction;

  // Menembus dinding
  if (head < 0 && direction === -boardSize) {
    head = (boardSize - 1) * boardSize + (head % boardSize); // Dari atas ke bawah
  } else if (head >= boardSize * boardSize && direction === boardSize) {
    head = head % boardSize; // Dari bawah ke atas
  } else if (head % boardSize === 0 && direction === 1) {
    head = head - boardSize; // Dari kanan ke kiri
  } else if ((head + 1) % boardSize === 0 && direction === -1) {
    head = head + boardSize; // Dari kiri ke kanan
  }

  // Game Over - Jika ular menabrak tubuhnya sendiri
  if (cells[head].classList.contains('snake')) {
    alert(`Game Over! Skor Anda: ${score}`);
    location.reload();
  }

  snake.unshift(head);

  // Jika ular memakan makanan
  if (head === food) {
    score++;
    food = Math.floor(Math.random() * cells.length);
    while (cells[food].classList.contains('snake')) {
      food = Math.floor(Math.random() * cells.length);
    }
  } else {
    snake.pop();
  }

  draw();
}

// Kontrol ular
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction !== boardSize) direction = -boardSize;
  if (e.key === 'ArrowDown' && direction !== -boardSize) direction = boardSize;
  if (e.key === 'ArrowLeft' && direction !== 1) direction = -1;
  if (e.key === 'ArrowRight' && direction !== -1) direction = 1;
});

// Mulai game
draw();
setInterval(move, 200);
