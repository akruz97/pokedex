import axios from "axios";

export const getRegions = () => axios(
    {
        url: 'https://pokeapi.co/api/v2/region',
        method: 'GET'
    }
);

export const getRegionById = (url) => axios(
    {
        url: url,
        method: 'GET'
    }
);