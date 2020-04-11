<template>
  <main class="phone-viewport">
    <nav>
      <div class="nav-wrapper blue">
        <a class="brand-logo center" href="/">
          <b>{{title}}</b>
        </a>
        <ul class="right">
          <li @click="title = 'Cadastro de Artistas'">
            <router-link to="/artista">Artista</router-link>
          </li>
          <li @click="title = 'Cadastro de Generos'">
            <router-link to="/genero">Genero</router-link>
          </li>
          <li @click="title = 'Cadastro de Cd\'s'">
            <router-link to="/cd">CD's</router-link>
          </li>
        </ul>
      </div>
    </nav> 
    <div>   
    <router-view></router-view>
    </div>
  </main>
</template>

<script>
export default {
  name: "Unylaya",

  data() {
    return {
      title: "Tela Inicial"
    };
  }
};
</script>

<style>
</style>
