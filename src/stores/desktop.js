import { defineStore } from 'pinia'
// import axios from "axios";

export const desktopStore = defineStore('desktop', {
  state: () => ({
    desktop: false
  }),
  getters: {
    Desktop: () => {
      if (window.api == undefined) return false;
      return true;
    }
  },
  actions: {
    async Init() {
      if (window.api == undefined) return

      let th = this
      window.api.initConfig(
        {
          desktop: true
        },
        (res) => {
          th.desktop = res.desktop;
        }
      )
    }
  }
})
