module.exports = {
    name: 'unban',
    modOnly: true,
    code: (ctx, args) => {
        if (!args[0]) {
            return ctx.send(`Usage: ${ctx.bot.prefix}unban <username>`)
        }
        ctx.send('.unban '+args[0])
    }
}