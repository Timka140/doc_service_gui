import { defineStore } from 'pinia'
import { authStore } from '../stores/auth'
import axios from 'axios'

export const desktopStore = defineStore('desktop', {
  state: () => ({
    auth: authStore(),
    desktop: false,
    checked: false,
    user: {
      login: '',
      password: ''
    }
  }),
  getters: {
    Desktop: () => {
      if (window.api == undefined) return false
      return true
    },
    User: (state) => {
      return state.user
    },
    SavePassword: (state) => {
      return state.checked
    }
  },
  actions: {
    async Init() {
      if (window.api == undefined) return

      let th = this
      window.api.initConfig(
        {
          desktop: true
        },
        (res) => {
          th.desktop = res.desktop
          
          if (res.user != undefined) {
            th.auth.login = res.user.login
            th.auth.password = res.user.password
            th.checked = res.user.savePassword
          }
        }
      )
    },

    SaveChecked(el) {
      if (el == undefined) return
      let th = this
      th.checked = el.target.checked
    },
    ReadUser(data) {
      let th = this
      if (!th.desktop) return
      data.savePassword = th.checked

      axios
        .post('/desktop/save_password', data)
        .then(function (response) {
          let data = response.data
          if (data == undefined) return
          // th.user.login = data.user.login;
          // th.user.password = data.user.password;
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
})
