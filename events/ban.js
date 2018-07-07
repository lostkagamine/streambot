module.exports = {
    events: ['ban'],
    code: ctx => {
        ctx.send(`${ctx[1]} has been banned. Reason: ${ctx[2] || 'none'}.`)
    }
}