import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

export const taskLocalStore = defineStore("task_local", {
  state: () => ({
    ws: wsStore(),
    task_id: localStorage.getItem("task_id"),
    load_file_state: 0,
  }),
  getters: {
    LoadFileState: (state)=>{
      return state.load_file_state;
    }
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "TaskLocal",
        cmd: "Start",
        execution: "init",
        task_id: this.task_id,
      });
    },
    ReadData() {
      // console.log(data)
    },
    SetTask(data) {
        if (data == undefined) {
            return
        }

        if (data.Id == undefined ) {
            data.Id = 0;
        }
        
        localStorage.setItem("task_id", data.Id);
    },
    AddTable() {
      let th = this;
      th.load_file_state = 0;
      
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      let file = document.getElementById("fileXlsx");
      if (file.files.length == 0 ) {
        return
      }

      th.load_file_state = 1;

      fd.append("task_id", th.task_id)
      fd.append("file", file.files[0])
      

      xhr.open("POST", "/api/load_task_data")
      xhr.onload = function() {
        if (xhr.status != 200) {
          console.log(xhr.status)
        } else {
          th.load_file_state = 2;
          setTimeout(() => {
            th.load_file_state = 0;
          }, 1000);
        }
      };

      xhr.send(fd);
    }
  },
});
