# Classic Arcade Game Clone

The Game is played by using arrow keys.

The Player should cross across three lines on which ladybugs are moving with different speed.

The speed is determined by the random function:

```
function randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
```

The values of `min`and `max`can be changed to make the game more faster.

The enemies (ladybugs) are initiated at -200 of the Y axis so that they start moving a bit earlier that they are actually visible. As they have different speeds they can appear quite unexpectedly.

The player collision with the ladubugs is checked with the following code:

```
if (Math.abs(this.x - player.x) <= 50 &&
        Math.abs(this.y - player.y) <= 60) {
        // console.log("Sprites collided!"); <-- for testing the collisions
        gameReset();
    }
```

If the player has reached the upper part of the canvas, the following code is checking it:

```
function winDetection(player) {
    if (player.y >= 0 && player.y <= 20 ) {
        gameReset();
        return true;
    }
}
```

It the function `winDetection(player)` returns `true` then the following code adds to the DOM a message:

```
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
```

After 2 seconds the message disappears and new game can be started.