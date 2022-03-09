import { Profile } from '../models/profile.js'

function index (req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: 'All Users'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  console.log('audio jungle')
  Profile.findById(req.params.id)
    .populate([
      'recipes',
      {
        path: 'recipes',
        populate: {
          path: 'author'
        }
      }
    ])
    .then(profile => {
      console.log('video jungle')
      Profile.findById(req.user.profile._id)
        .then(self => {
          console.log('radio jungle')
          const isSelf = self._id.equals(profile._id)
          const recipes = profile.recipes
          res.render('profiles/show', {
            title: `${profile.name}'s profile`,
            profile,
            isSelf,
            recipes
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/`)
    })
}

export {
  index,
  show,
}