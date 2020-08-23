
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, banana;
var ground, invisibleGround;
var bananaImg, monkeyImg, stoneImg, backImg;
 var BananaGroup ;
var ObstacleGroup ;
var count;

function preload(){
  stoneImg = loadImage("stone.png");
  backImg = loadImage("jungle.png");
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
}
function setup(){
  createCanvas(400,400)
//create a ground sprite
ground = createSprite(200,200,800,10);
ground.addImage("back", backImg)
ground.x = ground.width /2;
ground.scale=2;
//ground.y = 200

//create a monkey sprite
 monkey = createSprite(100,330,100,100);
monkey.addAnimation("monkey",monkeyImg);

//set collision radius for the monkey
//monkey.setCollider("circle",0,0,30);

//scale and position the monkey
monkey.scale = 0.1;
monkey.x = 50;

monkey.depth=ground.depth
monkey.depth=monkey.depth+1
monkey.scale=0.2
//invisible Ground to support monkey
 invisibleGround = createSprite(400,350,800,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
 ObstaclesGroup = new Group();
 BananaGroup = new Group();

//place gameOver and restart icon on the screen
monkey.depth=ground.depth
monkey.depth=monkey.depth+1
monkey.scale=0.2
//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
count = 0;
}
function draw() {
  //set background to white
  background(180);
  //display score
   
  //console.log(gameState);
  
  BananaGroup.setScaleEach(0.05);
  ObstaclesGroup.setScaleEach(0.2);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    
      count = Math.ceil(frameCount/getFrameRate());
    
    //console.log (Math.round(World.frameRate))
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")){
      monkey.velocityY = -18 ;
      
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the clouds
    
  
    //spawn obstacles
    spawnBananas();
    spawnObstacles();
    
    //End the game when monkey is touching the obstacle
    if(ObstaclesGroup.isTouching(monkey)){
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    
    
    
  }
  
  
  
  //console.log(monkey.y);
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  drawSprites();
  text("survivalTime: "+ count, 210, 100);
}



function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,330,50,50);
    
    obstacle.velocityX = - 6 
    
    //generate random obstacles
    
    obstacle.addImage("stone",stoneImg);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  if(frameCount % 100 === 0) {
    var banana = createSprite(400,300,10,40);
    banana.y=random(280,300)
    banana.velocityX = - 6 
    
    banana.scale=0.1
    
    //generate random obstacles
    
    //banana.setAnimation("Banana");
    
    //assign scale and lifetime to the banana           
    
    banana.lifetime = 70;
    
    banana.depth=ground.depth
    banana.depth=banana.depth+1
    //add each banana to the group
    BananaGroup.add(banana);
  }
}



