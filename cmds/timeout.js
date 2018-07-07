module.exports = {
    name: 'timeout',
    modOnly: true,
    code: (ctx, args) => {
        if (!args[0]) {
            return ctx.send(`Usage: ${ctx.bot.prefix}timeout <username> [seconds, default 600] [reason]`)
        }
        let msg = args[1] ? args[2] ? `.timeout ${args[0]} ${args[1]} ${args.slice(2).join(' ')}` : `.timeout ${args[0]} ${args[1]}`: `.timeout ${args[0]}`
        ctx.send(msg)
    },
    aliases: ['to']
}