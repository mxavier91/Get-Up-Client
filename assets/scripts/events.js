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
  $('#content').toggle()
}

const onUpdateMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateWorkout(data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailed)
}

const onDeleteWorkout = (event) => {
  event.preventDefault()
  const id = event.target.dataset.id
  api.deleteWorkout(id)
    .then(ui.deleteSuccessful)
    .then(() => onShowAll(event))
    .catch(ui.deleteFailed)
}

const onShowAllUsers = function (event) {
  console.log(event.target)
  console.log(event)
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getAllUsers(data)
    .then(ui.allUsersSuccess)
    .catch(ui.allUserFailure)
  $('#moreContent').toggle()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('#create').on('submit', onCreate)
  $('#showAll').on('click', onShowAll)
  $('#update').on('submit', onUpdateMovie)
  $('#content').on('click', '.workout-delete', onDeleteWorkout)
  $('#all-users').on('click', onShowAllUsers)
  $('a.show-form').on('click', function () {
    $('#sign-up').toggle()
  })
  $('a.show-pass').on('click', function () {
    $('#change-password').toggle()
  })
  $('a.show-in').on('click', function () {
    $('#sign-in').toggle()
  })
  $('#createWorkout').on('click', () => {
    $('#create').toggle()
  })
  $('#updateWorkout').on('click', () => {
    $('#update').toggle()
  })
}

module.exports = {
  addHandlers

}
