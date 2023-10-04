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

<template>
  <main>
    <!-- Section: Design Block -->
    <!-- <img class="b-image" src="/1.jpg"> -->
    <div class="b-noise"></div>
    <section class="text-center text-lg-start">
      <!-- Jumbotron -->
      <div class="container fone">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6 mb-5 mb-lg-0 mt-5">
            <div class="card cascading-right">
              <form @submit.prevent>
                <div class="card-body p-5 shadow-5 text-center">
                  <div v-if="auth.message != ''" class="alert alert-danger" role="alert">
                    {{ auth.message }}
                  </div>
                  <h2 class="fw-bold mb-5">Авторизация</h2>
                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <input type="text" class="form-control" placeholder="Логин" :value="auth.login"
                      @input="auth.login = $event.target.value" />
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input type="password" class="form-control" placeholder="Пароль" :value="auth.password"
                      @input="auth.password = $event.target.value" />
                  </div>

                  <!-- Checkbox -->
                  <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                    <label class="form-check-label" for="form2Example33">
                      Subscribe to our newsletter
                    </label>
                  </div>

                  <!-- Submit button -->
                  <button class="btn btn-primary btn-block mb-4" type="submit" @click="auth.Login()">
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Jumbotron -->
    </section>
    <!-- Section: Design Block -->
  </main>
</template>

<script>
import { authStore } from '../stores/auth';
export default {
  name: "LoginView",
  setup() {
    let auth = authStore();

    return {
      auth,
    }
  },
  data() {
    return {
      login: "",
      password: "",
    }
  },
  methods: {
    Send() {

    },
  },
  components: {},
}
</script>