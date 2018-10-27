$(document).ready(function() {
    // jQuery ease-of-access variables
    let enemies = $("#enemies_content");
    let defender = $("#defender_content");
    let gameLog = $("#game_log");
    let player = $("#player_content");

    // Game Phases
    let startScreen = $("#startScreen");
    let gameScreen = $("#gameScreen");
    let gameOverScreen = $("#gameOverScreen")

    // Game mechanics
    let game = {
        playerChosen: false,
        enemyChosen: false,
        enemiesDefeated: 0
    }

    $("#atk-btn").click(function() {
        attack();
    })

    $("#resetGame").click(function() {
        resetGame();
    })

    $("#closeGame").click(function() {
        alert("May the Force be With You!")
        self.close();
    })

    // Start Character Set-up
    let vader = {};

    let yoda = {};

    let grievous = {};

    let luke = {};

    function resetStats() {
        vader.name = "Darth Vader";
        vader.HP = 210;
        vader.AP = 40;
        vader.CAP = 40;
        vader.reference = $("#Vader");

        yoda.name = "Yoda";
        yoda.HP = 200;
        yoda.AP = 50;
        yoda.CAP = 50;
        yoda.reference = $("#Yoda");

        grievous.name = "General Grievous";
        grievous.HP = 290;
        grievous.AP = 30;
        grievous.CAP = 30;
        grievous.reference = $("#Grievous");

        luke.name = "Luke Skywalker";
        luke.HP = 340;
        luke.AP = 20;
        luke.CAP = 20;
        luke.reference = $("#Luke");
    }

    resetStats();

    let characters = [yoda, vader, grievous, luke];
    // Adding properties
    for (let i = 0; i < characters.length; i++) {
        let currentChar = characters[i];
        // Adding onClick event
        currentChar.reference.click(function() {
            move(currentChar);
        });

        // Adding character names
        currentChar.reference.find(".char_name").text(currentChar.name)
        updateHP(currentChar);
    }

    let user;
    let enemy;
    // End Character Set-up

    function updateHP(char) {
        for (let i = 0; i < characters.length; i++) {
            char.reference.find(".char_hp").text(char.HP);
        }
    }

    function move(character) {
        // if player hasn't been selected
        if (!game.playerChosen) {
            // clicked character moves to "player" section
            player.append(character.reference.detach())
            user = character;

            // everyone else moves to "enemies" section 
            for(let i = 0; i < characters.length; i++) {
                if (character !== characters[i]) {
                    enemies.append(characters[i].reference.detach());
                }
            }
            startScreen.hide();
            gameScreen.show();
            

            game.playerChosen = true;
        
        // if the player has already been chosen, but the enemy hasn't been chosen
        } else if (game.playerChosen && !game.enemyChosen) {
            defender.append(character.reference.detach());
            game.enemyChosen = true;
            enemy = character;
            gameLog.html("");
            if (game.enemiesDefeated >= 2) {
                $("#enemies").hide();
            }
        }
    }

    function attack() {
        if (game.playerChosen && game.enemyChosen) {
            user.HP -= enemy.AP;
            enemy.HP -= user.AP;
            updateHP(user);
            updateHP(enemy);
            
            if (user.HP > 0 && enemy.HP > 0) {
                gameLog.html(
                    user.name + " did " + user.AP + " damage to " + enemy.name + "<br>" +
                    enemy.name + " did " + enemy.AP + " damage to " + user.name
                );
            } else if (user.HP <= 0) {
                // lose
                $("#gameOverText").text("lose")
                gameOverScreen.show();
                gameScreen.hide();
            } else if (enemy.HP <= 0) {
                enemy.reference.hide();
                game.enemyChosen = false;
                game.enemiesDefeated++;

                gameLog.html(user.name + " defeated " + enemy.name);

                if (game.enemiesDefeated >= 3) {
                    // win
                    $("#gameOverText").text("win")
                    gameOverScreen.show();
                    gameScreen.hide();
                }
            }

            user.AP += user.CAP;
        }
    }

    function resetGame() {
        resetStats()
        for (let i = 0; i < characters.length; i++) {
            characters[i].reference.show();
            characters[i].reference.detach().appendTo("#img_col");
            updateHP(characters[i]);
        }

        startScreen.show();
        gameScreen.hide();
        gameOverScreen.hide();
        $("#enemies").show();

        game.playerChosen = false;
        game.enemyChosen = false;
        game.enemiesDefeated = 0;

        gameLog.text("");
    }

    resetGame();
});