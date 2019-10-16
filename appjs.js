var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");  // metodos propriedades

// carregando imagens


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/esfirra38x26.png";
bg.src = "images/back.jpg";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// variaveis

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio 

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/esfirra.mp4";
scor.src = "sounds/score.mp3";

//  pegando teclas

document.addEventListener("keydown",moveUp); // PC
document.addEventListener("touchstart", moveUp); // MOBILE
document.addEventListener("touchchend", moveUp);
document.addEventListener("touchmove", moveUp);



function moveUp(){
    bY -= 30;
    fly.play();
}

// pipe coordenadas

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// pintando imagens na tela

function draw(){
    
    ctx.drawImage(bg, 0 , 0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detectando colisoes
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // recarregando a pagina
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("SCORE : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();




























