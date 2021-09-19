var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  level++;
  userClickedPattern = [];
  $("#level-title").text("Level : " + level);
}
// nextSequence();

function playSound(x) {
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key To Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function animatePress(x) {
  $("#" + x).addClass("pressed");

  setTimeout(function () {
    $("#" + x).removeClass("pressed");
  }, 100);
}
var started = false;
var level = 0;


addEventListener("keypress", function () {
  if (!started) {
    nextSequence();
    //  $("#level-title").text("Level : " + level);

    started = true;
  }
});


    


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
