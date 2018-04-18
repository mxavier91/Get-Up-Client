const store = require('./store')
const showWorkouts = require('./templates/workouts.handlebars')
const showUsersWorkouts = require('./templates/users-workout-listings.handlebars')
const Timer = require('../../node_modules/easytimer.js/dist/easytimer.min.js')

const signUpSuccess = function (data) {
  $('#message').text('"You Had Me at Hello"-Sign up Success')
  $('#message').css('background-color', 'green')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-conformation-field').val('')
  $('#first-name-field').val('')
  $('#last-name-field').val('')
  $('#username-field').val('')
  $('#sign-up').hide()
  $('#sign-in').show()
}

const signUpFailure = function (error) {
  console.log(error)
  $('#message').text('"Houston, We Have a Problem"-Sign up Error')
  $('#message').css('background-color', 'red')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-conformation-field').val('')
}

const signInSuccess = function (data) {
  $('#message').text('"Welcome to THUNDERDOME!!!!!"-Sign In Success')
  $('#message').css('background-color', 'green')
  $('#signInEmail').val('')
  $('#signInPassword').val('')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create').show()
  $('#showAll').show()
  $('#update').show()
  $('#delete').show()
  $('#all-users').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.show-form').hide()
  $('.show-in').hide()
  $('#showPass').show()
  $('#sign-out').show()
  store.user = data.user
}

const signInFailure = function (data) {
  $('#message').text('"DANGER Will Robinson DANGER"-Signed in Error')
  $('#message').css('background-color', 'yellow')
  $('#signInEmail').val('')
  $('#signInPassword').val('')
}

const changeSuccess = function () {
  $('#message').text('"May The Force Be With You"-Changed Password Successfully')
  $('#message').css('background-color', 'green')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
}

const changeFailure = function (error) {
  console.log(error)
  $('#message').text('"I Drink Your MilkShake!!!"-Error changing password')
  $('#message').css('background-color', 'red')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
}

const signOutSuccess = function () {
  $('#message').text('"I\'ll be Back"-Signed out Successfully')
  $('#message').css('background-color', 'green')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create').hide()
  $('#showAll').hide()
  $('#update').hide()
  $('#delete').hide()
  $('#content').hide()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.show-form').show()
  $('.show-in').show()
  $('#showPass').hide()
  $('#all-users').hide()
  $('.setTracker').hide()
}

const signOutFailure = function () {
  $('#message').text('"Get Your Stinking Paws Off Me, You damned dirty ape!!!"-Signout Error')
  $('#message').css('background-color', 'red')
}

const createSuccessful = function (data) {
  console.log(data)
  $('#newExerciseField').val('')
  $('#newRepsField').val('')
  $('#newSetsField').val('')
  $('#create').hide()
  $('#showAll').hide()
  $('#update').hide()
  $('#all-users').hide()
  for (let i = 0; i < data.workout.sets; i++) {
    $('#button').append(`<button class="resetButton" id="set-${i}">Set</button>`)
  }
  const timer = new Timer()
  $('#button').on('click', function () {
    timer.reset()
    $(event.target).remove()
    if ($(this).children().length === 0) {
      $('#change-password').hide()
      $('#sign-out').hide()
      $('#create').show()
      $('#showAll').show()
      $('#update').show()
      $('#delete').show()
      $('#all-users').show()
      $('#sign-up').hide()
      $('#sign-in').hide()
      $('.show-form').hide()
      $('.show-in').hide()
      $('#showPass').show()
      $('#sign-out').show()
    }
  })

  timer.addEventListener('secondsUpdated', function (e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString())
  })
  timer.addEventListener('reset', function (e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString())
  })
  const set = data.workout.sets
  $('#set-' + set - 1).on('click', function () {
    console.log('Hey')
  })
  store.workout = data.workout
}

const createFailed = function (data) {
  $('#message').text('"Argo F@%# Yourself"-Error Adding Movie')
  $('#message').css('background-color', 'red')
  $('#newExerciseField').val('')
  $('#newRepsField').val('')
  $('#newSetsField').val('')
}

const showAllWorkoutsSuccess = function (data) {
  console.log(data)
  const showWorkoutsHtml = showWorkouts({workouts: data.workouts})
  $('.content').html(showWorkoutsHtml)
}

const allUsersSuccess = function (data) {
  console.log(data)
  const showUsersWorkoutsHtml = showUsersWorkouts({users: data.users})
  $('#message').text('"It\'s Alive, It\'s Alive!!!"-New Movie Added')
  $('#message').css('background-color', 'green')
  $('#moreContent').html(showUsersWorkoutsHtml)
}

/*
const showAllMoviesFailed = function (data) {
  $('#message').text('Hold up one sec')
  $('#message').css('background-color', 'red')
}
*/

const updateSuccess = function (data) {
  console.log(data)
  $('#message').text('"I wish I knew how to quit you"-Successfully Update')
  $('#message').css('background-color', 'green')
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
}

const updateFailed = function (data) {
  $('#message').text('Hold up one sec, Update Failure')
  $('#message').css('background-color', 'red')
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
}

const deleteSuccessful = function () {
  $('#message').text('"Leave the gun. Take the Cannoli"-Delete Successfully')
  $('#message').css('background-color', 'green')
  console.log('deleteSuccessful')
}

const deleteFailed = function () {
  $('#message').text('Hold up one sec, Failed to Delete')
  $('#message').css('background-color', 'red')
}
const buttonOneSuccess = function () {
  $('#buttonOne').hide()
}

// const joinSuccessful = function (data) {
//   console.log(data)
//   $('#message').text('"It\'s Alive, It\'s Alive!!!"-New Movie Added')
//   $('#message').css('background-color', 'green')
//   store.movie = data.movie
// }
//
// const joinFailed = function (error) {
//   console.log(error)
//   $('#message').text('"Argo F@%# Yourself"-Error Adding Movie')
//   $('#message').css('background-color', 'red')
// }

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changeSuccess,
  changeFailure,
  signOutSuccess,
  signOutFailure,
  createSuccessful,
  createFailed,
  showAllWorkoutsSuccess,
  allUsersSuccess,
  updateSuccess,
  updateFailed,
  deleteSuccessful,
  deleteFailed,
  buttonOneSuccess
  // joinSuccessful,
  // joinFailed
}
