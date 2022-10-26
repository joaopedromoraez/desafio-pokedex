import axios from 'axios'

export default {
    listar:(next = 'https://pokeapi.co/api/v2/pokemon') => {
        return axios.get(next, {
            params: {
                offset: 0,
                limit: 1154
            }
        })
    },

    pokemonGeral:(name) =>{
        return axios.get('https://pokeapi.co/api/v2/pokemon/'+name)
    },

    habilidades:(name) =>{
        return axios.get('https://pokeapi.co/api/v2/ability/'+name)
    },

    especie:(name) =>{
        return axios.get('https://pokeapi.co/api/v2/pokemon-species/'+name)
    }

}