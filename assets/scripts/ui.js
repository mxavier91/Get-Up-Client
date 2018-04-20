const store = require('./store')
const showWorkouts = require('./templates/workouts.handlebars')
const showUsersWorkouts = require('./templates/users-workout-listings.handlebars')
const Timer = require('../../node_modules/easytimer.js/dist/easytimer.min.js')
const pageMessage = $('#message')

const signUpSuccess = function (data) {
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

const signUpFailure = function () {
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
  $('#signInEmail').val('')
  $('#signInPassword').val('')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#createWorkout').show()
  $('#showAll').show()
  $('#updateWorkout').show()
  $('#delete').show()
  $('#all-users').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.show-form').hide()
  $('.show-in').hide()
  $('#showPass').show()
  $('#sign-out').show()
  welcomeText(data)
  generateMessage('Success on signing in!!!', 'success')
  store.user = data.user
}

const signInFailure = function (data) {
  generateMessage('Sign in Failed', 'danger ')
  $('#signInEmail').val('')
  $('#signInPassword').val('')
}

const changeSuccess = function () {
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
  generateMessage('Success on Changing Password!!!', 'success')
}

const changeFailure = function () {
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')
  generateMessage('Failure Changing Password', 'danger')
}

const signOutSuccess = function () {
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#createWorkout').hide()
  $('#showAll').hide()
  $('#updateWorkout').hide()
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
  $('.lede').hide()
  generateMessage('Success on Signing Out!!!', 'success')
}

const signOutFailure = function () {
  generateMessage('Failure Signing Out', 'danger')
}

const createSuccessful = function (data) {
  generateMessage('Success on Creating New Workout!!!', 'success')
  $('#newExerciseField').val('')
  $('#newRepsField').val('')
  $('#newSetsField').val('')
  $('#newWeightField').val('')
  $('#createWorkout').hide()
  $('#create').hide()
  $('#showAll').hide()
  $('#updateWorkout').hide()
  $('#all-users').hide()
  $('.test').show()
  for (let i = 0; i < data.workout.sets; i++) {
    $('#button').append(`<button class="resetButton" id="set-${i}">Set</button>`)
  }
  const timer = new Timer()
  $('#button').on('click', function () {
    $('#tracker').show()
    $('#tracker').text('Great job. Wait 10-15 secs, and GET BACK TO WORK!!!!')
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
      $('#createWorkout').show()
      $('#showAll').show()
      $('#updateWorkout').show()
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
  generateMessage('Failure to Create', 'danger')
  $('#newExerciseField').val('')
  $('#newRepsField').val('')
  $('#newSetsField').val('')
  $('#newWeightField').val('')
}

const showAllWorkoutsSuccess = function (data) {
  const showWorkoutsHtml = showWorkouts({workouts: data.workouts})
  $('.content').html(showWorkoutsHtml)
}

const allUsersSuccess = function (data) {
  const showUsersWorkoutsHtml = showUsersWorkouts({users: data.users})
  $('#moreContent').html(showUsersWorkoutsHtml)
}

const updateSuccess = function (data) {
  generateMessage('Success on Updating!!!', 'success')
  $('#message').show()
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
  $('#updateWeight').val('')
}

const updateFailed = function (data) {
  generateMessage('Failure to Update!!!', 'danger')
  $('#workout-id-update').val('')
  $('#updateExercise').val('')
  $('#updateReps').val('')
  $('#updateSets').val('')
  $('#updateWeight').val('')
}

const deleteSuccessful = function () {
  generateMessage('Success Deleting!!!', 'success')
  console.log('deleteSuccessful')
}

const deleteFailed = function () {
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

const welcomeText = function (data) {
  console.log('first name is', data)
  const newLede = `Welcome ${data.user.first_name}!`
  $('.lede').text(newLede)
}

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
}
