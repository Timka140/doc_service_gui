<template>
    <div class="modal fade" :id="this.idModal" tabindex="-1" :aria-labelledby="this.idModal + 'Label'" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="this.idModal + 'Label'">Создать шаблон</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Название шаблона</label>
                        <input type="text" @change="this.task_info.name = $event.target.value" class="form-control"
                            placeholder="Введите название шаблона">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><font-awesome-icon
                            icon="fa-solid fa-xmark" /></button>
                    <button type="button" data-bs-dismiss="modal" @click="tasks.CreateTask(this.task_info)" class="btn btn-success"><font-awesome-icon icon="fa-solid fa-check" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {taskListStore} from '@/stores/tasks/task_list'

export default {
    
    name: "ModalTaskCreate",
    props: {
        idModal: String,
    },
    setup() {
        const tasks = taskListStore();
        
        return {
            tasks,
        }
    },
    data() {
        return {
            task_info: {
                name: "",     
            }
        }
    },
}
</script>

<style></style>