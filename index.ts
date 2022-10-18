import express from 'express';
import { createConnection } from "typeorm";
import { router } from "./src/routes";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ecfo76",
    database: "recipe",
    entities: [
      "src/entity/*.ts"
    ],
    synchronize: true,
}).then(connection => {
  const app: express.Express = express()
  app.use(express.json());
  app.use('/images', express.static('src/images'))
  router(app)

  console.log('success')

  app.listen(3000);
}).catch(error => console.log(error));


