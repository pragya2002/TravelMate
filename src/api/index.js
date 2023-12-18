import axios from 'axios';



export const getPlacesData = async (type, sw, ne) => {
    try {

        const options = {
            method: 'GET',
            url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_RAPID_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);

        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}