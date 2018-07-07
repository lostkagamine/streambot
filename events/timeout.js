module.exports = {
    events: ['timeout'],
    code: ctx => {
        ctx.send(`${ctx[1]} has been timed out for ${ctx[3]} seconds. Reason: ${ctx[2] || 'none'}.`)
    }
}