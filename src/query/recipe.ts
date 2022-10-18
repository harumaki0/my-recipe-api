import {
  getConnection,
  createConnection,
  createQueryBuilder,
  getRepository,
} from "typeorm";
import { Recipe } from "../entity/recipe";

export async function getRecipes(page: number) {
    console.log(page)
  const query = getConnection()
    .getRepository(Recipe)
    .createQueryBuilder()
    .select()
    .skip(6 * (page - 1))
    .take(6 * page);
    // .where("recipe.id > :id", { id: 6 * (page - 1) })
    // .andWhere("recipe.id <= :id", { id: 6 * page })
  console.log(query.getSql());
  const recipes = await query.getMany();

  return recipes;
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
}) {
  console.log("addRecipes");
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

