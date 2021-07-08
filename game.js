var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keypress(function(e){//use e.key to acces keypress
  if(!started){
      $("h1").text("level   "+level);

      nextSequence();
      started=true;
  }
});

function playsound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();

}

function animantePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function (){
    $("."+currentColor).removeClass("pressed");
  },100);


}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //alert(userChosenColour+" clicked");
  // console.log(userClickedPattern);
  playsound(userChosenColour);
  animantePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){

    console.log("right answer");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){ nextSequence();},1000);

    }

  }else{
    console.log("wrong  answer");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over Press Any Key to Restart");
    startOver();


  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}


function nextSequence(){
  userClickedPattern=[];

  level++;
  $("h1").text("level   "+level);
  var num=Math.floor(4*Math.random());
  var randomChosenColour=buttonColors[num];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
  // var sounds=new Audio("sounds/"+randomChosenColour+".mp3");
  // sounds.play();
}
