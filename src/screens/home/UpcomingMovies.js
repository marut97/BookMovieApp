import React, { useEffect, useState } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import "./Home.css";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        "http://localhost:8085/api/v1/movies?status=PUBLISHED"
      );
      const data = await response.json();
      setMovies(data.movies);
    };

    load();
  }, []);

  return (
    <div>
      <div className="upcomingMoviesHeader">Upcoming Movies</div>
      <GridList cols={6} style={{ flexWrap: "nowrap" }}>
        {movies.map((movie) => (
          <GridListTile style={{ height: "250px" }} key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default UpcomingMovies;
