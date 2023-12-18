import logo from './logo.svg';
import { getPlacesData } from './api';
import { Header, List, Map } from './components';
import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setfilteredPlaces] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });

    })
  }
    , [])

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > Number(rating));
    setfilteredPlaces(filtered);
  }, [rating])

  useEffect(() => {

    setisLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setfilteredPlaces([]);
      setRating(0);
      setisLoading(false);
    })

  }, [type, bounds]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates}
            setBounds={setBounds} coordinates={coordinates} places={filteredPlaces.length ? filteredPlaces : places} setChildClicked={setChildClicked} type={type}
          />
        </Grid>

      </Grid>
    </>
  );
}

export default App;
