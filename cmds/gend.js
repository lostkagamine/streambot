module.exports = {
    name: 'gend',
    modOnly: true,
    code: (ctx, args) => {
        let curr = ctx.bot.giveaways[ctx.channel]
        if (!curr) {
            return ctx.send(`A giveaway is not running in this channel.`)
        }
        let winner = curr.entrants[Math.floor(Math.random()*curr.entrants.length)]
        ctx.send(`@${winner} has won the giveaway for ${curr.item}.`)
        delete ctx.bot.giveaways[ctx.channel]
    }
}