<template>
  <div>
    <menus></menus>
    <div class="bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menus from "./components/Menus.vue";
export default {
  components: { Menus }
};
</script>

<style>
@import "./styles/reset.css";
@import "./styles/main.css";
@import url("https://fonts.googleapis.com/css?family=Rajdhani:300,400,500,700&display=swap");
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700&display=swap&subset=korean");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ebf1f7;
}
</style>
