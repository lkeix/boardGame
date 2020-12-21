//文字コードはutf-8

var board = []

//boardの初期化
function NewBoard() { //[i][j]の位置にnextとcolorの変数を用意する
    for (let i = 0; i < 8; i++) {
        let tmpA = []
        for (let j = 0; j < 8; j++) { //nextは次の手の[i][j], colorはコマの色
            if ((i == 3 || i == 4) && i == j) {
                tmpA.push({
                    next: null,
                    color: "white"
                })
            }
            else if ((i == 3 && j == 4) || (j == 3 && i == 4)) {
                tmpA.push({
                    next: null,
                    color: "black"
                })
            }
            else {
                tmpA.push({
                    next: null,
                    color: ""
                })
            }
        }
        board.push(tmpA)
    }
}

//コマを置く
function placeDisk(xPos, yPos, color) { //左上 xPos = 0, yPos = 0;
    board[yPos][xPos].color = color;
    
    
    let sPos = {x:xPos, y:yPos}; //探す位置

    let rColor; //置くコマと反対の色
    (color == "white") ? rColor = "black" : rColor = "white";

    let count = 0;
    let stack = []; //ひっくり返すコマの位置を入れる

    let dir = [
        {x:0,y:-1}, //上
        {x:0,y:1}, //下
        {x:-1,y:0}, //左
        {x:1,y:0}, //右
        {x:1,y:-1}, //右上
        {x:-1,y:-1}, //左上
        {x:1,y:1}, //右下
        {x:-1,y:1} //左下
    ]; 
    
    
    //ひっくり返すコマをstackに入れる
    for (let n = 0; n < dir.length; n++) {
        sPos.x = xPos;
        sPos.y = yPos;

        let flag = false; //whileを抜けるフラッグ
        while (true) {
            sPos.x += dir[n].x;
            sPos.y += dir[n].y;

            if (sPos.y < 0 || 7 < sPos.y || sPos.x < 0 || 7 < sPos.x) {
                flag = true;
            }
            if (flag === true) {
                for (let i = 0; i < count; i++) {
                    stack.pop();
                }
                break;
            }

            if (board[sPos.y][sPos.x].color == rColor) {
                stack.push(Object.assign({}, sPos));
                count++;
            } else if (board[sPos.y][sPos.x].color == color){
                flag = true;
                count = 0;
            } else {
                flag = true;
            }

            
        }
        count = 0;
    }

    //ひっくり返す
    while (stack.length != 0) {
        let temp = stack.pop();
        board[temp.y][temp.x].color = color;
    }
}
