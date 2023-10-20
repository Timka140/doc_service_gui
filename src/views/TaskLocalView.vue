<script>
import LeftMenu from '@/components/menu/LeftMenu.vue';
import { wsStore } from "@/stores/ws";
import { taskLocalStore } from '@/stores/tasks/task_local';

export default {
    name: "TaskView",
    setup() {
        let ws = wsStore();
        let task = taskLocalStore();
        return {
            ws,
            task,
        }
    },
    data() {
        return {
        }
    },

    close() {

    },
    unmounted() {

    },
    created() {
        this.task.Init();
    },

    methods: {
    },
    components: {
        LeftMenu,
    },
}
</script>


<template>
    <div class="d-flex bd-highlight" style="height: 100vh;">
        <div class="bd-highlight">
            <LeftMenu />
        </div>
        <div class="flex-fill bd-highlight b-site">
            <main class="container-fluid mt-2">

                <h1 class="mb-4">Задача</h1>
                <div class="card mb-2">
                    <h5 class="card-header">Управление задачей</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="60"
                                        aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 bd-highlight">
                                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group me-2" role="group">
                                                <button type="button" class="btn btn-success"><font-awesome-icon
                                                        icon="fa-solid fa-play" /></button>
                                            </div>
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                                    data-bs-target="#modalBaseCreate"><font-awesome-icon
                                                        icon="fa-solid fa-stop" /></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight">
                                        <span class="mb-0 lh-sm" role="alert">
                                            A simple info alert—check it out!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-2">
                    <h5 class="card-header">Данные</h5>
                    <div class="card-body">
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Файл для загрузки в базу</label>
                                <input class="form-control" type="file" id="fileXlsx">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex bd-highlight">
                                <div class="p-2 bd-highlight">
                                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div class="btn-group me-2" role="group">
                                            <button type="button" @click="task.AddTable($event)" class="btn btn-primary"
                                                :disabled="task.LoadFileState != 0">
                                                <font-awesome-icon v-if="task.LoadFileState == 0" icon="fa-solid fa-plus" />
                                                <font-awesome-icon v-if="task.LoadFileState == 1" icon="fa-solid fa-spinner"
                                                    spin />
                                                <font-awesome-icon v-if="task.LoadFileState == 2"
                                                    icon="fa-solid fa-check" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div class="p-2 flex-grow-1 bd-highlight">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex align-content-stretch flex-wrap">
                    <div class="card me-2 mb-2 flex-fill bd-highlight">
                        <div class="card-header">
                            Featured
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                    </div>
                    <div class="card me-2 mb-2 flex-fill bd-highlight">
                        <div class="card-header">
                            Featured
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<style scoped>

</style>