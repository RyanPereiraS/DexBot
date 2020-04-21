require('dotenv').config()

const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require ("moment");
moment.locale('pt-BR');
const firebase = require("firebase");

var config = {
    apiKey: "AIzaSyAk_Mv9zU05lsPzUjyYWCqBTMPc4m_1_Yc",
    authDomain: "dex-botryan.firebaseapp.com",
    databaseURL: "https://dex-botryan.firebaseio.com",
    projectId: "dex-botryan",
    storageBucket: "dex-botryan.appspot.com",
    messagingSenderId: "318796750104",
    appId: "1:318796750104:web:174eea50a0c1dec233d26d",
    measurementId: "G-F8FM63MDKS"
};
firebase.initializeApp(config);

const database = firebase.database();


client.on('ready', () => {
    client.user.setPresence({ activity: { name: `!ajuda (RedeHeroes.net)`, type: 'STREAMING', url: 'https://www.twitch.tv/redeheroes'}, status: 'online'});
    console.log(`${client.user.username} Diz: Iniciando sistemas!`);
    console.log(`${client.user.username} Diz: Iniciando database!`);
    console.log(`${client.user.username} Diz: Coletando dados de xp`);
    console.log(`${client.user.username} Diz: Coletando dados de niveis`);
    console.log(`${client.user.username} Diz: Database iniciada!`);
    console.log(`${client.user.username} Diz: Iniciando comandos!`);
    console.log(`${client.user.username} Diz: Coletando prefix`);
    console.log(`${client.user.username} Diz: Coletando comandos`);
    console.log(`${client.user.username} Diz: Comandos iniciados!`);
    console.log(`${client.user.username} Diz: Todos os sistemas iniciados!`);
    console.log(`${client.user.username} Diz: Status: Ativo!`);
})

client.on('guildCreate', guild => {
    console.log(`O bot entrou na guild: ${guild.name} com ${guild.memberCount} Membros!`);
    
})

