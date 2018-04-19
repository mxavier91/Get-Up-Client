const store = require('./store')
const showWorkouts = require('./templates/workouts.handlebars')
const showUsersWorkouts = require('./templates/users-workout-listings.handlebars')
const Timer = require('../../node_modules/easytimer.js/dist/easytimer.min.js')
const pageMessage = $('#message')

const signUpSuccess = function (data) {
  // $('#message').text('Sign up Success')
  // $('#message').css('background-color', 'green')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-confirmation-field').val('')
  $('#first-name-field').val('')
  $('#last-name-field').val('')
  $('#username-field').val('')
  $('#sign-up').hide()
  $('#sign-in').show()
  generateMessage('Success signing up!!!', 'success')
}

const signUpFailure = function (error) {
  console.log(error)
  // $('#message').text('Sign up Error')
  // $('#message').css('background-color', 'red')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-confirmation-field').val('')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-confirmation-field').val('')
  $('#first-name-field').val('')
  $('#last-name-field').val('')
  $('#username-field').val('')
  generateMessage('Failure signing up', 'danger')
}

const signInSuccess = function (data) {
  // $('#message').text('Sign In Success')
  // $('#message').css('background-color', 'green')
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
  generateMessage('Success on signing in!!!', 'success')
  store.user = data.user
}

const signInFailure = function (data) {
  // $('#message').text('Signed in Error')
  // $('#message').css('background-color', 'yellow')
  generateMessage('Sign in Failed', 'danger ')
  $('#signInEmail').val('')
  $('#signInPassword').val('')
}

const changeSuccess = function () {
  // $('#message').text('Changed Password Successfully')
  // $('#message').css('background-color', 'green')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
  generateMessage('Success on Changing Password!!!', 'success')
}

const changeFailure = function (error) {
  console.log(error)
  // $('#message').text('Error changing password')
  // $('#message').css('background-color', 'red')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
  generateMessage('Failure Changing Password', 'danger')
}

const signOutSuccess = function () {
  // $('#message').text('Signed out Successfully')
  // $('#message').css('background-color', 'green')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create').hide()
  $('#showAll').hide()
  $('#update').hide()
  $('#delete').hide()
  $('#content').hide()
  $('#moreContent').hide()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.show-form').show()
  $('.show-in').show()
  $('#showPass').hide()
  $('#all-users').hide()
  $('.resetButton').hide()
  generateMessage('Success on Signing Out!!!', 'success')
}

const signOutFailure = function () {
  // $('#message').text('Signout Error')
  // $('#message').css('background-color', 'red')
  generateMessage('Failure Signing Out', 'danger')
}

const createSuccessful = function (data) {
  // $('#message').text('Created New Workout')
  // $('#message').css('background-color', 'red')
  // $('#message').hide(7000)
  generateMessage('Success on Creating New Workout!!!', 'success')
  console.log(data)
  $('#newExerciseField').val('')
  $('#newRepsField').val('')
  $('#newSetsField').val('')
  $('#create').hide()
  $('#showAll').hide()
  $('#update').hide()
  $('#all-users').hide()
  $('.test').show()
  for (let i = 0; i < data.workout.sets; i++) {
    $('#button').append(`<button class="resetButton" id="set-${i}">Set</button>`)
  }
  const timer = new Timer()
  $('#button').on('click', function () {
    $('#tracker').show()
    $('#tracker').text('Great job. Wait 30-60 secs, and GET BACK TO WORK!!!!')
    $('#tracker').css('background-color', 'red')
    timer.reset()
    $(event.target).remove()
    if ($(this).children().length === 0) {
      timer.pause()
      $('#tracker').show()
      $('#tracker').text('Great Work Today')
      $('#tracker').css('background-color', 'red')
      $('#tracker').hide(5000)
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
      $('.test').hide()
    }
  })

  timer.addEventListener('secondsUpdated', function (e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString())
    if (timer.getTimeValues().toString() === '00:00:10') {
      $('#tracker').show()
      $('#tracker').text('5 more seconds')
      $('#tracker').css('background-color', 'red')
    } else if (timer.getTimeValues().toString() === '00:00:15') {
      $('#tracker').text('Work!!!!!')
      $('#tracker').css('background-color', 'red')
      $('#tracker').hide(5000)
    }
  })
  timer.addEventListener('reset', function (e) {
    $('#chronoExample .values').html(timer.getTimeValues().toString())
  })
  store.workout = data.workout
}

const createFailed = function (data) {
  // $('#message').text('Error Creating Workout')
  // $('#message').css('background-color', 'red')
  generateMessage('Failure to Create', 'danger')
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
  // $('#message').text('Successfully Update')
  // $('#message').css('background-color', 'green')
  generateMessage('Success on Updating!!!', 'success')
  $('#message').show()
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
}

const updateFailed = function (data) {
  // $('#message').text('Update Failure')
  // $('#message').css('background-color', 'red')
  generateMessage('Failure to Update!!!', 'danger')
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
}

const deleteSuccessful = function () {
  // $('#message').text('Delete Successfully')
  // $('#message').css('background-color', 'green')
  generateMessage('Success Deleting!!!', 'success')
  console.log('deleteSuccessful')
}

const deleteFailed = function () {
  // $('#message').text('Hold up one sec, Failed to Delete')
  // $('#message').css('background-color', 'red')
  generateMessage('Failure to Delete', 'danger')
}

const generateMessage = function (messageText, alertType) {
  $('body').addClass('hasMessage')
  pageMessage.text(messageText)
  const alertStyle = 'alert-' + alertType
  pageMessage.removeClass().addClass(alertStyle).show()
  pageMessage.delay(3000).slideToggle(400, function () {
    $('body').removeClass('hasMessage')
  })
}
// const buttonOneSuccess = function () {
//   $('#buttonOne').hide()
// }

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
  deleteFailed
  // joinSuccessful,
  // joinFailed
}
