import {
  getConnection,
  createConnection,
  createQueryBuilder,
  getRepository,
} from "typeorm";
import { User } from "../entity/user";

import { hashPassword, comparePassword } from "./util";

export async function getUserId() {
  const query = getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .select()
    .getCount();
  const count = await query;
  console.log(count);
}

export async function addAccount(params: {
  mail_address: string;
  password: string;
}) {
  console.log("addAccount");
  const hashedPassword = await hashPassword(params.password);
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        mail_address: params.mail_address,
        password: hashedPassword,
      },
    ])
    .execute();
}

export async function getUserByMailadress(mail_address: string) {
  const query = getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .select()
    .where("user.mail_address = :mail_address", {
      mail_address,
    });
  console.log(query.getSql());
  const user = await query.getOne();

  return user;
}

export async function getUserByMailAddressAndPassword(
  mail_address: string,
  password: string
) {
  const query = getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .select()
    .where("user.mail_address = :mail_address", {
      mail_address,
    });
  console.log(query.getSql());
  const user = await query.getOne();
  if (!user) {
    return null;
  }
  const result = await comparePassword(password, user.password);

  if (!result) {
    return null;
  }

  return user;
}
