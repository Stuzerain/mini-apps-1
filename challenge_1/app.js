console.log('JS script loaded')

// class constructor for a tic tac toe board
var TTT = function () {

  // property to keep track of whose turn it is -- x when true, o when false
  this.xTurn = true;

  // simple 3x3 matrix representing a board for setup and to keep track
  // of state of the board
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
    if (item.innerHTML === '&nbsp;') {
      if (this.xTurn === true) {
        item.innerHTML = 'X';
        this.board[row][col] = 'X';
      } else {
        item.innerHTML = 'O';
        this.board[row][col] = 'O';
      }
      console.log(row, col)
      this.xTurn = !this.xTurn;
    }
  }

  // function passed to clear button at end of board that empties every space on board
  this.clearBoard = () => {
    // debugger;
    console.log('attempting a clear');
    var loc = document.getElementById('board');
    for (var i = 0; i < loc.rows.length; i++) {
      for (var j = 0; j < loc.rows[i].cells.length; j++) {
        loc.rows[i].cells[j].innerHTML = '&nbsp';
      }
    }
  }


}

// initialize game
var TicTac = new TTT();
TicTac.drawBoard();

// var drawBoard = (data) => {
//   // debugger
//   var loc = document.getElementById('Tic');
//   data.forEach((row) => {
//     var newRow = loc.insertRow(-1);
//     for (var i = 0; i < row.length; i++) {
//       var newCell = newRow.insertCell(i)
//       newCell.innerHTML = row[i].val;
//     }
//     loc.appendChild(newRow);
//   })
// }


// functions that are run when the page loads
// var loadHerUp = function () {

// }

// window.onload = loadHerUp;
