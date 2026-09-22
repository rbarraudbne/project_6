/**
 * main.js
 * Point d'entrée : orchestre le chargement initial des données au
 * démarrage de la page (DOMContentLoaded), branche les interactions
 * (modale de détail, "Voir plus"/"Voir moins", sélection de catégorie),
 * en s'appuyant sur les fonctions de api.js (récupération) et ui.js
 * (affichage).
 */

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

/**
 * Charge la liste des genres, remplit le menu déroulant "Autres", puis
 * charge les films du genre sélectionné par défaut.
 */
function loadGenres() {
    fetchGenres()
        .then((genres) => {
            renderGenreOptions(genres);
            // Une fois le select rempli, on charge les films du genre
            // actuellement sélectionné (le premier de la liste par défaut).
            const select = document.getElementById("select-categorie");
            loadCategory(select.value, "liste-autres");
        })
        .catch((error) => {
            console.error("Impossible de charger la liste des genres :", error);
        });
}

/**
 * Ouvre la modale de détail pour un film donné.
 * @param {number} movieId
 */
function openMovieModal(movieId) {
    fetchMovieDetail(movieId)
        .then((movie) => {
            renderMovieModal(movie);
            document.getElementById("modal-detail-film").showModal();
        })
        .catch((error) => {
            console.error("Impossible de charger le détail du film :", error);
        });
}

/**
 * Bascule une liste de films entre son état "replié" et "étendu", et met
 * à jour le texte du bouton en conséquence.
 * @param {HTMLButtonElement} button
 */
function toggleMovieList(button) {
    const listId = button.dataset.listId;
    const list = document.getElementById(listId);

    list.classList.toggle("liste-etendue");

    const estEtendue = list.classList.contains("liste-etendue");
    button.textContent = estEtendue ? "Voir moins" : "Voir plus";
}

document.addEventListener("DOMContentLoaded", () => {
    loadBestMovie();
    loadTopRatedList();
    loadCategory("Mystery", "liste-categorie-1");
    loadCategory("Comedy", "liste-categorie-2");
    loadGenres();

    // Délégation d'événements : un seul listener sur <main>, qui capte
    // les clics sur n'importe quel bouton "Détails", même ceux créés
    // dynamiquement après ce moment (recharge de catégorie, etc.).
    document.querySelector("main").addEventListener("click", (event) => {
        const detailsButton = event.target.closest("[data-movie-id]");
        if (detailsButton) {
            openMovieModal(detailsButton.dataset.movieId);
            return;
        }

        const voirPlusButton = event.target.closest(".bouton-voir-plus");
        if (voirPlusButton) {
            toggleMovieList(voirPlusButton);
        }
    });

    // Fermeture de la modale.
    document.getElementById("modal-fermer-bouton").addEventListener("click", () => {
        document.getElementById("modal-detail-film").close();
    });

    // Changement de catégorie dans le menu déroulant "Autres".
    document.getElementById("select-categorie").addEventListener("change", (event) => {
        loadCategory(event.target.value, "liste-autres");
    });
});