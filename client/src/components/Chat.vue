<template>
  <div class="box__chat">
    <div class="chat__message">
      <header class="message-header">
        <p class="connections">{{ connectionsMessage }}</p>
        <p v-if="typing" class="typing-text">{{ typing }} is typing...</p>
        <p v-if="ending" class="typing-text">{{ ending }}</p>
      </header>
      <ul v-if="connected" class="message-body">
        <li class="messages" v-for="(msg, index) in messages" :key="index">
          <div :class="{'user':msg.type === 1}">{{ msg.user }}</div>
          <span :class="{'float-right':msg.type === 1}">{{ msg.message }}</span>
        </li>
      </ul>
    </div>
    <div class="chat__send">
      <form @submit.prevent="sendMessage">
        <div v-if="connected" class="send__message">
          <input type="text" v-model="message" class="box__control" />
        </div>
        <div v-else class="start__chat">
          <button v-on:click="chatStart">{{ guide }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import store from "../store/store";

export default {
  data() {
    return {
      socket: io("localhost:4000/chat"),
      user: "",
      message: "",
      messages: [],
      connections: 0,
      connectionsMessage: "",
      typing: false,
      connected: false,
      info: [],
      room: "",
      guide: "START CHATTING",
      ending: false
    };
  },

  created() {
    if (this.isAuthenticated()) {
      axios
        .get("http://localhost:4000/me")
        .then(({ data }) => (this.user = data.user.name));
    } else {
      this.user = "anonymous";
    }
  },

  mounted() {
    this.socket.on("message", data => {
      this.messages = [...this.messages, data];
    });

    this.socket.on("chat start", data => {
      this.room = data.room;
      this.connected = true;
      this.messages = [];
    });

    this.socket.on("typing", data => {
      this.typing = data;
    });

    this.socket.on("stopTyping", () => {
      this.typing = false;
    });

    this.socket.on("chatEnd", () => {
      this.ending = true;
      this.ending = "채팅이 종료되었습니다.";
    });
  },

  watch: {
    message(value) {
      value
        ? this.socket.emit("typing", this.user)
        : this.socket.emit("stopTyping");
    }
  },

  methods: {
    chatStart() {
      this.socket.emit("randomChat", { username: this.user });
      this.guide = "WAITING A USER...";
    },

    sendMessage(e) {
      e.preventDefault();

      this.messages.push({
        message: this.message,
        user: "You",
        type: 1
      });

      this.socket.emit("newMessage", {
        user: this.user,
        message: this.message
      });
      this.message = "";
    },

    isAuthenticated() {
      return store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
.box__chat {
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
}

.chat__message {
  width: 100%;
  height: 80%;
  background-color: #f7f7f7;
  overflow-y: scroll;
}

.chat__send {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 20%;
}

@keyframes float {
  0% {
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  }
  50% {
    box-shadow: 0 13px 27px -45px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  }
  100% {
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  }
}

.send__message .box__control {
  position: relative;
  width: 750px;
  margin-bottom: 30px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  transition: width 0.5s ease-in-out, border-radius 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.box__control:focus {
  outline: none;
  width: 600px;
  transform: translateY(-50px);
  border-radius: 40px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  animation: float 3s linear infinite forwards;
}

.start__chat {
  position: relative;
  width: 750px;
  margin-bottom: 400px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat__message .message-header {
  color: rgb(133, 129, 129);
  text-align: center;
  margin-top: 30px;
  margin-bottom: 35px;
  position: relative;
}

.chat__message .message-body {
  position: sticky;
  font-size: 20px;
  width: 100%;
}

.message-body .messages {
  padding: 5px 50px 5px 50px;
  height: auto;
  overflow: hidden;
}

.messages span {
  float: left;
  border-radius: 15px;
  padding: 20px;
  max-width: 60%;
  height: auto;
  line-height: auto;
  vertical-align: middle;
  background-color: rgba(235, 228, 224, 0.952);
  color: rgb(15, 15, 15);
}
.float-right {
  float: right;
}

.messages .user {
  display: none;
}

.typing-text {
  color: rgb(218, 127, 24);
  font-size: 15px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
}
</style>
