<script>
import LeftMenu from '@/components/menu/LeftMenu.vue';
import { wsStore } from "@/stores/ws";
import { useRoute } from 'vue-router';
import { templatesListStore } from '@/stores/templates/templates_list';


import ModalCatalogCreate from '@/components/modals/template/ModalCatalogCreate.vue';
import ModalTemplateCreate from '@/components/modals/template/ModalTemplateCreate.vue';
import BreadcrumbMenu from '@/components/menu/BreadcrumbMenu.vue';

export default {
    name: "TemplatesListView",
    setup() {
        const route = useRoute();
        const tmp = templatesListStore();
        let ws = wsStore();
        return {
            ws,
            route,
            tmp: tmp,
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
        this.tmp.Init();
        // console.log(this.route.path)
    },

    methods: {
        SetActive(e) {
            console.log(e)
        },
    },
    components: {
        LeftMenu,

        ModalCatalogCreate,
        ModalTemplateCreate,
        BreadcrumbMenu,
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
                <h1 class="mb-4">Список шаблонов</h1>
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 bd-highlight">
                                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group me-4" role="group">
                                                <button type="button" @click="tmp.Remove()" :disabled="tmp.DisableDeleteAll" class="btn btn-danger"><font-awesome-icon
                                                        icon="fa-solid fa-trash" /></button>
                                            </div>
                                            <!-- <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modalBaseCreate"><font-awesome-icon
                                                        icon="fa-solid fa-database" /></button>
                                            </div> -->
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modalCatalogCreate"><font-awesome-icon
                                                        icon="fa-solid fa-folder-plus" /></button>
                                            </div>
                                            <div class="input-group me-2">
                                                <button type="button" class="btn btn-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalTemplateCreate"><font-awesome-icon
                                                        icon="fa-solid fa-file-import" /></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight"></div>
                                    <div class="p-2 bd-highlight">
                                        <div class="input-group">
                                            <button type="button" class="btn btn-primary" title="Поиск"><font-awesome-icon
                                                    icon="fa-solid fa-magnifying-glass" /></button>
                                            <input type="text" class="form-control" placeholder="Введите название"
                                                aria-label="Input group example">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <BreadcrumbMenu :items="tmp.Path" :open="tmp.OpenToPath"/>
                        </div>
                        <div class="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" :checked="tmp.CheckAll">
                                            </div>
                                        </th>
                                        <th scope="col" style="width: 50px;">
                                            <span>№</span>
                                        </th>
                                        <th scope="col" style="width: 50px;"></th>
                                        <th scope="col">Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in tmp.Data" :key="item.Pid">
                                        <th>
                                            <div class="form-check">
                                                <input class="form-check-input"
                                                    :checked="item.select" @change="tmp.SelectRow($event, index)" type="checkbox" value="" id="flexCheckDefault">
                                            </div>
                                        </th>
                                        <td>{{ item.index }}</td>
                                        <td>
                                            <font-awesome-icon v-if="item.Tp == 1" icon="fa-solid fa-database" />
                                            <font-awesome-icon v-if="item.Tp == 2" icon="fa-solid fa-folder" />
                                            <font-awesome-icon v-if="item.Tp == 3" icon="fa-solid fa-file" />
                                        </td>
                                        <td class="catalog-hover" @dblclick="tmp.Open(item)">{{ item.Name }}</td>
                                    </tr>
                                    <tr v-if="tmp.Data.length == 0">
                                        <td colspan="4">Пусто</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <!-- <ModalBaseCreate :idModal="'modalBaseCreate'" /> -->
            <ModalCatalogCreate :idModal="'modalCatalogCreate'" />
            <ModalTemplateCreate :idModal="'modalTemplateCreate'" />
        </div>
    </div>
</template>

<style scoped>
table {
    -youbkit-touch-callout: none;
    /* Сафари для iOS */
    -youbkit-user-select: none;
    /* Chrome 6.0+, Safari 3.1+, Edge и Opera 15+ */
    -moz-user-select: none;
    /* Fire Fox */
    -ms-user-select: none;
    /* IE 10+ и Edge */
    user-select: none;
    /* Версия без префикса, в настоящее время поддерживается Chrome и Opera */
}

.catalog-hover:hover {
    background: #eee;
    cursor: pointer;
}
</style>