<template>
  <div class="box">
    <h2>{{ greeting }}</h2>
    <h3>
      <p v-if="isAuthenticated" class="box__greeting">{{ greeting2 }}</p>
      <router-link to="/login" v-else class="box__greeting">{{ greeting2 }}</router-link>
    </h3>
    <router-link to="/chat">👉🏻 Start Random Chat 👈🏻</router-link>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";

export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    }
  },
  data() {
    return {
      name: "",
      greeting: "",
      greeting2: ""
    };
  },
  created() {
    axios
      .get("http://localhost:4000/")
      .then(
        result => (
          (this.greeting = result.data.greeting),
          (this.greeting2 = result.data.name),
          (this.name = result.data.name)
        )
      );
  }
};
</script>

<style scoped>
.box h2 {
  font-size: 35px;
  font-weight: 500;
  color: #222831;
  margin-top: 100px;
  margin-bottom: 20px;
}

.box a {
  margin-top: 75px;
  font-size: 35px;
  font-weight: 300;
  color: rgb(78, 41, 11);
}

.box .box__greeting {
  font-size: 35px;
  font-weight: 700;
  color: #ec7411;
}
</style>
