var buttonColours = ["red", "blue", "green", "yellow"]; //my colours
var gamePattern = []; //empty array
var userClickedPattern = [];
var started = false;
var level  = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
 });


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

 function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("true");
    if(userClickedPattern.length === gamePattern.length){
      
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
   }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);

    $("#level-title").text("Game over! Press any key to restart");

    startOver();
  }
}

function nextSequence(){
  userClickedPattern = []; 
  level++;
  $("#level-title").text("level " + level);
var arrayLength = buttonColours.length
var randomNumber = Math.floor(Math.random() * arrayLength); //random number in array
var randomChosenColour = buttonColours[randomNumber]; //chooses random colour from array
gamePattern.push(randomChosenColour); //pushes random colour into empty array



//animation
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour)
}

function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play(); 
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
