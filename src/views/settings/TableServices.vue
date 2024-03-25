<script>
import { wsStore } from "@/stores/ws"
import { settingsServicesStore } from '@/stores/settings/services';

export default {
    name: "TableServices",
    setup() {
        let ws = wsStore();
        let services = settingsServicesStore();
        return {
            ws,
            services,
        }
    },
    data() {
        return {
        };
    },
    computed: {
    },
    mounted() {
        this.services.Init()
    },

    methods: {
    },
    components: {

    },
}
</script>

<template>
    <div>
        <h2 class="mb-4">Список сервисов</h2>
        <div class="card mb-4 p-2">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex bd-highlight">
                        <div class="p-2 bd-highlight">
                            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div class="input-group me-2">
                                    <button type="button" class="btn btn-primary" @click="services.ShowName(true)"
                                        data-bs-toggle="modal" data-bs-target="#servicesModal"><font-awesome-icon
                                            icon="fa-solid fa-plus" /></button>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 flex-grow-1 bd-highlight"></div>
                        <div class="p-2 bd-highlight">
                            <div class="input-group">
                                <button type="button" class="btn btn-primary" title="Поиск"><font-awesome-icon
                                        icon="fa-solid fa-magnifying-glass" /></button>
                                <input type="text" class="form-control" placeholder="Поиск"
                                    aria-label="Input group example">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div ref="tableContainer">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 50px;">ID</th>
                                <th scope="col" style="width: 50px;">Логин</th>
                                <th scope="col">Комментарий</th>
                            </tr>
                        </thead>
                        <tbody v-if="services.EmptyTableL">
                            <tr>
                                <td colspan="3">Записей нет</td>
                            </tr>
                        </tbody>
                        <tbody v-if="!services.EmptyTableL">
                            <tr v-for="(item, index) in services.ShowData" :key="index">
                                <td>{{ item.Id }}</td>
                                <td><span class="link-primary pointer" @click="services.ShowName(false, item.Id)"
                                        data-bs-toggle="modal" data-bs-target="#servicesModal">{{ item.Name }}</span></td>
                                <td>{{ item.Comment }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex bd-highlight">
                        <div class="p-2 bd-highlight">
                            <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                            </div>

                        </div>
                        <div class="p-2 flex-grow-1 bd-highlight"></div>
                        <div class="p-2 bd-highlight">
                            <div class="input-group me-2">
                                <button type="button" @click="services.PrevPage" class="btn btn-primary"
                                    title="Предыдущая страница"><font-awesome-icon
                                        icon="fa-solid fa-chevron-left" /></button>
                                <input type="number" style="width: 70px;" @change="services.SetPage($event.target)"
                                    class="form-control table-number" :value="services.Page" min="1" step="1"
                                    :max="services.MaxPage" aria-label="Input group example">
                                <button type="button" @click="services.NextPage" class="btn btn-primary"
                                    title="Следующая страница"><font-awesome-icon
                                        icon="fa-solid fa-chevron-right" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.table-number {
    text-align: center;
    appearance: textfield;
}
.pointer {
    cursor: pointer;
}
</style>