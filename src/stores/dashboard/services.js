import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const servicesStore = defineStore("services", {
  state: () => ({
    ws: wsStore(),
    services: [],
  }),
  getters: {
    Data: (state) => {
      if (state.services == undefined || state.services == null) {
        return []
      }
      return state.services
    },
    Services: (state) => {
      if (state.services == undefined || state.services == null) {
        return false
      }
      if (state.services.length == 0) {
        return false
      }
      return true
    },
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "ServicesList",
        cmd: "Start",
        execution: "init",
      });
    },
    Render(data) {
        if (data.services == undefined || data.services == null) {
          this.services = [];
          return;
        }
  
        let index = 1;
        for (let ind in data.services) {
          data.services[ind]["index"] = index;
          data.services[ind]["id"] = "services_"+ind;
          index++
        }
  
        this.services = data.services;
      },
  },
});