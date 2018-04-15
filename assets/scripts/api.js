const config = require('./config')
const store = require('./store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createWorkout = function (data) {
  return $.ajax({
    url: config.apiUrl + '/workouts',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showAllWorkouts = function () {
  return $.ajax({
    url: config.apiUrl + '/workouts',
    method: 'GET',
    headers: {
      // contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateWorkout = function (data) {
  return $.ajax({
    url: config.apiUrl + '/workouts/' + data.workout.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// const deleteWorkout = function (id) {
//   return $.ajax({
//     url: config.apiUrl + '/movies/' + id,
//     method: 'DELETE',
//     headers: {
//       ContentType: 'application/json',
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

const deleteWorkout = function (id) {
  return $.ajax({
    url: config.apiUrl + '/workouts/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAllUsers = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/users',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}
//
// const addMovie = function (data) {
//   console.log(data)
//   return $.ajax({
//     url: config.apiUrl + '/movies',
//     method: 'POST',
//     headers: {
//       contentType: 'application/json',
//       Authorization: 'Token token=' + store.user.token
//     },
//     data
//   })
// }

// const getAllMovies = function (data) {
//   console.log(data)
//   return $.ajax({
//     url: config.apiUrl + '/users',
//     method: 'GET',
//     headers: {
//       contentType: 'application/json'
//       // Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createWorkout,
  showAllWorkouts,
  updateWorkout,
  deleteWorkout,
  getAllUsers
  // addMovie,
  // getAllMovies
}
