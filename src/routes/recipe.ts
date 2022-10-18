import express from "express";
import {
  getRecipes,
  getRecipePage,
  addRecipes,
  updateRecipe,
} from "../query/recipe";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve(__dirname, "../images"));
  },
  filename(req, file, callback) {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10);
    callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    console.log(file.mimetype);
    if (
      ["video/mp4", "image/png", "image/jpeg", "audio/mpeg"].includes(
        file.mimetype
      )
    ) {
      callback(null, true);
      return;
    }
    callback(new TypeError("Invalid File Type"));
  },
});

const router = express.Router();

router.get("/", async function (req, res) {
  console.log(1);
  if (req.query.id && typeof req.query.id === "string") {
    const recipePage = await getRecipePage(req.query.id);
    res.json(recipePage);
    return;
  }
  if (req.query.page && typeof req.query.page === "string") {
    const recipes = await getRecipes(Number(req.query.page));
    console.dir(recipes);
    res.json(recipes);
    return;
  }
});

router.post("/", upload.single("file"), async function (req, res) {
  // console.log(req.body);
  console.log((<any>req).file);
  try {
    const addRecipe = await addRecipes({
      id: <number>req.body.id,
      name: <string>req.body.name,
      reference: <string>req.body.reference,
      memo: <string>req.body.memo,
      image: "http://localhost:3000/images/" + (<any>req).file.filename,
      registration_date: <string>req.body.registration_date,
      favorite: <string>req.body.favorite,
    });
    // console.dir(addRecipe)
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
});

router.post("/update", async function (req, res) {
  // console.log(req.body);
  try {
    const responce = await updateRecipe({
      id: <number>req.body.id,
      name: <string>req.body.name,
      reference: <string>req.body.reference,
      memo: <string>req.body.memo,
      // image: 'http://localhost:3000/images/' + (<any>req).file.filename,
      registration_date: <string>req.body.registration_date,
      favorite: <string>req.body.favorite,
    });
    // console.dir(addRecipe)
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
});

export const recipeRouter = router;
