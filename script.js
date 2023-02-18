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

function setup() {
  console.log("setup: bob");
  cnv = new Canvas(windowWidth, windowHeight);
  rect = new Sprite(300, 300, 30, 30, 'd');
  cir = new Sprite(windowWidth / 2, windowHeight / 2, 75, 75, 'd');
  shot = new Sprite(cir.position.x, cir.position.y, 40, 'd');
  cir.rotationSpeed = 0;
  rect.rotationSpeed = 40;
  rect.vel.x = 2;
  rect.vel.y = 6;
  rect.bounce = 0;
  cir.shapeColor = color("red")
  cir.stroke = color("red")
  /** IMG **/
  //cir.addImage(img);
  //img.resize(150, 150)
  /** IMG **/
  shotGroup = new Group();
  movement();
  wallGroup = new Group();
  walls();
  alienGroup = new Group();
  alien();
  line = new Sprite(cir.position.x, cir.position.y, 60, 5, 'n');
  line.moveTo(mouseX, mouseY);
}

function delAlien(cir, alien) {
  cir.vel.x = 0;
  cir.vel.y = 0;
  alien.remove();
}

function delShot(shot, alien) {
  alien.remove();
  shot.remove();
}
function delWall(cir, wall) {
  cir.vel.x = 0;
  cir.vel.y = 0;
  //cir.remove();
}
function movement() {
  let speed = 10;
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
function walls() {
  let w = 30
  wallLH = new Sprite(0, height / 2, w, height, 's');
  //wallLH.shapeColor = color("black");
  wallRH = new Sprite(width, height / 2, w, height, 's');
  //wallRH.shapeColor = color("black");
  wallTop = new Sprite(0, 0, width * 2, w, 's');
  //wallTop.shapeColor = color("black");
  wallBot = new Sprite(width, height, width * 2, w, 's');
  //wallBot.shapeColor = color("black");
  wallGroup.add(wallLH);
  wallGroup.add(wallRH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
  //wallGroup.shapeColor = color("black");
}



/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  background('#ceddf5');
  cir.collides(alienGroup, delAlien);
  cir.collides(wallGroup, delWall);
  cir.rotateTo(mouse, 50);
  if (mouse.presses()) {
    shot();
  }
  shot.collides(alienGroup, delShot);
  //cir.moveTo(mouseX, mouseY, 1000);
  rect.bounciness = 0;


}

function shot() {
  //let shot;  
  console.log("asdfb");
    
  // shot = createSprite(cir.position.x, cir.position.y, 40);
  // shot.setSpeed(20, cir.rotation);
  // shotGroup.add(shot);

}
/*******************************************************/
//  END OF APP
/*******************************************************/


    // shot = new Sprite(cir.position.x, cir.position.y, 40, 'd');
    // //shot.moveTowards(mouseX, mouseY);
    // shot.setSpeed(20, cir.rotation);
    // shotGroup.add(shot);