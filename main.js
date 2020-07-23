const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bitlyAPI = require("node-bitlyapi");
const config = require("./JSON/config/config.json");
const path = require("path");
const mkdirp = require("mkdirp");
const directory = path.dirname(require.main.filename);
require("dotenv").config();
console.log("Loaded all required modules");
var workingDirectory = directory + "/data/guilds/";

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

function JSONManipulation(contentArgs) {
    contentArgs[0] == messageArr[0].replace("!", "");

    try {
        var json = JSON.parse(fs.readFileSync(contentArgs[0]));
    } catch (err) {
        return "Invalid Command."
    }
    let length = Object.keys(json).length
    if (contentArgs[1] !== "add") {
        if (typeof contentArgs[1] === "undefined" || parseInt(mescontentArgssageArr[1]) > JSONLength || isNaN(contentArgs[1]) === true || contentArgs[1] === null) {
            messageArr[1] = Math.floor(Math.random() * JSONLength) + 1;
        }
        let JSONOutput = parsedJSON[messageArr[1]];
        return JSONOutput;
    } else if (contentArgs[1] === "add") {
        link = messageArr[1];
        parsedJSON[JSONLength + 1] = messageArr[1];
        fs.writeFileSync(JSONFiles[messageArr[0]], JSON.stringify(parsedJSON, link, 2));
        if (config.updateChannel === true) {
            console.log("Finding channel");
            //console.log(msg.guild.channels.find(channel => channel.name === "#discord-memes"));
        }
        return "Link assigned to No. " + (JSONLength + 1);
    }
}


function dadMode (content){
    for (let i = 0; i < content.length; i++) { 
        if (content[i] === "im" || content[i] === "i'm") {
            RNG = randomInt(config.dadChance);
            if (RNG === 1) {
                let dadQuote = msgSplit.splice(i + 1);
                dadQuote = dadQuote.join(" ");
                return dadQuote;
            }
        }
    }
}

try {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setPresence({ game: { name: config.status }, status: "online"});
    });
    client.on("guildCreate", () => {
        console.log(`Joined ${guild.name}`);
        let guildDir = workingDirectory + guild.id;
        mkdirp(guildDir).then(made =>
            jsonDir = guildDir + "/commands.json",
            fs.writeFile(jsonDir, "{}", { flag: "wx" }, function (err) {
                console.log("Commands JSON Created");
            }),
        )
        guild.roles.create({
            data: {
                name: "The Galvinator",
                permissions: "ADMINISTRATOR"
            },
            reason: "The Galvinator needs his own role."
        })
        guild.roles.create({
            data: {
                name: "The Overlord",
            },
            reason: "The Galvinator needs to knows who he can interact with."
        })
    });
    client.on("message", message => {
        var content = message.content;
        var contentArgs = content.split(" ");
        var authorID = message.author.id;
        var guildID = message.guild.id;
        if (message.bot !== true) {
            content = content.toLowerCase();
            if (config.dadMode === true) {
                message.channel.send(dadMode(contentArgs));
            } 
            if (config.commandMode === true) {
                let json = JSON.parse(fs.readFileSync(JSONFiles[messageArr[0]])); //TODO Cache the results;
                for (let i = 0; i < Object.keys(json).length; i++) {
                    if (content.startsWith(config.prefix + json[i])) {
                        JSONManipulation(json[i]);
                    }
                }
            }
            if (config.createCommands === true) {
                if (message.member.roles.has(message.guild.roles.find(role => role.name === "The Overlord"))){
                    JSONManipulation(contentArgs);
                }
            }
        }
    });

}
