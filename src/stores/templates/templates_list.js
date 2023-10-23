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

    check_all: false,
    disable_delete_all: true,
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

    CheckAll: (state) =>{
      return state.check_all;
    },
    DisableDeleteAll: (state) =>{
      return state.disable_delete_all;
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
    CreateTemplate(data) {
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
      if (data.Tp == 2) { //Catalog
        this.open(data)
      }
      if (data.Tp == 3) {//Template
        this.temp.SetTemplate(data)
        router.push('/gui/templates/template');
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
      this.ws.Send({
        tp: "TemplatesCreate",
        cmd: "Start",
        path: this.getPath(),
        execution: "remove",
        temps: this.temps,
      });
    },

    SelectRow(event, index) {
      let checked = event.target.checked;
      this.temps[index]["select"] = checked;
      this.checkDeleteBtn()
    },

    SelectAll(event) {
      let checked = event.target.checked;
      this.check_all = checked;
      for (let index in this.temps) {
        this.temps[index]["select"] = checked;
      }
      this.checkDeleteBtn()
    },
    checkDeleteBtn() {
      this.disable_delete_all = true;
      for (let p in this.temps) {
        let s = this.temps[p]["select"];
        if (s == true) {
          this.disable_delete_all = false;
        }
      }
    }
  },
});
