var board = []
var ban;
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

function NewBoard() {
    // [i][j]�̈ʒu��next��color�̃f�[�^������.
    for (let i = 0; i < 8; i++) {
        let tmpA = []
        for (let j = 0; j < 8; j++) {
            // next�͎��̎�̈ʒu, color�̓R�}�̐F
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

//�R�}��u��
function placeDisk(xPos, yPos, color) { //���� xPos = 0, yPos = 0;
    board[yPos][xPos].color = color;
    
    
    let sPos = {x:xPos, y:yPos}; //�T���ʒu

    let rColor; //�u���R�}�Ɣ��΂̐F
    (color == "white") ? rColor = "black" : rColor = "white";

    let count = 0;
    let stack = []; //�Ђ�����Ԃ��R�}�̈ʒu������

    let dir = [
        {x:0,y:-1}, //��
        {x:0,y:1}, //��
        {x:-1,y:0}, //��
        {x:1,y:0}, //�E
        {x:1,y:-1}, //�E��
        {x:-1,y:-1}, //����
        {x:1,y:1}, //�E��
        {x:-1,y:1} //����
    ]; 
    
    
    //�Ђ�����Ԃ��R�}��stack�ɓ����
    for (let n = 0; n < dir.length; n++) {
        sPos.x = xPos;
        sPos.y = yPos;

        let flag = false; //while �𔲂���t���b�O;
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

    //�Ђ�����Ԃ�
    while (stack.length != 0) {
        let temp = stack.pop();
        board[temp.y][temp.x].color = color;
    }
}