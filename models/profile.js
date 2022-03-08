import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  recipes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Recipe"
  }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
