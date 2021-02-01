//置ける場所の表示

var X[8][8] = 0;

function Black() {
  //黒の手番
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].color == "") {

        //縦の列で黒のコマを置けるかの確認(置く場所の上か下に白のコマがあり，その奥に黒のコマがあるならOK)
        if ((board[i + 1][j].color == "white") || (board[i - 1][j].color == "white")) {
          for (let k = 2; k < 8; k++) {
            //空白があるならbreak
            if ((board[i + k][j].color == "") || (board[i - k][j].color == "")) {
              break;
            } else if ((board[i + k][j].color == "black") || (board[i - k][j].color == "black")) {
              X[i][j] == OK;
              break;
            }
          }
        }

        //横の列で黒のコマを置けるかの確認(置く場所の左か右に白のコマがあり，その奥に黒のコマがあるならOK)
        if ((board[i][j + 1].color == "white") || (board[i][j - 1].color == "white")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i][j + k].color == "") || (board[i][j - k].color == "")) {
              break;
            } else if ((board[i][j + k].color == "black") || (board[i][j + k].color == "black")) {
              X[i][j] == OK;
              break;
            }
          }
        }

        //斜めの列で黒のコマを置けるかの確認(置く場所の左上か左下，右下か右上に白のコマがあり，その奥に黒のコマがあるならOK)
        if ((board[i + 1][j + 1].color == "white") || (board[i - 1][j - 1].color == "white")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i + k][j + k].color == "") || (board[i - k][j - k].color == "")) {
              break;
            }
            if ((board[i + k][j + k].color == "black") || (board[i - k][j - k].color == "black")) {
              X[i][j] == OK;
            }
          }
        } else if ((board[i + 1][j - 1].color == "white") || (board[i - 1][j + 1].color == "white")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i + k][j - k].color == "black") || (board[i - k][j + k].color == "black")) {
              X[i][j] == OK;
            }
          }
        }
      }
    }
  }
}

function White() {
  //白の手番
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].color == "") {

        //縦の列で白のコマを置けるかの確認
        if ((board[i + 1][j].color == "black") || (board[i - 1][j].color == "black")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i + k][j].color == "white") || (board[i - k][j].color == "white")) {
              X[i][j] == OK;
            }
          }
        }

        //横の列で白のコマを置けるかの確認
        if ((board[i][j + 1].color == "black") || (board[i][j - 1].color == "black")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i][j + k].color == "white") || (board[i][j + k].color == "white")) {
              X[i][j] == OK;
            }
          }
        }

        //斜めの列で白のコマを置けるかの確認
        if ((board[i + 1][j + 1].color == "black") || (board[i - 1][j - 1].color == "black")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i + k][j + k].color == "white") || (board[i - k][j - k].color == "white")) {
              X[i][j] == OK;
            }
          }
        } else if ((board[i + 1][j - 1].color == "black") || (board[i - 1][j + 1].color == "black")) {
          for (let k = 2; k < 8; k++) {
            if ((board[i + k][j - k].color == "white") || (board[i - k][j + k].color == "white")) {
              X[i][j] == OK;
            }
          }
        }
      }
    }
  }
}
