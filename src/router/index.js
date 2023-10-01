import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
// import AboutView from "@/views/AboutView.vue"

import { authStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
      path: '/gui/login',
      name: 'login',
      component: LoginView,
      meta: { 
        requiresAuth: false,
        pageName: "Авторизация",
      }
    },
    {
      path: '/gui/services/docx',
      name: 'Микросервисы docx',
      component: LoginView,
      meta: { 
        requiresAuth: true,
        pageName: "Микросервисы docx",
      }
    }
  ]
})

//Проверяю на авторизацию
router.beforeEach((to/*, from*/) => {

  const auth = authStore();
  //Проверяем подлинность сессии
  if (auth.IsLoggedIn) {
    auth.IsLogin()
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
