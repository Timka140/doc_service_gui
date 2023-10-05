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
                                    <tr>
                                        <th>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                            </div>
                                        </th>
                                        <td></td>
                                        <td></td>
                                        <td scope="row"></td>
                                    </tr>
                                </tbody>
                            </table>
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


export default {
    name: "ProcessesView",
    setup() {
        let ws = wsStore();
        return {
            ws,
        }
    },
    data() {
        return {
            quantity_services: 1,
            login: "",
            password: "",
        }
    },

    close() {

    },
    unmounted() {

    },
    created() {
        // this.docx.Init();
    },

    methods: {
        Send() {
            // this.ws.Send({
            //     tp: "test",
            //     data: "data",
            // })
            console.log("Проверка")
        },
    },
    components: {
        LeftMenu,
    },
}
</script>

<style scoped></style>