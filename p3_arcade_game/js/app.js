// Globals
var STEP_X = 101;
var STEP_Y = 83;

var ENEMY_MAX_X = 5 * STEP_X; 
var NUM_ENEMIES = 4;

var PLAYER_START_X = 2 * STEP_X;
var PLAYER_START_Y = 5 * STEP_Y;

var PLAYER_MIN_X = 0;
var PLAYER_MIN_Y = 0;
var PLAYER_MAX_X = 4 * STEP_X; 
var PLAYER_MAX_Y = 5 * STEP_Y; 

//Entity represents player, enemy or collectable in this game
var Entity = function(xStart, yStart, sprite) {
    this.x = xStart;
    this.y = yStart;
    this.sprite = sprite;
};
// Draw the entity on the screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(xStart, yStart) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/enemy-bug.png';
    var x = xStart;
    var y = yStart;
    Entity.call(this, x, y, sprite);
    this.speed = this.getSpeed(); 
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ENEMY_MAX_X) {
        this.x = -(Math.floor((Math.random() * 5) + 1) * STEP_X);
        this.y = Math.floor((Math.random() * 3) + 1) * STEP_Y;
        this.speed = this.getSpeed();
    } else {
        this.x += (this.speed * dt);
    }
};

// Generate a random speed between 100 and 200 for enemy
Enemy.prototype.getSpeed = function() {
    return Math.floor((Math.random() * 100) + 100);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/char-boy.png';    
    var x = PLAYER_START_X;
    var y = PLAYER_START_Y;
    Entity.call(this, x, y, sprite);
    this.score = 0;
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Reset the player's position and update
Player.prototype.update = function(dt) {
    // Reset the player's position and increase the score by 1 
    // if the player reach the water area
    if (this.y <= 0) {
        this.reset(1);
    }
};

Player.prototype.reset = function(playerScore) {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.score += playerScore;
    document.getElementById('score').innerHTML = this.score;
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            var leftPos = this.x - STEP_X;
            if (leftPos >= PLAYER_MIN_X) {
                this.x = leftPos;
            }
            break;
        case 'right':
            var rightPos = this.x + STEP_X;
            if (rightPos <= PLAYER_MAX_X) {
                this.x = rightPos;
            }
            break;
        case 'up':
            var upPos = this.y - STEP_Y;
            if (upPos >= PLAYER_MIN_Y) {
                this.y = upPos;
            }
            break;
        case 'down':
            var downPos = this.y + STEP_Y;
            if (downPos <= PLAYER_MAX_Y) {
                this.y = downPos;
            }
            break;
        default:
            console.log("The key cannot be recognized by the player. Key options: ['Left', 'Right', 'Up', 'Down'].");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < NUM_ENEMIES; i++) {
    var xStart = -(Math.floor((Math.random() * 5) + 1) * STEP_X);
    var yStart = Math.floor((Math.random() * 3) + 1) * STEP_Y;
    allEnemies.push(new Enemy(xStart, yStart));
}
 
var player = new Player();

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
