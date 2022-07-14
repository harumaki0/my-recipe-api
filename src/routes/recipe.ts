const express = require('express');
import { getRecipes } from '../query/recipe';

const app = express();

  app.get('/', async function (req, res) {
    const recipes = await getRecipes()
    console.dir(recipes)
    res.json(recipes)
  })
