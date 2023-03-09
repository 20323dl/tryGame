/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by dHRUV 
/*******************************************************/
const TASKNAME = "t01_create_sprite";

/*******************************************************/
/****************************IMG***************************/
// function preload() {
//   img = loadImage('bob.png');
// }
/****************************IMG***************************/

/****************************setup()***************************/
let score = 0;
let alienSpeed = 2;
let death = 400;
const DISTANCE_THRESHOLD = 200; //radius of cir to not spawn kill
let secLeft = 6;

function setup() {
  console.log("setup: bob");
  cnv = new Canvas(windowWidth, windowHeight);
  //player
  cir = new Sprite(windowWidth / 2, windowHeight / 2, 75, 'd');

  cir.rotationSpeed = 0;
  cir.shapeColor = color("red")
  cir.stroke = color("red")
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
  //functions

  timer();
}
/****************************setup()***************************/

/****************************draw()***************************/
function draw() {
  background('#ceddf5');
  cir.collides(wallGroup, bounceWall);
  cir.collides(alienGroup, endGame);
  cir.rotateTo(mouse, 50);
  bullet.collides(wallGroup, delBullet)
  bullet.collides(alienGroup, delAlien)
  bullet.friction = 9;
  for (const alien of alienGroup) {
    alien.moveTo(cir.x, cir.y);
    alien.setSpeed(alienSpeed);
  }
  noFill();
  circle(mouseX, mouseY, 25);
  line(mouseX, mouseY, cir.x, cir.y);
  fill('black');
  textSize(30);
  text(score, 100, 100);
  if (score > 30) {
    alienSpeed = 5;
  }
  if (secLeft === 0) {
    endGame();
    text("lost becasue you camped", windowWidth / 2, windowHeight / 2 - 100);
  }
  text(secLeft, windowWidth - 100, 100);
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

//colliding functions
function bounceWall(cir, wall) {
  cir.vel.x = 0;
  cir.vel.y = 0;
}
function endGame(cir, alienGroup) {
  //cir.remove();
  textSize(80);
  text("YOU LOSE: " + score, windowWidth / 2, windowHeight / 2);
  noLoop();
}
function delBullet(wallGroup, bullet) {
  wallGroup.remove();
}
function delAlien(alienGroup, bullet) {
  bullet.remove();
  alienGroup.remove();
  score++
}
//colliding functions

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
  for (i = 0; i < 6; i++) {

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
    alien.vel.x = random(1, 10);
    alien.vel.y = random(1, 10);
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
  bullet.setSpeed(20);
  //debug(bullet.direction);
  bullet.moveTowards(mouseX, mouseY);
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

/*******************************************************/
//  END OF APP
/*******************************************************/