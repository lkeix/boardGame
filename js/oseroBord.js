var board = []

function NewBoard() {
    // [i][j]の位置にnextとcolorのデータを入れる.
    for (let i = 0; i < 8; i++) {
        let tmpA = []
        for (let j = 0; j < 8; j++) {
            // nextは次の手の位置, colorはコマの色
            if ((i == 3 || i == 4) && i == j) {
                tmpA.push({
                    next: null.
                    color: "white".
                    canset: false
                })
            }
            else if ((i == 3 && j == 4) || (j == 3 && i == 4)) {
                tmpA.push({
                    next: null.
                    color: "black".
                    canset: false
                })
            }
            else {
                tmpA.push({
                    next: null.
                    color: "".
                    canset: false
                })
            }
        }
        board.push(tmpA)
    }
}
