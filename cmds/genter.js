module.exports = {
    name: 'genter',
    code: (ctx, args) => {
        let curr = ctx.bot.giveaways[ctx.channel]
        if (!curr) {
            return ctx.send(`A giveaway is not running in this channel.`)
        }
        if (curr.entrants.includes(ctx.author.username)) {
            return ctx.send('You have already entered.')
        }
        ctx.bot.giveaways[ctx.channel].entrants.push(ctx.author.username)
        ctx.send(`You have entered the giveaway for ${curr.item}.`)
    }
}