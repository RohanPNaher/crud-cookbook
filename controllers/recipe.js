import { Recipe } from "../models/recipe.js";
import { Profile } from '../models/profile.js'

function index(req, res) {
  Recipe.find({})
    .populate('author')
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
  console.log(req.body)
  req.body.author = req.user.profile._id
  req.body.ingredients = req.body.ingredients.split(', ')
  req.body.instructions = req.body.instructions.split('\r\n')
  Recipe.create(req.body)
    .then(recipe => {
      Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.recipes.push(recipe._id)
          profile.save()
        })
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
    .populate([
      'author', 
      {
        path: 'comments', 
        populate: {  
          path: 'author',
        }
      }
    ])
    .then(recipe => {
      res.render('recipes/show', {
        recipe,
        title: 'details'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.render('recipes/edit', {
        recipe,
        title: `Edit ${recipe.name}`
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function update(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      req.body.ingredients = req.body.ingredients.split(', ')
      req.body.instructions = req.body.instructions.split('\r\n')
      if (recipe.author.equals(req.user.profile._id)) {
        recipe.updateOne(req.body, {new: true})
        .then(() => {
          res.redirect(`/recipes/${recipe._id}`)
        })
      } else {
        throw new Error ('Not Authorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function deleteRecipe(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (recipe.author.equals(req.user.profile._id)) {
        console.log(req.params.id)
        // console.log('the recipe.author is' + recipe.author)
        Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.recipes.remove(req.params.id)
          profile.save()
          recipe.delete()
          res.redirect(`/recipes/`)
        })
        .catch(err => {
          console.log(err)
          res.redirect('/recipes')
        })

        

        // .then(() => {
        //   res.redirect(`/recipes/`)
        // })
      } else {
        throw new Error ('Not Authorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function createComment(req, res) {
  req.body.author = req.user.profile._id
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.comments.push(req.body)
      recipe.save(err => {
        res.redirect(`/recipes/${recipe._id}`)  
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/recipes/`)
    })
}

function deleteComment(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    recipe.comments.remove({_id: req.params.commentId})
    recipe.save()
    .then(()=> {
      res.redirect(`/recipes/${recipe._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/recipes/${recipe._id}`)
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  edit,
  update,
  deleteRecipe as delete,
  createComment,
  deleteComment,
}