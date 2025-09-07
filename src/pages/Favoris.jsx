import { useEffect, useState } from "react";

import HeroHeader from "../components/HeroHeader";

const Favorites = () => {
  // State pour stocker les personnages favoris
  const [characters, setCharacters] = useState([]);

  // State pour stocker les comics favoris
  const [comics, setComics] = useState([]);

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
    // On récupère les favoris stockés dans le localStorage
    const savedCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const savedComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];

    // On met à jour les states avec les données récupérées
    setCharacters(savedCharacters);
    setComics(savedComics);
  }, []); 

  return (
    <main>
      <HeroHeader
        title="Ta collection de favoris"
        subtitle="Accéde à tes personnages et tes comics préférés !"
      />
      {/* Titre principal */}
       <h1>Personnages</h1>
      <section>
      
        {characters.length > 0 ? (
          <div className="container">
            {characters.map((character) => (
              <article key={character._id}>
                {/* Image du personnage favori */}
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
              </article>
            ))}
          </div>
        ) : (
          // Message affiché si aucun personnage en favori
          <p>Aucun personnage en favori.</p>
        )}
      </section>

      {/* Favoris Comics */}
      <h1>Comics</h1>
      <section>
        {comics.length > 0 ? (
          <div className="container">
            {comics.map((comic) => (
              <article key={comic._id}>
                {/* Image du comic favori */}
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge." +
                    comic.thumbnail.extension
                  }
                  alt={"image de " + comic.title}
                />
                <div className="article-details">
                  <h2>{comic.title}</h2>
                  <p>{shorteringString(comic.description)}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Message affiché si aucun comic en favori
          <p>Aucun Comic en favori.</p>
        )}
      </section>
    </main>
  );
};

export default Favorites;
