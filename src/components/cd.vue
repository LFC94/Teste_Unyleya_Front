<template>
  <div id="cd">
    <div class="container">
      <form>
        <div>
          <label>Titulo</label>
          <input type="text" placeholder="Titulo" v-model="compact_disc.titulo">
        </div>
        <label class="red-text text-darken-2">{{errors.titulo}}</label>
        <br>
        <label>Artista</label>
        <div>
          <v-select placeholder="Artista" :options="artistas" v-model="artistaSel" label="nome"/>
          <label class="red-text text-darken-2">{{errors.artista_id}}</label>
        </div>
        <label>Genero</label>
        <div>
          <v-select placeholder="Genero" :options="generos" v-model="generosSel" label="descricao"/>
          <label class="red-text text-darken-2">{{errors.genero_id}}</label>
        </div>

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
            <th>CD's Disponiveis</th>
          </tr>
        </thead>
        <thead>
          <tr>
              <th>Titulo</th>
              <th>Artista</th>
              <th>Genero</th>
              <th>Opcões</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="compact_discs of compact_discs" :key="compact_discs.id">
            <td>{{compact_discs.titulo}}</td>
            <td>{{compact_discs.artista}}</td>
            <td>{{compact_discs.genero}}</td>
            <td>
              <button @click="editar(compact_discs)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="deletar(compact_discs)" class="waves-effect btn-small red darken-1">
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
import CD from "../services/cd";
import artista from "../services/artista";
import Genero from "../services/genero";
export default {
  data() {
    return {
      title: "Cadastro de Cd's",
      compact_discs: {
        id: "",
        titulo: "",
        artista: "",
        artista_id: "",
        genero: "",
        genero_id: ""
      },
      artistaSel: {
        nome: "",
        id: ""
      },
      artistas: {
        nome: "",
        id: ""
      },
      generosSel: {
        descricao: "",
        id: ""
      },
      generos: {
        descricao: "",
        id: ""
      },
      compact_disc: [],
      errors: []
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      this.cancelar();

      artista.listar().then(resposta => {
        this.artistas = resposta.data;
        Genero.listar().then(resposta => {
          this.generos = resposta.data;
          CD.listar().then(resposta => {
            this.compact_disc = {};
            this.compact_discs = resposta.data;
            for (var i in this.compact_discs) {
              for (var x in this.artistas) {
                if (this.artistas[x].id == this.compact_discs[i].artista_id) {
                  this.compact_discs[i].artista = this.artistas[x].nome;
                }
              }
              for (var y in this.generos) {
                if (this.generos[y].id == this.compact_discs[i].genero_id) {
                  this.compact_discs[i].genero = this.generos[y].descricao;
                }
              }
            }
          });
        });
      });
    },
    salvar() {
      this.compact_disc.artista_id = this.artistaSel.id;
      this.compact_disc.genero_id = this.generosSel.id;

      if (!this.compact_disc.id) {
        CD.salvar(this.compact_disc)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        CD.editar(this.compact_disc)
          .then(r => {
            alert(r.data.ok);
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    cancelar() {
      this.compact_disc = [];
      this.artistaSel = [];
      this.generosSel = [];
    },
    editar(compact_disc) {
      this.compact_disc = compact_disc;
      for (var x in this.artistas) {
        if (this.artistas[x].id == compact_disc.artista_id) {
          this.artistaSel = this.artistas[x];
        }
      }
      for (var y in this.generos) {
        if (this.generos[y].id == compact_disc.genero_id) {
          this.generosSel = this.generos[y];
        }
      }
    },
    deletar(compact_disc) {
      if (confirm("Deseja Excluir o CD " + compact_disc.title + "?")) {
        CD.deletar(compact_disc)
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
