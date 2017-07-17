class TicTacToe {

  constructor() {
    this.board = this.getBlankBoard();
    this.turn = 0;
  }

  getBlankBoard() {
    return [
      ["\xa0", "\xa0", "\xa0"],
      ["\xa0", "\xa0", "\xa0"],
      ["\xa0", "\xa0", "\xa0"],
    ];
  }

  spotEmpty(x, y) {
    if ((0 <= x <= 2) && (0 <= y <= 2)) {
      return this.board[x][y] === "\xa0";
    }
    return false;
  }

  play(x, y) {
    if (this.spotEmpty(x, y)) {
      this.turn++;
      if (this.turn % 2 === 1) {
        this.board[x][y] = "x";
      } else {
        this.board[x][y] = "o";
      }
    }
  }

  hasEnded() {
    var winner = this.checkForWinner();
    if (winner) {
      return winner;
    } else if (this.turn === 9) {
      return "draw";
    }
    return false;
  }

  checkForWinner() {
    for (var i = 0; i < this.board.length; i++) {
      if ((this.board[i][0] === this.board[i][1]) && (this.board[i][0] === this.board[i][2])) {
        return this.board[i][0];
      }
      if ((this.board[0][i] === this.board[1][i]) && (this.board[0][i] === this.board[2][i])) {
        return this.board[0][i];
      }
    }
    if (this.checkDiagonal()) {
      return this.board[1][1];
    }
    return false;
  }

  checkDiagonal() {
    return ((this.board[0][0] === this.board[1][1]) &&
        (this.board[1][1] === this.board[2][2])) ||
      ((this.board[0][2] === this.board[1][1]) &&
        (this.board[1][1] === this.board[2][0]));
  }

  display() {
    console.log(this.board[0]);
    console.log(this.board[1]);
    console.log(this.board[2]);
  }
  
  resetGame() {
      this.turn = 0;
      this.board = this.getBlankBoard();
  }
}


// Implement


var board = new TicTacToe();
var blankBoard = board.getBlankBoard();
var count = board.turn;
var newGame = board.resetGame(); // use this to reset a new game after the previous one has ended.


// Converts board array to table in HTML
function makeTableHTML(array) {
  var result = "<table>";
  for (var i = 0; i < array.length; i++) {
    result += "<tr>";
    for (var j = 0; j < array[i].length; j++) {
      result += '<td>' + array[i][j] + "</td>";
    }
    result += "</tr>";
  }
  result += "</table>";

  return result;
}


// Asks user for moves
function preparePlay() {
  var playButton = document.getElementById("play");
  playButton.onclick = function() {
    var answer = prompt("Enter your move (x plays first):", "xy");
    var x = parseInt(answer[0], 10);
    var y = parseInt(answer[1], 10);

    // Gets the result from prompt and calls play method
    board.play(x, y);
    count++;
    // Send the result to table
    var target = document.getElementById(answer);
    if (count % 2 === 1) {
        target.innerHTML = "x";
    } else if (count % 2 === 0) {
        target.innerHTML = "o";
    }
    endGame();
    return board;
  };
}


// Alerts winner and game state
// TODO: reset the game after winner alert
function endGame() {
	if (count >= 5 && board.hasEnded() === "x") {
  	alert("x won!");
  } else if (count >= 6 && board.hasEnded() === "o") {
  	alert("o won!");
  } else if (count === 9) {
    alert("Draw!");
  }
}

function resetButton() {
        board.resetGame();
        $("#reset").click(function(){
        document.location.reload();
        });
    }


window.onload = function() {
  makeTableHTML(blankBoard);
  preparePlay();
  resetButton();
};
