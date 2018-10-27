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
        enemyChosen: false
    }

    $("#attack").click(function() {
        attack();
    })

    let enemiesDefeated = 0;

    // Start Character Set-up
    let vader;
    let yoda;
    let grievous;
    let luke;

    function setStats() {
        vader = {
            name: "Darth Vader", 
            HP: 150,
            AP: 30,
            CAP: 25,
            reference: $("#Vader"),
        }
    
        yoda = {
            name: "Yoda",
            HP: 75,
            AP: 25,
            CAP: 25,
            reference: $("#Yoda")
        }
    
        grievous = {
            name: "General Grievous",
            HP: 100,
            AP: 35,
            CAP: 35,
            reference: $("#Grievous")
        }
    
        luke = {
            name: "Luke Skywalker",
            HP: 120,
            AP: 25,
            CAP: 25,
            reference: $("#Luke")
        }
    }
    setStats();


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
            startScreen.addClass("hidden");
            gameScreen.removeClass("hidden");
            

            game.playerChosen = true;
        
        // if the player has already been chosen, but the enemy hasn't been chosen
        } else if (game.playerChosen && !game.enemyChosen) {
            defender.append(character.reference.detach());
            game.enemyChosen = true;
            enemy = character;
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
                gameOverScreen.removeClass("hidden");
                gameScreen.addClass("hidden");
            } else if (enemy.HP <= 0) {
                enemy.reference.hide();
                game.enemyChosen = false;
                enemiesDefeated++;

                if (enemiesDefeated >= 3) {
                    // win
                    $("#gameOverText").text("win")
                    gameOverScreen.removeClass("hidden");
                    gameScreen.addClass("hidden");
                }
            }

            user.AP += user.CAP;
        }
    }

    // buildStartScreen();
    /*
    To do (primary):
        add reset button which appears when the game is over
        update attack power and starting HP of all characters
    To do (secondary):
        update style of game log
        update style of starting game screen (only the characters and "select your character" on screen)
    Random ideas:
    Use an array for defeated enemies -- require ALL enemies to be defeated
    before game ends (or if player is defeated)
        check if array contains "false"
        if it doesn't, the game is over (i.e. all have defeated = true)
    */
});