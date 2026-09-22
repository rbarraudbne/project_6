/**
 * ui.js
 * Fonctions responsables de la génération du DOM à partir des données
 * renvoyées par l'API (aucun appel fetch ici, uniquement du rendu).
 */

/**
 * Affiche le film vedette dans la zone "Meilleur film".
 * @param {Object} movie
 */
function renderBestMovie(movie) {
    const image = document.getElementById("meilleur-film-image");
    const titre = document.getElementById("meilleur-film-titre");
    const resume = document.getElementById("meilleur-film-resume");
    const boutonDetails = document.getElementById("meilleur-film-bouton-details");

    image.src = movie.image_url;
    image.alt = `Affiche du film ${movie.title}`;
    image.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/400x600?text=Affiche+indisponible";
    };
    titre.textContent = movie.title;
    resume.textContent = movie.description || "";
    boutonDetails.dataset.movieId = movie.id;
}

/**
 * Construit un <li> de film à insérer dans une grille responsive.
 * 1 colonne en mobile, 2 en tablette (dès 768px), 3 en desktop (dès 992px).
 * Les films 3-4 et 5-6 portent une classe de masquage qui sera levée par
 * le bouton "Voir plus" (ajout de la classe .liste-etendue sur le <ul>).
 * @param {Object} movie
 * @param {number} index - position du film dans la liste (0 à 5)
 * @returns {HTMLLIElement}
 */
function createMovieListItem(movie, index) {
    const li = document.createElement("li");
    li.className = "col-12 col-md-6 col-lg-4";

    if (index === 2 || index === 3) {
        li.classList.add("film-cache-mobile");
    }
    if (index === 4 || index === 5) {
        li.classList.add("film-cache-tablette");
    }

    li.innerHTML = `
        <article>
            <figure>
                <img src="${movie.image_url}" alt="Affiche du film ${movie.title}" onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=Affiche+indisponible';">
            </figure>
            <h3>${movie.title}</h3>
            <button type="button" data-movie-id="${movie.id}">Détails</button>
        </article>
    `;

    return li;
}

/**
 * Vide un conteneur puis y insère une liste de films.
 * Réinitialise aussi l'état "étendu" de la liste (utile si la catégorie
 * change et que la liste précédente était en mode "Voir plus").
 * @param {string} listElementId - id du <ul> cible
 * @param {Array} movies
 */
function renderMovieList(listElementId, movies) {
    const list = document.getElementById(listElementId);
    list.innerHTML = "";
    list.classList.remove("liste-etendue");

    movies.forEach((movie, index) => {
        list.appendChild(createMovieListItem(movie, index));
    });
}

/**
 * Remplit le <select> "Autres" avec la liste des genres reçue de l'API.
 * @param {Array} genres - liste de genres {id, name}
 */
function renderGenreOptions(genres) {
    const select = document.getElementById("select-categorie");
    select.innerHTML = "";

    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        select.appendChild(option);
    });
}

/**
 * Remplit la fenêtre modale avec le détail complet d'un film.
 * @param {Object} movie - détail complet renvoyé par fetchMovieDetail
 */
function renderMovieModal(movie) {
    const image = document.getElementById("modal-image");
    image.src = movie.image_url;
    image.alt = `Affiche du film ${movie.title}`;
    image.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/300x450?text=Affiche+indisponible";
    };

    document.getElementById("modal-titre-film").textContent = movie.title;

    const genres = (movie.genres || []).join(", ");
    document.getElementById("modal-annee-genres").textContent = `${movie.year} - ${genres}`;

    const pays = (movie.countries || []).join(", ");
    document.getElementById("modal-classification-duree-pays").textContent =
        `${movie.rated} - ${movie.duration} minutes (${pays})`;

    document.getElementById("modal-score").textContent = `IMDB score : ${movie.imdb_score}/10`;

    const boxOffice = movie.worldwide_gross_income
        ? `${movie.worldwide_gross_income} $`
        : "Non communiquées";
    document.getElementById("modal-box-office").textContent = `Recettes au box-office : ${boxOffice}`;

    const realisateurs = (movie.directors || []).join(", ");
    document.getElementById("modal-realisateur").textContent = `Réalisé par : ${realisateurs}`;

    document.getElementById("modal-resume").textContent = movie.long_description || movie.description || "";

    const acteurs = (movie.actors || []).join(", ");
    document.getElementById("modal-acteurs").textContent = acteurs;
}