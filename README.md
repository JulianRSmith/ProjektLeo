## Projekt Leo - Internet Games Design and Development
Multiplayer game built on Pomelo and Phaser


## Requirements
* NodeJS + NPM
* Windows, Linux or OSX


## Setup
* Clone the repository to your local machine: `git clone https://github.com/JulianRSmith/ProjektLeo.git`, SSH will work, too.
* Install Pomelo: `npm install pomelo -g` (remove `-g` if you don't like to store packages globally).
* Install Pomelo dependencies:
* * Windows: `npm-install.bat` (inside the `server` directory).
* * Linux: `npm-install.sh` (inside the `server` directory).


## Starting Servers
Note: Pomelo comes with a built-in web-server. Projekt Leo will run directly from file system, but we do recommend you run it from this web-server.

* Game Server:
* * Starting: Run `! Start Gameserver.bat` or `cd game-server && pomelo start`.
* * Stopping: Run `! Stop Gameserver.bat` or `cd game-server && pomelo stop`.
* * Killing: Run `! Kill Gameserver.bat` or `cd game-server && pomelo kill` (only if server hangs/freezes).


* Web Server:
* * Starting: Run `! Start Webserver.bat` or `cd web-server && node app`.
* * Stopping: CTRL+C or closing the window will stop the server.


## Credits:
Julian Smith (https://github.com/JulianRSmith)
Ashley Scott (https://github.com/XenoWarrior)
Will Bradley (https://github.com/wmjb10)