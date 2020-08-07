const host = "http://localhost:3000";


$( document ).ready(function() {
  checkAuth()
  // $('#register-page').hide()
  // $('#login-page').show()
  // $('#add-movie-page').hide()
  // $('#home-page').hide()


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
    fetchMovie()
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
    url: `${host}/users/login`,
    method: 'post',
    data: {
      email: email,
      password: password
    }
  })
    .done(res => {
      localStorage.setItem('access_token', res.access_token)
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
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


function register(event) {
  event.preventDefault()
  let email = $('#register-email').val()
  let password = $('#register-password').val()

  $.ajax({
    url: `${host}/users/register`,
    method: 'post',
    data: {
      email: email,
      password: password
    }
  })
    .done(res => {
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
}


function showAddForm() {
  $('#login-page').hide()
  $('#register-page').hide()
  $('#add-movie-page').show()
  $('#home-page').hide()
}

function addMovie() {
  event.preventDefault()
  let genres = [];
  $.each($("input[name='genre']:checked"), function(){            
    genres.push($(this).val());
  });
  const genre = genres.join()
  const title = $('#add-title').val()
  // const genre = $('#add-genre').val()
  const poster = $('#add-poster').val()
  const review = $('#add-review').val()

  $.ajax({
    url: `${host}/movies`, 
    method: 'post',
    data: {
      title,
      genre,
      poster,
      review
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(() => {
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
    .always(() => {
      $('#title').val('')
      $('#genre').val('')
      $('#poster').val('')
      $('#review').val('')
    })
}



function deleteMovie(id) {
  $.ajax({
    url: `${host}/movies/${id}`, 
    method: 'delete',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(() => {
      event.preventDefault()
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
} 



function fetchMovie() {
  $.ajax({
    url: `${host}/movies`,
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(res => {
      console.log(res)
      $('#container-movies').empty()
      res.Movies.forEach(movie => {
        let temp = `
        <li class="media bg-white p-2 shadow mt-3">
          <img src="${movie.poster}"  alt="">
          <div class="media-body p-1">
            <button type="button" class="close float-right" onclick="deleteMovie(${movie.id})">
              <span aria-hidden="true">&times;</span>
            </button>
            <span class="badge badge-warning">${movie.genre}</span>
            <p><b>${movie.title}</b></p>
            <p>${movie.review}</p>
          </div>
        </li>
        `

        $('#container-movies').append(temp)
      });
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
}