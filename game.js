
var userClickedPattern=[];
var buttonColor=["red", "blue", "green", "yellow"];
var gamePattern=[];
var level = 0;
var toggle=false;

function nextSequence(){
  userClickedPattern=[];
  level ++;
  $("#level-title").text("Level " + level);

    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);

});

function playSound(name ){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();

}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}
/// calling next sequence for the first time///

$(document).on ("keypress",function(){
  if (toggle==false)  {
    $("#level-title").text("level "+ level);
    nextSequence();
    toggle=true;
  }

} );

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
 {
   console.log("success");
   if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
   }
 }
 else {
   console.log("fail");
   var failAudio=new Audio("sounds/wrong.mp3");
   failAudio.play();
   $("body").addClass("game-over");


   setTimeout(function(){
   $("body").removeClass("game-over");
  },200);

  $("#level-title").text("Game Over! Press any key to restart");

    startOver();

 }

}
 function startOver(){
   level=0;
   gamePattern=[];
   toggle=false;

 }
