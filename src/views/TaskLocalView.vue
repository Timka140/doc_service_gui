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

                <div class="card">
                    <h5 class="card-header">Данные</h5>
                    <div class="card-body">
                        <div class="col-12">
                            <div class="d-flex bd-highlight">
                                <div class="p-2 bd-highlight">
                                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div class="btn-group me-2" role="group">
                                            <button type="button" class="btn btn-primary"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                                        </div>
                                    </div>

                                </div>
                                <div class="p-2 flex-grow-1 bd-highlight">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu.vue';
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

<style scoped></style>