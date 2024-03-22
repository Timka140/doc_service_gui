import { defineStore } from 'pinia'
import { wsStore } from '@/stores/ws'
import { desktopStore } from "@/stores/desktop";

import router from '@/router'
import axios from 'axios'

export const authStore = defineStore('auth', {
  state: () => ({
    ws: wsStore(),
    desktop: desktopStore(),
    token: localStorage.getItem('token'),
    isLogin: false,
    login: '',
    password: '',

    message: ''
  }),
  getters: {
    Token: (state) => {
      if (state.token == undefined) {
        return ''
      }
      return state.token
    },

    IsLoggedIn: (state) => {
      let ses = false
      if (state.token != '') ses = true

      return ses
    }
  },
  actions: {
    PreventDefault(event) {
      event.preventDefault()
    },
    Login() {
      this.login = this.login.trim()

      fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password,
          saveSessions: this.GetSaveSessions
        })
      })
        .then((response) => {
          if (response.status != 200) {
            this.message = 'Сервере временно не доступен'
            return
          }
          return response.json()
        })
        .then((data) => {
          if (data == undefined) {
            return
          }
          this.message = data.message
          // this.password = ''
          if (data.status === 1) {
            //Сохраняю пароль
            this.desktop.ReadUser({
              tp: 'save',
              login: this.login,
              password: this.password
            })
            //Токен авторизации
            this.token = data.token
            //Подтверждаю что авторизация прошла успешно
            this.isLogin = true

            //Сохраняю данные
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('lastName', data.lastName)
            localStorage.setItem('saveSessions', this.GetSaveSessions)

            localStorage.setItem('socketAdr', data.socketAdr)

            console.log('Авторизация')
            //Данные о пользователе
            this.email = data.email
            this.name = data.name
            this.lastName = data.lastName

            this.ws.Open()
            router.push('/gui/')
          }
        })
    },
    IsLogin(to_path) {
      //Проверяю авторизован ли пользователь
      let th = this
      if (to_path == undefined) {
        to_path = ''
      }
      if (th.ws.StateOpen) {
        th.ws.Send({ tp: 'CheckSession', cmd: 'Start', path: to_path })
      } else {
        axios
          .post('/api/v1/isLogin', {
            path: to_path
          })
          .then(function (response) {
            th.CheckSession(response.data)
            // if (response.data.login) this.ws.Open();
          })
          .catch(function () {
            th.CheckSession({ login: false })
          })
      }
    },
    CheckSession(data) {
      //Закрываю сессию если она не ликвидна
      if (!data.login) {
        this.CloseSession()
        return
      }
    },
    CloseSession() {
      console.log('Сессия закрыта сервером!')
      localStorage.setItem('token', '')
      if (this.ws.StateOpen) {
        this.ws.Close()
      }
      this.token = ''
      router.push('/gui/login')
    }
  }
})
