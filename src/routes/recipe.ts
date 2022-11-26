import express from "express";
import {
  getRecipes,
  getRecipePage,
  addRecipes,
  updateRecipe,
  getFavorite,
  clearRecipe,
} from "../query/recipe";
import multer from "multer";
import path from "path";
import { errorMessage } from "../error_message/message";

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
  const recipePage = await getRecipePage(String(req.query.id));
  res.json(recipePage);
});

router.get("/list", async function (req, res) {
  const recipes = await getRecipes(
    Number(req.query.user_id),
    Number(req.query.page)
  );
  console.dir(recipes);
  res.json(recipes);
});

router.get("/favorite/list", async function (req, res) {
  const recipePage = await getFavorite(Number(req.query.page));
  res.json(recipePage);
});

router.post("/", upload.single("file"), async function (req, res) {
  // console.log(req.body);
  console.log((<any>req).file);
  try {
    const fileName = (<any>req).file?.filename;
    const addRecipe = await addRecipes({
      id: <number>req.body.id,
      name: <string>req.body.name,
      reference: <string>req.body.reference,
      memo: <string>req.body.memo,
      image:
        fileName === undefined
          ? ""
          : "http://localhost:3000/images/" + fileName,
      registration_date: <string>req.body.registration_date,
      favorite: <string>req.body.favorite,
    });
    // console.dir(addRecipe)
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.json({ message: errorMessage.E01 });
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
    res.json({ message: errorMessage.E01 });
  }
});

router.post("/delete", async function (req, res) {
  console.log("削除完了");
  try {
    const clear = await clearRecipe({
      id: <number>req.body.id,
    });
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.json({ message: errorMessage.E01 });
  }
});

export const recipeRouter = router;
