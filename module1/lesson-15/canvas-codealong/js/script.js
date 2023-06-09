const myObstacles = [];

const myGameArea = {
  canvas: document.createElement('canvas'),
  frames: 0,
  stop: function () { // stop the game
      clearInterval(this.interval);
    },
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20); // execute updateGameArea every 20ms --> updateGameArea gets called 50 times per second
  },
  score: function () {
    const points = Math.floor(this.frames / 5);
    this.context.font = '18px serif';
    this.context.fillStyle = 'black';
    this.context.fillText(`Score: ${points}`, 350, 50);
  },
  clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};


// initialize the Game Area

class Component {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;

      this.speedX = 0; // used to update the X position
      this.speedY = 0; // used to update the Y position
    }
   
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos() { // updating the position of the Component
        this.x += this.speedX;
        this.y += this.speedY;
      }

      left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
     
      crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }

      jump(){
        // this.y needs to mimic a jump

        // this.y needs to decrease for a set time period
        // this.y needs to return back to it's initial position
      }
}

const player = new Component(30, 30, 'red', 0, 110); // generate the player 


function updateGameArea() { // updating our Game
    myGameArea.frames += 1; // 1sec ---> 50 frames 120 frames === 2.4s
    myGameArea.clear(); // clear Canvas
    player.newPos(); // update 
    player.update(); // update the player's position
    // update the backGround movement
    updateObstacles(); // draws obstacles on Canvas
    checkGameOver(); // check if player collides with one obstacle
    myGameArea.score();
}

function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1; // decreasing the X position of each obstacle by 1
        myObstacles[i].update(); // showing the new position of the obstacle
    }


    if (myGameArea.frames % 120 === 0) { // if myGameArea.frames === 0 || myGameArea.frames === x * 120
    // console.log(myGameArea.frames)
    // console.log(myObstacles)
      let x = myGameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(new Component(10, height, 'green', x, 0)); // at the end of the canvas screen, starting from the top
      myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
  }

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) { // checking if one obstacle collides with player
      return player.crashWith(obstacle);
    });
   
    if (crashed) {
      myGameArea.stop(); // stop the game
    }
  }


document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 32:
        location.reload(); // 
      case 38: // up arrow
      // trigger the jump
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
  });

document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
});

window.onload = myGameArea.start();

window.onload = function(){
  // document.getElementById('start-button').onclick = function(){
  //   startGame();
  // };
  document.getElementById('start-button').addEventListener('click', function(){
    startGame();
  })

  function startGame() {
    //write the logic to start the game here

  }
};