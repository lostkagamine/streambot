module.exports = {
    name: 'restart',
    modOnly: true,
    code: (ctx, args) => {
        if (!ctx.bot.admins.includes(ctx.author.username)) return;
        ctx.send('Restarting.')
        process.exit(0)
    },
    aliases: ['despacito']
}