import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ComicsFromCharacter = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const shorteringString = (str) => {
    if (!str) {
      return "Pas de description disponible";
    }

    if (str.length > 80) {
      return str.slice(0, 80);
    } else {
      return str;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <h1>Ceci est la page des Comics où apparaissent le personnage de {data.name} !</h1>

      <section className="home">
        {data.comics.map((comic, index) => {
          return (
            <article key={comic.title + index}>
              <h2>{comic.title}</h2>
              <div>
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge." +
                    comic.thumbnail.extension
                  }
                  alt={"image de " + comic.title}
                />
              </div>
              <p>{shorteringString(comic.description)}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default ComicsFromCharacter;
