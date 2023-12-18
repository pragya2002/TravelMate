import React, { createRef } from 'react'
import useStyles from './styles'
import { useState, useEffect } from 'react'
import { Select, Typography, FormControl, InputLabel, MenuItem, Grid, CircularProgress } from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();

    const handleChangeType = (event) => { setType(event.target.value) };

    const handleChangeRating = (event) => { setRating(event.target.value) };
    const [elRefs, setElRefs] = useState([]);
    // console.log({ childClicked })
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);
    return (

        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotels and Attractions around you</Typography>
            {
                isLoading ? (<div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>) : (
                    <>
                        <div className={classes.up}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={type}
                                    onChange={handleChangeType}
                                >
                                    <MenuItem value="restaurants">
                                        Restaurants
                                    </MenuItem>
                                    <MenuItem value="hotels">
                                        Hotels
                                    </MenuItem>
                                    <MenuItem value="attractions">
                                        Attractions
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Rating</InputLabel>
                                <Select
                                    value={rating}
                                    onChange={handleChangeRating}
                                >
                                    <MenuItem value={0}>
                                        All
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Above 2.0
                                    </MenuItem>
                                    <MenuItem value={3}>
                                        Above 3.0
                                    </MenuItem>
                                    <MenuItem value={4}>
                                        Above 4.0
                                    </MenuItem>
                                    <MenuItem value={4.5}>
                                        Above 4.5
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Grid container spacing={3} className={classes.list}>
                            {places?.map((place, i) => (
                                <Grid item xs={12} ref={elRefs[i]}>
                                    <PlaceDetails
                                        place={place}
                                        selected={Number(childClicked) === i}
                                        refProp={elRefs[i]}
                                        type={type}
                                    />
                                </Grid>
                            ))}

                        </Grid>
                    </>
                )
            }

        </div>
    )
}

export default List