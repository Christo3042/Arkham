const Discord = require("discord.js");
const ms = require("ms");
const Enmap = require("enmap");

exports.run = (client, message, args) => {

    const key = `${message.guild.id}-${message.author.id}`;
    let pollChannel = message.guild.channels.find("name", "bot-testing");
    let reason = message.content.split(' ').splice(2).join(' ');
    let server = args[0];
    let serverList = ["skyblock", "skyblock1", "skyblock2", "prison", "factions", "skywars", "towny", "creative", "eco", "ecosurvival", "eco-survival", "kitpvp", "discord"];
    if (!pollChannel) return message.reply("Invalid Channel.");
    
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(`${message.author.username}, you must have **Mod** or above to use this!`)

    if (!reason) return message.author.send("Please submit a valid suggestion!") && message.delete()
    if (!server) return message.author.send("Please submit a valid server!") && message.delete()
    if(!serverList.some(word => message.content.includes(word))) return message.author.send("Please submit a valid server: skyblock, prison, factions, skywars, towny, creative, ecosurvival, kitpvp, discord")

    client.suggest.set(key, {
        suggest: reason,
        server: server
    });

    message.delete();

    let getPoll = client.suggest.get(key, "suggest");
    let getServer = client.suggest.get(key, "server");

    if (message.channel.id === "488506401946075137") {

        let pollEmbed = new Discord.RichEmbed()
        .setColor("#006400")
        .addField("Suggestion For", `${getServer}`)
        .addField(`${message.author.tag}'s Suggestion`, `${getPoll}`)
        .setTimestamp(new Date());

        message.channel.send(pollEmbed)

        .then(function(message) {
            setTimeout(function() {
                message.react("✅");
            }, ms("1s"));
            setTimeout(function() {
                message.react("🤷");
            }, ms("2s"));
            setTimeout(function() {
                message.react("❌");
            }, ms("3s"));
        }).catch(function() {
        });
    } else {
        message.reply("Please use the suggestions channel for this."); 
    }
}

exports.help = {
    name: "suggest"
}