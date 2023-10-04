import { docxServicesStore } from "@/stores/services/docx_services"
import { authStore } from "./auth";

export default function wsRouter(){
    const docxService = docxServicesStore();
    const auth = authStore();
    return {
        ListDocxServices: docxService.Render,
        CheckSession: auth.CheckSession,
        // StateProcess: StateProcess, // Проверка сессии 
        // Pid: Pid,
    }
}