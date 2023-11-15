import { authStore } from "./auth";
import { docxServicesStore } from "@/stores/services/docx_services"
import { pdfServicesStore } from "@/stores/services/pdf_services";

import { dashboardStore } from "./dashboard/dashboard";

import { taskListStore } from "./tasks/task_list";
import { taskLocalStore } from "./tasks/task_local";

import { templatesListStore } from "./templates/templates_list";
import { templateLocalStore } from "./templates/template";

export default function wsRouter(){
    const docxService = docxServicesStore();
    const pdfService = pdfServicesStore();
    const auth = authStore();
    const tasks = taskListStore();
    const task = taskLocalStore();
    const templates = templatesListStore();
    const template = templateLocalStore();
    const dashboard = dashboardStore();
    return {
        ListDocxServices: docxService.Render,
        ListPdfServices: pdfService.Render,
        CheckSession: auth.CheckSession,
        
        TaskCreate: tasks.StateCreate,
        TaskList: tasks.Render,

        TemplatesCreate: templates.StateCreate,
        TemplateList: templates.Render,
        Template: template.ReadData,
        UpdateTemplate: template.Init,

        TaskLocal: task.ReadData,

        Dashboard: dashboard.Data,
        ChartTick: dashboard.ChartTick,
        // StateProcess: StateProcess, // Проверка сессии 
        // Pid: Pid,
    }
}