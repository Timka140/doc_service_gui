import { defineStore } from "pinia";
import { wsStore } from "@/stores/ws";

import WorkLoad from "@/stores/dashboard/work_load";

export const dashboardStore = defineStore("dashboard", {
  state: () => ({
    ws: wsStore(),
    dashboard: {},

    workLoad: {
        docx: WorkLoad,
        pdf: WorkLoad,
        xlsx: WorkLoad,
    },
  }),
  getters: {
    DocxLen: (state) => {
      let len = "0";
      if (state.dashboard.docx_len) {
        len = state.dashboard.docx_len;
      }
      return len
    },
    PdfLen: (state) => {
      let len = "0";
      if (state.dashboard.pdf_len) {
        len = state.dashboard.pdf_len;
      }
      return len
    },
    XlsxLen: (state) => {
      let len = "0";
      if (state.dashboard.xlsx_len) {
        len = state.dashboard.xlsx_len;
      }
      return len
    },
  },
  actions: {
    Init() {
      this.ws.Send({
        tp: "Dashboard",
        cmd: "Start",
        execution: "init",
      });
    },
    Data(data){
        console.log(data)
        if (!data) {
            return
        }
        this.dashboard = data;
    },
    InitChart(chart, key) {
      if (!window.charts) window.charts = {};
      window.charts[key] = undefined;  
      window.charts[key] = new WorkLoad(chart);
    },
    ChartTick(data) {
      if (!data.charts) return;

      for (let name in data.charts) {
        let v = data.charts[name];
        let ch = window.charts[name];
        if (!ch) continue;
        ch.Tick(v)
      }
    }
  },
});