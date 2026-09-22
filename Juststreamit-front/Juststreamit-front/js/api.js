/**
 * api.js
 * Regroupe toutes les fonctions de communication avec l'API OCMovies.
 * Chaque fonction retourne une Promise résolue avec les données JSON.
 * Les erreurs (réseau ou statut HTTP invalide) sont propagées via un
 * "throw" à l'intérieur d'un .then(), ce qui fait automatiquement
 * "sauter" la Promise vers le prochain .catch() de la chaîne appelante.
 */

const API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Récupère une liste de films triés par score IMDB décroissant.
 * @param {number} count - nombre de films à récupérer
 * @returns {Promise<Array>} Promise résolue avec la liste de films
 */
function fetchTopRatedMovies(count = 7) {
    const url = `${API_BASE_URL}/titles/?sort_by=-imdb_score&page_size=${count}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur API (${response.status}) sur ${url}`);
            }
            return response.json();
        })
        .then((data) => data.results);
}

/**
 * Récupère les films les mieux notés d'un genre donné.
 * @param {string} genreName - nom du genre (ex: "Comedy")
 * @param {number} count - nombre de films à récupérer
 * @returns {Promise<Array>} Promise résolue avec la liste de films
 */
function fetchMoviesByGenre(genreName, count = 6) {
    const url = `${API_BASE_URL}/titles/?genre_contains=${encodeURIComponent(genreName)}&sort_by=-imdb_score&page_size=${count}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur API (${response.status}) sur ${url}`);
            }
            return response.json();
        })
        .then((data) => data.results);
}

/**
 * Récupère le détail complet d'un film à partir de son id.
 * @param {number} movieId
 * @returns {Promise<Object>} Promise résolue avec le détail du film
 */
function fetchMovieDetail(movieId) {
    const url = `${API_BASE_URL}/titles/${movieId}`;

    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`Erreur API (${response.status}) sur ${url}`);
        }
        return response.json();
    });
}

/**
 * Récupère la liste de tous les genres disponibles.
 * @returns {Promise<Array>} Promise résolue avec la liste de genres {id, name}
 */
function fetchGenres() {
    const url = `${API_BASE_URL}/genres/?page_size=50`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur API (${response.status}) sur ${url}`);
            }
            return response.json();
        })
        .then((data) => data.results);
}