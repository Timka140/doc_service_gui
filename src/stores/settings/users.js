import { defineStore } from 'pinia'
import { wsStore } from '@/stores/ws'
import { taskLocalStore } from '@/stores/tasks/task_local'
// import router from "@/router";

export const settingsUsersStore = defineStore('settings_users', {
  state: () => ({
    ws: wsStore(),
    task: taskLocalStore(),

    user: {
      loginVerification: 0,
      showLogin: true,
      login: '',
      password: '',
      rights: {
        administrator: false,
        user: false,
        guest: false,
        creatingTemplate: false,
        updatingTemplate: false
      },
      comment: ''
    },

    table: {
      items: [],
      page: 0,
      max_page: 1,
      step: 10,
      len: 0,
      start: 0,
      end: 10
    }
  }),
  getters: {
    ShowData: (state) => {
      let start = state.table.start
      let end = state.table.end
      
      if (state.table.items == null) {
        return false
      }

      return state.table.items.slice(start, end)
    },
    EmptyTableL:(state) => {
      if (state.table.items == null) {
        return true
      }
      return false
    },

    Page: (state) => {
      if (state.table.page == 0) {
        return 1
      }
      return state.table.page + 1
    },
    MaxPage: (state) => {
      if (state.table.max_page <= 0) {
        return 1
      }
      return state.table.max_page + 1
    },
    AddUser: (state) => {
      return state.user.showLogin
    },
    LoginVerification: (state) => {
      return state.user.loginVerification
    },
    UserLogin: (state) => {
      return state.user.login
    }
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'list',

        start: this.table.start,
        step: this.table.step
      })
    },

    update() {
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'list'
      })
    },
    Hub(data) {
      // console.log(data)
      switch (data.execution) {
        case 'list':
          this.render(data)
          break
        case 'check_login':
          this.presentLogin(data)
          break
        case ('create_user'):
          this.Init()
          break
        case ('update_user'):
          this.Init()
          break
        case ('remove_user'):
          this.Init()
          break
        case 'info_user':
          this.infoUser(data)
          break
        default:
          console.log('Неизвестны обработчик: ', data)
      }
    },

    render(data) {
      this.table.items = data.items
      
      if (data.items == undefined || data.items == null) {
        this.table.len = 1
        this.table.max_page = 1
        return
      }
      
      this.table.len = this.table.items.length
      this.table.max_page = Math.floor(this.table.len / this.table.step)
    },

    getPage() {
      this.table.start = this.table.step * this.table.page
      this.table.end = this.table.step * (this.table.page + 1)
    },

    NextPage() {
      let page = this.table.page + 1
      if (page > this.table.max_page) {
        return
      }
      this.table.page = page
      this.getPage()
    },
    PrevPage() {
      let page = this.table.page - 1
      if (page < 0) {
        return
      }
      this.table.page = page
      this.getPage()
    },
    SetPage(e) {
      let val = Number(e.value) - 1
      if (val >= this.table.max_page) {
        val = this.table.max_page
        setTimeout(() => {
          e.value = this.MaxPage
        }, 10)
      }

      this.table.page = val
      this.getPage()
    },
    ShowLogin(show, id) {
      this.user.showLogin = show
      this.user.id = id
      if (id) {
        this.ws.Send({
          tp: 'SettingsUsers',
          cmd: 'Start',
          execution: 'info_user',
          user: this.user
        })
        return
      }
      this.user.login = ''
      this.user.password = ''
      this.user.rights = {
        administrator: false,
        user: false,
        guest: false,
        creatingTemplate: false,
        updatingTemplate: false
      }
      this.user.comment = ''
    },
    CreateUser() {
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'create_user',
        user: this.user
      })
    },
    EditUser() {
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'update_user',
        user: this.user
      })
    },
    RemoveUser() {
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'remove_user',
        user: this.user
      })
    },
    CheckLogin(e) {
      if (e.target.value == '') {
        this.user.loginVerification = 0
        return
      }
      this.ws.Send({
        tp: 'SettingsUsers',
        cmd: 'Start',
        execution: 'check_login',
        login: e.target.value
      })
    },
    infoUser(data) {
      this.user = data.user
    },
    presentLogin(data) {
      this.user.loginVerification = data.present_login
    }
  }
})
