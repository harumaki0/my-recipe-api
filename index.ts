import express from "express";
import { createConnection } from "typeorm";
import { router } from "./src/routes";
import database from "./connection";

const app: express.Express = express();

database.then(() => {
  app.use(express.json());
  app.use("/images", express.static("src/images"));
  router(app);

  console.log("success");

  app.listen(3000);
});

// データベースの接続に失敗した場合はエラーを表示する
database.catch((error) => console.log(error));
