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
    movie.forEach(function(m) {
        cards += `<div class="col-lg-3 col-md-6 col-sm-12 mb-5 d-flex align-items-stretch">
                            <div class="card ">
                                <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" class="card-img-top img-fluid">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title mb-3">${m.title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted mb-4">${m.release_date.slice(0, 4)}</h6>
                                    <a href="#" id="modal-button" class="btn btn-primary mt-auto" data-bs-toggle="modal" 
                                    data-bs-target="#id_${m.id}">Show Details</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="id_${m.id}" tabindex="-1" aria-labelledby="movie-detail-modal-label"
                        aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="movie-detail-modal-label">${m.title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" class="img-fluid">
                                            </div>
                                            <div class="col-md-8">
                                                <ul class="list-group">
                                                    <li class="list-group-item">${m.title}</li>
                                                    <li class="list-group-item">Rating : ${m.vote_average}</li>
                                                    <li class="list-group-item">Date : ${m.release_date}</li>
                                                    <li class="list-group-item">Genre : </li>
                                                    <li class="list-group-item">"${m.overview}"</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                    </div>`;
        container.innerHTML = cards;
    })
}

const searchButton = document.getElementById('button-search');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener("click", () => {
    searchMovies(searchInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
    return getMovie();
})
