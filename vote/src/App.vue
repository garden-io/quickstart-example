<script setup>
import { RouterView } from 'vue-router'

// We store the guide page number in the local storage so that it doesn't reset
// on hot reload events. But we also want to ensure it's set to 0 on fresh reloads.
window.localStorage.setItem('garden-guide-page-idx', '0');
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
