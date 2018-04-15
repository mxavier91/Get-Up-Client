const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changeSuccess)
    .catch(ui.changeFailure)
}

const onSignOut = function () {
  event.preventDefault()
  const data = getFormFields(this)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onCreate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createWorkout(data)
    .then(ui.createSuccessful)
    .catch(ui.createFailed)
}

const onShowAll = function (event) {
  event.preventDefault()
  api.showAllWorkouts()
    .then(ui.showAllWorkoutsSuccess)
    // .catch(ui.showAllMoviesFailed)
  // $('#content').toggle()
}

const onUpdateMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateWorkout(data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailed)
}
/*
const onDeleteMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const movie = data.movie
  if (movie.id.length !== 0) {
    api.deleteMovie(movie.id)
      .then(ui.onDeleteSuccess)
      .catch(ui.onError)
  } else {
    console.log('Please provide a movie id!')
  }
}
*/

const onDeleteWorkout = (event) => {
  event.preventDefault()
  const id = event.target.dataset.id
  api.deleteWorkout(id)
    .then(ui.deleteSuccessful)
    .then(() => onShowAll(event))
    .catch(ui.deleteFailed)
}

const onShowAllUsers = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getAllUsers(data)
    .then(ui.allUsersSuccess)
    .catch(ui.allUserFailure)
  // $('#moreContent').toggle()
}

// const onAddMovie = function (event) {
//   console.log(event.target)
//   event.preventDefault()
//   const data = {movie: {title: event.target.dataset.title, director: event.target.dataset.director, actor: event.target.dataset.actor}}
//   console.log(event.target.dataset)
//   api.addMovie(data)
//     .then(ui.joinSuccessful)
//     // .then(() => onCreate(event))
//     .catch(ui.joinFailed)
// }

// const onShowAllUsersMovies = function (event) {
//   event.preventDefault()
//   const data = event.target.dataset.id
//   api.getAllMovies(data)
//     .then(ui.allMoviesSuccess)
//     .catch(ui.allMoviesFailure)
//   console.log(data)
//   $('#moreContent').toggle()
// }

// const onCreate = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.createMovie(data)
//     .then(ui.createSuccessful)
//     .catch(ui.createFailed)
// }

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#create').on('submit', onCreate)
  $('#showAll').on('click', onShowAll)
  $('#update').on('submit', onUpdateMovie)
  // $('#delete').on('submit', onDeleteMovie)
  $('#content').on('click', '.workout-delete', onDeleteWorkout)
  $('#all-users').on('click', onShowAllUsers)
  // $('#moreContent').on('click', '.add-movie', onAddMovie)
  // $('#movieContent').on('click', '.link', onShowAllUsersMovies)
  // $('#moreContent').data('key', 'movie')
}

module.exports = {
  addHandlers

}
