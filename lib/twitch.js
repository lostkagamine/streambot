const tmi = require('tmi.js')
const fs = require('fs')
const path = require('path')

class Bot extends tmi.client {
    constructor(opts) {
        super(opts)
        this.prefix = opts.prefix || '!'
        this.admins = opts.admins || []
        this.commands = []
        this.cevents = []
        this.giveaways = {}
        this.on('chat', (chan, user, msg, self) => {
            if (self) { return } // Ignore messages from the bot
        
            // This isn't a command since it has no prefix:
            if (msg.substr(0, this.prefix.length) !== this.prefix) {
                console.log(`[${chan} (${user['message-type']})] ${user.username}: ${msg}`)
                return
            }
        
            let parsed = msg.slice(1).split(' ') // get command
            let cmd = parsed[0]
            let foundCmd = this.findCommand(cmd)
            let ctx = new Context(this, chan, user, foundCmd)
            if (!foundCmd) {console.log(`Unknown command called from ${ctx.author.username} in ${chan}`); return}
            if (!foundCmd.isAble(ctx)) {ctx.send(`${ctx.author.username}: This command is locked to moderators.`);return;}
            try {
                foundCmd.call(ctx, parsed.slice(1))
            } catch(e) {
                this.cDispatch('commandError', ctx, e)
            }
        })
    }
    cmdEvent(name, code) {
        if (this.cevents[name] === undefined) {
            this.cevents[name] = []
        }
        this.cevents[name].push(code)
    }
    cDispatch(name, ...args) {
        if (!this.cevents[name]) return;
        this.cevents[name].forEach(i => {
            try {
                i(...args)
            } catch(j) {
                console.error(`Error in event ${name}: ${j.stack}`)
            }
        })
    }
    findCommand(name) {
        return this.commands.find(a => a.name === name || a.aliases.includes(name))
    }
    loadCmdDir(commandsDir = './cmds/') {
        let files = fs.readdirSync(commandsDir)
        files.forEach(a => {
            let c = require(path.resolve(commandsDir + a))
            this.loadCmd(c)
        })
    }
    loadEventDir(dir = './events') {
        let files = fs.readdirSync(dir)
        files.forEach(a => {
            let c = require(path.resolve(dir + a))
            this.loadEvent(c)
        })
    }
    loadEvent(evtObj) {
        for (let j of evtObj.events) {
            if (evtObj.isHandler) {
                this.cmdEvent(j, evtObj.code)
            } else {
                this.on(j, (...a) => {
                    evtObj.code(new EventContext(this, ...a))
                })
            }
        }
    }
    loadCmd(cmdObj) {
        let cmd = new Command(cmdObj)
        if (!this.commands.includes(cmd)) this.commands.push(cmd);
    }
}

class Command {
    // object-oriented way to do a twitch bot:tm:
    constructor(obj) {
        let defaults = {
            name: 'placeholder',
            code: () => {},
            modOnly: false,
            aliases: []
        }
        for (let i of Object.keys(defaults)) {
            this[i] = obj[i] || defaults[i]
        }
    }
    call(...a) {
        this.code(...a)
    }
    isAble(ctx) {
        if (this.modOnly) return (ctx.author.mod || ctx.author.badges.broadcaster)
        else return true
    }
}

class Context {
    constructor(bot, channel, author, cmd) {
        this.bot = bot
        this.channel = channel
        this.command = cmd
        this.author = author
    }
    send(msg) {
        if (this['message-type'] === 'whisper') {
            this.bot.whisper(this.channel, msg)
        } else {
            this.bot.say(this.channel, msg)
        }
    }
}

class EventContext {
    constructor(bot, ...args) {
        this.bot = bot
        for (let i in args) this[i] = args[i]
    }
    send(msg) {
        if (this[0]) { // 0 is usually channel in tmi.js speak
            this.bot.say(this[0], msg)
        }
    }
}

module.exports = {Bot, Command, Context}