client.on('guildDelete', guild => {
    console.log(`O bot saiu de uma guild :c`);
})

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(process.env.PREFIX)) return;
    if(!message.channel.id([`692170744267931659`, `692979006982848562`]) return message.channel.send(`${message.author} | utilize os canais de comandos!)

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    const ref = database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`);
    const db = await ref.once('value');
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    let usermenc = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let cargomenc = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    console.log(`${message.author.tag}, usou o comando: | ${cmd} | em ${message.guild.name}, ${message.guild.id}`)
    if(cmd === "ping") {
        let botping = new Date() - message.createdAt;

        message.channel.send(`${message.author}`)
        var embed = new Discord.MessageEmbed()
            .setTitle("🏓 Pong:")
            .addField('BOT: ', Math.floor(botping) + 'ms')
            .setFooter(`${message.author.tag}`, message.author.avatarURL())
            .setColor("RANDOM").setTimestamp()

        message.channel.send(embed);
        
    }
    if(cmd === "serverinfo") {
        var guild = message.guild;
        let img = message.channel.guild.iconURL();
        var embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`)
            .setDescription("Informações do servidor")
            .setThumbnail(img)
            .addField(`Membros:`, ` ${message.guild.memberCount}`)
            .addField(`Dono: `, `${message.guild.owner}`)
            .addField(`ID: `, `${message.guild.id}`)
            .addField(`Região: `, `${message.guild.region}`)
            .addField("Entrou: ", moment(guild.joinedAt).format("LL"))
            .addField(`Criado: `, moment(guild.createdAt).format("LL"))
            .setFooter(`${message.author.tag}`, message.author.avatarURL())
            .setColor("RANDOM").setTimestamp()
        message.channel.send(embed);
        
    }
    if(cmd === "info") {
        if(message.guild.id != 685289860449566740) return message.author.send("Comando disponivel apenas no servidor de minecraft!, convite: https://discord.gg/Yj9Zrc5");
        var guild = message.guild.name;
        let img = message.channel.guild.iconURL();
        var embed = new Discord.MessageEmbed()
            .setAuthor(guild)
            .setDescription("Informações do servidor")
            .setThumbnail(img)
            .addField(`IP: `, `redeheroes.net`)
            .addField(`Site: `, `http://loja.redeheroes.net/`)
            .addField(`Dono: `, `${message.guild.ownerID}`)
            .setFooter(`${message.author.tag}`, message.author.avatarURL())
            .setColor("RANDOM").setTimestamp()
        message.channel.send(embed);
        
    }
    if(cmd === "ban") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!kUser) return message.channel.send("Não encontrei o usuário!");
        let kReason = args.join(" ").slice(22);
        if(kUser.id === 416958878467620865) return message.channel.send("Não posso banir meu criador!");
        if(!message.member.hasPermission(["BAN_MEMBERS", `ADMINISTRATOR`])) return message.channel.send("Sem permissão!");
        if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Não posso expulsar este usuário!");

        let autor = message.guild.name;
        let img = message.guild.iconURL();
        let imgauthor = message.author.avatarURL();
        var embed = new Discord.MessageEmbed()
               .setAuthor(autor)
                .setDescription(`<:naoincomodar:624603305451978782> Banido <:naoincomodar:624603305451978782>`)
                .addField(`Usuário: `, kUser)
                .addField("Aplicada por: ", `${message.author.tag}`)
                .addField(`Motivo:`, kReason)
                .setThumbnail(img)
                .setFooter(`${message.author.tag}`, imgauthor)
                .setColor("RANDOM").setTimestamp()
            message.channel.send(embed);
        message.guild.member(kUser).ban(kReason);
        
        
        
        return;
    }
    if(cmd === "kick") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!kUser) return message.channel.send("Não encontrei o usuário!");
        let kReason = args.join(" ").slice(22);
        if(kUser.id === 416958878467620865) return message.channel.send("Não posso expulsar meu criador!");
        if(!message.member.hasPermission([`ADMINISTRATOR`, `KICK_MEMBERS`])) return message.channel.send("Sem permissão!");
        if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Não posso expulsar este usuário!");

        let autor = message.guild.name;
        let img = message.guild.iconURL();
        let imgauthor = message.author.avatarURL();
        var embed = new Discord.MessageEmbed()
               .setAuthor(autor)
                .setDescription(`<:naoincomodar:624603305451978782> Expulso <:naoincomodar:624603305451978782>`)
                .addField(`Usuário: `, kUser)
                .addField("Aplicada por: ", `${message.author.tag}`)
                .addField(`Motivo:`, kReason)
                .setThumbnail(img)
                .setFooter(`${message.author.tag}`, imgauthor)
                .setColor("RANDOM").setTimestamp()
            message.channel.send(embed);
        message.guild.member(kUser).kick(kReason);
        
   
        return;
    }
    if(cmd === "nivel") {
        var guild = message.guild.name;
        let img = message.author.avatarURL();
        var embed = new Discord.MessageEmbed()
            .setAuthor(guild)
            .setDescription("<a:policia:643053729842724875> Seu nivel no servidor <a:policia:643053729842724875>")
            .addField("Xp:", `${db.val().xp}`)
            .addField("Nivel:", `${db.val().nivel}`)
            .setThumbnail(img)
            .setFooter(`${message.author.tag}`, img)
            .setColor("RANDOM").setTimestamp()
        message.channel.send(embed);
        
    }
    if(cmd === "userinfo"){
        
        let userinfo = {};
        userinfo.avatar = user.avatarURL()
        userinfo.name = user.username;
        userinfo.discrim = `${user.discrim}`;
        userinfo.id = user.id;
        userinfo.status = `${user.presence.activities}`;
        userinfo.registred = moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format("dddd, MMMM de, YYYY");
        userinfo.joinedAt = moment.utc(message.guild.members.cache.get(user.id).user.joinedAt).format("dddd, MMMM de, YYYY");
        let img = message.author.avatarURL()

            const embed = new Discord.MessageEmbed()
                .setAuthor(`Dex - Userinfo`)
                .setDescription(`Informações do usuário ${user.tag}`)
                .addField(`Nome: `, userinfo.name, true)
                .addField(`Id: `, userinfo.id, true)
                .addField(`Status: `, userinfo.status, true)
                .addField(`Conta criada à`, userinfo.registred, true)
                .addField(`Entrou em: `, userinfo.joinedAt, true)
                .setThumbnail(userinfo.avatar)
                .setFooter(`${message.author.tag}`, img)
                .setColor("RANDOM").setTimestamp()
            message.channel.send(embed)
            

        
    }
    if(cmd === "botinfo"){
        let botAvatar = client.user.displayAvatarURL()
        let date = client.user.createdAt;
        let userName = client.user.username;
        let img = message.author.displayAvatarURL()

        let embed = new Discord.MessageEmbed()
            .setAuthor('Dex - BotInfo')
            .setDescription(`Informações sobre mim`)
            .addField(':robot:|Nome do bot', userName)
            .addField(':clock1:|Estou online a', moment().to(client.startTime, true))
            .addField(':diamond_shape_with_a_dot_inside:|Criado em', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
            .addField(':card_index: | Convite', `!convite`)
            .addField(':gear:|Programador', '[Dev]UmGamer.js#6392')
            .setThumbnail(botAvatar)
            .setFooter(`${message.author.tag}`, img)
            .setColor("RANDOM").setTimestamp()
        message.channel.send(embed)


        function formatDate (template, date) {
            var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
            date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
            return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
              return template.split(specs[i]).join(item)
            }, template)
        }
        
    }
    if(cmd === "form"){
        if(!message.member.hasPermission([`ADMINISTRATOR`, `MANAGE_ROLES`])) return message.channel.send(`${message.author}, Você não tem permissão bobinho <:02smug:695647745968439336>`)
        if(!usermenc) return message.channel.send(`${message.author}, Quem eu devo promover? use: !form @user @cargo`)
        if(!cargomenc) return message.channel.send(`${message.author}, Qual cargo devo dar a essa pessoa? use: !form @user @cargo`)
        let nvstaffimg = usermenc.avatarURL();
        let img = message.author.avatarURL();
        let roleid = cargomenc.id;
        let menciname = usermenc.username;
        let cargomencname = cargomenc.name;
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`)
            .setDescription(`REGISTRO DE ALTERAÇÕES`)
            .addField(`${menciname}`, `Aprovado como ${cargomencname}`)
            .addField(`Esteja atento a este canal pois irão acontecer mais mudanças.`, `@staff`)
            .setThumbnail(nvstaffimg)
            .setFooter(`${message.author.tag}`, img)
            .setColor("RANDOM").setTimestamp()
        message.guild.member(usermenc).roles.add(roleid);
        await client.channels.cache.get(`685297377246314521`).send(embed)
        await client.channels.cache.get(`685297377246314521`).send("@here")
        
    }
    if(cmd === "ajuda"){
        let botimg = client.user.avatarURL();
        let img = message.author.avatarURL();
        message.channel.send(`${message.author}`)
        var ajuda = new Discord.MessageEmbed()
            .setAuthor("Dex - Ajuda")
            .setDescription("Olá eu sou um simples bot de discord que estou aqui para te ajuda com suas nescesidades")
            .addField("Comandos: ", "Use !comandos")
            .addField("Convite: ", "Use !convite")
            .setThumbnail(botimg)
            .setFooter(`${message.author.tag}`, img)
            .setColor("RANDOM").setTimestamp()
        message.channel.send(ajuda)
        
    }
    if(cmd === "convite"){
        let botimg = client.user.avatarURL();
        let img = message.author.avatarURL();
        var convite = new Discord.MessageEmbed()
            .setAuthor("Dex - Convite")
            .setDescription("Olá eu sou um simples bot de discord que estou aqui para te ajuda com suas nescesidades")
            .addField("Aqui esta meu convite!", `https://discordapp.com/oauth2/authorize?client_id=699710110699880449&scope=bot&permissions=8`)
            .setThumbnail(botimg)
            .setFooter(`${message.author.tag}`, img)
            .setColor("RANDOM").setTimestamp()

        message.author.send(convite)
        await message.channel.send(`${message.author} | Enviei meu convite no seu privado!`)
        
    }
    if(cmd === "comandos"){
        let botimg = client.user.avatarURL();
        var convite = new Discord.MessageEmbed()
            .setAuthor("Dex - Comandos")
            .setDescription("Olá eu sou um simples bot de discord que estou aqui para te ajuda com suas nescesidades")
            .addField("!ban @user motivo", `Expulsão permanente do seu servidor`)
            .addField("!kick @user motivo", `Expulse um usuário do seu servidor`)
            .addField("!info", `Temporariamente ativo apenas no servidor de minecraft do bot!`)
            .addField("!serverinfo", `Veja as informações do servidor!`)
            .addField("!nivel", `Veja o seu nível de xp em um servidor`)
            .addField("!form @user @cargo", `Me utilize para dar cargo a alguem.`)
            .addField("!userinfo <@user>", `Veja as informações de algum usuário`)
            .setThumbnail(botimg)
            .setFooter(`Não adianta mandar mensagens no meu privado eu não vou ler ele :D, Todos os diretos reservados à [Dev]UmGamer_ 𝓓𝓚#6687`, botimg)
            .setColor("RANDOM").setTimestamp()

        message.author.send(convite)
        await message.channel.send(`${message.author} | Enviei meus comandos no seu privado!`)
        
    }
   
})
// XP/LVL Nunca mais vo mexe kk
client.on('message', async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.startsWith(process.env.PREFIX)) return;

    global.xp = "";
    global.nextlevel = "";

    let pointsAdd = Math.floor(Math.random() + 7) + 8;

    database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
        .once('value').then(async function(snap){
            if(snap.val() == null) {
                database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                    .set({
                        xp: 0,
                        nivel: 1
                    })
            } else {
                xp = snap.val().xp + pointsAdd;
                nextlevel = snap.val().nivel * 500;
                database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                    .update({
                        xp: xp
                    })
                if(nextlevel <= xp ){
                    nextlevel = snap.val().nivel + 1;
                    database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                    .update({
                        nivel: nextlevel
                    })
                    
                    let guild = message.guild.name;
                    let img = message.author.avatarURL();
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(guild)
                        .setDescription("<a:policia:643053729842724875> Subiu de nivel! <a:policia:643053729842724875>")
                        .addField(`${message.author.tag}`, "Subiu de Nivel")
                        .addField("Novo Nivel:", nextlevel)
                        .setThumbnail(img)
                        .setFooter(`${message.author.tag}`, img)
                        .setColor("RANDOM").setTimestamp()
                    await message.channel.send(embed);
                    console.log(`${message.author.tag}, subiu de nivel em ${message.guild.id}, ${message.guild.name}  ${snap.val().nivel}!`)
                }   
            }
        })

})

client.login(process.env.TOKEN)
