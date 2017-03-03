// Creates a button in the middle of the screen
function createBtnMid (imgName,yPos,actionOnClick) {
    
    var btnMid = game.add.button(game.world.centerX, yPos, imgName, actionOnClick, this, 2, 1, 0);
    btnMid.anchor.x = 0.5;
    btnMid.anchor.y = 0.5;
    return btnMid;
    
}