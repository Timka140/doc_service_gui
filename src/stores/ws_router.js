import { authStore } from "./auth";
import { docxServicesStore } from "@/stores/services/docx_services"
import { taskListStore } from "./tasks/task_list";
import { taskLocalStore } from "./tasks/task_local";

export default function wsRouter(){
    const docxService = docxServicesStore();
    const auth = authStore();
    const tasks = taskListStore();
    const task = taskLocalStore();
    return {
        ListDocxServices: docxService.Render,
        CheckSession: auth.CheckSession,
        TaskCreate: tasks.StateCreate,
        TaskList: tasks.Render,
        TaskLocal: task.ReadData,
        // StateProcess: StateProcess, // Проверка сессии 
        // Pid: Pid,
    }
}