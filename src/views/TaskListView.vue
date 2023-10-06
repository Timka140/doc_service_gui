<template>
    <div class="d-flex bd-highlight" style="height: 100vh;">
        <div class="bd-highlight">
            <LeftMenu />
        </div>
        <div class="flex-fill bd-highlight b-site">
            <main class="container-fluid mt-2">
                <h1 class="mb-4">Список процессов</h1>
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 bd-highlight">
                                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group me-4" role="group">
                                                <button type="button" class="btn btn-danger"><font-awesome-icon
                                                        icon="fa-solid fa-trash" /></button>
                                            </div>
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modalBaseCreate"><font-awesome-icon
                                                        icon="fa-solid fa-database" /></button>
                                            </div>
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modalCatalogCreate"><font-awesome-icon
                                                        icon="fa-solid fa-folder-plus" /></button>
                                            </div>
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modalTemplateCreate"><font-awesome-icon
                                                        icon="fa-solid fa-file-import" /></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight"></div>
                                    <div class="p-2 bd-highlight">
                                        <div class="input-group">
                                            <button type="button" class="btn btn-primary"
                                                title="Запускает указанное число микро сервисов"><font-awesome-icon
                                                    icon="fa-solid fa-magnifying-glass" /></button>
                                            <input type="text" class="form-control" placeholder="Введите название"
                                                aria-label="Input group example">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox">
                                            </div>
                                        </th>
                                        <th scope="col" style="width: 50px;">
                                            <span>№</span>
                                        </th>
                                        <th scope="col" style="width: 300px;">Статус</th>
                                        <th scope="col">Pid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in tasks.Data" :key="item.Pid">
                                        <th>
                                            <div class="form-check">
                                                <input class="form-check-input" @change="tasks.SelectRow($event, item.Pid)"
                                                    :checked="item.select" type="checkbox" value="" id="flexCheckDefault">
                                            </div>
                                        </th>
                                        <td>{{ item.index }}</td>
                                        <td><strong v-if="item.Online">Работает</strong><strong v-else>Остановлен</strong>
                                        </td>
                                        <td scope="row">{{ item.Pid }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <ModalBaseCreate :idModal="'modalBaseCreate'" />
            <ModalCatalogCreate :idModal="'modalCatalogCreate'" />
            <ModalFileCreate :idModal="'modalTemplateCreate'" />
        </div>
    </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu.vue';
import { wsStore } from "@/stores/ws";
import { useRoute } from 'vue-router';
import {taskListStore} from '@/stores/tasks/task_list'

import ModalBaseCreate from '@/components/ModalBaseCreate.vue';
import ModalCatalogCreate from '@/components/ModalCatalogCreate.vue';
import ModalFileCreate from '@/components/ModalFileCreate.vue';

export default {
    name: "TaskListView",
    setup() {
        const route = useRoute();
        const tasks = taskListStore();
        let ws = wsStore();
        return {
            ws,
            route,
            tasks,
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
        // this.tasks.Init();
        // console.log(this.route.path)
    },

    methods: {
        SetActive(e) {
            console.log(e)
        },
    },
    components: {
        LeftMenu,
        ModalBaseCreate,
        ModalCatalogCreate,
        ModalFileCreate,
    },
}
</script>

<style scoped></style>