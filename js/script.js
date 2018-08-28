//business logic
var player01="";
var player02="";


var throwthedice = function () {
  return Math.floor(6*Math.random())+1;
}

function Player(turn) {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.turn = turn;
  this.playerName;
}

// checking for 1
Player.prototype.rollone = function() {
  if (this.roll === 1) {
  this.tempscore = 0;
  alert("Sorry " + this.playerName + ", you rolled a 1! Your turn is over!")
  // this.changeturn();
  } else {
  this.tempscore += this.roll;
  }
}
// hold
Player.prototype.hold = function () {
  this.totalscore += this.tempscore;
  this.tempscore = 0;
  // this.changeturn();
  alert(this.playerName + ", your turn is over, pass the mouse!");
}

// // changing turn
// Player.prototype.changeturn = function () {
//   if (this.roll ===1) {
//     this.turn = false;
//   } else {
//     this.turn = true;
//   }
// }
// check for 100
Player.prototype.winnerAssess = function () {
  if (this.totalscore >= 100) {
    alert(this.playerName + " You are the winner!");
  }
}

Player.prototype.CommenceGame = function () {
  //debugger;
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.playerName ="";
}

var clearValues = function(){
  $(".player01Name").val("");
  $(".player02Name").val("");
}

// User Interface
$(document).ready(function() {

  $("button#start").click(function(event){
    player01 = new Player(true);
    player02 =  new Player(false);
    $(".player-console").show();
    $(".start-menu").hide();

    var player01Name = $(".player01Name").val();
    $("#player01Name").text(player01Name);

    var player02Name = $(".player02Name").val();
    $("#player02Name").text(player02Name);

    player01.playerName=player01Name;
    player02.playerName=player02Name;

  });
  $("button#new-game").click(function(event){
    $(".player-console").hide();
    clearValues();
    player01.CommenceGame();
    player02.CommenceGame();
    $("#Round").empty();
    $("#total-sum-1").empty();
    $("#die-roll-1").empty();
    $("#round-sum-1").empty();
    $("#sum-score-2").empty();
    $("#die-roll-2").empty();

    $(".start-menu").show();
  });

  $("button#player01-roll").click(function(event){
    player01.roll = throwthedice();
    $("#die-roll-1").text(player01.roll);
    player01.rollone();
    $("#Round").text(player01.tempscore);
  });

  $("button#player02-roll").click(function(event){
    player02.roll = throwthedice();
    $("#die-roll-2").text(player02.roll);
    player02.rollone();
    $("#round-sum-1").text(player02.tempscore);
  });

  $("button#player01-hold").click(function(event){
    player01.hold();
    $("#total-sum-1").text(player01.totalscore);
    $("#Round").empty();
    $("#die-roll-1").empty();
    player01.winnerAssess();
  });

  $("button#player02-hold").click(function(event){
    player02.hold();
    $("#sum-score-2").text(player02.totalscore);
    $("#round-sum-1").empty();
    $("#die-roll-2").empty();
    player02.winnerAssess();
  });

});
