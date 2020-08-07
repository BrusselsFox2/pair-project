const host = "http://localhost:3000";


$( document ).ready(function() {
  checkAuth()
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
  if (localStorage.getItem('access_token')) {
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
      localStorage.setItem('access_token', res.access_token)
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

function onSignIn(googleUser) {
  console.log("google sign in berhasil");
  
var profile = googleUser.getBasicProfile();
console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
 var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
      method: `post`,
      url: `${host}/users/googlelogin`,
      data: {
          id_token
      }
  })
      .done(data => {
          console.log(data.access_token, "ini data akses token")
          console.log(data.responseJSON);
          localStorage.setItem('access_token', data.access_token)
          checkAuth()
      
      }).fail(err => {
          console.log(err, "ini error gugel login")
      })
}
