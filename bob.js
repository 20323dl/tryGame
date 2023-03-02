function setup() {
  console.log("setup: ");
  cnv = new Canvas(windowWidth, windowHeight);
  rect = new Sprite(windowWidth/2, windowHeight/2, 50, 20, 'd');
  rect.shapeColor = color("cyan");
  rect.vel.x = 0;
  movement();
  wallGroup = new Group();
  walls();
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  background('lightgrey');
  rect.rotateTowards (mouse.x, mouse.y);
}



/********************************************************/
// When the mouse is clicked, create a bullet
/********************************************************/
function mouseClicked(){
    // Create the bullet sprite
  bullet = new Sprite(rect.x, rect.y, 10, 'd');
  bullet.shapeColor = color("red");
    // Move the bullet to the edge of the gun and set it's rotation
  setBulletPosition(rect, bullet)
    // Fire the bullet!
  bullet.setSpeed(20);
  bullet.moveTowards(mouseX, mouseY);
  //debug(bullet.direction);
}


/********************************************************/
// setBulletPosition(_gun, _round)
// This function takes the _gun (the sprite the bullet comes out of) and the _round (the bullet)
// It:
//    sets the heading of the _round to the same heading as the _gun
//    Calculates the distance from the center of the _gun to the center of the _round
//    Sets the position of the _round to just outside the _gun
//
// Taken from Mr Gillies' tank game
/********************************************************/
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

// Display debug messages to the top of the HTML page
// function debug(_msg){
//   debug_field.innerHTML = _msg;
// }

function movement() {
  let speed = 40;
  let slow = 0;
  document.addEventListener("keydown", function(event) {
    if (event.code === "KeyA") {
      rect.vel.x = -speed;
    } else if (event.code === "KeyD") {
      rect.vel.x = speed;
    } else if (event.code === "KeyW") {
      rect.vel.y = -speed;
    } else if (event.code === "KeyS") {
      rect.vel.y = speed;
    }
  });
  document.addEventListener("keyup", function(event) {
    if (event.code === "KeyA") {
      rect.vel.x = slow;
    } else if (event.code === "KeyD") {
      rect.vel.x = slow;
    } else if (event.code === "KeyW") {
      rect.vel.y = slow;
    } else if (event.code === "KeyS") {
      rect.vel.y = slow;
    }
  });
}

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