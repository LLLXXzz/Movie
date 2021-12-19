const top250 = "https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn"
const searchApi = "https://api.wmdb.tv/api/v1/movie/search?q=";
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getMovies(url) {
    //fetch返回的是promise 要用.then 或者await
    const res = await fetch(url)
    //.json返回的也是promise对象
    const result = await res.json()
    // console.log(result[0].data['0']);
    showMovies(result)
}
getMovies(top250)
function showMovies(movies) {
    const main = document.querySelector('#main')
    main.innerHTML = ''
    movies.forEach(movies => {
        // console.log(movies);
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <div class = 'img-container'>
                <img src='${movies.data[0].poster}'>
            </div>
            <div class='movie-info'>
                <h3>${movies.data[0].name}</h3>
                <span class='${getClassByRate(movies.doubanRating)}'>${movies.doubanRating}</span>
            </div>
            <div class='overview'>
                <h3>概览</h3>
                <div class='text'>
                    ${movies.data[0].description}
                </div>
            </div>
        `
        main.appendChild(movieEl)
    });
}
function getClassByRate(vote) {
    if (vote > 8) {
        return 'green'
    } else if (vote > 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e);
    const searchTerm = search.value;
    // console.log(searchTerm);
    if (searchTerm && searchTerm != '') {
        getMovies(searchApi + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})