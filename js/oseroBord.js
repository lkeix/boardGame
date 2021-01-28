//文字コードはutf-8

var board = []
var ban;

NewBoard();
testView();
var player = "black";//現在のプレイヤー

var beforeDiskPos = {};//一つ前のコマの位置

// テーブルで盤面を作成する処理
function ban_new() {
    ban = document.getElementById('field')
    for (var x = 0; x < 8; x++) {
        var tr = "<tr>"
        for (var y = 0; y < 8; y++) {
            tr += "<td></td>"
        }
        tr += "</tr>"
        ban.innerHTML += tr
    }
};

// 盤面の状況を二次元配列で定義
var ban_ar = new Array(8)   // この変数に処理を追加してください。
for (var x = 0; x < ban_ar.length; x++){
    ban_ar[x] = new Array(8)
}

// 盤面をスタートの状態(=白黒2枚ずつの状態)にする処理
function ban_init () {
    // 全てをクリア
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
        ban_ar[x][y] = 0
        }
    }
    // 初期状態では、真ん中に白黒を配列
    ban_ar[3][3] = -1
    ban_ar[4][3] = 1
    ban_ar[3][4] = 1
    ban_ar[4][4] = -1
    ban_set()
    
    // ターンも初期化
    // turn = 0
    // change_turn()
};

// 盤面状況(=配列)を実際の盤面へ反映させる処理
function ban_set () {
    var stone = ""
    // ban_ar内の要素の値(=0,-1,1)次第でHTMLに表示させるコマを決める
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            switch( ban_ar[x][y] ) {
                case 0:
                    stone = ""
                    break;
                case -1:
                    stone = "○"
                    break;
                case 1:
                    stone = "●"
                    break;
            }
            // htmlのtdタグに石をいれる
            ban.rows[x].cells[y].innerText = stone;
        }
    }
    return true
};

// クリックした所に石を置く処理
function click_func() {
    ban = document.getElementById('field')
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            var select_cell = ban.rows[x].cells[y];
            select_cell.onclick = function () {
                // クリックされた場所に石がない場合は、
                if (ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0) {
                    // その場所にターン側の石が置けるかチェックして、石をおく。
                    // (木村的アイデア)チェックする関数を作り、その関数の引数にban_arの座標を入れてチェックといいかも。
                    ban_ar[this.parentNode.rowIndex][this.cellIndex] = 1    //とりあえず、クリックしたところを黒(=ban_arが1)にする処理を記述。
                    ban_set()   // ban_setにban_arの変更を読み込ませて、HTMLに反映させる。
                }
            }
        }
    }
}

//boardの初期化
function NewBoard() { //[i][j]の位置に変数を用意する
    for (let i = 0; i < 8; i++) {
        let tmpA = []
        for (let j = 0; j < 8; j++) { //beforeはその手が置かれる前の手の座標, colorはコマの色, canSetOOはそれぞれの色のコマが置けるか
            if ((i == 3 || i == 4) && i == j) {
                tmpA.push({
                    before: null,
                    color: "white",
                    canSetBlack: false,
                    canSetWhite: false
                })
            }
            else if ((i == 3 && j == 4) || (j == 3 && i == 4)) {
                tmpA.push({
                    before: null,
                    color: "black",
                    canSetBlack: false,
                    canSetWhite: false
                })
            }
            else if ((i == 2 && j == 3) || (i == 3 && j == 2) || (i == 4 && j == 5) || (i == 5 && j == 4)) {
                tmpA.push({
                    before: null,
                    color: "",
                    canSetBlack: true,
                    canSetWhite: false
                })
            }
            else if ((i == 2 && j == 4) || (i == 3 && j == 5) || (i == 4 && j == 2) || (i == 5 && j == 3)) {
                tmpA.push({
                    before: null,
                    color: "",
                    canSetBlack: false,
                    canSetWhite: true
                })
            }
            else {
                tmpA.push({
                    before: null,
                    color: "",
                    canSetBlack: false,
                    canSetWhite: false
                })
            }
        }
        board.push(tmpA)
    }
}


//コマを置く(この関数を使う)
function placeDisk(xPos, yPos, color) {//左上 xPos = 0, yPos = 0, colorは置く色;
    if (board[yPos][xPos].canSetBlack && color === "black" || board[yPos][xPos].canSetWhite && color === "white") {
        placeADisk(xPos,yPos,color);



    }
}


function placeADisk(xPos, yPos, color) { //左上 xPos = 0, yPos = 0;

    //置いたコマの更新
    board[yPos][xPos].color = color;
    board[yPos][xPos].before = Object.assign({},beforeDiskPos);

    //前の手を保存
    beforeDiskPos = {x:xPos, y:yPos, toPos:[]};
    
    
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

        let lenOfStack = stack.length;
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
                
                //undoに使う
                if (stack.length != lenOfStack) beforeDiskPos.toPos.push(stack[stack.length-1]);//追加先
                
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

//一手戻る(正しく置かれていないとうまく動かないと思う)
function undo() {
    let before = beforeDiskPos;
    if (Object.keys(before).length == 0) return;

    while (before.toPos.length != 0 ) {
        let temp = before.toPos.pop();
        let dirX;
        let dirY;
        if (temp.x - before.x > 0) {
            dirX = -1;
        } else if (temp.x == before.x) {
            dirX = 0;
        } else {
            dirX = 1;
        }

        if (temp.y - before.y > 0) {
            dirY = -1;
        } else if (temp.y = before.y) {
            dirY = 0;
        } else {
            dirY = 1;
        }

        while (before.x != temp.x || before.y != temp.y) {
            (board[temp.y][temp.x].color == "white") ? board[temp.y][temp.x].color = "black" : board[temp.y][temp.x].color = "white";//色反転
            temp.x += dirX;
            temp.y += dirY; 
        }
    }
    board[before.y][before.x].color = "";
    beforeDiskPos = board[before.y][before.x].before;

    testView();
}


/*-------------------デバッグ用関数 -----------------------*/
function testView() {
    console.log("　０１２３４５６７");
    for (let i = 0; i < 8; i++) {
        let str = "";
        str += String.fromCharCode(i + 48 + 65248);
        for (let j = 0; j < 8; j++) {
            if (board[i][j].color == "white") {
                str += "◆";
            } else if (board[i][j].color == "black") {
                str += "◇";
            } else {
                str += "　";
            }
        }
        console.log(str);
    }
    
}

function OnButtonClick() {
    let x = document.forms.id_form1.id_textBox1.value;
    let y = document.forms.id_form1.id_textBox2.value;
    player = "black";
    placeADisk(x-0,y-0,player);
    console.clear();
    testView();
    
    //(player == "white") ? player = "black" : player = "white";
}

function OnButtonClick2() {
    let x = document.forms.id_form1.id_textBox1.value;
    let y = document.forms.id_form1.id_textBox2.value;
    player = "white";
    placeADisk(x-0,y-0,player);
    console.clear();
    testView();
    
    //(player == "white") ? player = "black" : player = "white";
}
/*-----------------------------------------------------*/

//盤面の白黒それぞれの駒の数を数える
function ban_count() {




    //盤面の駒が1色になった場合
    if(count_white==0){
        victory=black;
        Game_finish;//geme終了を表示
    }
    else if(count_black==0){
        victory=white;
        Game_finish;//geme終了を表示    
    }
}

function Game_finish(){
    if(victory==black){
        let string = '黒の勝利です';
        string;
    }
    else{
        let string = '白の勝利です';
        string;
    }
}
