import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Me from "../components/Me.vue";
import Register from "../components/Register.vue";
import Chat from "../components/Chat.vue";
import store from "../store/store";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  try {
    if (store.getters.isAuthenticated) return next();
    next("/login?returnPath=me");
  } catch (err) {
    console.log(err);
  }
};

const requestLogout = () => (to, from, next) => {
  try {
    store.dispatch("LOGOUT").then(() => {
      next("/");
    });
  } catch (err) {
    console.log(err);
  }
};

export default new Router({
  mode: "history",
  base: "/app/",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/logout",
      beforeEnter: requestLogout()
    },
    {
      path: "/me",
      name: "Me",
      component: Me,
      beforeEnter: requireAuth()
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat
    }
  ]
});
