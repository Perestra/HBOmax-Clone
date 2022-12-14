

const API_KEY = '875eb7acef457f17217538c2f06f2cec';
const LANGUAGE = 'pt-BR';
const POSTER_PATH = 'https://www.themoviedb.org/t/p/original';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/original'
const MOVIES_ID = ['526896', '335787', '438631', '414906', '157336', '577922', '475557', '281957']
const SERIES_ID = ['94997', '110492', '1399', '87108', '85552']

const mainContainer = document.querySelector('.main__container')
const container = document.querySelector('.container')
const movieInfo = document.querySelector('.movie_info')
const movieName = document.querySelector('.movie_name')
const movieDescription = document.querySelector('.movie_description')
const movieRating = document.querySelector('.movie_rating')
const movieButton = document.querySelector('.movie_button')

function getMovieURL(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
}
function getSerieURL(tvId) {
    return `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}&language=${LANGUAGE}`
}


async function createMovieCard(movieId) {
    let res = await fetch(getMovieURL(movieId))
    let movie = await res.json()
    try {
        const ul = document.getElementById('list_card_movie')
        let li = document.createElement('li')
        li.id = 'card_movie'
        li.style.background = `url("${POSTER_PATH}${movie.poster_path}")`
        li.style.backgroundPosition = 'center'
        li.style.backgroundRepeat = 'no-repeat'
        li.style.backgroundSize = 'cover'
        li.setAttribute('onclick', `setMovieExhibition('${movieId}')`)
        ul.appendChild(li)

    } catch(err) {
        console.error(err.message)
    }
    
}
async function setMovie(movieId) {
    let res = await fetch(getMovieURL(movieId))
    let movie = await res.json()

    try {
        container.style.background = `var(--bgGradient), url("${BACKDROP_PATH}${movie.backdrop_path}")`
        container.style.backgroundPosition = '75% 25%'
        container.style.backgroundRepeat = 'no-repeat'
        container.style.backgroundSize = 'cover'
        
        const yearMovie = document.createElement('span')
        yearMovie.innerText = `${getYearReleased(movie.release_date)} | ${movie.genres[0].name} | ${getRunTime(movie.runtime)}`
        movieInfo.appendChild(yearMovie)
        
        const name = document.createElement('h1')
        name.innerText = movie.title
        movieName.appendChild(name)

        const description = document.createElement('h3')
        description.innerText = movie.overview
        movieDescription.appendChild(description)

        const logoImdb = document.createElement('div')
        logoImdb.classList.add('logo_imdb')
        const rating = document.createElement('span')
        rating.innerText = getRating(movie.vote_average)
        movieRating.appendChild(logoImdb)
        movieRating.appendChild(rating)

        movieButton.innerHTML = `
        <div class="play_icon"></div>
        <span>Watch Now</span>`
    } catch(err) {
        console.error(err)
    }
    
}
async function createSerieCard(serieId) {
    let res = await fetch(getSerieURL(serieId))
    let serie = await res.json()
    try {
        const ul = document.getElementById('list_card_tv')
        let li = document.createElement('li')
        li.id = 'card_tv'
        li.style.background = `url("${POSTER_PATH}${serie.poster_path}")`
        li.style.backgroundPosition = '80% 20%'
        li.style.backgroundRepeat = 'no-repeat'
        li.style.backgroundSize = 'cover'

        li.innerHTML = `
        <div class="content__card">
            <h1>${serie.name}</h1>
            <span>${serie.genres[0].name}</span>
        </div>`
        li.setAttribute('onclick', `setSerieExhibition('${serieId}')`)
        ul.appendChild(li)

    } catch(err) {
        console.error(err.message)
    }
    
}
async function setSerie(serieId) {
    let res = await fetch(getSerieURL(serieId))
    let serie = await res.json()

    try {
        container.style.background = `var(--bgGradient), url("${BACKDROP_PATH}${serie.backdrop_path}")`
        container.style.backgroundPosition = '75% 25%'
        container.style.backgroundRepeat = 'no-repeat'
        container.style.backgroundSize = 'cover'
        
        const yearSerie = document.createElement('span')
        yearSerie.innerText = `${getYearReleased(serie.first_air_date)} | ${serie.genres[0].name}`
        movieInfo.appendChild(yearSerie)
        
        const name = document.createElement('h1')
        name.innerText = serie.name
        movieName.appendChild(name)

        const description = document.createElement('h3')
        description.innerText = serie.overview
        movieDescription.appendChild(description)

        const logoImdb = document.createElement('div')
        logoImdb.classList.add('logo_imdb')
        const rating = document.createElement('span')
        rating.innerText = getRating(serie.vote_average)
        movieRating.appendChild(logoImdb)
        movieRating.appendChild(rating)

        movieButton.innerHTML = `
        <div class="play_icon"></div>
        <span>Watch Now</span>`
    } catch(err) {
        console.error(err)
    }
    
}


function setMovieExhibition(movieId) {
    clearExhibition()
    setMovie(movieId) 
}
function setSerieExhibition(serieId) {
    clearExhibition()
    setSerie(serieId) 
}


function clearExhibition() {
    movieInfo.innerHTML = ''
    movieName.innerHTML = ''
    movieDescription.innerHTML = ''
    movieRating.innerHTML = ''
    movieButton.innerHTML = ''
}
function getYearReleased(date) {
    const dateSplit = date.toString().split('-')
    return dateSplit[0]
}
function getRunTime(time) {
    const hour = Math.floor(time/ 60);        
    const min = time % 60;  
    const textMin = (`0${min}`).slice(-2);
  
    return `${hour}h ${textMin}m`;
}
function getRating(val) {
    const a = val.toString().split('')
    return a[0]+a[1]+a[2]
}


let setMovieList = () => MOVIES_ID.forEach(createMovieCard)
let setSerieList = () => SERIES_ID.forEach(createSerieCard)

setMovie(MOVIES_ID[0])
setMovieList()
setSerieList()