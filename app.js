const fs = require('fs');
const path = require('path')
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const files = fs.readdirSync(path.resolve(__dirname, './controllers'));
const js_files = files.filter((f) => {
    return f.endsWith('.js');
})

for (let f of js_files) {
    console.log(`process controller: ${f}`);
    let mapping = require(__dirname + '/controllers/' + f);
    for (let url in mapping) {
        if (url.startsWith('GET')) {
            const path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid url:${url}`);
        }
    }
}

app.use(bodyParser()); // bodyParser() 必须加在router被注册之前
app.use(router.routes());

app.listen(3000, () => {
    console.log("listening 3000");
})