/* ************************************ main ********************************* */
function setup() {
  console.log("setup: bob");
  cnv = new Canvas(windowWidth, windowHeight);
  rect = new Sprite(300, 300, 30, 30, 'd');
  cir = new Sprite(windowWidth / 2, windowHeight / 2, 75, 75, 'd');
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
  movement();
  wallGroup = new Group();
  walls();
  // alienGroup = new Group();
  // alien();
  line = new Sprite(cir.position.x, cir.position.y, 60, 5, 'n');
  line.moveTo(mouseX, mouseY);
}
/* ************************************ main ********************************* */

/* *********************** delFunctions ******************** */
function delAlien(cir, alien) {
  alien.remove();
}
function delWall(cir, wall){
  cir.vel.x = 0;
  cir.vel.y = 0;
  //cir.remove();
}
/* *********************** delFunctions ******************** */

/* *********************** movement ******************** */
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
/* *********************** movement ******************** */


/* *********************** walls ******************** */
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
/* *********************** walls ******************** */


/* *********************** alien ******************** */
// function alien() {
//   for (i = 0; i < 5; i++) {
//     alien = new Sprite(random(1, windowWidth), random(1, windowHeight), 80, 80);
//     alien.shapeColor = color("black");
//     alien.vel.x = random(1, 10);
//     alien.vel.y = random(1, 10);
//     alien.bounciness = 0;
//     alien.friction = 0;
//     alienGroup.add(alien);
//   }
// }
/* *********************** alien ******************** */


/* *********************** draw ******************** */
function draw() {
  background('#ceddf5');
  //cir = new Sprite(300, 300, 300);
  // cir.collides(alienGroup, delAlien);
  // cir.collides(wallGroup, delWall);
  //cir.moveTo(mouseX, mouseY, 1000);
  // if (mouse.presses()) {
  //   shot = new Sprite(cir.position.x, cir.position.y, 40, 'd');
  //   shot.moveTowards(mouseX, mouseY);
  //   shot.setSpeed(400);
  // }
  mouseClicked();
  setBulletPosition();
  cir.rotateTowards(mouse, 50);
}
/* *********************** draw ******************** */



function mouseClicked(){
    // Create the bullet sprite
  bullet = new Sprite(cir.x, cir.y, 10, 'd');
  bullet.shapeColor = color("red");
    // Move the bullet to the edge of the gun and set it's rotation
  setBulletPosition(cir, bullet)
    // Fire the bullet!
  bullet.setSpeed(2);
  //debug(bullet.direction);
}

function setBulletPosition(_gun, _round) {
  // Set the rotation of the _round to the same as the _gun
  _round.rotation = _gun.rotation
  _round.direction = _gun.direction

  // Calculate the offset to the edge of the gun (plus the width of the bullet)
  deg = _gun.rotation;
  rads = deg * Math.PI / 180;  // Convert degrees to radians

  h = _gun.w / 2 + _round.w/2; // h is the distance from the center of the _gun to the center of the _round
  offsetX  = h * Math.cos(rads);
  offsetY  = h * Math.sin(rads);

  // Move the _round to the edge of the gun
  _round.x = _gun.x + offsetX;
  _round.y = _gun.y + offsetY;
}
/*******************************************************/
//  END OF APP
/*******************************************************/