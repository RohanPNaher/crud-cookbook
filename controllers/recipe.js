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

export {
  index,
  newRecipe as new,
  create,
}