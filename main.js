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
    "copypasta": directory + "/JSON/copypasta.json",
    "discordmeme": directory + "/JSON/discord memes.json",
    "eightball": directory + "/JSON/eightball.json",
    "fino": directory + "/JSON/fino.json",
    "roast": directory + "/JSON/roasts.json"
};

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const bitly = new bitlyAPI({
    clientID: config.bitlyID,
    clientSecret: config.bitlySecret
});

function waifu(message, guild) {
    message.shift();
    if (message[0] === "add") {

    } else if (message[0] === "remove") {

    } else if (message[0] === "rate") {

    }

}

function sarcasm(message) {
    message.shift();
    message = message.join(" ").split("")
    for (let i = 0; i < message.length; i++) {
        let rng = randomInt(2)
        if (rng === 0) {
            message[i] = message[i].toUpperCase();
        }
    }
    return message.join("");
}

function JSONManipulation(messageArr, exclusion) {
    messageArr[0] = messageArr[0].replace("!", "");
    let addCommand = null;

    if (messageArr[0] === "add") {
        addCommand = messageArr.shift();
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
            messageArr[1] = Math.floor(Math.random() * JSONLength) + 1;
        }
        console.log(messageArr[1]);
        let JSONOutput = parsedJSON[messageArr[1]];
        return JSONOutput;
    }
    else if (addCommand !== null && exclusion === false) { //append new link to file
        link = messageArr[1];
        console.log(link);
        parsedJSON[JSONLength + 1] = messageArr[1];
        console.log(JSONLength);
        fs.writeFileSync(JSONFiles[messageArr[0]], JSON.stringify(parsedJSON, link, 2));
        if (config.updateChannel === true) {
            console.log("Finding channel");
            //console.log(msg.guild.channels.find(channel => channel.name === "#discord-memes"));
        }
        return "Link assigned to No. " + (JSONLength + 1);
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

            if (msg.startsWith(config.prefix + "help")) {
                message.channel.send(`Commands available:
!discordmeme - Shows a random meme that has been made over the ages. 
!copypasta - Shows a random copypasta from a limited catalogue. (DEPRICATED)
!f - Press f to pay respects. 
!x - Press x to doubt.
!roast - Roasts either a user of your choice or a random user.Great for getting someones attention.
!ping - Returns pong.Should display the latency too. (DEPRICATED)
!beef - When people have a bit o' beef between one another
!artwork - Displays beautiful artwork made throughout the ages
!fino - Displays a beautiful fino platter face
!s - With required text after the command, returns the text, but sarcasticially. 
!ratemywaifu - Does what it says. (DEPRICATED)
!howgayis - Uses coding and algorithms to calculate how gay someone is. (DEPRICATED)`)
            }
            if (msg.startsWith(config.prefix + "f")) {
                message.channel.send("https://i.kym-cdn.com/entries/icons/original/000/017/039/pressf.jpg")
            }
            if (msg.startsWith(config.prefix + "x")) {
                message.channel.send("https://i.kym-cdn.com/photos/images/original/001/354/591/17c.png")
            }
            if (msg.startsWith(config.prefix + "beef")) {
                message.channel.send("https://cdn.discordapp.com/attachments/417100544017039370/432599310824112138/beef.png")
            }

            if (msg.startsWith(config.prefix + "s")) {
                message.channel.send(sarcasm(message.content.trim().split(/ +/g)));
            };

            if (msg.startsWith(config.prefix + "waifu")) {
                message.channel.send()
            }
        };
    });
    client.login(config.discordToken);
}


catch (err) {
    console.log(err);
}
