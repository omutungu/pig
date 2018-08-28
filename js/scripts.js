//business logic
var contestant1="";
var contestant2="";

var throwdice = function () {
  return Math.floor(6*Math.random())+1;
}

function contestant(turn) {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.turn = turn;
  this.contestantName;
}

// checking for 1
contestant.prototype.rollone = function() {
  if (this.roll === 1) {
  this.tempscore = 0;
  alert("Sorry " + this.contestantName + ", you rolled a 1! Your turn is over!")
  // this.changeturn();
  } else {
  this.tempscore += this.roll;
  }
}

// hold
contestant.prototype.hold = function () {
  this.totalscore += this.tempscore;
  this.tempscore = 0;
  // this.changeturn();
  alert(this.contestantName + ", your turn is over, pass the mouse!");
}

// // changing turn
// contestant.prototype.changeturn = function () {
//   if (this.roll ===1) {
//     this.turn = false;
//   } else {
//     this.turn = true;
//   }
// }
// check for 100
contestant.prototype.winnerCheck = function () {
  if (this.totalscore >= 100) {
    alert(this.contestantName + " You are the winner!");
  }
}

contestant.prototype.newGame = function () {
  //debugger;
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.contestantName ="";
}

var clearValues = function(){
  $(".contestant1Name").val("");
  $(".contestant2Name").val("");
}

// User Interface
$(document).ready(function() {

  $("button#start").click(function(event){
    contestant1 = new contestant(true);
    contestant2 =  new contestant(false);
    $(".contestant-console").show();
    $(".start-menu").hide();

    var contestant1Name = $(".contestant1Name").val();
    $("#contestant1Name").text(contestant1Name);

    var contestant2Name = $(".contestant2Name").val();
    $("#contestant2Name").text(contestant2Name);

    contestant1.contestantName=contestant1Name;
    contestant2.contestantName=contestant2Name;

  });
  $("button#new-game").click(function(event){
    $(".contestant-console").hide();
    clearValues();
    contestant1.newGame();
    contestant2.newGame();
    $("#round-total-1").empty();
    $("#total-score-1").empty();
    $("#die-roll-1").empty();
    $("#round-total-2").empty();
    $("#total-score-2").empty();
    $("#die-roll-2").empty();

    $(".start-menu").show();
  });

  $("button#contestant1-roll").click(function(event){
    contestant1.roll = throwdice();
    $("#die-roll-1").text(contestant1.roll);
    contestant1.rollone();
    $("#round-total-1").text(contestant1.tempscore);
  });

  $("button#contestant2-roll").click(function(event){
    contestant2.roll = throwdice();
    $("#die-roll-2").text(contestant2.roll);
    contestant2.rollone();
    $("#round-total-2").text(contestant2.tempscore);
  });

  $("button#contestant1-hold").click(function(event){
    contestant1.hold();
    $("#total-score-1").text(contestant1.totalscore);
    $("#round-total-1").empty();
    $("#die-roll-1").empty();
    contestant1.winnerCheck();
  });

  $("button#contestant2-hold").click(function(event){
    contestant2.hold();
    $("#total-score-2").text(contestant2.totalscore);
    $("#round-total-2").empty();
    $("#die-roll-2").empty();
    contestant2.winnerCheck();
  });

});
