const host = "http://localhost:3000";
let tempMovie = []


$( document ).ready(function() {
  checkAuth()


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


})

function showLogin() {
  event.preventDefault()
  $('#register-page').hide()
  $('#login-page').show()
  $('#add-movie-page').hide()
  $('#home-page').hide()
  $('#search-movie-page').hide()
}

function showRegister() {
  event.preventDefault()
  $('#register-page').show()
  $('#login-page').hide()
  $('#add-movie-page').hide()
  $('#home-page').hide()
  $('#search-movie-page').hide()
}


function checkAuth() {    
  if (localStorage.getItem('access_token')) {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#add-movie-page').hide()
    $('#home-page').show()
    $('#search-movie-page').hide()
    fetchMovie()
    fetchNews()
    fetchTrending()
  } else {
    $('#login-page').show()
    $('#register-page').hide()
    $('#add-movie-page').hide()
    $('#home-page').hide()
    $('#search-movie-page').hide()
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
  $('#search-movie-page').hide()
}

function addMovie() {
  event.preventDefault()
  let genres = [];
  $.each($("input[name='genre']:checked"), function(){            
    genres.push($(this).val());
  });

  const genre = genres.join()
  const title = $('#add-title').val()
  const poster = $('#add-poster').val()
  const review = $('#add-review').val()
  console.log(genres, genre, title, poster, review);

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

function showSearch() {
  $('#login-page').hide()
  $('#register-page').hide()
  $('#add-movie-page').hide()
  $('#home-page').hide()
  $('#search-movie-page').show()
}

function searchMovies(event) {
  event.preventDefault()
  let query = $('#search-keyword').val()
  $.ajax({
    url: `${host}/search/${query}`,
    method: 'post',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(res => {
      console.log(res, '>>>>>>>>>>>>>>>>>ini res');
      tempMovie = res.Movies
      event.preventDefault()
      $('#container-search').empty()
      res.Movies.forEach((movie, i) => {
        let poster = movie.image ? movie.image.medium : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7RbuAj7zoRZSIDcV_nz2LyZZjwiOETmn7kg&usqp=CAU' 
        let genre = movie.genres.join()
        let title = movie.name
        let summary = movie.summary
        let temp = `
        <li class="media bg-white p-2 shadow mt-3">
          <img src="${poster}"  alt="">
          <div class="media-body p-1">
            <button type="button" class="close float-right" onclick="">
              <span class="badge badge-warning" onclick="searchAdd(${i})"><img src="./assets/more.svg" alt="" class="add-button"></span>
            </button>
            <span class="badge badge-warning text-uppercase">${genre}</span>
            <h5><b>${title}</b></h5>
            <span class="text-muted">${summary}</span>
          </div>
        </li>
        `
        $('#container-search').append(temp)
      });
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
}

function searchAdd(id) {
  event.preventDefault()
  console.log(tempMovie[id]);
  $('#add-poster').val(tempMovie[id].image.medium)
  $('#add-title').val(tempMovie[id].name)
  $('#add-review').val(tempMovie[id].summary)
  showAddForm()
}

function fetchNews() {
  $.ajax({
    url: `${host}/news`,
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(res => {
      $('#container-news').empty()
      res.news.articles.forEach(article => {
        let temp = `
        <li class="list-group-item custom-text">
          <a href="${article.url}" class="justify-text">${article.title}</a>
          <small id="small" class="form-text text-muted">${article.author}</small>
          <br>
          <p class="justify-text smol">${article.description}</p>
        </li>
        `

        $('#container-news').append(temp)
      });
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
}

function fetchTrending() {
  $.ajax({
    url: `${host}/trending`,
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(res => {
      console.log(res)
      $('#container-trending').empty()
      for (let i = 1; i < 4; i++) {
        let temp = `
        <div class="carousel-item ${i === 1 ? 'active' : ''}">
        <img src="https://image.tmdb.org/t/p/w500${res.trending.results[i].backdrop_path}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
          <h5>${res.trending.results[i].title}</h5>
          <p>${res.trending.results[i].release_date}</p>
        </div>
      </div>
        </div>
        `

        $('#container-trending').append(temp)
      }
    })
    .fail(err => {
      console.log(err.responseJSON.error)
    })
}


