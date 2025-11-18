// 2048 Game - 完全重写版本
class Game2048 {
  constructor() {
    this.size = 4;
    this.grid = [];
    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem('bestScore') || '0');
    this.gameWon = false;
    this.gameOver = false;
    this.moved = false;
    
    this.initElements();
    this.init();
    this.setupEventListeners();
  }

  initElements() {
    this.gridContainer = document.getElementById('grid-container');
    this.scoreElement = document.getElementById('score');
    this.bestElement = document.getElementById('best');
    this.messageContainer = document.getElementById('message-container');
    this.messageText = document.getElementById('message-text');
    this.tryAgainButton = document.getElementById('try-again');
    this.continueButton = document.getElementById('continue-button');
    this.newGameButton = document.getElementById('new-game');
  }

  init() {
    this.grid = [];
    this.score = 0;
    this.gameWon = false;
    this.gameOver = false;
    this.updateScore();
    this.updateBestScore();
    
    // 初始化空格子
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = 0;
      }
    }
    
    // 添加两个初始方块
    this.addRandomTile();
    this.addRandomTile();
    
    this.renderGrid();
    this.hideMessage();
  }

  setupEventListeners() {
    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (this.gameOver && !this.gameWon) return;
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.move('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.move('down');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.move('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.move('right');
      }
    });

    // 触摸事件
    let touchStartX = 0;
    let touchStartY = 0;
    
    this.gridContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });
    
    this.gridContainer.addEventListener('touchend', (e) => {
      if (this.gameOver && !this.gameWon) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      
      // 最小滑动距离
      const minSwipe = 30;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > minSwipe) {
          if (dx > 0) {
            this.move('right');
          } else {
            this.move('left');
          }
        }
      } else {
        if (Math.abs(dy) > minSwipe) {
          if (dy > 0) {
            this.move('down');
          } else {
            this.move('up');
          }
        }
      }
    });

    // 按钮事件
    this.newGameButton.addEventListener('click', () => this.init());
    this.tryAgainButton.addEventListener('click', () => this.init());
    this.continueButton.addEventListener('click', () => this.hideMessage());
  }

  addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 0) {
          emptyCells.push({row: i, col: j});
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
      return true;
    }
    return false;
  }

  move(direction) {
    this.moved = false;
    const oldGrid = JSON.parse(JSON.stringify(this.grid));
    
    if (direction === 'left') {
      this.moveLeft();
    } else if (direction === 'right') {
      this.moveRight();
    } else if (direction === 'up') {
      this.moveUp();
    } else if (direction === 'down') {
      this.moveDown();
    }
    
    // 检查是否有移动发生
    if (this.gridChanged(oldGrid, this.grid)) {
      this.addRandomTile();
      this.renderGrid();
      
      if (this.checkWin() && !this.gameWon) {
        this.gameWon = true;
        this.showMessage('恭喜！你赢了！', true);
      } else if (this.checkGameOver()) {
        this.gameOver = true;
        this.showMessage('游戏结束！', false);
      }
    }
  }

  moveLeft() {
    for (let i = 0; i < this.size; i++) {
      let row = this.grid[i].filter(val => val !== 0);
      let newRow = [];
      
      for (let j = 0; j < row.length; j++) {
        if (j < row.length - 1 && row[j] === row[j + 1]) {
          newRow.push(row[j] * 2);
          this.score += row[j] * 2;
          j++; // 跳过下一个已合并的方块
        } else {
          newRow.push(row[j]);
        }
      }
      
      while (newRow.length < this.size) {
        newRow.push(0);
      }
      
      this.grid[i] = newRow;
    }
    this.updateScore();
  }

  moveRight() {
    for (let i = 0; i < this.size; i++) {
      let row = this.grid[i].filter(val => val !== 0);
      let newRow = [];
      
      for (let j = row.length - 1; j >= 0; j--) {
        if (j > 0 && row[j] === row[j - 1]) {
          newRow.unshift(row[j] * 2);
          this.score += row[j] * 2;
          j--; // 跳过下一个已合并的方块
        } else {
          newRow.unshift(row[j]);
        }
      }
      
      while (newRow.length < this.size) {
        newRow.unshift(0);
      }
      
      this.grid[i] = newRow;
    }
    this.updateScore();
  }

  moveUp() {
    for (let j = 0; j < this.size; j++) {
      let col = [];
      for (let i = 0; i < this.size; i++) {
        if (this.grid[i][j] !== 0) {
          col.push(this.grid[i][j]);
        }
      }
      
      let newCol = [];
      for (let i = 0; i < col.length; i++) {
        if (i < col.length - 1 && col[i] === col[i + 1]) {
          newCol.push(col[i] * 2);
          this.score += col[i] * 2;
          i++; // 跳过下一个已合并的方块
        } else {
          newCol.push(col[i]);
        }
      }
      
      while (newCol.length < this.size) {
        newCol.push(0);
      }
      
      for (let i = 0; i < this.size; i++) {
        this.grid[i][j] = newCol[i];
      }
    }
    this.updateScore();
  }

  moveDown() {
    for (let j = 0; j < this.size; j++) {
      let col = [];
      for (let i = 0; i < this.size; i++) {
        if (this.grid[i][j] !== 0) {
          col.push(this.grid[i][j]);
        }
      }
      
      let newCol = [];
      for (let i = col.length - 1; i >= 0; i--) {
        if (i > 0 && col[i] === col[i - 1]) {
          newCol.unshift(col[i] * 2);
          this.score += col[i] * 2;
          i--; // 跳过下一个已合并的方块
        } else {
          newCol.unshift(col[i]);
        }
      }
      
      while (newCol.length < this.size) {
        newCol.unshift(0);
      }
      
      for (let i = 0; i < this.size; i++) {
        this.grid[i][j] = newCol[i];
      }
    }
    this.updateScore();
  }

  gridChanged(grid1, grid2) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (grid1[i][j] !== grid2[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  checkWin() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 2048) {
          return true;
        }
      }
    }
    return false;
  }

  checkGameOver() {
    // 检查是否有空格
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 0) {
          return false;
        }
      }
    }
    
    // 检查是否可以水平合并
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        if (this.grid[i][j] === this.grid[i][j + 1]) {
          return false;
        }
      }
    }
    
    // 检查是否可以垂直合并
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === this.grid[i + 1][j]) {
          return false;
        }
      }
    }
    
    return true;
  }

  renderGrid() {
    this.gridContainer.innerHTML = '';
    
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        
        if (this.grid[i][j] !== 0) {
          const tile = document.createElement('div');
          tile.className = `tile tile-${this.grid[i][j]}`;
          tile.textContent = this.grid[i][j];
          cell.appendChild(tile);
        }
        
        this.gridContainer.appendChild(cell);
      }
    }
  }

  updateScore() {
    this.scoreElement.textContent = this.score;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('bestScore', this.bestScore.toString());
      this.updateBestScore();
    }
  }

  updateBestScore() {
    this.bestElement.textContent = this.bestScore;
  }

  showMessage(text, isWin) {
    this.messageText.textContent = text;
    this.messageContainer.classList.remove('hidden');
    if (isWin) {
      this.continueButton.classList.remove('hidden');
    } else {
      this.continueButton.classList.add('hidden');
    }
  }

  hideMessage() {
    this.messageContainer.classList.add('hidden');
  }
}

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
  new Game2048();
});
