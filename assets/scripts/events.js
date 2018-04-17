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

const onSignOut = function() {
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
  $('#moreContent').toggle()
}

const onTrackSet = function (event) {
  event.preventDefault()
  $('#message').text('Great Job. If you had a easy time with it, wait 30 seconds. If not wait for a minute')
  $('#message').css('background-color', 'green')
  // $('#message').hide(5000)
  let counter = 0
  const timeIt = function () {
    counter++
    $('#timer').html(counter)
    if (counter === 10) {
      $('#message').text('Get back to work, or wait 30 more secs')
      $('#message').css('background-color', 'green')
    } else if (counter === 15) {
      $('#message').text('Time to Work')
      $('#message').css('background-color', 'green')
    }
  }
  setInterval(timeIt, 1000)
}

const onSets = function (event) {
  const data = getFormFields(event.target)
  for (let i = 0; i < data.sets; i++) {
    $('#button').append(`<button class="setTracker" id="set-${i}">Click me</button>`)
  }
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
  $('.setTracker').on('click', onTrackSet)
  $('.setTracker').on('click', onSets)
  // $('#buttonOne').on('click', onTrackSet, function () {
  //   $('#buttonOne').hide()
  // })
  // $('#buttonTwo').on('click', onTrackSet, function () {
  //   $('#buttonTwo').hide()
  // })
  // $('#buttonThree').on('click', onTrackSet, function () {
  //   $('#buttonThree').hide()
  // })
  // $('#buttonFour').on('click', onTrackSet, function () {
  //   $('#buttonFour').hide()
  // })
  // $('#buttonFive').on('click', onTrackSet, function () {
  //   $('#buttonFive').hide()
  // })

  // $('#moreContent').on('click', '.add-movie', onAddMovie)
  // $('#movieContent').on('click', '.link', onShowAllUsersMovies)
  // $('#moreContent').data('key', 'movie')
  // $('#delete').on('submit', onDeleteMovie)
}

module.exports = {
  addHandlers

}
