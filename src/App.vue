<script>
import {RouterView } from 'vue-router'

import { wsStore } from "@/stores/ws"

export default {
    name: "AppPage",
    setup() {
        let ws = wsStore();
        return {
            ws,
        }
    },
    data() {
        return {
        };
    },
    computed: {
    },
    mounted() {
        this.ws.Open();
    },

    methods: {
    },
    components: {
      RouterView,
    },
}

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
