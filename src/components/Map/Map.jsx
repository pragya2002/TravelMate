import React from 'react'
import useStyles from './styles'
import mapStyles from './mapStyles'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, type }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLE_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(event) => {
                    setCoordinates({ lat: event.center.lat, lng: event.center.lng });
                    setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
                }}
                onChildClick={(child) => { setChildClicked(child) }}
            >
                {
                    places?.map((place, i) => (
                        <div className={classes.markerContainer}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                        >
                            {
                                !isDesktop ? (
                                    <LocationOnOutlinedIcon color='primary' fontSize='large' />
                                ) :

                                    (
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                                {place.name}
                                            </Typography>
                                            <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : `https://source.unsplash.com/random/900×700/?${type}-animated`}
                                                alt={place.name} />

                                            <Rating size='small' value={Number(place.rating)} readOnly />
                                        </Paper>
                                    )
                            }
                        </div>
                    )

                    )
                }
            </GoogleMapReact>
        </div>
    );
}

export default Map