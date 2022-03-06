import { Recipe } from "../models/recipe.js";

function index(req, res) {
  Recipe.find({})
    .then(recipes => {
      res.render('recipes/index', {
        recipes,
        title: 'All Recipes'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'Add Recipe',
  })
}

function create(req, res) {
  req.body.author = req.user.profile_id
  req.body.ingredients = req.body.ingredients.split(', ')
  req.body.instructions = req.body.instructions.split('\r\n')
  Recipe.create({...req.body, author: req.user.profile._id})
    .then(recipe => {
      
    console.log(req.body)
      res.redirect('/recipes')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function show(req, res) {
  Recipe.findById(req.params.id)
    .populate('author')
    .then(recipe => {
      res.render('recipes/show', {
        recipe,
        title: recipe.name
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

export {
  index,
  newRecipe as new,
  create,
  show,
}