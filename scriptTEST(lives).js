/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by dHRUV 
/*******************************************************/
const TASKNAME = "t01_create_sprite";

/*******************************************************/
/****************************IMG***************************/
function preload() {
  img = loadImage('freezePU.png');
}
/****************************IMG***************************/

/****************************setup()***************************/
let score = 0;
let alienSpeed = 2;
let death = 400;
const DISTANCE_THRESHOLD = 200; //radius of cir to not spawn kill
let secLeft = 6;
let health = 5;
let button;
let freeze;
let alienAmmount = 5;

function setup() {
  console.log("setup: bob");
  cnv = new Canvas(windowWidth, windowHeight);
  //player
  cir = new Sprite(windowWidth / 2, windowHeight / 2, 75, 'd');
  cir.rotationSpeed = 0;
  cir.shapeColor = color("red");
  cir.stroke = color("red");
  //player
  
  /** IMG **/
  //cir.addImage(img);
  //img.resize(150, 150)
  /** IMG **/

  //functions
  movement();
  wallGroup = new Group();
  walls();
  alienGroup = new Group();
  setInterval(alien, 5000);
  bullet = new Sprite(cir.x, cir.y, 10, 'd');
  bullet.remove();
  timer();
  slowGroup = new Group();
  setInterval(slow, random(2000, 4000));
  //slow();
  //functions

  //reset game button
  button = createButton('reset');
  button.position(0, 0);
  button.mousePressed(resetGame);
  //reset game button
}
/****************************setup()***************************/
function resetGame() {
  score = 0;
  health = 5;
  death = 400;
  alienSpeed = 2;
  secLeft = 6;
  alienGroup.remove();
  slowGroup.remove();
  loop();
}
/****************************draw()***************************/
function draw() {
  background('#ceddf5');
  cir.collides(wallGroup, bounceWall);
  cir.collides(slowGroup, freezer); //when cir collides with freeze
  cir.collides(alienGroup, healthy);
  cir.rotateTo(mouse, 50);
  bullet.collides(wallGroup, delBullet)
  bullet.collides(alienGroup, delAlien)

  for (const alien of alienGroup) {
    alien.moveTo(cir.x, cir.y);
    alien.speed = alienSpeed;
  }
  noFill();
  circle(mouseX, mouseY, 25);
  line(mouseX, mouseY, cir.x, cir.y);
  fill('black');
  textSize(30);
  text(score, 100, 100);

  if (score>30){
    alienAmmount = 12
  }
  if (secLeft === 0) {
    endGame();
    text("lost becasue you camped", windowWidth / 2, windowHeight / 2 - 100);
  }
  text(secLeft, windowWidth - 100, 100);
  if (health === 0) {
    endGame();
  }
  text(health, windowWidth / 2, 100);
}
/****************************draw()***************************/

//timer
function timer() {
  window.setInterval(runTimer, 1000);
}
function runTimer() {
  secLeft = secLeft - 1;
  if (secLeft === 0) {
    endGame();
  }
}


/****************************colliding functions***************************/
function bounceWall(cir, wall) {
  cir.vel.x = 0;
  cir.vel.y = 0;
}
function healthy(cir, alienGroup) {
  cir.shapeColor = color("white");
  cir.stroke = color("white");
  const hit = () => cir.shapeColor = color("red");
  const hitOutline = () => cir.stroke = color("red");
  health--;
  alienGroup.remove();
  setTimeout(hit, 100);
  setTimeout(hitOutline, 100)

}
function endGame(cir, alienGroup) {
  //cir.remove();
  textSize(80);
  text("YOU LOSE: " + score, windowWidth / 2, windowHeight / 2);
  noLoop();
  button.mousePressed(resetGame);
}
function delBullet(wallGroup, bullet) {
  wallGroup.remove();
}
function delAlien(alienGroup, bullet) {
  bullet.remove();
  alienGroup.remove();
  score++
}

