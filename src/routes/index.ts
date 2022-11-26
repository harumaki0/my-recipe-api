import express from "express";
import { getRecipes, getRecipePage, addRecipes } from "../query/recipe";
import { recipeRouter } from "./recipe";
import { loginRouter } from "./login";

export const router = (app: express.Application) => {
  app.use("/recipe", recipeRouter);
  app.use("/login", loginRouter);
};
