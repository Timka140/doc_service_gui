import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const docxServicesStore = defineStore("docx_services", {
  state: () => ({
    ws: wsStore(),
    services: {},
  }),
  getters: {
    Data: (state) => {
      let services = state.services;
      if (services == undefined) {
        services = {};
      }
      return services;
    },
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "ListDocxServices",
        cmd: "Start",
        execution: "list",
      });
    },
    Send(data) {
      console.log(data);
    },
    Render(data) {
      if (data.services == undefined) {
        return;
      }

      let ind = 1;
      for (let pid in data.services) {
        data.services[pid]["index"] = ind;
        ind++;
      }

      this.services = data.services;
    },
    Info() {
      this.ws.Send({
        tp: "ListDocxServices",
        cmd: "Start",
        execution: "info",
      });
    },
    StartServices(val) {
      this.ws.Send({
        tp: "RunDocxServices",
        cmd: "Start",
        execution: "start",
        quantity: val+"",
      });
    },
    SelectRow(event, pid) {
      let checked = event.target.checked;

      this.services[pid]["select"] = checked;

      console.log(checked, pid, this.services);
    },

    SelectAll(event) {
      let checked = event.target.checked;
      for (let pid in this.services) {
        this.services[pid]["select"] = checked;
      }
    },

    StopAllServices() {
      this.ws.Send({
        tp: "RunDocxServices",
        cmd: "Start",
        execution: "stop",
        services: this.services,
      });
    },
  },
});
