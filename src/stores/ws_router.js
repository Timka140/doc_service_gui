import { authStore } from "./auth";
import { docxServicesStore } from "@/stores/services/docx_services"
import { taskListStore } from "./tasks/task_list";

export default function wsRouter(){
    const docxService = docxServicesStore();
    const auth = authStore();
    const tasks = taskListStore();
    return {
        ListDocxServices: docxService.Render,
        CheckSession: auth.CheckSession,
        TaskCreate: tasks.Render,
        TaskList: tasks.Render,
        // StateProcess: StateProcess, // Проверка сессии 
        // Pid: Pid,
    }
}