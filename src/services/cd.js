import { http } from './config'
export default {

    listar: () => {
        return http.get('cds')
    },

    salvar: (cd) => {
        return http.post('cds', cd);

    },
    editar: (cd) => {
        return http.put('cds', cd);

    },
    deletar: (cd) => {
        var x = http.delete('cds', { data: cd });
        return x;
    }

}