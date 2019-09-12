<template>
  <div class="box">
    <h2 class="title">Welcome Bootcamp</h2>
    <form @submit.prevent="onSubmit(email, password)" class="box__form">
      <input required type="text" v-model="email" placeholder="Email Address" />
      <input required type="password" v-model="password" placeholder="Password" />
      <input type="submit" value="LOGIN" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: ""
    };
  },
  methods: {
    onSubmit(email, password) {
      // Login Action
      this.$store
        .dispatch("LOGIN", { email, password })
        .then(() => this.redirect())
        .catch(({ message }) => (this.msg = message));
    },

    redirect() {
      const { search } = window.location;
      if (search === "") {
        this.$router.push("/");
      } else {
        const tokens = search.replace(/^\?/, "").split("&");
        const { returnPath } = tokens.reduce((qs, tkn) => {
          const pair = tkn.split("=");
          qs[pair[0]] = decodeURIComponent(pair[1]);
          return qs;
        }, {});
        this.$router.push(returnPath);
      }
    }
  }
};
</script>

<style scoped>
.box .title {
  font-weight: 700;
  margin-top: 60px;
  margin-bottom: 60px;
  font-size: 50px;
}
.box .box__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box__form input {
  margin: 5px;
}
.box__form input:last-child {
  margin-top: 30px;
  width: 480px;
  height: 50px;
  font-weight: 300;
  background-image: linear-gradient(to bottom right, #0b4d33, #3d8567);
  cursor: pointer;
  color: #f7f7f7;
}
</style>
