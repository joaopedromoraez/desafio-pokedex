<template>
  <div id="app">
    <!-- ========Inicio da Barra de navegação======== -->
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper red darken-1">
          <a href="#" class="brand-logo center">Pokédex</a>
        </div>
      </nav>
    </div>
    <!-- ========Fim da Barra de navegação======== -->

    <div class="row">
      <!-- ========Inicio Card Pokémons======== -->
      <div class="col s12 m6 l4 xl2" v-for="pokemons of listaDepokemons" v-bind:key="pokemons.id">
        <div class="card modal-trigger" href="#modal1" v-on:click="infoPokemon(pokemons.name)">
          <!-- <div class="card waves-effect waves-block waves-light"> -->
          <div>
            <div class="card-image">
              <img
                class="activator"
                :src="imgPokemon(pokemons.url)"
                :title="pokemons.name"
                alt="Imagem frontal do Pokémon"
              />
              <a class="btn-floating halfway-fab waves-effect waves-light red">
                <i class="material-icons">priority_high</i>
              </a>
            </div>
            <div class="card-content blue">
              <span
                class="card-title center-align white-text activator"
              >{{ capitalizeFirstLetter(pokemons.name) }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ========Fim Card Pokémons======== -->

      <!-- ========Inicio Botão de navegação======== -->
      <div class="col s12 m6 l4 xl2" v-on:click="nextPokemons();">
        <div class="card modal-trigger">
          <!-- <div class="card waves-effect waves-block waves-light"> -->
          <div>
            <div class="card-image">
              <img src="default.png" title="Botão de proximo" alt="Imagem frontal do Pokémon" />
              <a class="btn-floating halfway-fab waves-effect waves-light red">
                <i class="material-icons">add</i>
              </a>
            </div>
            <div class="card-content blue">
              <span class="card-title center-align white-text activator">Mais</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ========Fim Botão de navegação======== -->
    </div>

    <!-- ========Inicio da Estrutura do Modal======== -->
    <div id="modal1" class="modal modal-fixed-footer" :class="pokemon.cor">
      <div class="modal-content">
        <img class="responsive-img" :src="pokemon.foto" />
        <h4 class="center-align">{{ pokemon.nome }} {{ pokemon.id }}#</h4>
        <p>
          <b>Peso:</b>
          {{ pokemon.peso }} kg
        </p>
        <p>
          <b>Altura:</b>
          {{ pokemon.altura }} m
        </p>
        <p>
          <b>Habilidades:</b>
        </p>
        <p v-for="habilidade in pokemon.habilidades">- {{ habilidade.ability.name }}</p>
        <p>
          <b>Tipo:</b>
        </p>
        <p v-for="tipo in pokemon.tipo">- {{ tipo.type.name }}</p>
        <p>
          <b>Eggs Group:</b>
        </p>
        <p v-for="eggs in pokemon.grupo_ovo">- {{ eggs.name }}</p>
        <p>
          <b>Movimentos:</b>
        </p>
        <p v-for="movimentos in pokemon.movimentos">- {{ movimentos.move.name }}</p>
      </div>
      <div class="modal-footer black">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat white-text">Fechar</a>
      </div>
    </div>
    <!-- =====Fim da Estrutura do Modal======== -->
  </div>
</template>

<script>
// import axios from 'axios'
import PokemonApi from "./services/pokeapi";

export default {
  data() {
    return {
      listaGeralPokemon: [],
      listaDepokemons: [],
      next: 20,
      pokemon: {
        id: null,
        habilidades: [],
        foto: null,
        nome: null,
        peso: null,
        altura: null,
        tipo: [],
        grupo_ovo: [],
        movimentos: [],
        cor: null
      }
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar(next) {
      PokemonApi.listar(next).then(resposta => {
        // console.table(resposta.data.results);
        this.listaGeralPokemon = resposta.data.results;
        this.listaDepokemons = this.listaGeralPokemon.slice(0, 20);
        // this.next = resposta.data.next;
        // this.previous = resposta.data.previous;
        // console.log(this.next);
        // console.log(this.previous);
      });
    },
    
    infoPokemon(name) {
      PokemonApi.pokemonGeral(name).then(resposta => {
        this.pokemon.habilidades = resposta.data.abilities;
        this.pokemon.foto = resposta.data.sprites.front_default;
        this.pokemon.nome = this.capitalizeFirstLetter(resposta.data.name);
        this.pokemon.id = resposta.data.id;
        this.pokemon.peso = resposta.data.weight / 10;
        this.pokemon.altura = resposta.data.height / 10;
        this.pokemon.tipo = resposta.data.types;
        this.pokemon.movimentos = resposta.data.moves;
        // console.log(this.pokemon.movimentos);
        // console.log(this.foto);
        // console.log(this.nome);
      }),
        PokemonApi.especie(name).then(resposta => {
          this.pokemon.grupo_ovo = resposta.data.egg_groups;
          this.pokemon.cor = resposta.data.color.name;
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
    },

    nextPokemons() {
      this.listaDepokemons.push(
        ...this.listaGeralPokemon.slice(this.next, this.next + 20)
      );
      this.next = this.next + 20;
    }
  }
};
</script>

<style>
</style>
