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


// Functionalities when a cell is clicked

function clickCell() {
    $(".cell").click(function() {
        var id = $(this).attr('id');
        //console.log(typeof id);
        var x = id[0];
        var y = id[1];
        board.play(parseInt(x), parseInt(y));
        if (board.turn % 2 === 1) {
            $(this).html('<p class="move">x</p>'); 
        } else if (board.turn % 2 === 0) {
            $(this).html('<p class="move">o</p>'); 
        }
        setTimeout(function() {
            endGame();}, 1700);
    })
}


// Alerts winner and game state

function endGame() {
	if (board.turn >= 5 && board.hasEnded() === "x") {
  	alert("x won!");
  	reset();
  } else if (board.turn >= 6 && board.hasEnded() === "o") {
  	alert("o won!");
  	reset();
  } else if (board.turn === 9) {
    alert("Draw!");
    reset();
  }
}


function resetButton() {
        $("#reset").click(function(){
            reset();
        });
    }


function reset() {
    $(".move").empty();
    board.resetGame();
}


$(document).ready(function() {
  makeTableHTML(blankBoard);
  clickCell();
  resetButton();
});

