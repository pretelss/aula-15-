var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem
var nuvem_img
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6

var score = 0
var GrupodeNuvem;
var GrupodeCacto;
var PLAY = 1
var EstadodeJogo = PLAY
var END = 0




function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 nuvem_img = loadImage("cloud.png")
 
 cacto1 = loadImage("obstacle1.png")
 cacto2 = loadImage("obstacle2.png")
 cacto3 = loadImage("obstacle3.png")
 cacto4 = loadImage("obstacle4.png")
 cacto5 = loadImage("obstacle5.png")
 cacto6 = loadImage("obstacle6.png")





}

function setup() {
 

  createCanvas(600,200)
GrupodeNuvem = new Group()
GrupodeCacto = new Group()


  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
 // console.log(rand)

}

function draw() {
  //definir cor do plano de fundo
  background(180);
  text("pontuação"+score,60,50)
  score = score +Math.round(frameCount/60)
  //console.log(trex.y)
  if(EstadodeJogo===PLAY) {
    ground.velocityX = -4
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds()
  
    criaCactos() 

if(trex.isTouching(GrupodeCacto)){
  EstadodeJogo=END
}

  }
  
  
  // pulando o trex ao pressionar a tecla de espaço
  
  
  if(EstadodeJogo===END) {
    ground.velocityX = 0
    GrupodeCacto.setVelocityXEach(0)
    GrupodeNuvem.setVelocityXEach(0)
  }
  
  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  spawnClouds()
  
 criaCactos() 
  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
  if(frameCount%60===0){
    nuvem = createSprite(600,100,50,50); 
    nuvem.velocityX = -8;
   nuvem.addImage(nuvem_img);
   nuvem.y = Math.round(random(15,100))
   nuvem.depth = trex.depth
   trex.depth = trex.depth+1
   GrupodeNuvem.add(nuvem)

   }
  
 //escreva seu código aqui
                         
}

function criaCactos()  {
if(frameCount%60===0) {
  var cacto = createSprite(600,170,10,50);
  cacto.velocityX = -8;
var tipo = Math.round(random(1,6));
console.log(tipo);
switch(tipo) {
  case 1: cacto.addImage(cacto1);
  break;
  case 2: cacto.addImage(cacto2);
  break;

  case 3: cacto.addImage(cacto3);
  break;
  
  case 4: cacto.addImage(cacto4);
  break;
  
  case 5: cacto.addImage(cacto5);
  break;

  case 6: cacto.addImage(cacto6);
  break;
}
GrupodeCacto.add(cacto);
}
}

