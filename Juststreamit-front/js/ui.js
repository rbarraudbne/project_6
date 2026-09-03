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

    image.src = movie.image_url;
    image.alt = `Affiche du film ${movie.title}`;
    image.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/400x600?text=Affiche+indisponible";
    };
    titre.textContent = movie.title;
    resume.textContent = movie.description || "";
}

/**
 * Construit un <li> de film à insérer dans une grille responsive.
 * 1 colonne en mobile, 2 en tablette (dès 768px), 3 en desktop (dès 992px).
 * @param {Object} movie
 * @returns {HTMLLIElement}
 */
function createMovieListItem(movie) {
    const li = document.createElement("li");
    li.className = "col-12 col-md-6 col-lg-4";

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
 * @param {string} listElementId - id du <ul> cible
 * @param {Array} movies
 */
function renderMovieList(listElementId, movies) {
    const list = document.getElementById(listElementId);
    list.innerHTML = "";

    movies.forEach((movie) => {
        list.appendChild(createMovieListItem(movie));
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