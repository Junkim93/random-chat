<template>
  <div class="main">
    <div class="main__router-box">
      <router-link to="/" class="header__home">HOME</router-link>

      <router-link to="/register" class="header__join">JOIN</router-link>

      <router-link v-if="isAuthenticated" to="/logout">LOGOUT</router-link>
      <router-link to="/login" v-else class="header__login">LOGIN</router-link>

      <router-link to="/me" class="header__me">ME</router-link>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
.main .main__router-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  width: 820px;
  height: 100px;
  background-color: rgb(12, 78, 51);
  margin-top: 20px;
  margin-bottom: 3px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.5) 5px 8px 16px -8px,
    rgba(0, 0, 0, 0.043) 5px -6px 16px -6px;
  border-bottom: 2px solid rgba(209, 209, 209, 0.918);
}
</style>
