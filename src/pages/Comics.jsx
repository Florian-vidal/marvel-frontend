import { useState, useEffect } from "react";

import axios from "axios";

import HeroHeader from "../components/HeroHeader";

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const Comics = () => {
  // State qui contient les données de l’API (résultats et nombre total)
  const [data, setData] = useState({ results: [], count: 0 });

  // State pour savoir si les données sont en cours de chargement
  const [isLoading, setIsLoading] = useState(true);

  // State pour la recherche par titre
  const [title, setTitle] = useState("");

  // State pour gérer la pagination
  const [page, setPage] = useState(1);

  // State pour afficher un message temporaire (ajout/retrait favoris)
  const [message, setMessage] = useState("");

  // Nombre de comics affichés par page
  const limit = 20;

  // State qui gère les favoris (persistés dans localStorage)
  const [favoritesComics, setFavoritesComics] = useState(
    JSON.parse(localStorage.getItem("favoritesComics")) || []
  );

  // Fonction pour ajouter ou retirer un comic des favoris
  const toggleFavorite = (comic) => {
    // On fait une copie du tableau des favoris actuels
    let updatedFavorites = [...favoritesComics];

    // On vérifie si le comic est déjà dans les favoris
    const isAlreadyFavorite = updatedFavorites.some(
      (fav) => fav._id === comic._id
    );

    if (isAlreadyFavorite) {
      // Si le comic est déjà favori alors on le retire
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav._id !== comic._id
      );
      setMessage(`${comic.title} retiré des favoris`);
    } else {
      // Sinon on l’ajoute
      updatedFavorites.push(comic);
      setMessage(`${comic.title} ajouté aux favoris`);
    }

    // On met à jour le state
    setFavoritesComics(updatedFavorites);

    // On sauvegarde les favoris dans localStorage pour les garder après un refresh
    localStorage.setItem("favoritesComics", JSON.stringify(updatedFavorites));

    // On efface le message après 2 secondes
    setTimeout(() => setMessage(""), 2000);
  };

  // Fonction pour raccourcir les descriptions trop longues
  const shorteringString = (str) => {
    if (!str) {
      return "Pas de description disponible";
    }
    if (str.length > 40) {
      return str.slice(0, 40) + "...";
    } else {
      return str;
    }
  };

  // useEffect qui s’exécute quand le titre ou la page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Calcul du "skip" pour la pagination
        const skip = (page - 1) * limit;
        let filters = `?skip=${skip}&limit=${limit}`;

        // Si on recherche un comic par titre
        if (title) {
          filters += `&title=${title}`;
        }

        // Appel API pour récupérer les comics
        const response = await axios.get(
          `https://p01--velmar-backend--mjzb7kybbk2h.code.run/comics${filters}`
        );

        // On stocke les données reçues dans le state
        setData(response.data);

        // Chargement terminé
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [title, page]); // relance le hook si le titre ou la page change

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      {/* Titre principal de la page */}
      <HeroHeader
        title="Les Comics de tes personnages Marvel"
        subtitle="Tu peux rechercher par titre tes comics préférés !"
      />
      {/* Barre de recherche pour les comics*/}
      <div className="searchBar">
        <input
          type="search"
          id="searchComics"
          placeholder="Rechercher des Comics"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value); 
          }}
        />
      </div>

      {/* Message temporaire après ajout/retrait favoris */}
      {message && <div className="favorite-message">{message}</div>}

      {/* Liste des comics */}
      <section className="container">
        {data.results
          // On trie les comics par titre avant affichage
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((comic, index) => {
            return (
              <article key={comic.title + index}>
                {/* Bouton pour gérer les favoris */}
                <button
                  className="favoriteButton"
                  onClick={() => toggleFavorite(comic)}
                >
                  {favoritesComics.some((fav) => fav._id === comic._id) ? (
                    <MdFavorite /> // Icône cœur rempli si favori
                  ) : (
                    <MdFavoriteBorder /> // Icône cœur vide sinon
                  )}
                </button>

                {/* Image du comic */}
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge." +
                    comic.thumbnail.extension
                  }
                  alt={"image de " + comic.title}
                />

                {/* Détails du comic */}
                <div className="article-details">
                  <h2>{comic.title}</h2>
                  <p>{shorteringString(comic.description)}</p>
                </div>
              </article>
            );
          })}
      </section>

      {/* Pagination */}
      <div className="pagination">
        {/* Bouton précédent (désactivé si on est en page 1) */}
        {page > 1 && (
          <button
            onClick={() => {
              setPage(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" }); // on remonte en haut
            }}
          >
            ◀ Précédent
          </button>
        )}

        {/* Numéro de la page courante */}
        <span>Page {page}</span>

        {/* Bouton suivant (affiché seulement si on a encore des résultats) */}
        {data.results?.length === limit && (
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Suivant ▶
          </button>
        )}
      </div>
    </main>
  );
};

export default Comics;
