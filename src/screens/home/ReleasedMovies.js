import React, { useEffect, useState } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";

const ReleasedMovies = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        "http://localhost:8085/api/v1/movies?status=RELEASED"
      );
      const data = await response.json();
      setMovies(data.movies);
    };

    load();
  }, []);

  return (
    <div className="releasedMovies">
      <GridList
        cols={4}
        rowHeight={350}
        spacing={20}
        style={{
          width: "76%",
          margin: "16px",
          overflow: "hidden",
        }}
      >
        {movies.map((movie) => (
          <GridListTile
            key={movie.id}
            style={{
              height: "250px",
              cursor: "pointer",
            }}
          >
            <Link to={"/movie/" + movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar
                title={movie.title}
                subtitle={"Release Date:" + Date(movie.release_date).toString()}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>

      <div className="movieFilter" />
    </div>
  );
};

export default ReleasedMovies;
