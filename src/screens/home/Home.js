import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import UpcomingMovies from "./UpcomingMovies";
import ReleasedMovies from "./ReleasedMovies";

const Home = (props) => {
  return (
    <div className="home">
      <Header />
      <UpcomingMovies />
      <ReleasedMovies />
    </div>
  );
};

export default Home;
