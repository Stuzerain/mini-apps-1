console.log('JS loaded')

// class constructor for a tic tac toe board
var TTT = function () {

  // property to keep track of whose turn it is -- x when true, o when false
  this.xTurn = true;

  // property to track whether game is done -- don't allow further edits to board
  // if the game is over
  this.gameOver = false;

  // simple 3x3 matrix representing a board for setup and to keep track
  // of state of the board -- &nbsp is an escape for a space so board isn't
  // actually completely empty for rendering implications
  this.board = [
    ['&nbsp', '&nbsp', '&nbsp'],
    ['&nbsp', '&nbsp', '&nbsp'],
    ['&nbsp', '&nbsp', '&nbsp']
  ];

  // function that draws board to html page
  // fills table with values from
  this.drawBoard = () => {
    // debugger
    var loc = document.getElementById('boardGuts');
    this.board.forEach((row, index) => {
      var newRow = loc.insertRow(-1);
      for (var i = 0; i < row.length; i++) {
        var newCell = newRow.insertCell(i)
        newCell.innerHTML = row[i];
        newCell.onclick = () => { this.toggle(event.target) };
        newCell.setAttribute('gridspot', [index, i])
      }
      loc.appendChild(newRow);
    })

    var butt = document.getElementById('clear');
    butt.onclick = () => { this.clearBoard() };
  }

  // function passed to board cells as onclick that toggles x or o and switches current turn
  this.toggle = (item) => {
    // debugger;
    var row = item.attributes.gridspot.value[0];
    var col = item.attributes.gridspot.value[2];
    // first checks if space is empty -- only does anything if space is empty to
    // prevent overwriting another player's space
    if (item.innerHTML === '&nbsp;' && !this.gameOver) {
      if (this.xTurn === true) {
        item.innerHTML = 'X';
        this.board[row][col] = 'X';
      } else {
        item.innerHTML = 'O';
        this.board[row][col] = 'O';
      }
      // after any turn, check for a win (slightly inefficient)
      if (this.checkWin()[0]) {
        console.log('That\'s a win!');
        document.getElementById('outcome').innerHTML = `${this.checkWin()[1]} wins!`;
        this.gameOver = true;
      } else {
        this.xTurn = !this.xTurn;
      }
    }
  }

  // function that detects wins and ends the game if there is a win
  // break into different functions for each direction?
  this.checkWin = () => {
    // check horizontal wins
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i][0] !== '&nbsp' &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]) {
        return [true, this.board[i][0]];
      }
    }

    // check vertical wins
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[0][i] !== '&nbsp' &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]) {
        return [true, this.board[0][i]];
      }
    }

    // check for diagonal wins
    if (this.board[0][0] !== '&nbsp' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]) {
      return [true, this.board[0][0]];
    }
    if (this.board[0][2] !== '&nbsp' &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]) {
      return [true, this.board[0][2]];
    }

    // if no wins, return false
    return false;
  }

  // function passed to clear button at end of board that empties every space on board
  // also resets turns so X is first every time
  this.clearBoard = () => {
    var loc = document.getElementById('board');
    for (var i = 0; i < loc.rows.length; i++) {
      for (var j = 0; j < loc.rows[i].cells.length; j++) {
        loc.rows[i].cells[j].innerHTML = '&nbsp';
        this.board[i][j] = '&nbsp';
      }
    }
    this.gameOver = false;
    this.xTurn = true;
    document.getElementById('outcome').innerHTML = ``;
  }

}

// initialize game
var TicTac = new TTT();
TicTac.drawBoard();



