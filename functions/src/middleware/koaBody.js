const koaBody = (ctx, next) => {
    ctx.request.body = ctx.request.body || ctx.req.body
    return next()
}
module.exports = koaBody