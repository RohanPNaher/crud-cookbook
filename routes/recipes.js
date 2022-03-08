import { Router } from "express";
import { isLoggedIn } from '../middleware/middleware.js'
import * as recipeCtrl from '../controllers/recipe.js'
const router = Router()

// GET - localhost:3000/recipes
router.get('/', recipeCtrl.index)
// GET - localhost:3000/recipes/new
router.get('/new', isLoggedIn, recipeCtrl.new)
// GET - localhost:3000/recipes/:id
router.get('/:id', recipeCtrl.show)
// GET - localhost:3000/recipes/:id/edit
router.get('/:id/edit', isLoggedIn, recipeCtrl.edit)

// POST - localhost:3000/recipes
router.post('/', isLoggedIn, recipeCtrl.create)
// POST - localhost:3000/recipes/:id/comments
router.post('/:id/comments', isLoggedIn, recipeCtrl.createComment)

// PUT - localhost:3000/recipes/:id
router.put('/:id', isLoggedIn, recipeCtrl.update)

// DELETE - localhost:3000/recipes/:id
router.delete('/:id', isLoggedIn, recipeCtrl.delete)
// DELETE - localhost:3000/recipes/:id/comments/:commentId
router.delete('/:id/comments/:commentId', isLoggedIn, recipeCtrl.deleteComment)


export {
  router
}