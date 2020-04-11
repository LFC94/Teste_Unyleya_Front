import { http } from './config'
export default {

    listar: () => {
        return http.get('generos')
    },

    salvar: (genero) => {
        return http.post('generos', genero);

    },
    editar: (genero) => {
        return http.put('generos', genero);

    },
    deletar: (genero) => {
        var x = http.delete('generos', { data: genero });
        return x;
    }

}