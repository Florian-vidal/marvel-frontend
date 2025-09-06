import { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import HeroHeader from "../components/HeroHeader";

// Import d'icônes (cœur rempli et cœur vide) pour les favoris
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const Characters = () => {
  // State qui contient les données de l’API (résultats + nombre total)
  const [data, setData] = useState({ results: [], count: 0 });

  const [isLoading, setIsLoading] = useState(true);

  // State pour gérer la barre de recherche par nom
  const [name, setName] = useState("");

  // State pour gérer la pagination (numéro de page en cours)
  const [page, setPage] = useState(1);

  // State pour afficher un message d'ajout/retrait des favoris
  const [message, setMessage] = useState("");

  // Nombre d’éléments affichés par page
  const limit = 20;

  // State pour gérer les favoris stockés dans le localStorage
  const [favoritesCharacters, setFavoritesCharacters] = useState(
    JSON.parse(localStorage.getItem("favoritesCharacters")) || []
  );

  // Fonction pour ajouter ou retirer un personnage des favoris
  const toggleFavorite = (character) => {
    // On copie le tableau actuel des favoris
    let updatedFavorites = [...favoritesCharacters];

    // Vérification si le personnage est déjà dans les favoris
    const isAlreadyFavorite = updatedFavorites.some(
      (favori) => favori._id === character._id
    );

    if (isAlreadyFavorite) {
      // Si le perso est déjà favori alors on le retire
      updatedFavorites = updatedFavorites.filter(
        (favori) => favori._id !== character._id
      );
      setMessage(`${character.name} retiré des favoris`);
    } else {
      // Sinon on l’ajoute
      updatedFavorites.push(character);
      setMessage(`${character.name} ajouté aux favoris`);
    }

    // On met à jour le state
    setFavoritesCharacters(updatedFavorites);

    // Et on sauvegarde dans le localStorage pour conserver les favoris même après un refresh
    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(updatedFavorites)
    );

    // Efface le message des favoris après 2 secondes
    setTimeout(() => setMessage(""), 2000);
  };

  const shorteringString = (str) => {
    if (!str) {
      return "Pas de description disponible";
    }
    if (str.length > 30) {
      return str.slice(0, 30) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Calcul du skip pour la pagination
        const skip = (page - 1) * limit;
        let filters = `?skip=${skip}&limit=${limit}`;

        // Si on fait une recherche par nom, on ajoute le filtre
        if (name) {
          filters += `&name=${name}`;
        }

        // Appel API pour récupérer les personnages
        const response = await axios.get(
          `http://localhost:3000/characters${filters}`
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [name, page]); // on relance useEffect si la recherche ou la page change

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      {/* Titre principal de la page */}
      <HeroHeader
        title="Les héros et les méchants iconiques de la maison des idées"
        subtitle="Clique sur chaque personnage pour voir son apparition dans les Comics !"
      />

      {/* Barre de recherche */}
      <div className="searchBar">
        <input
          type="search"
          id="searchCharacters"
          placeholder="Rechercher des personnages"
          value={name}
          onChange={(event) => {
            setName(event.target.value); // met à jour le state "name"
          }}
        />
      </div>

      {/* Message temporaire pour l'ajout & retrait d'un favori */}
      {message && <div className="favorite-message">{message}</div>}

      {/* Liste des personnages */}
      <section className="container">
        {data.results.map((character, index) => {
          return (
            <article key={character._id}>
              {/* Bouton pour ajouter/retirer des favoris */}
              <button
                className="favoriteButton"
                onClick={() => toggleFavorite(character)}
              >
                {favoritesCharacters.some(
                  (fav) => fav._id === character._id
                ) ? (
                  <MdFavorite /> // Icone cœur rempli
                ) : (
                  <MdFavoriteBorder /> // Icone cœur vide
                )}
              </button>

              {/* Lien vers la page du personnage spécifié lors du clic */}
              <Link to={`/character/${character._id}`}>
                <img
                  src={
                    character.thumbnail.path +
                    "/portrait_xlarge." +
                    character.thumbnail.extension
                  }
                  alt={"image de " + character.name}
                />
                <div className="article-details">
                  <h2>{character.name}</h2>
                  <p>{shorteringString(character.description)}</p>
                </div>
              </Link>
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
              window.scrollTo({ top: 0, behavior: "smooth" }); // scroll en haut
            }}
          >
            ◀ Précédent
          </button>
        )}

        {/* Numéro de la page courante */}
        <span>Page {page}</span>

        {/* Bouton suivant (s’affiche seulement si on a encore des résultats) */}
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

export default Characters;
