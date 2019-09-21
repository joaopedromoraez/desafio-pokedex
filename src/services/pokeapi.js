import axios from 'axios'

export default {

    listar:(next = 'https://pokeapi.co/api/v2/pokemon/') => {
        return axios.get(next)
    }
}