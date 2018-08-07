# Classic Arcade Game Clone

Usage
------------------

Clone the game repository to your computer by using 

```git clone https://github.com/TanelS/memory_game.git```

or download the .zip file under `Clone of Download` button. 

Then find in the root directory a file `index.html` and run it some modern browser. If you downladed .zip file, the compressed file must me uncompressed first.

The Game is played by using arrow keys.

The Player should cross across three lines on which ladybugs are moving with different speed.

If you can make it across three lines without bumping into ladybirds you have won!

Technical (and boring) details
---------------------

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