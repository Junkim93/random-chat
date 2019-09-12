<template>
  <div class="box">
    <h2 class="title">Sign Up</h2>
    <form @submit.prevent="onSubmit(name, email, password, password2)" class="box__form">
      <input type="text" v-model="email" placeholder="Email Address" required />
      <input type="text" v-model="name" placeholder="Nickname for this site" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="password2" placeholder="Confirm password" required />
      <input type="submit" value="JOIN" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      msg: ""
    };
  },
  methods: {
    onSubmit(name, email, password, password2) {
      if (password !== password2) {
        alert("Please confirm your password");
        return this.$router.push("/register");
      } else {
        // Register Action
        this.$store
          .dispatch("REGISTER", { name, email, password })
          .then(() => this.redirect())
          .catch(({ message }) => (this.msg = message));
      }
    },

    redirect() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.box .title {
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 50px;
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

/* .modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal__content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} */
</style>
