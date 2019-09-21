import { http } from './config'

export default {

    listarInicial:() => {
        return http.get('pokemon/')
    },
    listarproximo: (x) =>{
        return http.get(x)
    }

}