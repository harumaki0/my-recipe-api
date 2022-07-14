import express from 'express';
import { getRecipes, getRecipePage } from './src/query/recipe';
import { createConnection } from "typeorm";

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

  app.get('/', async function (req, res) {
    const recipes = await getRecipes()
    console.dir(recipes)
    res.json(recipes)
  })
  app.get('/recipe/:id', async function (req, res) {
    const recipePage = await getRecipePage(req.params.id)
    res.json(recipePage)
  })

  console.log('success')

  app.listen(3000);
}).catch(error => console.log(error));


