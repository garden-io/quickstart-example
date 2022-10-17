<template>
  <div class='main'>
    <div class='section' id="section-test">
      <Guide />
      <div class='app'>
        <div>
          <Vote v-bind:optionA='optionA' v-bind:optionB='optionB' />
        </div>
        <div>
          <Results v-bind:optionA='optionA' v-bind:optionB='optionB' />
        </div>
      </div>
    </div>
    <img class='logo' src='/garden-logo.png' />
    <img class='flowers' src='/flowers.png' />
  </div>
</template>

<script>

import Vote from '../components/Vote.vue';
import Results from '../components/Results.vue';
import Guide from '../components/Guide.vue';
import colors from '../colors';

export default {
  name: 'home',

  data: () => ({
    optionA: {
      name: 'flowers',
      color: colors.secondary,
    },
    optionB: {
      name: 'trees',
      color: colors.primary,
    },
  }),

  components: {
    Guide,
    Vote,
    Results,
  },
};
</script>

<style>
  @import url(//fonts.googleapis.com/css?family=Open+Sans:400,700,600);

  *{
    box-sizing:border-box;
  }

  html,body{
    margin: 0;
    padding: 0;
    background-color: #F7F8F9;
    height: 100vh;
    font-family: 'Open Sans';
    scroll-behavior: smooth;
  }

  button{
    border-radius: 0;
    width: 100%;
    height: 50%;
  }

  button[type='submit'] {
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
  }

  button {
    cursor: pointer;
    display: block;
    height: 80px;
    width: 330px;
    margin: 0 auto;
    border: none;
    color: white;
    text-transform: lowercase;
    text-decoration: none;
    letter-spacing: 0.2ch;
    outline: 0;
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.3em;
  }

  button span {
    opacity: 0.9;
  }

  button:hover, button:focus{
    outline: 0;
    text-decoration: none;
  }

  button:hover {
    opacity: 0.8;
  }

  div.app {
    display: flex;
    flex: 1;
    overflow: hidden;
    text-align: center;
    width: 100%;
  }

  div.app div {
    flex: 50%;
  }

  img.logo {
    position: fixed;
    left: 30px;
    bottom: 20px;
    width: 160px;
  }

  img.flowers {
    position: fixed;
    left: calc(50vw - 85px);
    bottom: 10px;
    width: 160px;
  }

  div.section {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
