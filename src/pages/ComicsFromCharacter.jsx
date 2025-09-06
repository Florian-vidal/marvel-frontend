import { useState, useEffect } from "react";

import axios from "axios";
import HeroHeader from "../components/HeroHeader";

import { useParams } from "react-router-dom";

const ComicsFromCharacter = () => {
  // State pour stocker les données (liste de comics + count)
  const [data, setData] = useState({ results: [], count: 0 });

  // State pour gérer le chargement
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de l’ID du personnage depuis la route du backend (/character/:id)
  const { id } = useParams();

  // State pour gérer la pagination
  const [page, setPage] = useState(1);

  // Nombre d’éléments affichés par page
  const limit = 20;

  // Fonction pour raccourcir les descriptions trop longues
  const shorteringString = (str) => {
    if (!str) {
      return "Pas de description disponible";
    }

    if (str.length > 30) {
      return str.slice(0, 30);
    } else {
      return str;
    }
  };

  // useEffect s’exécute au montage du composant et quand id/page changent
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Calcul du "skip" pour gérer la pagination
        const skip = (page - 1) * limit;
        let filters = `?skip=${skip}&limit=${limit}`;

        // Appel API pour récupérer les comics liés à un personnage précis
        const response = await axios.get(
          `http://localhost:3000/comics/${id}${filters}`
        );

        // Mise à jour du state avec les données reçues
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id, page]); //relance la requête si l’id change ou si on change de page

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      {/* Titre de la page */}
      <HeroHeader
        title="La liste des comics de ton personnage préféré"
        subtitle="Accéde à une base de données riche autour des personnages et des comics MARVEL !"
      />

      {/* Liste des comics */}
      <section className="container">
        {data.comics.map((comic, index) => {
          return (
            <div key={comic.title + index}>
              <article>
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
            </div>
          );
        })}
      </section>

      {/* Pagination */}
      <div className="pagination">
        {/* Bouton précédent si page > 1 */}
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>◀ Précédent</button>
        )}

        {/* Numéro de la page actuelle */}
        <span>Page {page}</span>

        {/* Bouton suivant si on a encore des résultats */}
        {data.comics?.length === limit && (
          <button onClick={() => setPage(page + 1)}>Suivant ▶</button>
        )}
      </div>
    </main>
  );
};

export default ComicsFromCharacter;
