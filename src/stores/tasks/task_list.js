import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";
import { taskStore } from "@/stores/tasks/task";
import router from "@/router";

export const taskListStore = defineStore("task_list", {
  state: () => ({
    ws: wsStore(),
    task: taskStore(),
    path: "",
    tasks: {},
  }),
  getters: {
    Data: (state) => {
      let tasks = state.tasks;
      if (tasks == undefined || tasks == null) {
        tasks = []
      }

      return tasks;
    },

    Path: (state) => {
      if (state.path == undefined) {
        state.path = "";
      }

      let path = state.path.split("/");
      
      let p = "/";
      let data = {};
      let len = path.length;
      for (let i in path) {
        let val = path[i];
        let disable = false;
        if (len -1 == i) {
          disable = true
        }
        if (p == "/") {
          p = "/"+val; 
        } else {
          p += "/"+val; 
        }

        data[val] = {
          name: val,
          path: p,
          index: crypto.randomUUID(),
          disable: disable,
        };
      }
      return data;
    },
  },
  actions: {
    getPath() {
      let ph = this.path;
      if (ph == "" || ph == undefined || ph == null) {
        ph = "/"
      }
      return  ph;
    },
    update() {
      this.ws.Send({
        tp: "TaskList",
        cmd: "Start",
        execution: "list",
        path: this.path,
      });
    },

    open(data) {
      this.ws.Send({
        tp: "TaskList",
        cmd: "Start",
        path: this.getPath(),
        execution: "open",
        tp_task: data.Tp,
        name: data.Name,
      });
    },

    Init() {
      this.ws.Send({
        tp: "TaskList",
        cmd: "Start",
        execution: "list",
      });
    },
    Render(data) {
      if (data.tasks == undefined) {
        data.tasks = [];
      }

      let ind = 1;
      for (let pid in data.tasks) {
        data.tasks[pid]["index"] = ind;
        ind++;
      }

      this.tasks = data.tasks;
      this.path = data.path;
    },
    SelectRow(event, pid) {
      let checked = event.target.checked;

      this.tasks[pid]["select"] = checked;

      console.log(checked, pid, this.tasks);
    },
    CreateTask(data) {
      this.ws.Send({
        tp: "TaskCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "tasks",
        data: data,
      });
    },
    CreateCatalog(data) {
      this.ws.Send({
        tp: "TaskCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "catalog",
        data: data,
      });
    },
    CreateStore(data) {
      this.ws.Send({
        tp: "TaskCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "store",
        data: data,
      });
    },
    Open(data) {
      if (data.Tp == undefined) {
        return
      }

      if (data.Tp == 1) { //Store
        this.open(data)
      }
      if (data.Tp == 2) { //Catalog
        this.open(data)
      }
      if (data.Tp == 3) {//Task
        this.task.SetTask(data)
        router.push('/gui/processes/task');
      }
    },
    OpenToPath(path) {
      this.ws.Send({
        tp: "TaskList",
        cmd: "Start",
        path: path,
        execution: "list",
      });
    },
    StateCreate(data) {
      this.update();
      console.log(data)
    },
  },
});
