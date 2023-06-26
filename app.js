var blackBackground;
var gap=3;
var cellWidth=65;
var discLayer;
var turn=1;
var discs=[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]
window.onload=function(){
    blackBackground =document.getElementById("blackBackground");
    discLayer=document.getElementById("discLayer")
    blackBackground.style.width=cellWidth*8+gap*9 + "px";
    blackBackground.style.height=cellWidth*8+gap*9 + "px";
    drawGreenSquares();
    drawDisc();
}
function drawGreenSquares(){
    for ( var row=0;row<8;row++){
        for(var column=0;column<8; column++){
            var greenSquare=document.createElement("div");
            greenSquare.classList.add("greenSquare");
            greenSquare.style.width=cellWidth +'px';
            greenSquare.style.height=cellWidth+'px';
            greenSquare.style.left=(cellWidth+gap)*column + gap +"px";
            greenSquare.style.top=(cellWidth+gap)*row +gap +"px";
            greenSquare.setAttribute("onclick","clickedSquare(" +row+","+column+")");
            blackBackground.appendChild(greenSquare);

        }
    }
}
function clickedSquare(row,column){
    if (discs[row][column]!=0){
        return;
    }
    if (canClickSpot(row,column)){
        var affectedDiscs=getAffectedDiscs(row,column);
        flipDiscs(affectedDiscs);
        discs[row][column]=turn;
        if (turn==1) turn=2;
        else turn=1;
        
        drawDisc();
    }
    return
}
function canClickSpot(row,column){
    var affectedDiscs= getAffectedDiscs(row,column);
    if (affectedDiscs.length==0) return false;
    else return true;
}

function getAffectedDiscs(row,column){
    var couldBeAffected=[];
    var affectedDiscs=[];
    var j=column;
    while(j<7){
        j++;
        var valueAtSpot= discs[row][j];
        if(valueAtSpot==0 || valueAtSpot==turn){
            if(valueAtSpot==turn){
                affectedDiscs=affectedDiscs.concat(couldBeAffected);

            }
            break;
        }else{
            var discLocation={row:row, column:j};
            couldBeAffected.push(discLocation);
        }
    }
    return affectedDiscs;

}
function flipDiscs(affectedDiscs){
    for (var i=0;i<affectedDiscs.length;i++){
        var spot=affectedDiscs[i];
        if(discs[spot.row][spot.column]==1){
            discs[spot.row][spot.column]=2;
        }else{
            discs[spot.row][spot.column]=1;
        }

    }
}

function drawDisc(){
    discLayer.innerHTML="";
    for ( var row=0;row<8;row++){
        for(var column=0;column<8;column++){
            var value=discs[row][column];
            if (value==0){
                continue;

            }else{
                var disc=document.createElement("div");
                disc.style.position='absolute';
                
                disc.style.width=cellWidth-3+'px';
                disc.style.height=cellWidth-3+'px';
                disc.style.backgroundImage = value==1?"radial-gradient(#333333 30%, black 70%)":"radial-gradient(white 30%, #cccccc 70%)";
                disc.style.left=(cellWidth+gap)*column + gap+1 +"px";
                disc.style.top=(cellWidth+gap)*row +gap+1 +"px";
                disc.style.borderRadius="50%";
                discLayer.appendChild(disc);


            }
        }
    }
}
   