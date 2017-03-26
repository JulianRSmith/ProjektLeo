////////////////////////////////////////////////////////////////////////////////
//                                  common.js                                 //
////////////////////////////////////////////////////////////////////////////////
//     This file contains common functions used repeatdly across the game     //
////////////////////////////////////////////////////////////////////////////////

var mainSound;
var mainBattle;

var userChar;
var userChosen = false;

// Make keyboard keys global
var key_Space; 
var key_Left; 
var key_Right;
var key_Up; 
var key_Down;
var key_A;
var key_S;

/**
 * Create a tiled background that repeats along the x axis
 */
function tiledBackgroundX (imageName) {
    
    var imgWidth = game.cache.getImage(imageName).width;
    
    for (i = 0; i<screenWidth;i += imgWidth) {
        var background = game.add.tileSprite(i, 0, imgWidth, imgWidth, imageName);
    }
    
}

/**
 * Creates a button in the middle of the screen
 */
function createBtnMid (imgName, yPos, actionOnClick) {
    
    var btnMid = game.add.button(game.world.centerX, yPos, imgName, actionOnClick, this, 2, 1, 0);
    btnMid.anchor.x = 0.5;
    btnMid.anchor.y = 0.5;
    
    return btnMid;
    
}

/**
 * Creates the character portraits in the char.js file
 */
function createCharArt (imgPosition,imgName) {
    
    var charArt = game.add.sprite(imgPosition,270,imgName,5);
    charArt.anchor.x = 0.5;
    charArt.anchor.y = 0.5;
    charArt.inputEnabled = true;
    charArt.animations.add('hover', [1, 2, 3], 5, true);
    charArt.frame = 1;
    
    return charArt;
    
}

/**
 * Creates a static text based button
 */
function createLabelButton(btnTxt, btnX, btnY, btnCol, btnSprite, callBack, hoverFunct, outFunct){
    
    var lbBtnBg = game.add.sprite(btnX, btnY, btnSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
    var lbBtn = game.add.text(btnX, btnY, btnTxt, { font: '18px Arial', fill: btnCol, boundsAlignH: "center", boundsAlignV: "middle" });
    
    lbBtn.inputEnabled = true;
    lbBtn.events.onInputUp.add(callBack, this);
    lbBtn.events.onInputOver.add(hoverFunct, this);
    lbBtn.events.onInputOut.add(outFunct, this);
    lbBtn.anchor.x = 0.5;
    lbBtn.anchor.y = 0.5;
    
    lbBtnBg.inputEnabled = true;
    lbBtnBg.events.onInputUp.add(callBack, this);
    lbBtnBg.events.onInputOver.add(hoverFunct, this);
    lbBtnBg.events.onInputOut.add(outFunct, this);
    lbBtnBg.anchor.x = 0.5;
    lbBtnBg.anchor.y = 0.5;
    
    return [ lbBtn, lbBtnBg ];
}

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
    
    // Create the player animations
    playerCreate.animations.add('right', [6, 7, 8], 10, true);
    playerCreate.animations.add('left', [3, 4, 5], 10, true);
    playerCreate.animations.add('attack', [12, 13, 14], 10, true);
    
    return playerCreate;
    
}

/**
 * Creates the ground for the game
 */
function createGameGround () {
    
    var floor = game.add.sprite(0, gameHeight, null)
    
    game.physics.enable(floor, Phaser.Physics.ARCADE);
    
    floor.body.setSize(gameWidth, gameHeightBuffer, 0, 0);
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
        var hBarBGImg = hBarGroupBG.create(0,0,'hBarBG');
        var hBar = hBarGroup.create(0,0,'hBarRed');
        
        // Fix the health bar to the camera
        hBar.fixedToCamera = true;
        hBarBGImg.fixedToCamera = true;
    
        if(i == 1) {
            hBarXpos = viewportWidth - 232;
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
 * Adds the character names to the play state.
 */
function addCharNames (charName) {
    
    var name;
    
    if(charName == 'playerKingL') {
        name = 'King Leoneidus';
    }
    else {
        name = 'Cleopatra';
    }
    
    var charNamesText = game.add.text(0, 0, name, {font: "25px Calibri", fill: "#ffffff", stroke: "#362f2d", strokeThickness: 4});
    charNamesText.fixedToCamera = true;
    charNamesText.cameraOffset.setTo(32, 65);
    
}

/**
 * Change cursor to pointer state.
 */
function labelHover(btnRef) {
    
    this.game.canvas.style.cursor = "pointer";
    
}

/**
 * Change the cursor to the default state.
 */
function labelOut(btnRef) {
    
    this.game.canvas.style.cursor = "default";
    
}


/**
 * Checks if the client is connected to the server
 * Returns: true (connected to server) | false (not connected to server)
 */
function networkState() {
    
    return networkConnected;
    
}

/**
 * Sends game back to menu state.
 */
function returnMenuOnClick() {
    
    game.state.start("menu");
    
}

/**
 * Toggles a visibility of hidden menus in the DOM.
 */
function menuToggle(id) {
    
	if($('#'+id).css('display') == 'none') {
		game.paused = true;
		
		$('#'+id).fadeIn();
	}
	else {
		game.paused = false;
		
		$('#'+id).fadeOut();
	}
	
}

/**
 * Saves the server settings (IP and PORT)
 */
function saveSettings() {
    
    menuToggle('server-settings');
    
    if($("#server-ip").val() != "" && $('#server-port').val() != "") {
        network.disconnect();
        
        serverHost = $('#server-ip').val();
        serverPort = $('#server-port').val();
        
        menuToggle('ss-confirm');
    }
    else {
        menuToggle('ss-error');
    }
    
}
