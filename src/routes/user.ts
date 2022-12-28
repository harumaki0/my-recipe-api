const express = require("express");
import {
  getUserId,
  addAccount,
  getUserByMailadress,
  getUserByMailAddressAndPassword,
} from "../query/user";
import { errorMessage } from "../error_message/message";
import { createConnection } from "typeorm";

const router = express.Router();

router.get("/", async function (req, res) {
  console.log(1);
  const userId = await getUserId();
  res.json(userId);
});

router.post("/signup", async function (req, res) {
  console.dir(req.body);

  // トランザクションを開始する
  const connection = await createConnection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    // DBから重複するメールアドレスを検索する
    const user = await getUserByMailadress(<string>req.body.mail_address);

    // メールアドレスが重複していた場合はエラーを返す
    if (user) {
      res.json({ message: errorMessage.E03 });
      return;
    }

    // 重複していなければ新しいアカウントを作成する
    const newUser = await addAccount({
      mail_address: <string>req.body.mail_address,
      password: <string>req.body.password,
    });
    console.dir(newUser);

    // トランザクションをコミットする
    await queryRunner.commitTransaction();
    res.json("ok");
  } catch (error) {
    // トランザクションをロールバックする
    await queryRunner.rollbackTransaction();
    console.error(error);
    res.json({ message: errorMessage.E02 });
  } finally {
    // トランザクションを終了する
    await queryRunner.release();
  }
});

router.post("/login", async function (req, res) {
  console.dir(req.body);
  const user = await getUserByMailAddressAndPassword(
    req.body.mail_address,
    req.body.password
  );
  console.dir(user);
  if (!user) {
    res.status(401).send("ログインエラー");
    return;
  }
  res.json(user);
});

export const userRouter = router;
