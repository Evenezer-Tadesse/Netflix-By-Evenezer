import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "../../../Unite/Axiose";
import "../row/row.css";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (selectedId === movie.id) {
      setTrailerUrl("");
      setSelectedId(null);
      return;
    }

    setSelectedId(movie.id);
    setTrailerUrl("loading");

    try {
      const response = await axios.get(`/movie/${movie.id}/videos`);
      const trailers = response.data.results.filter(
        (vid) =>
          vid.site === "YouTube" &&
          (vid.type === "Trailer" || vid.type === "Teaser")
      );
      setTrailerUrl(trailers[0]?.key || "");
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
      setTrailerUrl("");
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [movies]);

  return (
    <div className="row-wrapper">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
      </div>

      <div className="row-container">
        {showScrollButtons && (
          <button
            className="scroll-button left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        <div className="row-content" ref={rowRef} onScroll={checkScroll}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${isLarge ? "large" : ""} ${
                selectedId === movie.id ? "active" : ""
              }`}
              onClick={() => handleClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title || movie.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                  e.target.className = "movie-poster-error";
                }}
              />
            </div>
          ))}
        </div>

        {showScrollButtons && (
          <button
            className="scroll-button right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>

      {trailerUrl === "loading" ? (
        <div className="trailer-loading">
          <div className="loading-spinner"></div>
        </div>
      ) : trailerUrl ? (
        <div className="trailer-container">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  color: "white",
                },
              },
            }}
          />
          <button
            className="close-trailer"
            onClick={() => setTrailerUrl("")}
            aria-label="Close trailer"
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Row);
