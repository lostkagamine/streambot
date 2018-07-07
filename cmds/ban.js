module.exports = {
    name: 'ban',
    modOnly: true,
    code: (ctx, args) => {
        if (!args[0]) {
            return ctx.send(`Usage: ${ctx.bot.prefix}ban <username> [reason]`)
        }
        let msg = args[1] ? `.ban ${args[0]} ${args.slice(1).join(' ')}` : `.ban ${args[0]}`
        ctx.send(msg)
    }
}