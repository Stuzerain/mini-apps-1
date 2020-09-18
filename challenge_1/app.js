console.log('JS script loaded')

// class constructor for a tic tac toe board
var TTT = function () {
  // simple 3x3 matrix representing a board
  this.board = [
    [{ val: '1' }, { val: '2' }, { val: '3' }],
    [{ val: '4' }, { val: '5' }, { val: '6' }],
    [{ val: '7' }, { val: '8' }, { val: '9' }]
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
  }

  this.toggle = (item) => {
    console.log(item)
  }

  // property to keep track of whose turn it is -- x when true, o when false
  this.xTurn = true;
}


var drawBoard = (data) => {
  // debugger
  var loc = document.getElementById('Tic');
  data.forEach((row) => {
    var newRow = loc.insertRow(-1);
    for (var i = 0; i < row.length; i++) {
      var newCell = newRow.insertCell(i)
      newCell.innerHTML = row[i].val;
    }
    loc.appendChild(newRow);
  })
}


// functions that are run when the page loads
// var loadHerUp = function () {
var TicTac = new TTT();
TicTac.drawBoard();
// }

// window.onload = loadHerUp;
