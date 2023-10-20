import { authStore } from "./auth";
import { docxServicesStore } from "@/stores/services/docx_services"
import { pdfServicesStore } from "@/stores/services/pdf_services";

import { taskListStore } from "./tasks/task_list";
import { taskLocalStore } from "./tasks/task_local";

import { templatesListStore } from "./templates/templates_list";

export default function wsRouter(){
    const docxService = docxServicesStore();
    const pdfService = pdfServicesStore();
    const auth = authStore();
    const tasks = taskListStore();
    const task = taskLocalStore();
    const templates = templatesListStore();
    return {
        ListDocxServices: docxService.Render,
        ListPdfServices: pdfService.Render,
        CheckSession: auth.CheckSession,
        
        TaskCreate: tasks.StateCreate,
        TaskList: tasks.Render,

        TemplatesCreate: templates.StateCreate,
        TemplateList: templates.Render,

        TaskLocal: task.ReadData,
        // StateProcess: StateProcess, // Проверка сессии 
        // Pid: Pid,
    }
}