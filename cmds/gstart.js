module.exports = {
    name: 'gstart',
    modOnly: true,
    code: (ctx, args) => {
        if (!args[0]) {
            return ctx.send(`Usage: ${ctx.bot.prefix}gstart <giveaway item>`)
        }
        let curr = ctx.bot.giveaways[ctx.channel]
        if (curr) {
            return ctx.send(`A giveaway is already running in this channel for ${curr.item}.`)
        }
        ctx.bot.giveaways[ctx.channel] = {
            item: args.join(' '),
            entrants: []
        }
        ctx.send(`Started giveaway! Type ${ctx.bot.prefix}genter for a chance to win!`)
    }
}