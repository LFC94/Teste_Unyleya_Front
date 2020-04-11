import { http } from './config'
export default {

    listar: () => {
        return http.get('artistas')
    },

    salvar: (artista) => {
        return http.post('artistas', artista);

    },
    editar: (artista) => {
        return http.put('artistas', artista);

    },
    deletar: (artista) => {
        var x = http.delete('artistas', { data: artista });
        return x;
    }

}