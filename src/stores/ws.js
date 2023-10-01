import { defineStore } from 'pinia'
import wsRouter from './ws_router'

const constructors = wsRouter()

export const wsStore = defineStore('ws', {
  state: () => ({
    socket: new WebSocket('ws://' + document.location.host + '/api/ws')
    // socket: new WebSocket('ws://localhost:8071/ws')
  }),
  getters: {},
  actions: {
    Connect() {
      this.socket = new WebSocket('ws://' + document.location.host + '/api/ws')
    },
    Init() {
        let th = this;
      if (th.socket == undefined || th.socket == null) {
        th.Connect()
      }

      th.socket.addEventListener('message', (event) => {
        if (!event.data) {
          return
        }
        let data = JSON.parse(event.data)

        let constructor = constructors[data.tp]
        if (constructor !== undefined) {
          constructor(data)
        } else {
          console.log('[WARNING] Обработчик не найден:', data)
        }
      })

      th.socket.addEventListener("close", (event) => {
        console.log("[WARNING] WebSocket close:", event);
        th.Connect();
      });

      th.socket.addEventListener("error", (event) => {
        console.log("[WARNING] WebSocket error:", event);
        th.Connect();
      });
    },

    Send(data) {
      if (data == undefined) {
        return
      }
      if (this.socket == undefined || this.socket == null) {
        return
      }
      this.socket.send(JSON.stringify(data))
    },
    Close() {
      this.socket.close(1000, 'работа закончена')
    },
    Socket() {
        return this.socket;
    }
  }
})
