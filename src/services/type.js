import axios from "axios";

export const getTypes = () => axios(
    {
        url: 'https://pokeapi.co/api/v2/type',
        method: 'GET'
    }
);
