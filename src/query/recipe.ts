import { getConnection, createConnection,createQueryBuilder, getRepository } from "typeorm";
import { Recipe } from "../entity/recipe";

export async function getRecipes() {
    const query = getConnection()
        .getRepository(Recipe)
        .createQueryBuilder()
        .select()
        // .where("recipe.id = :id", { id: 1 });
    console.log(query.getSql())
    const recipes = await query.getMany();
    
    return recipes
}

export async function getRecipePage(id: string) {
    const query = getConnection()
        .getRepository(Recipe)
        .createQueryBuilder()
        .select()
        .where("recipe.id = :id", { id });
    console.log(query.getSql())
    const recipe = await query.getOne();
    
    return recipe
}


// (async function getRecipe() {
//   const connection = await createConnection()

//     const userRepository = getRepository(Recipe)
    
// const getRecipe = await userRepository.find()
// await connection.close()
// })()