/************************************************************

    The final few functions in here should be moved into a
    new manager likely called "GameEngine.js" as it contains
    the functions related to making the game fun and playable

************************************************************/

/**
 * Creates the player
 */
function createPlayer (xPos,spriteName) {
    
    var spriteHeight = game.cache.getImage(spriteName).height;
    var playerCreate = game.add.sprite(xPos,294.1,spriteName,3);
    
    // Enable physics for the sprite
    game.physics.enable(playerCreate, Phaser.Physics.ARCADE);
    
    // Don't allow the sprite to go off screen
    playerCreate.body.collideWorldBounds = true;
    
    playerCreate.animations.add('right', [6, 7, 8], 10, true);
    playerCreate.animations.add('left', [3, 4, 5], 10, true);
    playerCreate.animations.add('attack', [12, 13, 14], 10, true);
    
    return playerCreate;
    
}

/**
 * Creates the ground for the game
 */
function createGameGround () {
    
    var floor = game.add.sprite(0, ScreenData.gameHeight, null)
    
    game.physics.enable(floor, Phaser.Physics.ARCADE);
    
    floor.body.setSize(ScreenData.gameWidth, ScreenData.gameHeightBuffer, 0, 0);
    floor.body.collideWorldBounds = true;
    
    return floor;
}

/**
 * Creates the health bar on screen
 */
function createHealthBar () {
    
    // Create health bar background group
    var hBarGroupBG = game.add.group();
    hBarGroupBG.enableBody = true;
    
    // Create health bar group
    var hBarGroup = game.add.group();
    hBarGroup.enableBody = true;
    
    // Base health bar position
    var hBarXpos = 32;
    
    // Create 2 health bars
    for(i = 0; i < 2; i++) {
        var hBarBGImg = hBarGroupBG.create(0,0,'healthBarBG');
        var hBar = hBarGroup.create(0,0,'healthBarRed');
        
        // Fix the health bar to the camera
        hBar.fixedToCamera = true;
        hBarBGImg.fixedToCamera = true;
    
        if(i == 1) {
            hBarXpos = ScreenData.viewportWidth - 232;
        }
    
        hBarBGImg.cameraOffset.setTo(hBarXpos-10, 28);
        hBar.cameraOffset.setTo(hBarXpos, 35);
    
        // Set the initial size of the health bar
        hBar.body.setSize(200,30,0,0);
    
        // Don't allow gravity so it stays in place
        hBar.body.allowGravity = false;
        hBarBGImg.body.allowGravity = false;
    }
    
    return hBarGroup;
    
}

/**
 * Converts the character names into user readable ones
 */
function getCharName (charName) {
    
    var name;
    if(charName == 'playerLeo') {
        name = 'Leoneidus';
    }
    else if (charName == 'playerBoud') {
        name = 'Boudica';
    }
    else {
        name = 'Cleopatra';
    }
    return name;
    
}

/**
 * Adds the character names to the play state.
 */
function addCharNames (charName,enemyName) {

    var chosenName = getCharName(charName);
    var charNamesText = game.add.text(0, 0, chosenName, {font: "25px Calibri", fill: "#ffffff", stroke: "#362f2d", strokeThickness: 4});
    charNamesText.fixedToCamera = true;
    charNamesText.cameraOffset.setTo(32, 65);
    var oponentName = getCharName(enemyName);
    var EnemyNameText = game.add.text(0, 0, oponentName, {font: "25px Calibri", fill: "#ffffff", stroke: "#362f2d", strokeThickness: 4});
    EnemyNameText.fixedToCamera = true;
    EnemyNameText.cameraOffset.setTo(ScreenData.viewportWidth - 232, 65);
    
}
