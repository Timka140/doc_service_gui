import { defineStore } from 'pinia'

import { authStore } from '@/stores/auth'
import { docxServicesStore } from '@/stores/services/docx_services'
import { pdfServicesStore } from '@/stores/services/pdf_services'

import { dashboardStore } from './dashboard/dashboard'
import { servicesStore } from './dashboard/services'

import { taskListStore } from './tasks/task_list'
import { taskLocalStore } from './tasks/task_local'

import { templatesListStore } from './templates/templates_list'
import { templateLocalStore } from './templates/template'

import { settingsUsersStore } from './settings/users'
import { settingsServicesStore } from './settings/services'

export const wsRouterStore = defineStore('ws_router', {
  state: () => ({
    ok: true,

    docxService: docxServicesStore(),
    pdfService: pdfServicesStore(),
    auth: authStore(),
    tasks: taskListStore(),
    task: taskLocalStore(),
    templates: templatesListStore(),
    template: templateLocalStore(),
    dashboard: dashboardStore(),
    services: servicesStore(),

    settingsUsers: settingsUsersStore(),
    settingsServices: settingsServicesStore()
  }),
  getters: {
    Token: (state) => {
      return state.ok
    }
  },
  actions: {
    Routers() {
      return {
        ListDocxServices: this.docxService.Render,
        ListPdfServices: this.pdfService.Render,

        CheckSession: this.auth.CheckSession,

        TaskCreate: this.tasks.StateCreate,
        TaskList: this.tasks.Render,

        TemplatesCreate: this.templates.StateCreate,
        TemplateList: this.templates.Render,
        Template: this.template.ReadData,
        UpdateTemplate: this.template.Init,

        TaskLocal: this.task.ReadData,

        Dashboard: this.dashboard.Data,
        ChartTick: this.dashboard.ChartTick,
        // StateProcess: this.StateProcess, // Проверка сессии
        // Pid: this.Pid,

        ServicesList: this.services.Render,

        //settings
        SettingsUsers: this.settingsUsers.Hub,
        SettingsServices: this.settingsServices.Hub
      }
    }
  }
})
