function StoneCount(){
    let Blackcount=0,Whitecount=0;
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(position[i][j].color==”black”){
                Blackcount = Blackcount+1;
            }
            else if(position[i][j].color==”White”){
                Whitecount = Whitecount +1;
            }
        }
    }
}
