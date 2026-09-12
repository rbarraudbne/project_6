/**
 * main.js
 * Point d'entrée : orchestre le chargement initial des données au
 * démarrage de la page (DOMContentLoaded), en s'appuyant sur les
 * fonctions de api.js (récupération) et ui.js (affichage).


/** Charge et affiche le meilleur film (toutes catégories confondues). */
function loadBestMovie() {
    fetchTopRatedMovies(1)
        .then((movies) => {
            const bestMovieSummary = movies[0];
            // L'endpoint liste ne contient pas le résumé : on va chercher le détail complet.
            return fetchMovieDetail(bestMovieSummary.id);
        })
        .then((bestMovieDetail) => {
            renderBestMovie(bestMovieDetail);
        })
        .catch((error) => {
            console.error("Impossible de charger le meilleur film :", error);
        });
}

/**
 * Charge et affiche les films les mieux notés, en excluant le meilleur film
 * (déjà affiché dans sa propre zone).
 */
function loadTopRatedList() {
    fetchTopRatedMovies(7)
        .then((movies) => {
            const moviesWithoutBest = movies.slice(1, 7);
            renderMovieList("liste-films-mieux-notes", moviesWithoutBest);
        })
        .catch((error) => {
            console.error("Impossible de charger les films les mieux notés :", error);
        });
}

/**
 * Charge et affiche les films les mieux notés d'un genre donné.
 * @param {string} genreName
 * @param {string} listElementId - id du <ul> cible
 */
function loadCategory(genreName, listElementId) {
    fetchMoviesByGenre(genreName, 6)
        .then((movies) => {
            renderMovieList(listElementId, movies);
        })
        .catch((error) => {
            console.error(`Impossible de charger la catégorie ${genreName} :`, error);
        });
}

/** Charge la liste des genres et remplit le menu déroulant "Autres". */
function loadGenres() {
    fetchGenres()
        .then((genres) => {
            renderGenreOptions(genres);
        })
        .catch((error) => {
            console.error("Impossible de charger la liste des genres :", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadBestMovie();
    loadTopRatedList();
    loadCategory("Mystery", "liste-categorie-1");
    loadCategory("Comedy", "liste-categorie-2");
    loadGenres();

});