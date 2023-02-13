/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by ??? 
/*******************************************************/
const TASKNAME = "t01_create_sprite";

/*******************************************************/
// setup()
/*******************************************************/
// function preload() {
//   img = loadImage('bob.png');
// }
function setup() {
  console.log("setup: bob");
  //awworld.gravity.y = 94;
  cnv = new Canvas(windowWidth, windowHeight);
  rect = new Sprite(300, 300, 30, 30, 'd');
  cir = new Sprite(windowWidth / 2, windowHeight / 2, 150, 150, 'd');
  cir.rotationSpeed = 0;
  rect.rotationSpeed = 40;

  //cir.addImage("img");
  rect.vel.x = 2;
  rect.vel.y = 6;
  rect.bounce = 0;
  //cir.bounce = 0;
  cir.shapeColor = color("red")
  cir.stroke = color("red")
  //cir.addImage(img);
  //cir.vel.x = 90;
  //img.resize(150, 150)
  movement();
  walls();
  alienGroup = new Group();
  alien();
  line = new Sprite(cir.position.x, cir.position.y, 60, 5, 'n');
  line.moveTo(mouseX, mouseY);
}

function delAlien(cir, alien) {
  alien.remove();
}
function movement() {
  let speed = 40;
  let slow = 0;
  document.addEventListener("keydown", function(event) {
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
      cir.vel.x = -slow;
    } else if (event.code === "KeyD") {
      cir.vel.x = slow;
    } else if (event.code === "KeyW") {
      cir.vel.y = -slow;
    } else if (event.code === "KeyS") {
      cir.vel.y = slow;
    }
  });
}
function alien() {
  for (i = 0; i < 5; i++) {
    alien = new Sprite(random(1, windowWidth), random(1, windowHeight), 80, 80);
    alien.shapeColor = color("black");
    alien.vel.x = random(1, 10);
    alien.vel.y = random(1, 10);
    alien.bounciness = 0;
    alien.friction = 0;
    alienGroup.add(alien);
  }
}
//function shot() {

//}
function walls() {
  wallLH = new Sprite(0, height / 2, 30, height, 'k');
  wallLH.shapeColor = color("black");
  wallRH = new Sprite(width, height / 2, 30, height, 'k');
  wallRH.shapeColor = color("black");
  wallTop = new Sprite(0, 0, width * 2, 30, 'k');
  wallTop.shapeColor = color("black");
  wallBot = new Sprite(width, height, width * 2, 30, 'k');
  wallBot.shapeColor = color("black");
}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  background('#ceddf5');
  //cir = new Sprite(300, 300, 300);
  cir.collides(alienGroup, delAlien);
  //cir.moveTo(mouseX, mouseY, 1000);
  rect.bounciness = 0;
  if (mouse.presses()) {
    shot = new Sprite(cir.position.x, cir.position.y, 40);
    shot.moveTowards(mouseX, mouseY);
    shot.setSpeed(400);
  }
  cir.rotateTo(mouse, 50);
}

/*******************************************************/
//  END OF APP
/*******************************************************/