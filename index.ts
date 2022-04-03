import express from 'express';
import getBlog from './src/query/blog';
import { createConnection } from "typeorm";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ecfo76",
    database: "migration",
    entities: [
      "src/entity/*.ts"
    ],
    synchronize: true,
}).then(connection => {
  const app: express.Express = express()

  app.get('/', async function (req, res) {
    const blog = await getBlog()
    console.dir(blog)
    res.json(blog)
})

console.log('success')

app.listen(3000);
}).catch(error => console.log(error));


