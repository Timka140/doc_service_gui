import { defineStore } from "pinia";
import {wsStore} from "@/stores/ws"

import router from "@/router";

export const authStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    login: "",
    password: "",
  }),
  getters: {
    IsLoggedIn: (state) => {
      let ses = false;
      if (state.token != "") ses = true;

      return ses;
    },
  },
  actions: {
    Login() {
      this.login = this.login.trim();

      fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password,
          saveSessions: this.GetSaveSessions,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.message = data.message;
          this.password = "";

          if (data.status === 1) {
            //Токен авторизации
            this.token = data.token;
            //Подтверждаю что авторизация прошла успешно
            this.isLogin = true;

            //Сохраняю данные
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("name", data.name);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("saveSessions", this.GetSaveSessions);

            localStorage.setItem("socketAdr", data.socketAdr);

            console.log("Авторизация");
            //Данные о пользователе
            this.email = data.email;
            this.name = data.name;
            this.lastName = data.lastName;

            //Подключаю сокет
            // this.ws.InitSocket();
            // this.ws.Init(data.socketAdr);

            const ws = wsStore();
            ws.Init();

            router.push("/gui/");
          }
        });
    },
    IsLogin() {},
  },
});
