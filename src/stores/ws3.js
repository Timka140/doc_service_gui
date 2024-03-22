import { defineStore } from "pinia";
import wsRouter from "./ws_router";
import { authStore } from "@/stores/auth"
import router from "@/router";

export const wsStore = defineStore("ws", {
  state: () => ({
    socket: undefined,
    open: false,
    constructors: wsRouter(),
    auth: authStore(),
    // socket: new WebSocket('ws://localhost:8071/ws')
  }),
  getters: {
    StateOpen: (state) => {
      return state.open;
    },
  },
  actions: {
    async Connect() {
      let th = this;
      return new Promise((resolve) => {
        if (window.location.protocol === "https:") {
          th.socket = new WebSocket("wss://" + document.location.host + "/api/ws");
        } else {
          th.socket = new WebSocket("ws://" + document.location.host + "/api/ws");
        }

        th.socket.addEventListener("open", (event) => {
          console.log("WebSocket open:", event);
          resolve(true);
        });
      });
    },
    async Init(callback) {
      let th = this;
      if (th.socket == undefined || th.socket == null) {
        th.open = await this.Connect();

        if (!th.open) {
          console.log("Не удалось открыть соединение");
          return;
        }
      }

      if (th.socket.readyState == 3) {
        th.open = await this.Connect();

        if (!th.open) {
          console.log("Не удалось открыть соединение");
          return;
        }
      }

      th.socket.addEventListener("message", (event) => {
        if (!event.data) {
          return;
        }
        let data = JSON.parse(event.data);

        let constructor = this.constructors[data.tp];
        if (constructor !== undefined) {
          constructor(data);
        } else {
          console.log("[WARNING] Обработчик не найден:", data);
        }
      });

      th.socket.addEventListener("close", (event) => {
        console.log("[WARNING] WebSocket close:", event);
        switch (event.code) {
          case 1000:
            break;

          case 1006:
            // th.auth.IsLogin();
            router.push('/gui/login');
            break;

          case 4000:
            setTimeout(() => {
              th.Connect();
            }, 3000);
            break;

          default:
            setTimeout(() => {
              th.Connect();
            }, 3000);
        }
      });

      th.socket.addEventListener("error", (event) => {
        console.log("[WARNING] WebSocket error:", event);
        th.Connect();
      });

      if (callback != undefined) {
        callback();
      }
    },

    async Send(data) {
      if (data == undefined) {
        return;
      }
      if (this.socket == undefined || this.socket == null) {
        await this.Init();
        // return
      }
      this.socket.send(JSON.stringify(data));
    },
    Close() {
      this.socket.close(1000, "работа закончена");
    },
    Socket() {
      return this.socket;
    },
  },
});
