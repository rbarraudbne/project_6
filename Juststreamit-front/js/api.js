/**
 * api.js
 * Regroupe toutes les fonctions de communication avec l'API OCMovies.
 * Chaque fonction retourne une Promise résolue avec les données JSON,
 * ou lève une erreur si la requête échoue.
 */

const API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Récupère une liste de films triés par score IMDB décroissant.
 * @param {number} count - nombre de films à récupérer
 * @returns {Promise<Array>} liste de films
 */
async function fetchTopRatedMovies(count = 7) {
    const url = `${API_BASE_URL}/titles/?sort_by=-imdb_score&page_size=${count}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur API (${response.status}) sur ${url}`);
    }

    const data = await response.json();
    return data.results;
}

/**
 * Récupère les films les mieux notés d'un genre donné.
 * @param {string} genreName - nom du genre (ex: "Comedy")
 * @param {number} count - nombre de films à récupérer
 * @returns {Promise<Array>} liste de films
 */
async function fetchMoviesByGenre(genreName, count = 6) {
    const url = `${API_BASE_URL}/titles/?genre_contains=${encodeURIComponent(genreName)}&sort_by=-imdb_score&page_size=${count}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur API (${response.status}) sur ${url}`);
    }

    const data = await response.json();
    return data.results;
}

/**
 * Récupère le détail complet d'un film à partir de son id.
 * @param {number} movieId
 * @returns {Promise<Object>} détail du film
 */
async function fetchMovieDetail(movieId) {
    const url = `${API_BASE_URL}/titles/${movieId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur API (${response.status}) sur ${url}`);
    }

    return response.json();
}

/**
 * Récupère la liste de tous les genres disponibles.
 * @returns {Promise<Array>} liste de genres {id, name}
 */
async function fetchGenres() {
    const url = `${API_BASE_URL}/genres/?page_size=50`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur API (${response.status}) sur ${url}`);
    }

    const data = await response.json();
    return data.results;
}