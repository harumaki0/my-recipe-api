import express from "express";
import { getRecipes, getRecipePage, addRecipes } from "../query/recipe";
import { recipeRouter } from "./recipe";
export const router = (app: express.Application) => {
 

  app.use("/recipe", recipeRouter);
};
