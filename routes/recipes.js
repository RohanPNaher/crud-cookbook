import { Router } from "express";
import * as recipeCtrl from '../controllers/recipe.js'
const router = Router()

// GET localhost:3000/recipes
router.get('/', recipeCtrl.index)

export {
  router
}