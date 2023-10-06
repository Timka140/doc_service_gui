<script>
import LeftMenu from '@/components/LeftMenu.vue';
import { wsStore } from "@/stores/ws"

export default {
  name: "DocxServicesView",
  setup() {
    let ws = wsStore();

    return {
      ws,
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
      this.ws.Send({
        tp: "test",
        data: "data",
      })
    },
  },
  components: {
    LeftMenu,
  },
}
</script>


<template>
  <div class="d-flex bd-highlight" style="height: 100vh;">
    <div class="bd-highlight">
      <LeftMenu />
    </div>
    <div class="flex-fill bd-highlight b-site">
      <main class="container-fluid mt-2">
        <h1 class="mb-4">Главная</h1>
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
