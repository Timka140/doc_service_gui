import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const docxServicesStore = defineStore("docx_services", {
  state: () => ({
    ws: wsStore(),
    services: {},
    check_all: false,
    disable_stop_all: true,
  }),
  getters: {
    Data: (state) => {
      let services = state.services;
      if (services == undefined) {
        services = {};
      }
      return services;
    },
    CheckAll: (state) =>{
      return state.check_all;
    },
    DisableStopAll: (state) =>{
      return state.disable_stop_all;
    }
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
      this.checkStopBtn()
    },

    SelectAll(event) {
      let checked = event.target.checked;
      this.check_all = checked;
      for (let pid in this.services) {
        this.services[pid]["select"] = checked;
      }
      this.checkStopBtn()
    },

    StopAllServices() {
      this.ws.Send({
        tp: "RunDocxServices",
        cmd: "Start",
        execution: "stop",
        services: this.services,
      });
      this.check_all = false;
    },
    checkStopBtn() {
      this.disable_stop_all = true;
      for (let p in this.services) {
        let s = this.services[p]["select"];
        if (s == true) {
          this.disable_stop_all = false;
        }
      }
    }
  },
});
