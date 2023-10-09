import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const taskStore = defineStore("task", {
  state: () => ({
    ws: wsStore(),
    task_id: localStorage.getItem("task_id"),
  }),
  getters: {
  },
  actions: {
    Init() {
    //   this.ws.Send({
    //     tp: "TaskList",
    //     cmd: "Start",
    //     execution: "list",
    //   });
    },
    SetTask(data) {
        if (data == undefined) {
            return
        }

        if (data.Id == undefined ) {
            data.Id = 0;
        }
        
        localStorage.setItem("task_id", data.Id);
    }
  },
});
