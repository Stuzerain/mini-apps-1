console.log('JS script loaded')

// class constructor for a tic tac toe board
var TTT = function () {

  // property to keep track of whose turn it is -- x when true, o when false
  this.xTurn = true;

  // simple 3x3 matrix representing a board
  this.board = [
    [{ val: '&nbsp' }, { val: '&nbsp' }, { val: '&nbsp' }],
    [{ val: '&nbsp' }, { val: '&nbsp' }, { val: '&nbsp' }],
    [{ val: '&nbsp' }, { val: '&nbsp' }, { val: '&nbsp' }]
  ];

  // function that draws board to html page
  this.drawBoard = () => {
    // debugger
    var loc = document.getElementById('boardGuts');
    this.board.forEach((row) => {
      var newRow = loc.insertRow(-1);
      for (var i = 0; i < row.length; i++) {
        var newCell = newRow.insertCell(i)
        newCell.innerHTML = row[i].val;
        newCell.onclick = () => { this.toggle(event.target) };
        // newCell.setAttribute('onclick', () => { this.toggle() })

      }
      loc.appendChild(newRow);
    })

    var butt = document.getElementById('clear');
    butt.onclick = () => { this.clearBoard() };
  }

  // function passed to board cells as onclick that toggles x or o and switches current turn
  this.toggle = (item) => {
    // debugger;
    if (this.xTurn === true) {
      item.innerHTML = 'X';
    } else {
      item.innerHTML = 'O';
    }
    console.log(this.xTurn)
    this.xTurn = !this.xTurn;
  }

  this.clearBoard = () => {
    // debugger;
    console.log('attempting a clear')
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
