import { defineStore } from 'pinia'
import { wsRouterStore } from '@/stores/ws_router'
import { authStore } from '@/stores/auth'
import router from '@/router'

export const wsStore = defineStore('ws', {
  state: () => ({
    socket: undefined,
    open: false,
    wsRouter: wsRouterStore(),
    auth: authStore(),
    ws: WebSocket,
    messageQueue: [],
    routers: {},
  }),
  getters: {
    StateOpen: (state) => {
      return state.ws.readyState === WebSocket.OPEN
    }
  },
  actions: {
    Open() {
      let th = this

      if (!th.auth.IsLoggedIn) return;

      let url = 'ws://' + document.location.host + '/api/ws'

      if (window.location.protocol === 'https:') {
        url = 'wss://' + document.location.host + '/api/ws'
      }

      try {
        th.ws = new WebSocket(url)
      } catch (error) {
        console.error('Ошибка при создании WebSocket:', error)
        return
      }
      th.routers = th.wsRouter.Routers();

      th.ws.addEventListener('open', (event) => {
        console.log('WebSocket open:', event)
        th.sendFromQueue()
        // resolve(true)
      })

      th.ws.addEventListener('close', (event) => {
        console.log('[WARNING] WebSocket close:', event)
        switch (event.code) {
          case 1000:
            break

          case 1006:
            router.push('/gui/login')
            break

          // case 4000:
          //   setTimeout(th.Open, 3000)
          //   break

          default:
            setTimeout(th.Open, 3000)
        }
      })

      th.ws.addEventListener('error', (event) => {
        console.log('[WARNING] WebSocket error:', event)
        // reject(event)
      })

      th.ws.addEventListener('message', (event) => {
        if (!event.data) {
          return
        }
        let data = JSON.parse(event.data)

        let constructor = th.routers[data.tp]
        if (constructor !== undefined) {
          constructor(data)
        } else {
          console.log('[WARNING] Обработчик не найден:', data)
        }
      })
    },

    sendFromQueue() {
      while (this.ws.readyState === WebSocket.OPEN && this.messageQueue.length) {
        const message = this.messageQueue.shift()
        try {
          this.ws.send(message)
        } catch (error) {
          console.error('Ошибка при отправке сообщения:', error)
        }
      }
    },


    Send(message) {
      if (message == undefined) {
        return
      }

      this.messageQueue.push(JSON.stringify(message))
      this.sendFromQueue()
    },

    Close() {
      this.ws.close(1000, 'работа закончена')
    },
    Socket() {
      return this.ws
    }
  }
})
