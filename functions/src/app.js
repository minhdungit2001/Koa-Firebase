const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require('./middleware/koaBody.js')
const configRouter = require("./routes/routes.js");

const app = new Koa();

app.use(cors());
app.use(koaBody)
configRouter(app);

module.exports = app;
