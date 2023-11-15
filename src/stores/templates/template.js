import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";
import axios from "axios";

export const templateLocalStore = defineStore("template", {
  state: () => ({
    ws: wsStore(),
    template_name: localStorage.getItem("template_name"),
    template_id: localStorage.getItem("template_id"),
    tmp: {},
  }),
  getters: {
    Data: () => {
      return [];
    },
    LoadFile: (state) => {
      let file = false;
      if (state.tmp.load_file) {
        file = state.tmp.load_file;
      }
      return file
    },
    NameFile: (state) => {
      let name = false;
      if (state.tmp.file_name) {
        name = state.tmp.file_name;
      }
      return name
    },
    TemplateName: (state) => {
      let name = "";
      if (state.template_name) {
        name = state.template_name;
      }
      return name
    },
    TemplateID: (state) => {
      let id = "";
      if (state.template_id) {
        id = state.template_id;
      }
      return id
    },
    TmUpdate: (state)=>{
      return state.tmp.tm_update
    },
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "Template",
        cmd: "Start",
        execution: "init",
        template_id: this.template_id, 
      });
    },
    ReadData(data) {
      this.tmp = data;
    },
    SetTemplate(data) {
      if (data == undefined) {
        return;
      }
      if (data.Id == undefined) {
        data.Id = 0;
      }
      localStorage.setItem("template_name", data.Name);
      localStorage.setItem("template_id", data.Id);
      this.template_id = data.Id;
      this.template_name = data.Name;
      this.Init();
    },
    UpLoadFile() {
      let file = document.getElementById("template_form");
      if (file.files.length == 0) {
        return;
      }
      let th = this;

      var fd = new FormData();
      fd.append("file", file.files[0]);
      fd.append("template_id", this.template_id);
      axios.post("/api/load_template", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(resp =>{
        if (resp.status != 200) {
          return
        }
        th.Init();
      });
    },
    OpenTemplate(){
      let th = this;
      var fd = new FormData();
      fd.append("template_id", this.template_id);
      axios.post("/desktop/open_template", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(resp =>{
        if (resp.status != 200) {
          return
        }
        th.Init();
      });
    },
    SelectRow() {

    },
    CheckAll() {

    },
  },
});
