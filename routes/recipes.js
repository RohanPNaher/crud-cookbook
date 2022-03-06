import { Router } from "express";
import { isLoggedIn } from '../middleware/middleware.js'
import * as recipeCtrl from '../controllers/recipe.js'
const router = Router()

// GET - localhost:3000/recipes
router.get('/', recipeCtrl.index)
// GET - localhost:3000/recipes/new
router.get('/new', isLoggedIn, recipeCtrl.new)

// POST - localhost:3000/recipes
router.post('/', recipeCtrl.create)

export {
  router
}