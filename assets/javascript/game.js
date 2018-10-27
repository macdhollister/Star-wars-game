$(document).ready(function() {
    // jQuery ease-of-access variables
    let charSelect = $("#char_select");
    let enemies = $("#enemies_content");
    let defender = $("#defender_content");
    let gameLog = $("#game_log");
    let player = $("#player_content");

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
    let vader = {
        name: "Darth Vader", 
        HP: 150,
        AP: 30,
        CAP: 25,
        reference: $("#Vader"),
    }

    let yoda = {
        name: "Yoda",
        HP: 75,
        AP: 25,
        CAP: 25,
        reference: $("#Yoda")
    }

    let grievous = {
        name: "General Grievous",
        HP: 100,
        AP: 35,
        CAP: 35,
        reference: $("#Grievous")
    }

    let luke = {
        name: "Luke Skywalker",
        HP: 120,
        AP: 25,
        CAP: 25,
        reference: $("#Luke")
    }

    let characters = [yoda, vader, grievous, luke];
    // Adding properties
    for (let i = 0; i < characters.length; i++) {
        currentChar = characters[i];
        // Adding onClick event
        currentChar.reference.click(function() {
            move(characters[i]);
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
                buildWinScreen("lose");
            } else if (enemy.HP <= 0) {
                enemy.reference.hide();
                game.enemyChosen = false;
                enemiesDefeated++;

                if (enemiesDefeated >= 3) {
                    // win
                    buildWinScreen("win");
                }
            }

            user.AP += user.CAP;
        }
    }


    function buildWinScreen(winLose) {
        $("body").empty()

        $("body")
        .append(
            $("<div class='container'>")
            .append(
                $("<div class='row'>")
                .append(
                    $("<div class='col' id='gameOver'>")
                    .append(
                        $("<h1 id='winOrLose'>").text("You " + winLose + "!")
                    )
    
                    .append(
                        $("<h3>").text("Play again?")
                    )
    
                    .append(
                        $("<div class='container'>")
                        .append(
                            $("<div class='row'>")
                            .append(
                                $("<div class='col-6'>")
                                .append(
                                    $("<button class='btn btn-primary'>").text("Yes")
                                )
                            )
    
                            .append(
                                $("<div class='col-6'>")
                                .append(
                                    $("<button class='btn btn-danger'>").text("No")
                                )
                            )
    
                        )
                    )
                )
            )
        );
    }

    function buildStartScreen() {
        $("body").empty();

        $("body")
        .append(
            $("<div class='container'>")
            .append(
                $("<div class='row'>")
                .append(
                    $("<div class='col'>")
                    .append(
                        $("<h1 id='charChoose'>")
                        .text("Choose Your Character!")
                    )
                )
            )

            .append(
                $("<div class='row'>")
                .append(
                    $("<div class='col' id='img_col'>")
                    .append(
                        $("<img class='startImage' src='assets/images/darth_vader.png'>")
                    )
                    .append(
                        $("<img class='startImage' src='assets/images/general_grievous.jpg'>")
                    )
                    .append(
                        $("<img class='startImage' src='assets/images/Luke_Skywalker.jpg'>")
                    )
                    .append(
                        $("<img class='startImage' src='assets/images/yoda.jpg'>")
                    )
                )
            )
        )
    }

    buildStartScreen();


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