import React, { useEffect, useState } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieFilter from "./MovieFilter";

const ReleasedMovies = (props) => {
  const [movies, setMovies] = useState([]);

  const load = async (filter = "") => {
    const response = await fetch(
      "http://localhost:8085/api/v1/movies?status=RELEASED" + filter
    );
    const data = await response.json();
    setMovies(data.movies);
  };

  useEffect(() => {
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
                subtitle={"Release Date:" + new Date(movie.release_date).toDateString()}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>

      <div
        style={{
          width: "24%",
          margin: "16px",
          minWidth: "240px"
        }}
      >
        <MovieFilter onFilter={load} />
      </div>
    </div>
  );
};

export default ReleasedMovies;
