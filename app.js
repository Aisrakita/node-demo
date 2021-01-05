const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();

app.use(bodyParser()); // bodyParser() 必须加在router被注册之前
app.use(controller());

app.listen(3000, () => {
    console.log("listening 3000");
})