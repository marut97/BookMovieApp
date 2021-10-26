import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import UpcomingMovies from "./UpcomingMovies";

const Home = (props) => {
  return (
    <div className="home">
      <Header></Header>
      <UpcomingMovies />
    </div>
  );
};

export default Home;
