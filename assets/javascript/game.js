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
    
    // Start Character Set-up
    let vader = {
        name: "Darth Vader", 
        HP: 100,
        AP: 25,
        CAP: 25,
        isDead: false,
        reference: $("#Vader"),
    }

    let yoda = {
        name: "Yoda",
        HP: 100,
        AP: 25,
        CAP: 25,
        isDead: false,
        reference: $("#Yoda")
    }

    let grievous = {
        name: "General Grievous",
        HP: 100,
        AP: 25,
        CAP: 25,
        isDead: false,
        reference: $("#Grievous")
    }

    let luke = {
        name: "Luke Skywalker",
        HP: 100,
        AP: 25,
        CAP: 25,
        isDead: false,
        reference: $("#Luke")
    }

    let characters = [yoda, vader, grievous, luke];

    for (let i = 0; i < characters.length; i++) {
        characters[i].reference.click(/* ADD THE MOVEFUNCTION HERE*/);
    }

    // luke.reference.click(function(event) {
    //     alert("test");
    // });
    // End Character Set-up



    // let moveFunction = function(character) {
    function moveFunction(character) {
        // if player hasn't been selected
        if (!game.playerChosen) {
            // clicked character moves to "player" section
            player.append(character.reference.detach())

            // everyone else moves to "enemies" section 
            for(let i = 0; i < characters.length; i++) {
                if (character !== characters[i]) {
                    enemies.append(characters[i].reference.detach());
                }
            }

            game.playerChosen = true;
        } else if (game.playerChosen && !game.enemyChosen) {
            defender.append(character.reference.detach());
        }
    }

    // moveFunction(vader);
    // moveFunction(luke);

    // Random testing
    // var yoda = $("#Yoda");
    // var vader = $("#Vader");
    // var grievous = $("#Grievous");
    // var luke = $("#Luke");

    // player.append(yoda.detach());
    // enemies.append(vader.detach());
    // enemies.append(grievous.detach());
    // enemies.append(luke.detach());


    /*
    Idea for structure:

    Each character gets an object like the following
    let vader = {
        name: "Darth Vader", 
        HP: 100,            (use this to update char_name and char_hp)
        AP: 25,
        CAP: 25,
        isDead: false,
        reference: $("...")
    }


    From there, whichever the player selects gets assigned to a "player" variable
    which is used for game mechanics

    selected enemy could be assigned to "currentEnemy" variable
    when currentEnemy dies, delete that enemy


    Other ideas:
    Have a permanent "enemy" placeholder in the Defender area
    When an enemy is clicked, set its display to none and copy all of its
    attributes to the defender placeholder

    Game object for win/lose conditions?
    */
});