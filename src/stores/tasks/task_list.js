import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const taskListStore = defineStore("task_list", {
  state: () => ({
    ws: wsStore(),
    path: "/",
    items: {},
  }),
  getters: {
    Data: (state) => {
      let items = state.items;
      if (items == undefined) {
        items = {};
      }
      return items;
    },
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "TaskListTable",
        cmd: "Start",
        execution: "list",
      });
    },
    Render(data) {
      if (data.items == undefined) {
        return;
      }

      let ind = 1;
      for (let pid in data.items) {
        data.items[pid]["index"] = ind;
        ind++;
      }

      this.items = data.items;
    },
    SelectRow(event, pid) {
      let checked = event.target.checked;

      this.items[pid]["select"] = checked;

      console.log(checked, pid, this.items);
    },
  },
});
