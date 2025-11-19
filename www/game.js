// 2048 Game - 完全重写版本（支持移动动画）
class Game2048 {
  constructor() {
    this.size = 4;
    this.grid = [];
    this.tiles = {}; // 存储所有方块对象
    this.tileIdCounter = 0; // 方块ID计数器
    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem('bestScore') || '0');
    this.gameWon = false;
    this.gameOver = false;
    this.moved = false;
    this.isAnimating = false; // 动画进行标记
    
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
    this.tiles = {};
    this.tileIdCounter = 0;
    this.score = 0;
    this.gameWon = false;
    this.gameOver = false;
    this.isAnimating = false;
    this.updateScore();
    this.updateBestScore();
    
    // 初始化空格子
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = null;
      }
    }
    
    // 清空网格容器
    this.gridContainer.innerHTML = '';
    this.createGridCells();
    
    // 添加两个初始方块
    this.addRandomTile();
    this.addRandomTile();
    
    this.hideMessage();
  }

  // 创建背景网格格子
  createGridCells() {
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      this.gridContainer.appendChild(cell);
    }
  }

  setupEventListeners() {
    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (this.gameOver && !this.gameWon) return;
      if (this.isAnimating) return; // 动画进行时不响应
      
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
      if (this.isAnimating) return; // 动画进行时不响应
      
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
        if (this.grid[i][j] === null) {
          emptyCells.push({row: i, col: j});
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = this.createTile(value, randomCell.row, randomCell.col);
      this.grid[randomCell.row][randomCell.col] = tile;
      this.renderTile(tile, true); // true 表示是新方块，需要弹出动画
      return true;
    }
    return false;
  }

  // 创建方块对象
  createTile(value, row, col) {
    const tile = {
      id: this.tileIdCounter++,
      value: value,
      row: row,
      col: col,
      previousRow: row,
      previousCol: col,
      isNew: true,
      mergedFrom: null // 记录由哪两个方块合并而来
    };
    this.tiles[tile.id] = tile;
    return tile;
  }

  // 渲染单个方块
  renderTile(tile, isNew = false) {
    let element = document.getElementById(`tile-${tile.id}`);
    
    if (!element) {
      element = document.createElement('div');
      element.id = `tile-${tile.id}`;
      element.className = `tile tile-${tile.value} tile-position-${tile.row}-${tile.col}`;
      element.textContent = tile.value;
      this.gridContainer.appendChild(element);
      
      if (isNew) {
        // 新方块添加弹出动画类
        element.classList.add('tile-new');
        // 动画结束后移除类
        setTimeout(() => {
          element.classList.remove('tile-new');
        }, 300); // 匹配 CSS animation 时间
      }
    } else {
      // 更新现有方块的位置和值
      element.className = `tile tile-${tile.value} tile-position-${tile.row}-${tile.col}`;
      element.textContent = tile.value;
      
      if (isNew) {
        // 合并产生的新方块添加弹出动画
        element.classList.add('tile-new');
        setTimeout(() => {
          element.classList.remove('tile-new');
        }, 300); // 匹配 CSS animation 时间
      }
    }
  }

  move(direction) {
    if (this.isAnimating) return;
    
    // 保存移动前的位置
    this.prepareTilesForMove();
    
    // 执行移动逻辑
    let moved = false;
    if (direction === 'left') {
      moved = this.moveLeft();
    } else if (direction === 'right') {
      moved = this.moveRight();
    } else if (direction === 'up') {
      moved = this.moveUp();
    } else if (direction === 'down') {
      moved = this.moveDown();
    }
    
    // 如果有移动发生
    if (moved) {
      this.isAnimating = true;
      
      // 先移动方块
      this.animateTiles();
      
      // 动画完成后添加新方块并检查游戏状态
      setTimeout(() => {
        this.addRandomTile();
        this.isAnimating = false;
        
        if (this.checkWin() && !this.gameWon) {
          this.gameWon = true;
          this.showMessage('恭喜！你赢了！', true);
        } else if (this.checkGameOver()) {
          this.gameOver = true;
          this.showMessage('游戏结束！', false);
        }
      }, 160); // 略微大于 transition 时间 (150ms)，确保移动完成
    }
  }

  // 准备方块移动（保存当前位置）
  prepareTilesForMove() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const tile = this.grid[i][j];
        if (tile) {
          tile.previousRow = tile.row;
          tile.previousCol = tile.col;
          tile.isNew = false;
        }
      }
    }
  }

  // 执行方块动画
  animateTiles() {
    // 找出所有需要删除的方块（被合并的方块）和新合并的方块
    const tilesToRemove = [];
    const mergedTiles = [];
    
    for (let tileId in this.tiles) {
      const tile = this.tiles[tileId];
      if (tile.mergedFrom === true) {
        // 这是被合并掉的旧方块
        tilesToRemove.push(tileId);
      }
    }
    
    // 渲染所有方块的新位置（包括被合并的方块移动到目标位置）
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const tile = this.grid[i][j];
        if (tile) {
          const isMerged = tile.mergedFrom && Array.isArray(tile.mergedFrom);
          if (isMerged) {
            mergedTiles.push(tile);
          } else {
            this.renderTile(tile, false);
          }
        }
      }
    }
    
    // 等待移动动画完成后，删除被合并的方块并显示新方块
    setTimeout(() => {
      // 删除被合并的旧方块
      tilesToRemove.forEach(tileId => {
        const element = document.getElementById(`tile-${tileId}`);
        if (element) {
          element.remove();
        }
        delete this.tiles[tileId];
      });
      
      // 渲染新合并的方块（带弹出动画）
      mergedTiles.forEach(tile => {
        this.renderTile(tile, true);
      });
    }, 160); // 略微大于 transition 时间
  }

  moveLeft() {
    let moved = false;
    
    for (let i = 0; i < this.size; i++) {
      // 获取该行的所有非空方块
      let tiles = [];
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j]) {
          tiles.push(this.grid[i][j]);
        }
      }
      
      // 清空该行
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = null;
      }
      
      // 处理合并和移动
      let targetCol = 0;
      for (let k = 0; k < tiles.length; k++) {
        const currentTile = tiles[k];
        
        if (k < tiles.length - 1 && currentTile.value === tiles[k + 1].value) {
          // 合并
          const mergedTile = this.createTile(currentTile.value * 2, i, targetCol);
          mergedTile.mergedFrom = [currentTile.id, tiles[k + 1].id];
          currentTile.mergedFrom = true;
          tiles[k + 1].mergedFrom = true;
          
          this.grid[i][targetCol] = mergedTile;
          this.score += mergedTile.value;
          targetCol++;
          k++; // 跳过下一个已合并的方块
          moved = true;
        } else {
          // 移动
          if (currentTile.col !== targetCol || currentTile.row !== i) {
            moved = true;
          }
          currentTile.row = i;
          currentTile.col = targetCol;
          this.grid[i][targetCol] = currentTile;
          targetCol++;
        }
      }
    }
    
    this.updateScore();
    return moved;
  }

  moveRight() {
    let moved = false;
    
    for (let i = 0; i < this.size; i++) {
      // 获取该行的所有非空方块
      let tiles = [];
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j]) {
          tiles.push(this.grid[i][j]);
        }
      }
      
      // 清空该行
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = null;
      }
      
      // 从右向左处理
      let targetCol = this.size - 1;
      for (let k = tiles.length - 1; k >= 0; k--) {
        const currentTile = tiles[k];
        
        if (k > 0 && currentTile.value === tiles[k - 1].value) {
          // 合并
          const mergedTile = this.createTile(currentTile.value * 2, i, targetCol);
          mergedTile.mergedFrom = [currentTile.id, tiles[k - 1].id];
          currentTile.mergedFrom = true;
          tiles[k - 1].mergedFrom = true;
          
          this.grid[i][targetCol] = mergedTile;
          this.score += mergedTile.value;
          targetCol--;
          k--; // 跳过下一个已合并的方块
          moved = true;
        } else {
          // 移动
          if (currentTile.col !== targetCol || currentTile.row !== i) {
            moved = true;
          }
          currentTile.row = i;
          currentTile.col = targetCol;
          this.grid[i][targetCol] = currentTile;
          targetCol--;
        }
      }
    }
    
    this.updateScore();
    return moved;
  }

  moveUp() {
    let moved = false;
    
    for (let j = 0; j < this.size; j++) {
      // 获取该列的所有非空方块
      let tiles = [];
      for (let i = 0; i < this.size; i++) {
        if (this.grid[i][j]) {
          tiles.push(this.grid[i][j]);
        }
      }
      
      // 清空该列
      for (let i = 0; i < this.size; i++) {
        this.grid[i][j] = null;
      }
      
      // 处理合并和移动
      let targetRow = 0;
      for (let k = 0; k < tiles.length; k++) {
        const currentTile = tiles[k];
        
        if (k < tiles.length - 1 && currentTile.value === tiles[k + 1].value) {
          // 合并
          const mergedTile = this.createTile(currentTile.value * 2, targetRow, j);
          mergedTile.mergedFrom = [currentTile.id, tiles[k + 1].id];
          currentTile.mergedFrom = true;
          tiles[k + 1].mergedFrom = true;
          
          this.grid[targetRow][j] = mergedTile;
          this.score += mergedTile.value;
          targetRow++;
          k++; // 跳过下一个已合并的方块
          moved = true;
        } else {
          // 移动
          if (currentTile.row !== targetRow || currentTile.col !== j) {
            moved = true;
          }
          currentTile.row = targetRow;
          currentTile.col = j;
          this.grid[targetRow][j] = currentTile;
          targetRow++;
        }
      }
    }
    
    this.updateScore();
    return moved;
  }

  moveDown() {
    let moved = false;
    
    for (let j = 0; j < this.size; j++) {
      // 获取该列的所有非空方块
      let tiles = [];
      for (let i = 0; i < this.size; i++) {
        if (this.grid[i][j]) {
          tiles.push(this.grid[i][j]);
        }
      }
      
      // 清空该列
      for (let i = 0; i < this.size; i++) {
        this.grid[i][j] = null;
      }
      
      // 从下向上处理
      let targetRow = this.size - 1;
      for (let k = tiles.length - 1; k >= 0; k--) {
        const currentTile = tiles[k];
        
        if (k > 0 && currentTile.value === tiles[k - 1].value) {
          // 合并
          const mergedTile = this.createTile(currentTile.value * 2, targetRow, j);
          mergedTile.mergedFrom = [currentTile.id, tiles[k - 1].id];
          currentTile.mergedFrom = true;
          tiles[k - 1].mergedFrom = true;
          
          this.grid[targetRow][j] = mergedTile;
          this.score += mergedTile.value;
          targetRow--;
          k--; // 跳过下一个已合并的方块
          moved = true;
        } else {
          // 移动
          if (currentTile.row !== targetRow || currentTile.col !== j) {
            moved = true;
          }
          currentTile.row = targetRow;
          currentTile.col = j;
          this.grid[targetRow][j] = currentTile;
          targetRow--;
        }
      }
    }
    
    this.updateScore();
    return moved;
  }

  checkWin() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const tile = this.grid[i][j];
        if (tile && tile.value === 2048) {
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
        if (this.grid[i][j] === null) {
          return false;
        }
      }
    }
    
    // 检查是否可以水平合并
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        const tile1 = this.grid[i][j];
        const tile2 = this.grid[i][j + 1];
        if (tile1 && tile2 && tile1.value === tile2.value) {
          return false;
        }
      }
    }
    
    // 检查是否可以垂直合并
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.size; j++) {
        const tile1 = this.grid[i][j];
        const tile2 = this.grid[i + 1][j];
        if (tile1 && tile2 && tile1.value === tile2.value) {
          return false;
        }
      }
    }
    
    return true;
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
