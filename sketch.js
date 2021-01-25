var trex,trex_running,trex_collided;
var ground,groundimage,invisible_ground;
var cloud,cloudimage,cloudgroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclegroup;
var gamestate="play";
var count=0;
var over,overimage;
var restart,restartimage;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadImage("trex_collided.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png"); 
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  overimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
}
function setup() {
  createCanvas(600,400);
  trex=createSprite(50,300,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  ground=createSprite(300,300,600,10);
  ground.addImage("ground",groundimage);
  invisible_ground=createSprite(300,305,600,10);
  invisible_ground.visible=false;
  cloudgroup=new Group();
  obstaclegroup= new Group();
  over=createSprite(200,180);
  over.visible=false;
  over.addImage("over",overimage);
  restart=createSprite(200,240);
  restart.addImage("restart",restartimage);
  restart.visible=false;
}

function draw() {
  
  background(180);
  drawSprites();
  trex.collide(invisible_ground);
  
  if (gamestate=="play"){
    ground.velocityX=-3;
  if(ground.x<0){
    ground.x=300;
  }
 
  trex.velocityY=trex.velocityY+0.2;
    count=count+Math.round(getFrameRate()/65);
     text("score="+count,310,35);
     spawnClouds();
  spawnObstacles();
  if(keyDown("space" )&& trex.y>=200){
    trex.velocityY=-7 
  }
    if(obstaclegroup.isTouching(trex)){
      gamestate="end";
    }
}
    else if(gamestate=="end"){
      obstaclegroup.velocityX=0;
      cloudgroup.velocityX=0;
      ground.velocityX=0;
       cloudgroup.setLifetimeEach(-1);
      obstaclegroup.setLifetimeEach(-1);
      trex.velocityY=0;
      over.visible=true;
      restart.visible=true;
      if(mousePressedOver(restart)){
        reset();
      }
    }
  
    
}
function spawnClouds(){
  if(frameCount%60==0){
    cloud=createSprite(350,random(100,150))
    cloud.addImage("cloudimage",cloudimage );
    cloud.velocityX=-3;
    cloud.lifetime=134;
    cloudgroup.add(cloud)
    
  }
    
}
function spawnObstacles(){
  if(frameCount%90==0){
    obstacle=createSprite(350,300);
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    obstaclegroup.add(obstacle);
    obstacle.scale=0.5;
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage("obstacle1",obstacle1);
        break;
        case 2:obstacle.addImage("obstacle2",obstacle2);
        break;
        case 3:obstacle.addImage("obstacle3",obstacle3);
        break;
        case 4:obstacle.addImage("obstacle4",obstacle4);
        break;
        case 5:obstacle.addImage("obstacle5",obstacle5);
        break;
        case 6:obstacle.addImage("obstacle6",obstacle6);
        break;
        default:break;
    }
  }
}
function reset(){
  gamestate="play"
  over.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
   cloudgroup.destroyEach();
   
   count=0;
  
}
