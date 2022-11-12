import axios from "axios";

export const getPokemonsByPokedex = (url) => axios(
    {
        url: url,
        method: 'GET'
    }
);

export const getPokemonById = (id) => axios(
    {
        url: "https://pokeapi.co/api/v2/pokemon/"+id,
        method: 'GET'
    }
);