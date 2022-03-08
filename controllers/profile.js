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
    .then(profile => {
      console.log('video jungle')
      Profile.findById(req.user.profile._id)
        .then(self => {
          console.log('radio jungle')
          const isSelf = self._id.equals(profile._id)
          res.render('profiles/show', {
            title: `${profile.name}'s profile`,
            profile,
            isSelf,
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect(`/`)
    })
    })
}

export {
  index,
  show,
}