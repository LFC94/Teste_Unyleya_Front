<template>
  <div id="artista">
    <div class="container">
      <form>
        <div>
          <label>Nome</label>
          <input type="text" placeholder="nome" v-model="artista.nome">
        </div>
        <label class="red-text text-darken-2">{{errors.nome}}</label>
        <br>
        <button @click="salvar()" class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
        <button @click="cancelar()" class="waves-effect waves-light btn-small red">
          Cancelar
          <i class="material-icons left">cancel</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Artistas</th>
            <th>Opcões</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="artistas of artistas" :key="artistas.id">
            <td>{{artistas.nome}}</td>
            <td>
              <button @click="editar(artistas)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="deletar(artistas)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Artista from "../services/artista";
export default {
  data() {
    return {
      title: "Cadastro de Artistas",
      artista: {
        id: "",
        nome: ""
      },
      artistas: [],
      errors: []
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Artista.listar().then(resposta => {
        this.artista = {};
        this.artistas = resposta.data;
      });
    },
    salvar() {
      if (!this.artista.id) {
        Artista.salvar(this.artista)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        Artista.editar(this.artista)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(artista) {
      this.artista = artista;
    },
    cancelar() {
      this.artista = [];
    },
    deletar(artista) {
      if (confirm("Deseja Excluir o Artista " + artista.nome + "?")) {
        Artista.deletar(artista)
          .then(r => {
            alert(r.data.ok);
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    }
  }
};
</script>

<style>
</style>
