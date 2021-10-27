import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  Checkbox,
  ListItemText,
  TextField,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Button,
} from "@material-ui/core";
import "./Home.css";

const MovieFilter = (props) => {
  const [genre, setGenre] = useState([]);
  const [artists, setArtists] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [movieName, setMovieName] = useState([]);

  const theme = createMuiTheme({});

  const marginStyle = {
    margin: theme.spacing.unit,
    minWidth: "240px",
    maxWidth: "240px",
  };
  const dateHeaderMarginStyle = {
    marginTop: 2 * theme.spacing.unit,
  };
  const cardMinimumWidth = {
    minWidth: 240+ 2*theme.spacing.unit
  };

  const addFilter = (name, value) => {
    if (value.length > 0) {
        console.log(name+value);
      return name + value;
    }
    return "";
  };

  const onFilterFormSubmitted = (e) => {
    e.preventDefault();
    let filter = "";

    filter += addFilter("&title=", movieName);
    filter += addFilter("&genre=", selectedGenre.join(","));
    filter += addFilter("&artists=", selectedArtists.join(","));
    filter += addFilter("&start_date=", startDate);
    filter += addFilter("&end_date=", endDate);

    props.onFilter(filter);
  };

  // Function to fetch all the Genres
  async function loadGenreData() {
    const rawResponse = await fetch("http://localhost:8085/api/v1/genres");
    const data = await rawResponse.json();

    setGenre(data.genres);
  }

  // Function to fetch all the Artists
  async function loadArtistData() {
    const rawResponse = await fetch("http://localhost:8085/api/v1/artists");
    const data = await rawResponse.json();

    setArtists(data.artists);
  }

  useEffect(() => {
    // Calling functions to fetch the required data
    loadGenreData();
    loadArtistData();
  }, []);

  const changeHandler = (e, onChanged) => {
    onChanged(e.target.value);
  };

  return (
    <Card style={cardMinimumWidth}>
      <CardContent>
        <Typography style={marginStyle} color={theme.palette.primary.light}>
          FIND MOVIES BY:
        </Typography>
        <form onSubmit={onFilterFormSubmitted}>
          <FormControl style={marginStyle} className="formControl">
            <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
            <Input
              id="movie-name"
              onChange={(e) => changeHandler(e, setMovieName)}
            />
          </FormControl>

          <FormControl style={marginStyle} className="formControl">
            <InputLabel htmlFor="genreList">Genres</InputLabel>
            <Select
              multiple
              id="genreList"
              value={selectedGenre}
              onChange={(e) => changeHandler(e, setSelectedGenre)}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {genre.map((data) => (
                <MenuItem key={data.id} value={data.genre}>
                  <Checkbox checked={selectedGenre.indexOf(data.genre) > -1} />
                  <ListItemText primary={data.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={marginStyle} className="formControl">
            <InputLabel htmlFor="artistList">Artists</InputLabel>
            <Select
              multiple
              id="artistList"
              value={selectedArtists}
              onChange={(e) => changeHandler(e, setSelectedArtists)}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {artists.map((data) => (
                <MenuItem
                  key={data.id}
                  value={`${data.first_name} ${data.last_name}`}
                >
                  <Checkbox
                    checked={
                      selectedArtists.indexOf(
                        `${data.first_name} ${data.last_name}`
                      ) > -1
                    }
                  />
                  <ListItemText
                    primary={`${data.first_name} ${data.last_name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={marginStyle} className="formControl">
            <InputLabel htmlFor="start-date" shrink={true}>
              Release Start Date
            </InputLabel>
            <TextField
              id="start-date"
              name="start-date"
              type="date"
              value={startDate}
              onChange={(e) => changeHandler(e, setStartDate)}
              style={dateHeaderMarginStyle}
            />
          </FormControl>

          <FormControl style={marginStyle} className="formControl">
            <InputLabel htmlFor="end-date" shrink={true}>
              Release End Date
            </InputLabel>
            <TextField
              id="end-date"
              name="end-date"
              type="date"
              value={endDate}
              onChange={(e) => changeHandler(e, setEndDate)}
              style={dateHeaderMarginStyle}
            />
          </FormControl>
          <Button
            style={marginStyle}
            variant="contained"
            color={"primary"}
            type="submit"
            fullWidth
          >
            Apply
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MovieFilter;
