//Array of Character objects in the game

var gameChars = [

    luke = {
        firstName: "luke",
        name: "Luke Skywalker",
        attack: 15,
        baseAttack: 15,
        counterAttack: 16,
        health: 120,
        localDiv: "#lukeCard",
        isDefeated: false
    },
    obiwan = {
        name: "Obi-Wan Kenobi",
        attack: 11,
        baseAttack: 11,
        counterAttack: 7,
        health: 175,
        localDiv: "#obiwanCard",
        isDefeated: false
    },

    yoda = {
        name: "Yoda",
        attack: 6,
        baseAttack: 6,
        counterAttack: 21,
        health: 180,
        localDiv: "#yodaCard",
        isDefeated: false
    },

    vader = {
        name: "Darth Vader",
        attack: 7,
        baseAttack: 7,
        counterAttack: 16,
        health: 200,
        localDiv: "#vaderCard",
        isDefeated: false
    }
]
var enemiesDefeated = 0;    //Used for win condition
var chosenChar = null;      //Your character
var chosenEnemyChar = null; //Your current opponent
var gameState = "chooseChar"; 
var attackSnd = document.getElementById("attackSnd");
var gameMusic = document.getElementById("gameMusic");


//Used to turn on certain elements during the game
function turnOn(el) {
    $(el).css("display", "block")
};

//used to turn off certain elements during the game
function turnOff(el) {
    $(el).css("display", "none")
};

//handles the attack outcome and outputs results to console
function playerAttack() {
    gameChars[chosenEnemyChar].health = gameChars[chosenEnemyChar].health - gameChars[chosenChar].attack;
    $("#yourOutput").text("You hit " + gameChars[chosenEnemyChar].name + " for " + gameChars[chosenChar].attack + " points of damage!");
    $("#enemy .cardHP").text(gameChars[chosenEnemyChar].health);
    gameChars[chosenChar].health = gameChars[chosenChar].health - gameChars[chosenEnemyChar].counterAttack;
    $("#enemyOutput").text(gameChars[chosenEnemyChar].name + " hits you for " + gameChars[chosenEnemyChar].counterAttack + " points of damage!");
    $("#you .cardHP").text(gameChars[chosenChar].health);
};

//Let's you know you won
function youWin() {
    turnOn("#restartDiv");
    turnOff("#enemy");
    $("#yourOutput").text("You have won the game!");
    $("#enemyOutput").text("Your enemies cower before you!");
    };

//checks to see if you lost or if an opponent has been defeated

function defeatedTest() {
    if (gameChars[chosenChar].health <= 0) {
        $("#enemyOutput").text("You have been defeated by " + gameChars[chosenEnemyChar].name);
        gameState = "GameOver";
        turnOff("#attackDiv");
        turnOn("#restartDiv");
        alert("You have been defeated! Press restart to try again!")
    } else {
        if (gameChars[chosenEnemyChar].health <= 0) {
            $("#yourOutput").text("You have defeated " + gameChars[chosenEnemyChar].name);
            enemiesDefeated++;
            turnOff("#attackDiv")
            $(gameChars[chosenEnemyChar].localDiv).empty();
            chosenEnemyChar = null
            if (enemiesDefeated === 3) {
                gameState = "GameOver"
                youWin();
            } else {
                turnOn("#chooseEnemy");
                
            }

        }
    }
    gameChars[chosenChar].attack = gameChars[chosenChar].attack + gameChars[chosenChar].baseAttack ;
};


//click handler for clicking a character
$(document).ready(function () {    
    $(document).on("click", ".charBox", function () {
        gameMusic.play();
        if (gameState === "chooseChar" && chosenChar == null) {
            chosenChar = $(this).attr('data-character');
            var origin = $(this).html();
            var dest = $("#you").append(origin);
            turnOn("#you");
            turnOff("#choose");
            turnOn("#chooseEnemy");
            turnOn("#outputUI")
            $(this).remove();
            $("#yourOutput").text("You have chosen " + gameChars[chosenChar].name);
            gameState = "chooseEnemyChar"
        } else {
            if (gameState === "chooseEnemyChar" && chosenEnemyChar == null) {
                chosenEnemyChar = $(this).attr('data-character');
                var enemyOrigin = $(this).html();
                var enemyDest = $("#enemy").append(enemyOrigin);
                turnOff("#chooseEnemy");
                turnOn("#enemy");
                turnOn("#attackDiv");
                $(this).remove();
                $("#enemyOutput").text("You have chosen to fight " + gameChars[chosenEnemyChar].name);
            }
        }
    });
});
//click handler for clicking the attack button
$(document).on("click", ".attack", function () {
    if (gameChars[chosenEnemyChar].isDefeated == false) {
        attackSnd.currentTime = 0;
        attackSnd.play();
        playerAttack();
        defeatedTest();
    }
});

//click handler for clicking the restart button
$(document).on("click", ".restart", function () {
    location.reload();
});