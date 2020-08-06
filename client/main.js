const host = "http://localhost:3000";


$( document ).ready(function() {
  // checkAuth()
  $('#register-page').hide()
  $('#login-page').show()
  $('#add-movie-page').hide()
  $('#home-page').hide()


})

function showLogin() {
  event.preventDefault()
  $('#register-page').hide()
  $('#login-page').show()
  $('#add-movie-page').hide()
  $('#home-page').hide()
}

function showRegister() {
  event.preventDefault()
  $('#register-page').show()
  $('#login-page').hide()
  $('#add-movie-page').hide()
  $('#home-page').hide()
}


function checkAuth() {    
  if (localStorage.getItem('token')) {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#add-movie-page').hide()
    $('#home-page').show()
    fetchTask()
  } else {
    $('#login-page').show()
    $('#register-page').hide()
    $('#add-movie-page').hide()
    $('#home-page').hide()
  }
}

function login(event) {
  event.preventDefault()
  let email = $('#login-email').val()
  let password = $('#login-password').val()

  $.ajax({
    url: `${host}/users/login`, // url belum diganti
    method: 'post',
    data: {
      email: email,
      password: password
    }
  })
    .done(res => {
      console.log(res);
      localStorage.setItem('token', res.token)
      checkAuth()
    })
    .fail(err => {
      console.log(err);
    })
}

function logout() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  
  localStorage.clear()
  checkAuth()
}

function addMovie() {
  const title = $('#add-title').val()
  const genre = $('#add-genre').val()
  const poster = $('#add-poster').val()
  const preview = $('#add-preview').val()
}