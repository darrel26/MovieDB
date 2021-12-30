const API_KEY = "api_key=b384eeab6ab3dfa909f0a1066f23e1e6";
const baseURL = "https://api.themoviedb.org/3";

const getMovie = () => {
    fetch(`${baseURL}/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc`)
        .then(res => res.json())
        .then(movie => {
            renderMovie(movie.results);
        })
}

const searchMovies = (keyword) => {
    fetch(`${baseURL}/search/movie?${API_KEY}&query=${keyword}`)
        .then(res => res.json())
        .then(movie => {
            renderMovie(movie.results);
        })
}

const renderMovie = (movie) => {
    const container = document.getElementById('movie-container');
    let cards = '';
    movie.forEach(m => {
        cards += `<div class="col-lg-3 col-md-6 col-sm-12 mb-5 d-flex align-items-stretch">
                            <div class="card ">
                                <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" class="card-img-top img-fluid">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title mb-3">${m.title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted mb-4">2021</h6>
                                    <a href="#" class="btn btn-primary mt-auto">Show Details</a>
                                </div>
                            </div>
                        </div>`;
        container.innerHTML = cards;
    })
}

const searchButton = document.getElementById('button-search');
const searchInput = document.getElementById('search-input')

searchButton.addEventListener("click", () => {
    searchMovies(searchInput.value);
})

document.addEventListener("DOMContentLoaded", () => {
    return getMovie();
})