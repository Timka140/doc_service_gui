<script>
import { authStore } from '../stores/auth';
import { desktopStore } from "@/stores/desktop";
import axios from "axios";


export default {
  name: "LoginView",
  setup() {
    let auth = authStore();
    let desktop = desktopStore();

    return {
      auth,
      desktop,
    }
  },
  data() {
    return {
      login: this.desktop.User.login,
      password: this.desktop.User.password,
      proxy: "http://127.0.0.1:8071",
      proxy_state: 0,
      proxy_check: 0,
      proxy_save: 0,
    }
  },
  methods: {
    send_proxy(data, res) {
      let th = this;
      if (!th.desktop.Desktop) return;
      axios.post('/desktop/proxy', data)
        .then(function (response) {
          res(response.data);
        })
        .catch(function (err) {
          console.log(err)
        });
    },
    ProxyCheck() {
      let th = this;
      this.send_proxy({
        tp: "check",
        proxy: this.proxy,
      }, (val) => {
        th.proxy_check = val.state

        setTimeout(() => {
          if (th.proxy_check == 1) {
            th.proxy_check = 0
          }
        }, 2000);
      })
    },
    ProxyInit() {
      let th = this;
      this.send_proxy({
        tp: "init",
        proxy: this.proxy,
      }, (val) => {
        th.proxy_state = val.state;
        th.proxy = val.proxy_url;
      })
    },
    SaveProxy() {
      let th = this;
      this.send_proxy({
        tp: "save",
        proxy: this.proxy,
      }, (val) => {
        th.proxy_save = val.state;
        th.proxy_state = val.state;
        th.proxy = val.proxy_url;

        if (th.proxy_state == 1) {
          let closeSettings = document.getElementById('closeSettings');
          if (closeSettings != undefined) {
            closeSettings.click();
          }
          return
        }

        setTimeout(() => {
          if (th.proxy_save == 1) {
            th.proxy_save = 0
          }
        }, 2000);
      })
    },
  },
  mounted() {
    let th = this;
    window.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        th.auth.Login();
      }
    });

    this.ProxyInit();
  },
  components: {},
}
</script>

<template>
  <main>

    <div class="b-noise"></div>
    <section class="text-center text-lg-start">

      <div class="container fone">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6 mb-5 mb-lg-0 mt-5">
            <div class="card cascading-right">
              <form @submit.prevent>
                <div class="d-flex bd-highlight">
                  <div class="p-2 bd-highlight">

                  </div>
                  <div class="p-2 flex-grow-1 bd-highlight"></div>
                  <div class="p-2 bd-highlight">
                    <button v-if="desktop.Desktop" type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#proxyModal" title="Настройки">
                      <font-awesome-icon icon="fa-solid fa-gear" />
                    </button>
                  </div>
                </div>
                <div class="card-body p-5 shadow-5 text-center">
                  <div v-if="desktop.Desktop && this.proxy_state != 1" class="alert alert-danger" role="alert">
                    Соединение с сервером не установлено, укажите адрес сервера в настройках
                  </div>
                  <div v-if="auth.message != ''" class="alert alert-danger" role="alert">
                    {{ auth.message }}
                  </div>
                  <h2 class="fw-bold mb-5">Авторизация</h2>

                  <div class="form-outline mb-4">
                    <input type="text" class="form-control" placeholder="Логин" :value="auth.login"
                      @input="auth.login = $event.target.value" />
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" class="form-control" placeholder="Пароль" :value="auth.password"
                      @input="auth.password = $event.target.value" />
                  </div>

                  <div v-if="desktop.Desktop" class="d-flex justify-content-start mb-4">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" @change="desktop.SaveChecked" :checked="desktop.SavePassword == true"
                        id="savePasswordDesktop">
                      <label class="form-check-label" for="savePasswordDesktop"> Сохранить пароль</label>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block mb-4" type="submit" @click="auth.Login()">
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>

  </main>


  <div class="modal fade" id="proxyModal" tabindex="-1" aria-labelledby="proxyModalTitle" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="proxyModalTitle">Настройки соединения</h5>
          <button type="button" id="closeSettings" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="this.proxy_save == 2" class="alert alert-danger" role="alert">
            Ошибка сохранения: сервер не отвечает
          </div>

          <div class="input-group mb-3">
            <button class="btn btn-outline-secondary"
              :class="{ 'btn-outline-success': this.proxy_check == 1, 'btn-outline-danger': this.proxy_check == 2 }"
              @click="this.ProxyCheck()" type="button" id="button-addon1">Проверить</button>
            <input type="text" class="form-control"
              :class="{ 'is-valid': this.proxy_check == 1, 'is-invalid': this.proxy_check == 2 }" v-model="this.proxy"
              placeholder="http://127.0.0.1:8071" aria-label="Введите адрес сервиса" aria-describedby="button-addon1">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" @click="this.SaveProxy()">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.b-image {
  position: fixed;
  width: 100%;
}

.b-noise {
  position: fixed;
  width: 100%;
  height: 100%;
  display: block;
  background: #E1E8ED;
  /* margin-right: -50px;
  background: hsla(0, 0%, 5%, 0.55);
  backdrop-filter: blur(20px); */
}

.cascading-right {
  margin-right: -50px;
  background: hsla(0, 80%, 100%, 0.55);
  backdrop-filter: blur(30px);
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
