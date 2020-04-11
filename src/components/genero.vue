<template>
  <div id="artista">
    <div class="container">
      <form>
        <div>
          <label>Descrição</label>
          <input type="text" placeholder="Descrição" v-model="genero.descricao">
        </div>
        <label class="red-text text-darken-2">{{errors.descricao}}</label>
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
            <th>Generos</th>
            <th>Opcões</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="g of generos" :key="g.id">
            <td>{{g.descricao}}</td>
            <td>
              <button @click="editar(g)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="deletar(g)" class="waves-effect btn-small red darken-1">
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
import Generos from "../services/genero";
export default {
  data() {
    return {
      title: "Cadastro de Generos",
      genero: {
        id: "",
        descricao: ""
      },
      generos: [],
      errors: []
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Generos.listar().then(resposta => {
        this.genero = {};
        this.generos = resposta.data;
      });
    },
    cancelar() {
      this.genero = [];
    },
    salvar() {
      if (!this.genero.id) {
        Generos.salvar(this.genero)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        Generos.editar(this.genero)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(genero) {
      this.genero = genero;
    },
    deletar(genero) {
      if (confirm("Deseja Excluir o Genero " + genero.descricao + "?")) {
        Generos.deletar(genero)
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
