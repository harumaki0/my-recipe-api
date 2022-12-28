import {
  getConnection,
  createConnection,
  createQueryBuilder,
  getRepository,
} from "typeorm";
import { Recipe } from "../entity/recipe";

export async function getRecipe(id: number) {
  const query = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .where("recipe.id = :id", { id: id });

  // SQL文を変数に代入しておく
  const sql = query.getSql();

  // 変数から取り出して出力
  console.log(sql);
  const recipe = await query.getOne();
  return recipe;
}
export async function getAllRecipes() {
  const query = getConnection().getRepository(Recipe).createQueryBuilder();
  const recipes = await query.getMany();
  return recipes;
}

export async function getRecipes(user_id: number, page: number) {
  console.log(page);
  //SQL作成
  const query = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .where("user_id = :id", { id: user_id })
    .skip(6 * (page - 1))
    .take(6);
  console.log(query.getSql());
  //実行
  const recipes = await query.getMany();

  const query2 = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .where("user_id = :id", { id: user_id })
    .getCount();
  const count = await query2;
  console.log(count);
  return { recipes, count };
}

export async function getFavorite(page: number) {
  //1ページ分のレシピを取得
  const query = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .where("recipe.favorite = :favorite", { favorite: 1 })
    .skip(6 * (page - 1))
    .take(6);
  console.log(query.getSql());
  const recipes = await query.getMany();

  //全ての件数を取得
  const query2 = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .where("recipe.favorite = :favorite", { favorite: 1 })
    .select()
    .getCount();
  const count = await query2;
  console.log(count);

  return { recipes, count };
}

export async function getRecipePage(id: string) {
  const query = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .where("recipe.id = :id", { id });
  console.log(query.getSql());
  const recipe = await query.getOne();

  return recipe;
}

export async function addRecipes(params: {
  id: number;
  name: string;
  reference: string;
  memo: string;
  image: string;
  favorite: string;
  registration_date: string;
  user_id: number;
}) {
  console.log("addRecipe");
  console.log(params);
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Recipe)
    .values([
      {
        id: params.id,
        name: params.name,
        reference: params.reference,
        memo: params.memo,
        image: params.image,
        favorite: params.favorite,
        registration_date: params.registration_date,
        user_id: params.user_id,
      },
    ])
    .execute();
}

export async function updateRecipe(params: {
  id: number;
  name: string;
  reference: string;
  memo: string;
  // image: string,
  favorite: string;
  registration_date: string;
}) {
  console.log("updateRecipes");
  console.log(params);
  await getConnection()
    .createQueryBuilder()
    .update(Recipe)
    .set({
      name: params.name,
      reference: params.reference,
      memo: params.memo,
      // image: params.image,
      favorite: params.favorite,
      registration_date: params.registration_date,
    })
    .where("recipe.id = :id", { id: params.id })
    .execute();
}

export async function clearRecipe(params: { id: number }) {
  const query = getConnection()
    .createQueryBuilder()
    .delete()
    .from(Recipe)
    .where("recipe.id = :id", { id: params.id });
  //実行
  await query.execute();
}
