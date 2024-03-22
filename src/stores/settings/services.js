import { defineStore } from 'pinia'
import { wsStore } from '@/stores/ws'
import { taskLocalStore } from '@/stores/tasks/task_local'
// import router from "@/router";

export const settingsServicesStore = defineStore('settings_services', {
  state: () => ({
    ws: wsStore(),
    task: taskLocalStore(),

    service: {
      nameVerification: 0,
      showLogin: true,
      name: '',
      key: '',
      state: false,
      rights: {
        docx: false,
        pdf: false,
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
    AddService: (state) => {
      return state.service.showLogin
    },
    NameVerification: (state) => {
      return state.service.nameVerification
    },
    ServiceName: (state) => {
      return state.service.name
    },
    ServiceKey: (state) => {
      return state.service.key
    }
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: 'SettingsServices',
        cmd: 'Start',
        execution: 'list',

        start: this.table.start,
        step: this.table.step
      })
    },

    update() {
      this.ws.Send({
        tp: 'SettingsServices',
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
        case 'check_name':
          this.presentName(data)
          break
        case ('create_service'):
          this.Init()
          break
        case ('update_service'):
          this.Init()
          break
        case ('remove_service'):
          this.Init()
          break
        case 'info_service':
          this.infoService(data)
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
    ShowName(show, id) {
      this.service.showLogin = show
      this.service.id = id
      if (id) {
        this.ws.Send({
          tp: 'SettingsServices',
          cmd: 'Start',
          execution: 'info_service',
          service: this.service
        })
        return
      }
      this.service.name = ''
      this.service.key = ''
      this.service.rights = {
        state: false,
        docx: false,
        pdf: false,
      }
      this.service.comment = ''
    },
    CreateUser() {
      this.ws.Send({
        tp: 'SettingsServices',
        cmd: 'Start',
        execution: 'create_service',
        service: this.service
      })
    },
    EditUser() {
      this.ws.Send({
        tp: 'SettingsServices',
        cmd: 'Start',
        execution: 'update_service',
        service: this.service
      })
    },
    RemoveUser() {
      this.ws.Send({
        tp: 'SettingsServices',
        cmd: 'Start',
        execution: 'remove_service',
        service: this.service
      })
    },
    CheckLogin(e) {
      if (e.target.value == '') {
        this.service.nameVerification = 0
        return
      }
      this.ws.Send({
        tp: 'SettingsServices',
        cmd: 'Start',
        execution: 'check_name',
        name: e.target.value
      })
    },
    infoService(data) {
      this.service = data.service
    },
    presentName(data) {
      this.service.nameVerification = data.present_name
    }
  }
})
