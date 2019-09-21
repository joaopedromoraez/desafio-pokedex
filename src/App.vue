<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper red darken-1">
          <a href="#" class="brand-logo center">Pokédex</a>
        </div>
      </nav>
    </div>

    <div class="container">
      <table class="highlight centered">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Imagem</th>
            <th>Pokémon</th>
            <!-- <th>URL</th> -->
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto of produtos">
            <td> {{ produto.url.substring(34, produto.url.length - 1) }}</td>
            <td>
              <img :src="imgPokemon(produto.url) " />
            </td>
            <td>{{ produto.name }}</td>
            <!-- <td>{{ produto.url }}</td> -->
            <td>
              <a
                class="btn-floating waves-effect waves-light blue modal-trigger"
                href="#modal1"
                v-on:click="infoPokemon(produto.url)"
              >
                <i class="material-icons">info_outline</i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />

    <div class="container center-align">
      <a
        class="waves-effect waves-light btn blue"
        v-if="previous!==null"
        v-on:click="listar(previous);"
      >
        <i class="material-icons left">chevron_left</i>anterior
      </a>
      <a class="waves-effect waves-light btn blue" v-if="next!==null" v-on:click="listar(next);">
        <i class="material-icons right">chevron_right</i>proximo
      </a>
    </div>
    <br />

    <!-- Modal Structure -->
    <div id="modal1" class="modal modal-fixed-footer">
      <div class="modal-content">
        <img class="responsive-img" :src="foto" />
        <h4 class="center-align">{{ id }}. {{ nome }}</h4>
        <p>Peso: {{ peso/10 }} kg</p>
        <p>Altura: {{ altura/10 }} m</p>
        <p>Habilidades:</p>
        <ul id="example-1">
          <li v-for="habilidade in habilidades">- {{ habilidade.ability.name }}</li>
        </ul>

      </div>
      <div class="modal-footer red">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat white-text">Fechar</a>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Pokemon from "./services/pokeapi";

export default {
  data() {
    return {
      produtos: [],
      next: null,
      previous: null,

      id: null,
      habilidades: [],
      foto: null,
      nome: null,
      peso: null,
      altura: null
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar(next) {
      Pokemon.listar(next).then(resposta => {
        console.table(resposta.data.results);
        this.produtos = resposta.data.results;
        this.next = resposta.data.next;
        this.previous = resposta.data.previous;
        console.log(this.next);
        console.log(this.previous);
      });
    },
    infoPokemon(url) {
      Pokemon.listar(url).then(resposta => {
        this.habilidades = resposta.data.abilities;
        this.foto = resposta.data.sprites.front_default;
        this.nome = resposta.data.name;
        this.id = resposta.data.id;
        this.peso = resposta.data.weight;
        this.altura = resposta.data.height;
        console.table(this.habilidades);
        console.log(this.foto);
        console.log(this.nome);
      });
    },

    imgPokemon(url) {
      return (
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        url.substring(34, url.length - 1) +
        ".png"
      );
    }
  }
};
</script>

<style>
</style>
