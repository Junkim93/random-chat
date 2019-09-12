<template>
  <div class="box">
    <label class="box__title">User Info</label>
    <img src="../assets/logo.png" />
    <pre>{{ user.name }}</pre>
    <pre>{{ user.email }}</pre>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    axios.get("http://localhost:4000/me").then(({ data }) =>
      (this.user = data.user).catch(() => {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/");
        });
      })
    );
  }
};
</script>

<style scoped>
img {
  width: 100px;
  margin-bottom: 20px;
}

.box {
  font-size: 30px;
}

.box__title {
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>
