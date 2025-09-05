import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const shorteringString = (str) => {
    if (!str) {
      return "Pas de description disponible";
    }
    if (str.length > 80) {
      return str.slice(0, 80) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        // console.log(response.data);
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
      <h1>Ceci est la page des Comics !</h1>

      <section  className="home">
        {data.results.map((comic, index) => {
          return (
            
              <article key={comic.title + index}>
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
                <h2>{comic.title}</h2>

                <p>{shorteringString(comic.description)}</p>
              </article>
         
          );
        })}
      </section>
    </main>
  );
};

export default Comics;
