const express = require("express");
import { getUserByMailadressAndPassword } from "../query/user";

const router = express.Router();

router.post("/", async function (req, res) {
  console.dir(req.body);
  const user = await getUserByMailadressAndPassword(
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

export const loginRouter = router;