//calls this when cir hits freeze(the powerup)
function freezer(cir, freeze) {
  alienSpeed = 0.5;
  const normalSpeed = () => alienSpeed = 4;
  setTimeout(normalSpeed, 7000);
  freeze.remove();
}
/****************************colliding functions***************************


/****************************FUNDEMENTALS***************************/
//player move
function movement() {
  let speed = 20;
  let slow = 0;
  document.addEventListener("keydown", function(event) {
    secLeft = 6;
    if (event.code === "KeyA") {
      cir.vel.x = -speed;
    } else if (event.code === "KeyD") {
      cir.vel.x = speed;
    } else if (event.code === "KeyW") {
      cir.vel.y = -speed;
    } else if (event.code === "KeyS") {
      cir.vel.y = speed;
    }
  });
  document.addEventListener("keyup", function(event) {
    if (event.code === "KeyA") {
      cir.vel.x = slow;
    } else if (event.code === "KeyD") {
      cir.vel.x = slow;
    } else if (event.code === "KeyW") {
      cir.vel.y = slow;
    } else if (event.code === "KeyS") {
      cir.vel.y = slow;
    }
  });
}
//player move

//aliens
function alien() {
  for (i = 0; i < alienAmmount; i++) {

    //cir to not spawn kill
    let xPosition = random(1, windowWidth);
    let yPosition = random(1, windowHeight);

    while (dist(cir.x, cir.y, xPosition, yPosition) < DISTANCE_THRESHOLD) {
      xPosition = random(1, windowWidth);
      yPosition = random(1, windowHeight);
    }
    //cir to not spawn kill  

    alien = new Sprite(xPosition, yPosition, 50, 50, 'd');
    alien.shapeColor = color("black");
    //alien.vel.x = random(1, 10);
    //alien.vel.y = random(1, 10);
    alien.bounciness = 0;

    alienGroup.add(alien);
  }
}
//aliens

//walls
function walls() {
  let w = 30
  wallLH = new Sprite(0, height / 2, w, height, 'k');
  wallLH.shapeColor = color("black");
  wallRH = new Sprite(width, height / 2, w, height, 'k');
  wallRH.shapeColor = color("black");
  wallTop = new Sprite(0, 0, width * 2, w, 'k');
  wallTop.shapeColor = color("black");
  wallBot = new Sprite(width, height, width * 2, w, 'k');
  wallBot.shapeColor = color("black");
  wallGroup.add(wallLH);
  wallGroup.add(wallRH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}
//walls

//shooting mech
function mouseClicked() {
  // Create the bullet sprite
  bullet = new Sprite(cir.x, cir.y, 10, 'd');
  bullet.shapeColor = color("red");

  // Move the bullet to the edge of the gun and set it's rotation
  setBulletPosition(cir, bullet)
  // Fire the bullet!
  bullet.speed = 20;
  //debug(bullet.direction);
  bullet.moveTowards(mouseX, mouseY, 200 * (0.1 / dist(cir.x, cir.y, mouse.x, mouse.y)));
}
function setBulletPosition(_gun, _round) {
  // Set the rotation of the _round to the same as the _gun
  _round.rotation = _gun.rotation
  _round.direction = _gun.direction

  // Calculate the offset to the edge of the gun (plus the width of the bullet)
  deg = _gun.rotation;
  rads = deg * Math.PI / 180;  // Convert degrees to radians

  h = _gun.w / 2 + _round.w / 2 + 10; // h is the distance from the center of the _gun to the center of the _round
  offsetX = h * Math.cos(rads);
  offsetY = h * Math.sin(rads);

  // Move the _round to the edge of the gun
  _round.x = _gun.x + offsetX;
  _round.y = _gun.y + offsetY;
}
//shooting mech
/****************************FUNDEMENTALS***************************/


/** *************************POWER UPS ************************* **/
//powerup slows down the aliens\
//function only for looks
function slow() { 
    freeze = new Sprite(random(1, windowWidth), random(1, windowHeight), 75, 's');
    freeze.shapeColor = color("blue");
    freeze.stroke = color("blue")
    slowGroup.add(freeze);
    freeze.addImage(img);
    img.resize(75,75);
    freeze.addImage(img);
    img.resize(75,75);
}

/** *************************POWER UPS ************************* **/
/*******************************************************/
//  END OF APP
/*******************************************************/