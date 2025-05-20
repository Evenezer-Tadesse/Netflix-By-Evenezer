import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "../../../Unite/Axiose";
import "../row/row.css";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // Set empty array if fetch fails
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    // Toggle if clicking the same movie
    if (selectedId === movie.id) {
      setTrailerUrl("");
      setSelectedId(null);
      return;
    }

    setSelectedId(movie.id);
    setTrailerUrl("loading");

    try {
      const response = await axios.get(`/movie/${movie.id}/videos`);
      const trailers =
        response.data.results?.filter(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        ) || [];

      if (trailers.length > 0) {
        // Sort by size to get highest quality trailer
        const sortedTrailers = trailers.sort((a, b) => b.size - a.size);
        setTrailerUrl(sortedTrailers[0].key);
      } else {
        // No trailer found - show fallback
        setTrailerUrl("no-trailer");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
      setTrailerUrl("error");
    }
  };

  const handleImageError = (movieId) => {
    setImageErrors((prev) => ({ ...prev, [movieId]: true }));
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
              {imageErrors[movie.id] ? (
                <div className="image-fallback">
                  <span>{movie.title || movie.name}</span>
                </div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    isLarge ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title || movie.name}
                  loading="lazy"
                  onError={() => handleImageError(movie.id)}
                />
              )}
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

      {trailerUrl === "loading" && (
        <div className="trailer-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {trailerUrl === "no-trailer" && (
        <div className="trailer-fallback">
          <p>No trailer available for this movie</p>
          <button
            className="close-trailer"
            onClick={() => setTrailerUrl("")}
            aria-label="Close trailer"
          >
            ×
          </button>
        </div>
      )}

      {trailerUrl === "error" && (
        <div className="trailer-fallback error">
          <p>Failed to load trailer. Please try again later.</p>
          <button
            className="close-trailer"
            onClick={() => setTrailerUrl("")}
            aria-label="Close trailer"
          >
            ×
          </button>
        </div>
      )}

      {trailerUrl &&
        trailerUrl !== "loading" &&
        trailerUrl !== "no-trailer" &&
        trailerUrl !== "error" && (
          <div className="trailer-container">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerUrl}`}
              width="100%"
              height="100%"
              controls
              playing
              onError={() => setTrailerUrl("error")}
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
        )}
    </div>
  );
};

export default React.memo(Row);
