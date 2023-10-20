import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";
import { templateLocalStore } from "@/stores/templates/template";
import router from "@/router";

export const templatesListStore = defineStore("templates_list", {
  state: () => ({
    ws: wsStore(),
    temp: templateLocalStore(),
    path: "",
    temps: {},
  }),
  getters: {
    Data: (state) => {
      let temp = state.temps;
      if (temp == undefined || temp == null) {
        temp = []
      }

      return temp;
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
        tp: "TemplateList",
        cmd: "Start",
        execution: "list",
        path: this.path,
      });
    },

    open(data) {
      this.ws.Send({
        tp: "TemplateList",
        cmd: "Start",
        path: this.getPath(),
        execution: "open",
        tp_temp: data.Tp,
        name: data.Name,
      });
    },

    Init() {
      this.ws.Send({
        tp: "TemplateList",
        cmd: "Start",
        execution: "list",
      });
    },
    Render(data) {
      if (data.temps == undefined) {
        data.temps = [];
      }

      let ind = 1;
      for (let pid in data.temps) {
        data.temps[pid]["index"] = ind;
        ind++;
      }

      this.temps = data.temps;
      this.path = data.path;
    },
    SelectRow(event, pid) {
      let checked = event.target.checked;

      this.temps[pid]["select"] = checked;

      console.log(checked, pid, this.temps);
    },
    CreateTask(data) {
      this.ws.Send({
        tp: "TemplatesCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "template",
        data: data,
      });
    },
    CreateCatalog(data) {
      this.ws.Send({
        tp: "TemplatesCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "catalog",
        data: data,
      });
    },
    CreateStore(data) {
      this.ws.Send({
        tp: "TemplatesCreate",
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
        this.tmp.SetTask(data)
        router.push('/gui/processes/task_local');
      }
    },
    OpenToPath(path) {
      this.ws.Send({
        tp: "TemplateList",
        cmd: "Start",
        path: path,
        execution: "list",
      });
    },
    StateCreate(data) {
      this.update();
      console.log(data)
    },
    Remove() {
      console.log("ok")
    },
  },
});
