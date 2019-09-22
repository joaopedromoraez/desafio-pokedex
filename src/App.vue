<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper red darken-1">
          <a href="#" class="brand-logo center">Pokédex</a>
        </div>
      </nav>
    </div>

    <div class="row">
      <div class="col s6 m4 l2" v-for="pokemon of pokemons">
        <div class="card modal-trigger" href="#modal1" v-on:click="infoPokemon(pokemon.url)">
          <div class="card-image">
            <img :src="imgPokemon(pokemon.url) " />
            <a class="btn-floating halfway-fab waves-effect waves-light red">
              <i class="material-icons">add</i>
            </a>
          </div>
          <div class="card-content grey">
            <span
              class="card-title center-align white-text"
            >{{ capitalizeFirstLetter(pokemon.name) }}</span>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col s6 center">
        <a
          class="waves-effect waves-light btn-large blue"
          v-if="previous!==null"
          v-on:click="listar(previous);"
        >
          <i class="material-icons left">chevron_left</i>anterior
        </a>
      </div>
      <div class="col s6 center">
        <a class="waves-effect waves-light btn-large blue" v-if="next!==null" v-on:click="listar(next);">
          <i class="material-icons right">chevron_right</i>proximo
        </a>
      </div>
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
      pokemons: [],
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
        // console.table(resposta.data.results);
        this.pokemons = resposta.data.results;
        this.next = resposta.data.next;
        this.previous = resposta.data.previous;
        // console.log(this.next);
        // console.log(this.previous);
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
        // console.table(this.habilidades);
        // console.log(this.foto);
        // console.log(this.nome);
      });
    },

    imgPokemon(url) {
      return (
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        url.substring(34, url.length - 1) +
        ".png"
      );
    },

    capitalizeFirstLetter(string) {
      return string.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }
};
</script>

<style>
</style>
