const express = require('express');
import getBlogs from '../query/blog';

const app = express();

  app.get('/', async function (req, res) {
    const blogs = await getBlogs()
    console.dir(blogs)
    res.json(blogs)
  })
