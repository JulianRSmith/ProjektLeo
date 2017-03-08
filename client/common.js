////////////////////////////////////////////////////////////////////////////////
//                                  common.js                                 //
////////////////////////////////////////////////////////////////////////////////
//     This file contains common functions used repeatdly across the game     //
////////////////////////////////////////////////////////////////////////////////

// Make keyboard keys global
var key_Space; 
var key_Left; 
var key_Right;
var key_Up; 
var key_Down;

// Create a tiled background that repeats along the x axis
function tiledBackgroundX (imageName) {
    var imgWidth = game.cache.getImage(imageName).width;
    for (i = 0; i<screenWidth;i += 600){
        var background = game.add.tileSprite(i, 0, imgWidth, imgWidth, imageName);
    }
}

// Creates a button in the middle of the screen
function createBtnMid (imgName,yPos,actionOnClick) {
    var btnMid = game.add.button(game.world.centerX, yPos, imgName, actionOnClick, this, 2, 1, 0);
    btnMid.anchor.x = 0.5;
    btnMid.anchor.y = 0.5;
    return btnMid;
}

// Creates a button in the middle of the screen
function createBtnArt (imgName,yPos,actionOnClick,actionOnOver) {
    var btnMid = game.add.button(game.world.centerX, yPos, imgName, actionOnClick, this, 2,2,0);
    btnMid.anchor.x = 0.5;
    btnMid.anchor.y = 0.5;
    btnMid.animations.add('hover', [1, 2, 3], 10, true);
    btnMid.onInputOver.add(actionOnOver, this);
    return btnMid;
}

// Creates the player
function createPlayer (xPos,spriteName) {
    var playerCreate = game.add.sprite(xPos,32,spriteName,3);
    // Enable physics for the sprite
    game.physics.enable(playerCreate, Phaser.Physics.ARCADE);
    // Don't allow the sprite to go off screen
    playerCreate.body.collideWorldBounds = true;
    // Create the player animations
    playerCreate.animations.add('right', [6, 7, 8], 10, true);
    playerCreate.animations.add('left', [3, 4, 5], 10, true);
    return playerCreate;
}

function createLabelButton(btnTxt, btnX, btnY, btnCol, callBack){
    var lbBtn = game.add.text(btnX, btnY, btnTxt, { font: '18px Arial', fill: btnCol });
    lbBtn.inputEnabled = true;
    lbBtn.events.onInputUp.add(callBack, this);
    
    return lbBtn;
}
