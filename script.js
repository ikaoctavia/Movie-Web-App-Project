//prepare data
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"
const API_URL_MOVIE = 'https://api.themoviedb.org/3'
const IMG_MOVIE_PATH = 'https://image.tmdb.org/t/p/w1280'
const PAGE_NUMBER = 1

// list api data
const API_URL_HOME = `${API_URL_MOVIE}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_SEARCH = `${API_URL_MOVIE}/search/movie?api_key=${API_KEY}&query=`
const API_URL_NOW_PLAYING = `${API_URL_MOVIE}/movie/now_playing?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_POPULAR = `${API_URL_MOVIE}/movie/popular?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_TOPRATED = `${API_URL_MOVIE}/movie/top_rated?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_TRENDING = `${API_URL_MOVIE}/trending/movie/week?api_key=${API_KEY}`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


// Get initial movies
getMovies(API_URL_HOME)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    console.log("movies",movies)

    movies.forEach((movie) => {
        const { title, release_date, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_MOVIE_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>
                ${title}
                <br>
                <div class="text-release">Release : ${formatDate(release_date)}</div>
                </h3>
                <span class="${getClassByRate(vote_average)}">${parseFloat(vote_average).toFixed(2)}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function formatDate(inputDate) {
    // Convert the input date string to a Date object
    const dateObject = new Date(inputDate);

    // Options for formatting the date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Format the date using the specified options
    const formattedDate = dateObject.toLocaleDateString('id-ID', options);

    return formattedDate;
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(API_URL_SEARCH + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

function setActive(clickedElement, filter) {
    // Remove the "active" class from all list items
    var listItems = document.querySelectorAll("li a");
    listItems.forEach(function(item) {
        item.classList.remove("active");
    });

    // Add the "active" class to the clicked list item
    clickedElement.classList.add("active");

    // refresh data
    switch (filter) {
        case "home":
            getMovies(API_URL_HOME)
            break;
        case "now-playing":
            getMovies(API_URL_NOW_PLAYING)
            break;
        case "popular":
            getMovies(API_URL_POPULAR)
            break;
        case "top-rated":
            getMovies(API_URL_TOPRATED)
            break;
        case "trending":
            getMovies(API_URL_TRENDING)
            break;
    }
}