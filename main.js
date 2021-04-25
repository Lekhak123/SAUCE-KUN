const Discord = require("discord.js");
const sagiri = require("sagiri");
const config = require('./config.json');
const client = new Discord.Client();
const {
    prefix
} = config;
const {
    sauce_token
} = config;
const {
    discord_token
} = config;
const sagiriclient = sagiri(sauce_token);
const nhentai = require('nhentai-js');
const sauce_command = (`${prefix}sauce`);
const doujin_command = (`${prefix}doujin`);
const extractUrls = require("extract-urls");


client.on('ready', () => {

    client.user.setActivity(`${sauce_command} for sauce `, {
        type: "LISTENING"

    });

});




client.on("message", async message => {

    if (message.author.bot) return;
    if (message.content.toLowerCase().startsWith(`${sauce_command}`)) {
        if (message.attachments.size > 0) {
            message.attachments.forEach(async Attachment => {
                try {
                    const results = await sagiriclient(Attachment.url)
                    const arara = new Discord.MessageEmbed()
                        .setColor('#DC143C')
                        .setTitle(`Link: ${results[0].url}`)
                        .setURL(results[0].raw.data.url)
                        .setThumbnail(message.author.avatarURL())
                        .addFields({
                            name: 'Source',
                            value: `${results[0].raw.data.source}`
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Similarity',
                            value: `${results[0].raw.header.similarity}`,
                            inline: true
                        }, {
                            name: 'Part/EP',
                            value: `${results[0].raw.data.part}`,
                            inline: true
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Release',
                            value: `${results[0].raw.data.year}`,
                            inline: true
                        }, {
                            name: 'Time Stamp',
                            value: `${results[0].raw.data.est_time}`,
                            inline: true
                        }, )
                        .setImage(results[0].raw.header.thumbnail)
                        .setFooter(`Requested by: ${message.author.tag}`);
                    await message.channel.send(arara);
                } catch (e) {
                    message.channel.send("Error!");
                }


            })
        }
        if (!message.attachments.size > 0 && message.content.includes("https://")) {
            let urls = extractUrls(message.content);
            const string = `${urls}`;
            var strr = string.replace(`${sauce_command}`, '');
            var link = strr.replace(' ', '')
            try {
                const results = await sagiriclient(link)
                const arara = new Discord.MessageEmbed()
                    .setColor('#DC143C')
                    .setTitle(`Link: ${results[0].url}`)
                    .setURL(results[0].raw.data.url)
                    .setThumbnail(message.author.avatarURL())
                    .addFields({
                        name: 'Source',
                        value: `${results[0].raw.data.source}`
                    }, {
                        name: '\u200B',
                        value: '\u200B'
                    }, {
                        name: 'Similarity',
                        value: `${results[0].raw.header.similarity}`,
                        inline: true
                    }, {
                        name: 'Part/EP',
                        value: `${results[0].raw.data.part}`,
                        inline: true
                    }, {
                        name: '\u200B',
                        value: '\u200B'
                    }, {
                        name: 'Release',
                        value: `${results[0].raw.data.year}`,
                        inline: true
                    }, {
                        name: 'Time Stamp',
                        value: `${results[0].raw.data.est_time}`,
                        inline: true
                    }, )
                    .setImage(results[0].raw.header.thumbnail)
                    .setFooter(`Requested by: ${message.author.tag}`);
                await message.channel.send(arara);

            } catch (e) {
                message.channel.send("Error!")

            }
        }



    }




    if (message.content.toLowerCase().startsWith(`${doujin_command}`)) {


        if (message.content.toLowerCase().includes("https://nhentai.net/g/")) {

            let urls = extractUrls(message.content);

            const string = `${urls}`;

            var araara = string.replace('https://nhentai.net/g/', '');
            var ara = araara.replace('/', '');



            (async () => {

                try {
                    if (nhentai.exists(`${ara}`)) { // checks if doujin exists
                        const dojin = await nhentai.getDoujin(`${ara}`)

                        const nhentaiembed = new Discord.MessageEmbed()
                            .setColor('#DC143C')
                            .setTitle("*LINK:*" + `  ${ara}`)
                            .setURL(string)

                            .setThumbnail(message.author.avatarURL())
                            .addFields({
                                name: 'Tags',
                                value: `${dojin.details.tags}`
                            }, {
                                name: '\u200B',
                                value: '\u200B'
                            }, {
                                name: "*TITLE:*",
                                value: `__${dojin.title}__`
                            })
                            .addField('Language', `${dojin.details.languages}`, true)
                            .addField('Requested by:', `${message.author.tag}`, true)


                        await message.channel.send(nhentaiembed);




                    }

                } catch (e) {
                    message.channel.send("Error!")

                }
            })();

        }




        if (message.content.toLowerCase().includes("https://www.nhentai.net/g/")) {

            let urls = extractUrls(message.content);

            const string = `${urls}`;

            var araara = string.replace('https://www.nhentai.net/g/', '');
            var ara = araara.replace('/', '');


            (async () => {
                try {
                    if (nhentai.exists(`${ara}`)) { // checks if doujin exists
                        const dojin = await nhentai.getDoujin(`${ara}`)

                        const nhentaiembed = new Discord.MessageEmbed()
                            .setColor('#DC143C')
                            .setTitle("*LINK:*" + `  ${ara}`)
                            .setURL(string)

                            .setThumbnail(message.author.avatarURL())
                            .addFields({
                                name: 'Tags',
                                value: `${dojin.details.tags}`
                            }, {
                                name: '\u200B',
                                value: '\u200B'
                            }, {
                                name: "*TITLE:*",
                                value: `__${dojin.title}__`
                            })
                            .addField('Language', `${dojin.details.languages}`, true)
                            .addField('Requested by:', `${message.author.tag}`, true)


                        await message.channel.send(nhentaiembed);




                    }
                } catch (e) {
                    message.channel.send("Error!")

                }
            })();

        }
    }

});




client.login(`${discord_token}`);