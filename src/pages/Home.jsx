import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
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
        const response = await axios.get("http://localhost:3000/characters");
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
      <h1>Ceci est la Home !</h1>

      <section className="home">
        {data.results.map((character, index) => {
          return (
            <Link key={character.name + index} to={`/character/${character._id}`}>
              <article >
                <h2>{character.name}</h2>
                <div>
                  <img
                    src={
                      character.thumbnail.path +
                      "/portrait_xlarge." +
                      character.thumbnail.extension
                    }
                    alt={"image de " + character.name}
                  />
                </div>
                <p>{shorteringString(character.description)}</p>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
