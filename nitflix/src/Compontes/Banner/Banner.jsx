import React, { useState, useEffect } from "react";
import axios from "../../Unite/Axiose";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get("/discover/tv?with_networks=213");
        const results = request.data.results;
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">
            <i className="fas fa-info-circle"></i> More Info
          </button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
