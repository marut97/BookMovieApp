import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Details.css";
import Ratings from "./Ratings";
import MainDetails from "./MainDetails";

const Content = (props) => {
  // Declare state variables
  const [movie, setMovie] = useState({});
  const [youtube, setYoutube] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [artist, setArtist] = useState([]);

  // function to get movie
  async function load() {
    const rawResponse = await fetch(
      props.baseUrl + "movies/" + props.match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    // Handling response
    const data = await rawResponse.json();
    setYoutube(data.trailer_url.split("=")[1]);
    setGenre(data.genres.join(", "));
    setDate(new Date(data.release_date).toDateString());
    setArtist(data.artists);
    setMovie(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="details">
      <div className="leftSection">
        <img src={movie.poster_url} alt={movie.title} className="poster" />
      </div>
      <MainDetails
        className="centerSection"
        movie={movie}
        date={date}
        genre={genre}
        youtube={youtube}
      />
      <div className="rightSection">
        <Ratings />
        <Typography className="artist">
          <b>Artists:</b>
          <br />
        </Typography>
        <GridList cols={2} style={{ margin: "2px" }}>
          {artist.map((artist) => (
            <GridListTile key={artist.id}>
              <img
                src={artist.profile_url}
                alt={`${artist.first_name} ${artist.last_name}`}
              />
              <GridListTileBar
                title={`${artist.first_name} ${artist.last_name}`}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

const Details = function (props) {
  return (
    <div>
      <Header
        loggedIn={props.loggedIn}
        loggedInChanged={props.loggedInChanged}
        BookShowVisible={true}
        id={props.match.params.id}
      />
      <Link to={"/"} className="link">
        <Typography className="back">&#60; Back to Book Show</Typography>
      </Link>
      <Content {...props} />
    </div>
  );
};

export default Details;
