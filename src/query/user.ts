import {
  getConnection,
  createConnection,
  createQueryBuilder,
  getRepository,
} from "typeorm";
import { User } from "../entity/user";

export async function getUserByMailadressAndPassword(
  mail_address: string,
  password: string
) {
  const query = getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .select()
    .where("user.mail_address = :mail_address and user.password = :password", {
      mail_address,
      password,
    });
  console.log(query.getSql());
  const user = await query.getOne();

  return user;
}
