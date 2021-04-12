var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score = 0
var newImage;
var cloudsGroup , obstaclesGroup
var gameState = "play"
var gameover, gameoverIMG, restart, restartIMG
var backImg
var sunImg,sun

function preload(){
  backImg = loadImage("sky.jpg")

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground00.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
 
  gameoverIMG = loadImage("gameOver.png")
  restartIMG = loadImage("restart.png")

  sunImg = loadImage("sun.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  sun = createSprite(width-400,200)
  sun.addImage(sunImg)
  

  trex = createSprite(50,660,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height+890,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -10;
  ground.scale = 2
  
  restart = createSprite(width/2,height/2)
  restart.addImage(restartIMG)
  restart.scale = 0.5
  
  gameover = createSprite(width/2,height/2- 50)
  gameover.addImage(gameoverIMG)
  gameover.scale = 0.5
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
  cloudsGroup = createGroup()
  obstaclesGroup = createGroup()
}

function draw() {
  background(backImg);

  camera.position.x = trex.x+600
  camera.position.y = 412

  trex.setCollider("circle",0,0,40)
  
  if(gameState == "play"){
    ground.velocityX = -(10 + score/100)
    score = score+Math.round(frameRate()/60)
    if (ground.x < 0){
    ground.x = ground.width/2;
      }
      console.log(trex.y)
    if(keyDown("space")&& trex.y >= 600) {
    trex.velocityY = -15;
      }
      trex.velocityY = trex.velocityY +1.3
       spawnObstacle()
        spawnClouds();
    gameover.visible = false
    restart.visible = false
    }else{
      if(gameState == "end"){
         ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     trex.changeAnimation("collided" , trex_collided)
     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
     trex.velocityY = 0
        gameover.visible = true
    restart.visible = true
        if(mousePressedOver(restart)){
          reset()
        }
      }
    }
  
  if(trex.isTouching(obstaclesGroup)){
    gameState = "end"
  }
  
  fill("white")
  textSize(15)
  stroke("black")
  strokeWeight(2.5)
  text("Score : "+score,20,60)
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+20,height-300,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(400,600))
    cloud.scale = 0.04;
    cloud.velocityX = -2;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 800
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    }
}

function spawnObstacle(){
  if(frameCount % 50 === 0){
    var obstacle = createSprite(2400,height-85,20,30)
    obstacle.velocityX = -(10 + score/100)
    var atharv = Math.round(random(1,6))
    switch(atharv){
      case 1: obstacle.addImage(obstacle1)
      break;
      case 2: obstacle.addImage(obstacle2)
      break;
      case 3: obstacle.addImage(obstacle3)
      break;
      case 4: obstacle.addImage(obstacle4)
      break;
      case 5: obstacle.addImage(obstacle5)
      break;
      case 6: obstacle.addImage(obstacle6)
      break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 400
    obstaclesGroup.add(obstacle)
  }
}

function reset(){
   gameState = "play"
   score = 0
   obstaclesGroup.destroyEach()
   cloudsGroup.destroyEach()
   trex.changeAnimation("running", trex_running);
}