// Enemies our player must avoid

// ENEMY part:

let Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = -200;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Code checks if the Player sprite address
    // is critically close to the Enemy sprite.
    // If yes, then a collision is detected.

    if (Math.abs(this.x - player.x) <= 50 &&
        Math.abs(this.y - player.y) <= 60) {
        // console.log("Sprites collided!");
        gameReset();
    }

    if (this.x < 505) {
        this.x += this.speed
    }
    else {
        this.x = -200;
        this.speed = randomSpeed(1,6);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy part end ---
// -------------------------------------------------------------
// PLAYER part:

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.speed = 20;
};


// sets Player moving speeds and boundaries crossing of which
// game resets.

Player.prototype.update = function(value) {

    // detects if the Player has reached the upper part of the
    // canvas resulting the win
    if (winDetection(this)) {
        // console.log('You won');
        congrWinner();
    }

    // Player movement logic:

    if (this.x >= 0 && this.x <= 400 &&
        this.y >= 0 && this.y <= 420 ) {

        if (value === 'left') {
            this.x = this.x - this.speed;
        }
        if (value === 'right') {
            this.x = this.x + this.speed;
        }
        if (value === 'up') {
            this.y = this.y - this.speed;
        }
        else if  (value === 'down') {
            this.y = this.y + this.speed;
        }
        // player moves are allowed only within set box
        // otherwise the player is reset.
    }
    else {
        this.reset();
    }
};

// Function winDetection(player) returns 'true' if the Palyes is in upper
// part of the canvas:

function winDetection(player) {
    if (player.y >= 0 && player.y <= 20 ) {
        gameReset();
        return true;
    }
}

// Code for injecting congratulatory massage into the DOM
// for the winner

function congrWinner() {
    let newDiv = document.createElement('div');
    document.body.appendChild(newDiv);
    newDiv.className = 'winner-text';

    let congrats = document.querySelector('.winner-text');
    congrats.innerText = 'You won!';

    setTimeout(function () {
        document.body.removeChild(newDiv);
    }, 2000)
}


Player.prototype.handleInput = function(keyPress) {
    this.update(keyPress);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// When player is reset, the x/y positions are given:
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

// Game reset code.

function gameReset() {
    player.reset();
    enemyOne.x = -300;
    enemyTwo.x = -300;
    enemyThree.x = -300;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let enemyOne = new Enemy(62);
let enemyTwo = new Enemy(145);
let enemyThree = new Enemy(225);

let allEnemies = [enemyOne, enemyTwo, enemyThree];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


