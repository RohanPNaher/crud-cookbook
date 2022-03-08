import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true,
})

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://i.imgur.com/BDa36Zp.jpeg'
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
  comments: [commentSchema]
}, {
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}