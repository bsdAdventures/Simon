var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var clickedPatterns = [];

var level = 0;

var gameStarted = false;

//function thats generates random color sequence, animated squares and plays sound
function nextSequence() {
  level++;
  $("#level-title").text(`level ${level}`);

  var ranNumber = Math.floor(Math.random() * 3) + 1;

  var randomChosenColor = buttonColors[ranNumber];

  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`)
    .fadeIn(250)
    .fadeOut(250)
    .fadeIn(250);

  playSound(randomChosenColor);
}

//push color into array, play sound, animate and check anwsers
$(`.btn`).click(function(e) {
  var clickedColor = $(this).attr("id");
  clickedPatterns.push(clickedColor);

  playSound(clickedColor);
  animatePress(clickedColor);

  console.log(clickedPatterns.length - 1);

  checkAnswer(clickedPatterns.length - 1);
});

//chnage text and start next sequence
$(document).keypress(function(e) {
  if (!gameStarted) {
    if (e.which == 97) {
      $("#level-title").text(`level ${level}`);
      nextSequence();
      gameStarted = true;
    }
  }
});

//play sound function
function playSound(color) {
  var sound;

  switch (color) {
    case "red":
      sound = new Audio("./sounds/red.mp3");
      sound.play();
      break;
    case "blue":
      sound = new Audio("./sounds/blue.mp3");
      sound.play();
      break;

    case "green":
      sound = new Audio("./sounds/green.mp3");
      sound.play();
      break;

    case "yellow":
      sound = new Audio("./sounds/yellow.mp3");
      sound.play();
      break;
    case "wrong":
      sound = new Audio("./sounds/wrong.mp3");
      sound.play();
      break;

    default:
      break;
  }
}

//animate when pressed
function animatePress(currentColor) {
  var pressedAnimation = $(`#${currentColor}`).addClass("pressed");

  setTimeout(function() {
    pressedAnimation.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickedPatterns[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (clickedPatterns.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    var gameOver = $("body").addClass("game-over");

    setTimeout(function() {
      gameOver.removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
