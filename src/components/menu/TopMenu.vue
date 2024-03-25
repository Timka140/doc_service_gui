<script>
import { authStore } from '@/stores/auth';
export default {
  name: "TopMenu",
  setup() {
        let auth = authStore();
        return {
          auth,
        }
    },
}
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li  class="nav-item pointer" @click="auth.Logout">
          <a class="nav-link" ><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> Выйти</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style>
.pointer {
  cursor: pointer;
}
</style>