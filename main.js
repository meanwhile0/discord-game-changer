try {
    var discord = require("discord.js");
}
catch (e) {
    console.log("You need to run 'npm install'!");
    process.exit(1);
}

try {
    var auth = require("./auth.json");
}
catch (e) {
    console.log("auth.json is missing! Grab the example file from the github please!");
    process.exit(1);
}

var readline = require("readline");

var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

var client = new discord.Client();

client.on("ready", function() {
    console.log("Successfully authenticated!");

    console.log("This app will set which game you're playing on Discord. Leave the input blank to reset it.");
    rl.question("Game: ", function(game) {
        if (game === "") {
            console.log("Resetting game");
        }
        else {
            console.log("Setting game to " + game);
        }

        client.setPlayingGame(game);

        process.exit(1);
    });
});

client.on("disconnected", function() {
    console.log("Disconnected!");
    process.exit(1);
});

client.login(auth.email, auth.password);