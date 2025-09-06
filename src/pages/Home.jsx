// Import des hooks React
import { useState, useEffect } from "react";

// Import de la librairie axios
import axios from "axios";

// Import du composant Link de React Router pour gérer la navigation interne
import { Link } from "react-router-dom";

import HeroHeader from "../components/HeroHeader";

// Composant Home qui reçoit deux props : name et setName
const Home = ({ name, setName }) => {
  // State qui contient les données reçues de l'API
  const [data, setData] = useState("");

  // State qui gère l'affichage du "Chargement..."
  const [isLoading, setIsLoading] = useState(true);

  // Fonction perso pour raccourcir les descriptions trop longues
  const shorteringString = (str) => {
    if (!str) {
      // Si pas de description, on affiche un message par défaut
      return "Pas de description disponible";
    }
    if (str.length > 20) {
      // Si la description est trop longue, on coupe
      return str.slice(0, 20) + "...";
    } else {
      // Sinon on renvoie la string telle quelle
      return str;
    }
  };

  // useEffect s'exécute quand le composant est monté OU quand "name" change
  useEffect(() => {
    // Gestion des filtres pour la requête API
    let filters = "";
    if (name) {
      // Si un nom est fourni, on ajoute un paramètre à l'URL
      filters += `?title=${name}`;
    }

    // Fonction asynchrone pour récupérer les données
    const fetchData = async () => {
      try {
        // Requête vers le backend
        const response = await axios.get(
          `https://p01--velmar-backend--mjzb7kybbk2h.code.run/characters${filters}`
        );

        // Mise à jour du state "data" avec les données reçues
        setData(response.data);

        // Fin du chargement et repasse le state "isLoading" à false
        setIsLoading(false);
      } catch (error) {
        // Si la requête échoue, on affiche une erreur dans la console
        console.log(error.message);
      }
    };

    // On exécute la fonction
    fetchData();
  }, [name]); // useEffect se relance à chaque fois que "name" change

  // Render
  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <HeroHeader
        title="Bienvenue dans l'univers de MARVEL"
        subtitle="Accéde à une base de données riche autour des personnages et des comics MARVEL !"
      />
      {/* Section principale qui affiche la liste des personnages */}
      <section className="container">
        {data.results.map((character, index) => {
          return (
            // Link permet de naviguer vers la page du personnage cliqué
            <Link
              key={character.name + index} // clé unique pour React
              to={`/character/${character._id}`} // URL dynamique avec l'ID
            >
              <article>
                {/* Image du personnage avec un apercu et une extension précisés */}
                <img
                  src={
                    character.thumbnail.path +
                    "/portrait_xlarge." +
                    character.thumbnail.extension
                  }
                  alt={"image de " + character.name}
                />

                {/* Détails du personnage */}
                <div className="article-details">
                  <h2>{character.name}</h2>
                  <p>{shorteringString(character.description)}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
