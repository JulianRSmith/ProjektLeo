/************************************************************

    LobbyState.js

    State for the lobby create/select screen.
    
************************************************************/

var LobbyState = {

    serverText: 0,
    lobbyText: 0,
    lobbyPage: 0,

    lobbyList: [],
    lobbyCache: [],

    buttonMenu: 0,
    buttonRefreshLobby: 0,
    buttonCreateLobby: 0,
    buttonServerDisconnect: 0,

    nextState: 0,
    prevState: 0,

    create: function () {

        // Set state
        PlayerData.currentState = "LobbyState";

        // For debug
        ConsoleManager.log("LobbyState::create() : Running", false);

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        ConsoleManager.log("Joining zone: [Lobby Zone]", true);
        sfs.send(new SFS2X.JoinRoomRequest("Lobby Zone"));

        // Text objects
        this.serverText = game.add.text(10, 40, '', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText.setTextBounds(0, 30, ScreenData.screenWidth, 50);
        
        // Menu buttons 
        this.buttonCreateLobby = GUIManager.createButton('Create Lobby', ScreenData.viewportWidth / 2 - (110*3), ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", function(){ $('#lobby-host').val(PlayerData.playerName); DOMManager.menuToggle("lobby-create"); });
        this.buttonRefreshLobby = GUIManager.createButton('Refresh List', ScreenData.viewportWidth / 2 - (110*1), ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.refreshOnCreate);
        this.buttonMenu = GUIManager.createButton('Menu', ScreenData.viewportWidth / 2 + (110*1), ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.menuOnClick);
        this.buttonServerDisconnect = GUIManager.createButton('Disconnect', ScreenData.viewportWidth / 2 + (110*3), ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.disconnectOnClick);

        // Lobby buttons
        this.buttonNextPage = GUIManager.createButton('>', ScreenData.viewportWidth / 2 + 460, ScreenData.viewportHeight / 2, '#341e09', "buttonGreenArrowNormal", this.nextPageOnClick);
        this.buttonPrevPage = GUIManager.createButton('<', ScreenData.viewportWidth / 2 - 460, ScreenData.viewportHeight / 2, '#341e09', "buttonGreenArrowNormal", this.prevPageOnClick);
        this.buttonPrevPage[1].angle = 180;

        this.refreshOnCreate();

    },

    render: function() {

        this.serverText.setText(
            "Server: " + SettingsManager.serverIP + ":" + SettingsManager.serverPort + 
            " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected" + 
            " | Page: " + (LobbyState.lobbyPage + 1) + 
            "\nPlayer: [ID: " + PlayerData.playerId + ", Name: " + PlayerData.playerName + "]"
        );
        
    },
    

    // modified to seamlessly integrate the way SFS does things
    refreshOnCreate: function() {

        // For debug
        ConsoleManager.log("LobbyState::refreshOnCreate() : Running", false);
        ConsoleManager.log("Fetching lobby list...", true);

        var rooms = sfs.roomManager.getRoomList();
        var source = [];

        console.log(rooms);

        var roomCount = 0;
        for (i = 0; i < Object.keys(rooms).length; i++)
        {
            var room = rooms[i];

            if (room.isGame && !room.isPasswordProtected && !room.isHidden)
            {
                console.log(room);

                LobbyState.lobbyCache[roomCount] = {
                    id: room.id,
                    name: room.name,
                    slots: room.maxUsers,
                    players: {},
                    count: room.userCount,
                    started: room.getVariable(SFS2X.ReservedRoomVariables.RV_GAME_STARTED).value,
                    baseobj: room
                }

                roomCount++;
            }
        }

        LobbyState.updateLobbyList();

    },
    
    createOnClick: function() {
        // For debug
        ConsoleManager.log("LobbyState::createOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        if($('#lobby-name').val().length > 20) { 
            ConsoleManager.warning("Lobby name must be less than 21 characters.", true);
        }
        else if($('#lobby-name').val().length < 1) { 
            ConsoleManager.warning("Lobby name must be more than 0 characters.", true);
        }
        else {
            DOMManager.menuToggle('lobby-create');

            if(NetworkManager.connected()){
                if ($("#gameNameIn").val() != "")
                {
                    // Basic game settings
                    var settings = new SFS2X.SFSGameSettings($('#lobby-name').val());
                    settings.groupId = "games";
                    settings.maxUsers = 2;
                    settings.minPlayersToStartGame = 2;
                    settings.isPublic = true;
                    settings.leaveLastJoinedRoom = true;
                    settings.notifyGameStarted = true;
         
                    // Send CreateSFSGame request
                    sfs.send(new SFS2X.CreateSFSGameRequest(settings));
                }
            }
        }
    },
    
    nextPageOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::nextPageOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        LobbyState.lobbyPage++;
        LobbyState.updateLobbyList();

    },
    
    prevPageOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::prevPageOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        LobbyState.lobbyPage--;
        LobbyState.updateLobbyList();

    },
    
    menuOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::menuOnClick() : Running", false);

        AudioManager.gameButtonClick.play();
        
        game.state.start("MenuState");
    
    },

    disconnectOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::disconnectOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        NetworkManager.disconnect();

    },
    
    updateLobbyList: function() {

        // For debug
        ConsoleManager.log("LobbyState::updateLobbyList() : Running", false);
        ConsoleManager.log("Current page: " + LobbyState.lobbyPage, false);
        
        for(i = 0; i < 5; i += 1) {
            if(i >= LobbyState.lobbyList.length) {
                ConsoleManager.log("End of lobby list", false);
                ConsoleManager.log(LobbyState.lobbyList, false);

                break;
            }
            
            LobbyState.lobbyList[i][0].destroy();
            LobbyState.lobbyList[i][1].destroy();
        }
        
        this.nextState = ((LobbyState.lobbyPage + 1) * 5 < Object.keys(LobbyState.lobbyCache).length);
        this.prevState = (LobbyState.lobbyPage > 0);
        
        // Text layer
        this.buttonNextPage[0].inputEnabled = this.nextState;
        this.buttonNextPage[0].alpha = this.nextState;
        this.buttonPrevPage[0].inputEnabled = this.prevState;
        this.buttonPrevPage[0].alpha = this.prevState;
        
        // Image layer
        this.buttonNextPage[1].inputEnabled = this.nextState;
        this.buttonNextPage[1].alpha = this.nextState;
        this.buttonPrevPage[1].inputEnabled = this.prevState;
        this.buttonPrevPage[1].alpha = this.prevState;
        
        for(i = 0; i < 5; i++) {
            item = i + (5 * LobbyState.lobbyPage);
            
            if(Object.keys(LobbyState.lobbyCache).length < item + 1) {
                ConsoleManager.log("End of lobby list.", false);
                break;
            }

            ConsoleManager.log(
                "Found lobby: [id: " + LobbyState.lobbyCache[item].id + 
                ", name: " + LobbyState.lobbyCache[item].name + 
                ", host: " + LobbyState.lobbyCache[item].host + 
                ", slots: " + LobbyState.lobbyCache[item].slots + 
                ", players: " + LobbyState.lobbyCache[item].players + "]",

                false
            );

            LobbyState.lobbyList[i] = GUIManager.createLobbyButton(
                // Lobby name
                'Lobby: ' + LobbyState.lobbyCache[item].name, 
                
                // Button position
                ScreenData.viewportWidth / 2, 
                160 + (70 * i), 

                LobbyState.lobbyCache[item].baseobj,

                // Button style
                '#FFFFFF', // Text
                "buttonBlueBarNormal", // Button image

                // OnClick Callback
                function(spr, ptr, bool, args){ 

                    // Debug
                    ConsoleManager.log("Cleaning up...", false);

                    // Cleanup so that we don't get the lobby in list if we disconnect
                    for(i = 0; i < 5; i += 1) {
                        if(i >= LobbyState.lobbyList.length) {
                            ConsoleManager.log("End of lobby list", false);
                            ConsoleManager.log(LobbyState.lobbyList, false);

                            break;
                        }
                        
                        ConsoleManager.log("Destroy [" + i + "]", false);
                        
                        LobbyState.lobbyList[i][0].destroy();
                        LobbyState.lobbyList[i][1].destroy();
                    }

                    // Debug
                    ConsoleManager.log("Connecting to lobby:<br>" + args._id + ":" + args._name + " as " + PlayerData.playerName, true);

                    // Connect
                    sfs.send(new SFS2X.JoinRoomRequest(args)); 
                }
            );
        }
    }
}