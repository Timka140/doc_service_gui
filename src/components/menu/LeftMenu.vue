<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <div class="d-flex flex-column flex-shrink-0" style="width: 280px; height: 100vh;">
        <div class="left-menu p-3 text-white bg-dark" style="width: 280px; height: 100vh;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">DocService</span>
            </a>
            <hr>
            <ul v-for="(item, index) in links" :key="index" class="nav nav-pills flex-column mb-auto">
                <li v-if="item.tp == 'item'" class="nav-item">
                    <RouterLink :to="item.to" class="nav-link"
                        :class="{ 'active': item.selected, 'text-white': !item.selected }" aria-current="page">
                        {{ item.name }}
                    </RouterLink>
                </li>
                <li v-if="item.tp == 'items'" class="mb-1">
                    <button class="btn btn-toggle align-items-center rounded collapsed text-white" data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse" aria-expanded="false">
                        <font-awesome-icon icon="fa-solid fa-caret-down" /> {{ item.name }}
                    </button>
                    <div class="collapse show" id="dashboard-collapse">
                        <ul v-for="(child_item, child_index) in item.links" :key="child_index"
                            class="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                            <li>
                                <RouterLink :to="child_item.to" class="nav-link"
                                    :class="{ 'active': child_item.selected, 'text-white': !child_item.selected }">
                                    {{ child_item.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <hr>
            <div class="dropdown">
                <small>Демонстрационный проект</small>
            </div>
        </div>
    </div>
</template>

<script>
import { wsStore } from "@/stores/ws";
import { useRoute } from 'vue-router';


export default {
    name: "LeftMenu",
    setup() {
        // const route = useRoute();
        let ws = wsStore();
        return {
            ws,
        }
    },
    data() {
        return {
            route: useRoute(),
            links: [
                {
                    tp: "item",
                    to: "/gui/",
                    name: "Главная",
                    selected: false,
                },
                {
                    tp: "item",
                    to: "/gui/settings",
                    name: "Настройки",
                    selected: false,
                },
                // {
                //     tp: "item",
                //     to: "/gui/processes",
                //     name: "Локальные процессы",
                //     selected: false,
                // },
                {
                    tp: "item",
                    to: "/gui/templates/list",
                    name: "Шаблоны",
                    selected: false,
                },
                // {
                //     tp: "items",
                //     name: "Шаблоны",
                //     links: [
                //         {
                //             to: "/gui/templates/docx",
                //             name: "Docx",
                //             selected: false,
                //         },
                //         {
                //             to: "/gui/templates/xlsx",
                //             name: "Xlsx",
                //             selected: false,
                //         },
                //     ]
                // },
                {
                    tp: "items",
                    name: "Микросервисы",
                    links: [
                        {
                            to: "/gui/services/docx",
                            name: "Docx",
                            selected: false,
                        },
                        // {
                        //     to: "/gui/services/xlsx",
                        //     name: "Xlsx",
                        //     selected: false,
                        // },
                        {
                            to: "/gui/services/pdf",
                            name: "Pdf",
                            selected: false,
                        }
                    ]
                },
            ],
        }
    },

    close() {

    },
    unmounted() {

    },
    created() {
        // this.docx.Init();
        this.SetActive();
    },

    methods: {
        SetActive() {
            let path = this.route.path;
            for (let item of this.links) {
                if (item.to == path) {
                    item.selected = true;
                }
                if (item.tp == "items") {
                    for (let child_item of item.links) {
                        if (child_item.to == path) {
                            child_item.selected = true;
                        }
                    }

                }
            }
        },
        Send() {
            // this.ws.Send({
            //     tp: "test",
            //     data: "data",
            // })
            console.log("Проверка")
        },
    },
    components: {

    },
}
</script>

<style scoped>
.left-menu {
    position: fixed;
}
</style>