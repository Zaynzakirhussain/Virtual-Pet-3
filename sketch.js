//Create variables here
var dog, happydog, database, foodS, foodStock, rtime, feedTime, lastFed, currentTime;
var gameState = 0;

function preload() {
  //load images here
  hdogimg = loadImage("dogImg.png");

  dogimg = loadImage("dogImg1.png");
 
  ldogimg = loadImage("Lazy.png");

  milkimg = loadImage("Milk.png");

  bedrimg = loadImage("Bed Room.png");

  gardenimg = loadImage("Garden.png");

  washrimg = loadImage("Wash Room.png");
}

function setup() {
  createCanvas(800, 650);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);

  feedTime = database.ref('FeedTime');
  feedTime.on('value', readtime1);

  //rtime = database.ref('CurrentTime');
  //rtime.on('value', readStock2);

  dog = createSprite(610, 500, 30, 10);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  milk = createSprite(493, 135, 6, 10);
  milk.addImage(milkimg);
  milk.scale = 0.06;

  button = createButton('Feed Drago');
  button1 = createButton('Add Bottles');
}


function draw() {
  background(46, 139, 87);

  button.position(410, 320);
  button1.position(410, 350);

  button.mousePressed(() => {
    writeStock(foodS);
    dog.addImage(hdogimg);
    dog.x = 610;
  });

  button1.mousePressed(() => {
    addStock(foodS);
    dog.addImage(dogimg);
  });

  currentTime = hour();
  console.log(currentTime);

  if (currentTime == (lastFed + 2)) {
    background(washrimg);
    dog.x = 1000;
  }

  if (currentTime == (lastFed + 1)) {
    background(gardenimg);
    dog.x = 1000;
  }

  if (currentTime > (lastFed + 2) && currentTime < (lastFed + 7)) {
    background(bedrimg);
    dog.x = 1000;
  }
  if (currentTime > (lastFed + 7)){
    dog.addImage(ldogimg);
  }

    fill("black");
  stroke("black");
  textSize(35);
  text("Last fed: " + lastFed + "hrs", 70, 500);
  text("Press the buttons to do stuff...", 120, 100);
  text("Milk Bottles left: " + foodS, 190, 150);
  text("Buttons: ", 40, 250);

  drawSprites();
  //add styles here
}
function readStock(data) {
  foodS = data.val();
}
function readtime1(data) {
  lastFed = data.val();
}
function readtime2(data) {
  ecurrentTime = data.val();
}
function writeStock(x) {
  database.ref('/').update({
    Food: x - 1,
    FeedTime: hour()
  })
}
function addStock(x) {
  database.ref('/').update({
    Food: x + 1
  })
}