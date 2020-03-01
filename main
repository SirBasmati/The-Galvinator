const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bitlyAPI = require("node-bitlyapi");
const config = require("./JSON/config/config.json");
const path = require("path");
const directory = path.dirname(require.main.filename);
console.log(directory);
require("dotenv").config();
console.log(config.prefix);


const JSONFiles = {
    "artwork": directory + "/JSON/artwork.json",
    "brainlet": directory + "/JSON/brainlet.json",
    "copypasta": directory +  "/JSON/copypasta.json",
    "discordmeme": directory + "/JSON/discord memes.json",
    "eightball": directory + "/JSON/eightball.json",
    "fino": directory + "/JSON/fino.json",
    "roast": directory + "/JSON/roasts.json"
};

var x;

const bitly = new bitlyAPI({
    clientID: config.bitlyID,
    clientSecret: config.bitlySecret
});

function JSONManipulation(messageArr, exclusion) {
    messageArr[0] = messageArr[0].replace("!", "");
    let addCommand = null;
    console.log("=== first step ===");
    console.log(exclusion);
    console.log(messageArr);
    console.log(messageArr[0]);
    console.log(JSONFiles[messageArr[0]]);
    console.log("===");
    
    if (messageArr[0] === "add") {
        addCommand = messageArr.shift();
        console.log("=== append step ===");
        console.log(addCommand);
        console.log(messageArr);
        console.log("===");
    }

    try {
        var parsedJSON = JSON.parse(fs.readFileSync(JSONFiles[messageArr[0]]));
    }

    catch (err) {
        return console.log("invalid command - " + err);
    }

    let JSONLength = Object.keys(parsedJSON).length;


    if (addCommand === null) {
        if (typeof messageArr[1] === "undefined" || parseInt(messageArr[1]) > JSONLength || isNaN(messageArr[1]) === true || messageArr[1] === null || exclusion === true) {//overwrites old number and replaces it with a number within the jsons reach, these check to make sure we do that
            console.log("Redesignating messageArr[1] for valid input");
            messageArr[1] = Math.floor(Math.random() * JSONLength) + 1;
        }
        console.log(messageArr[1]);
        let JSONOutput = parsedJSON[messageArr[1]];
        console.log("returning output - " + JSONOutput);
        return JSONOutput;
    }
    else if (addCommand !== null && exclusion === false) { //append new link to file
        link = messageArr[2];
        shortenedLink = bitly.shorten(link);
        console.log(shortenedLink);
        parsedJSON[JSONLength + 1] = messageArr[1];
        console.log(JSONLength);
        fs.writeFileSync(JSONFiles[messageArr[0]], JSON.stringify(parsedJSON, null, 2));
        if (config.updateChannel === true) {
            console.log("Finding channel");
            //console.log(msg.guild.channels.find(channel => channel.name === "#discord-memes"));
        }
        return "Link appended to file at file " + JSONFiles[messageArr[0]] + " at value " + (JSONLength + 1);
    }
}


console.log("Loaded all modules");
try {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setPresence({ game: { name: "fortnite" }, status: "online" });
    });
    client.on("message", message => {
        var msg = message.content;
        var authorID = message.author.id;
        if (authorID !== 451895471305392138) {

            msg = msg.toLowerCase();
            msgSplit = msg.trim().split(/ +/g); //forms array - removes whitespace + splits at spaces
            msgSplit.length = 3;
            if (msg.bot !== true) {
                for (let i = 0; i < msgSplit.length; i++) { //message analysis
                    if (msgSplit[i] === "im" || msgSplit[i] === "i'm") {
                        let RNG = Math.floor(Math.random() * config.dadChance) + 1;
                        if (RNG === 1) {
                            let dadQuote = msgSplit.splice(i + 1);
                            dadQuote = dadQuote.join(" ");
                            console.log("Hi " + dadQuote + ", I'm dad!");
                        }
                    }
                    if (msgSplit[i] === "comedy" || msgSplit[i] === "comedgy") {
                        console.log(config.comedy);
                    }
                }
            }
            let guild = message.guild;

            if (msg.startsWith(config.prefix + "add") || msg.startsWith(config.prefix + "discordmeme") || msg.startsWith(config.prefix + "artwork")) {
                console.log("discordmeme/artwork invoked");
                message.channel.send(JSONManipulation(message.content.trim().split(/ +/g), false));
            }
            else if (msg.startsWith(config.prefix + "fino") || msg.startsWith(config.prefix + "roast")) {
                if (msg.startsWith(config.prefix + "roast")) {
                    console.log("Attempting to find a random ID");
                    var memberID = guild.members.randomKey();
                    console.log(memberID);
                    memberID = "<@" + memberID + ">";
                }
                else {
                    memberID = null;
                }
                message.channel.send(JSONManipulation(message.content.trim().split(/ +/g), true) + memberID);

            }

        }
    });
    client.login(config.discordToken);
}


catch (err) {
    console.log(err);
}



