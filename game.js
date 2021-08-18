userClickedPattern = []
gamePattern = []
level = -1
buttonColors = ["red", "blue", "green", "yellow"]
//////////////////////////////////////////////////////////

function nextSeq() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
  level = level + 1
  $('h1').text("Level " + level)
  userClickedPattern = []
}


function playSound(name) {
  (new Audio("sounds/" + name + ".mp3")).play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function getAnswers(currentlevel) {
  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("success")

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSeq()
      }, 1000);
    }
  } else {
    (new Audio("wrong.mp3")).play();
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game over, Refresh the page to restart.")
  }
}


//////////////////////////////////////////////////////////
$("body").keyup(function () {
  $('h1').text("Level " + level)
  nextSeq()
})

$(".btn").click(function (event) {
  userChosenColor = this.id
  userClickedPattern.push(userChosenColor)
  playSound(this.id)
  animatePress(this.id)
  getAnswers(userClickedPattern.length-1)
})

//////////////////////////////////////////////////////////
