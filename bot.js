const tmi = require('tmi.js')
const lib = require('./lib/twitch.js')
const config = require('./config.json')

const client = new lib.Bot({
    identity: {
        username: config.username,
        password: 'oauth:'+config.token
    },
    channels: config.channels,
    prefix: config.prefix,
    admins: config.admins
})

client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

client.connect()

client.cmdEvent('commandError', (ctx, e) => {
    ctx.send(`Error in command ${ctx.command.name}:`)
    ctx.send(`${e.name}: ${e.message}`)
})

// Called every time the bot connects to Twitch chat:
function onConnectedHandler(addr, port) {
    client.loadCmdDir()
    client.loadEventDir()
    console.log(`Logged into twitch @ ${addr}:${port}`)
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler(reason) {
    console.log(`Twitch killed us: ${reason}`)
    process.exit(1)
}
