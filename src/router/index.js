import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import DocxServicesView from "@/views/services/DocxServicesView.vue"
import TaskListView from "@/views/TaskListView.vue"
import TaskLocalView from "@/views/TaskLocalView.vue"
// import AboutView from "@/views/AboutView.vue"
import XlsxServicesViewVue from '@/views/services/XlsxServicesView.vue'
import PdfServicesView from '@/views/services/PdfServicesView.vue'
import TemplatesListView from "@/views/TemplatesListView.vue"
import TemplateView from '@/views/TemplateView.vue'
import SettingsView from '@/views/settings/SettingsView.vue'

import { authStore } from '../stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gui/',
      name: 'home',
      component: HomeView,
      meta: { 
        requiresAuth: true,
        pageName: "Главная",
      }
    },
    {
      path: '/gui/settings',
      name: 'settings',
      component: SettingsView,
      meta: { 
        requiresAuth: true,
        pageName: "Список пользователей",
      }
    },
    {
      path: '/gui/login',
      name: 'login',
      component: LoginView,
      meta: { 
        requiresAuth: false,
        pageName: "Авторизация",
      }
    },
    {
      path: '/gui/processes',
      name: 'Процессы',
      component: TaskListView,
      meta: { 
        requiresAuth: true,
        pageName: "Процессы",
      }
    },
    {
      path: '/gui/templates/list',
      name: 'Шаблоны',
      component: TemplatesListView,
      meta: { 
        requiresAuth: true,
        pageName: "Шаблоны",
      }
    },
    {
      path: '/gui/templates/template',
      name: 'Шаблон',
      component: TemplateView,
      meta: { 
        requiresAuth: true,
        pageName: "Шаблон",
      }
    },
    {
      path: '/gui/processes/task_local',
      name: 'Задача',
      component: TaskLocalView,
      meta: { 
        requiresAuth: true,
        pageName: "Задача",
      }
    },
    {
      path: '/gui/services/docx',
      name: 'Микросервисы docx',
      component: DocxServicesView,
      meta: { 
        requiresAuth: true,
        pageName: "Микросервисы docx",
      }
    },
    {
      path: '/gui/services/xlsx',
      name: 'Микросервисы xlsx',
      component: XlsxServicesViewVue,
      meta: { 
        requiresAuth: true,
        pageName: "Микросервисы xlsx",
      }
    },
    {
      path: '/gui/services/pdf',
      name: 'Микросервисы pdf',
      component: PdfServicesView,
      meta: { 
        requiresAuth: true,
        pageName: "Микросервисы pdf",
      }
    },
  ]
})

//Проверяю на авторизацию
router.beforeEach((to/*, from*/) => {

  const auth = authStore();
  //Проверяем подлинность сессии
  if (auth.IsLoggedIn) {
    auth.IsLogin(to.path)
  }
  if (to.meta.pageName) { //Задаю название страницы
    document.title = to.meta.pageName;
  }

  if (to.meta.requiresAuth && (!auth.IsLoggedIn)) {
    return {
      path: '/gui/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
