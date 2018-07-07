module.exports = {
    name: 'untimeout',
    modOnly: true,
    code: (ctx, args) => {
        if (!args[0]) {
            return ctx.send(`Usage: ${ctx.bot.prefix}untimeout <username>`)
        }
        let msg = `.untimeout ${args[0]}`
        ctx.send(msg)
    },
    aliases: ['uto']
}