<script>
import LeftMenu from '@/components/menu/LeftMenu.vue';
import { wsStore } from "@/stores/ws";
// import { docxServicesStore } from '@/stores/services/docx_services';
import { pdfServicesStore } from '@/stores/services/pdf_services';

export default {
    name: "PdfServicesView",
    setup() {
        let ws = wsStore();
        let pdf = pdfServicesStore();
        return {
            ws,
            pdf: pdf,
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
        this.pdf.Init();
    },

    methods: {
        Send() {
            this.ws.Send({
                tp: "test",
                data: "data",
            })
            console.log("Проверка")
        },
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

                <h1 class="mb-4">Микросервисы PDF</h1>

                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 bd-highlight">
                                        <div class="btn-toolbar mb-3" role="toolbar"
                                            aria-label="Toolbar with button groups">
                                            <div class="input-group me-2">
                                                <button type="button" @click="pdf.StartServices(this.quantity_services)"
                                                    class="btn btn-success"
                                                    title="Запускает указанное число микро сервисов"><font-awesome-icon
                                                        icon="fa-solid fa-play" /></button>
                                                <input type="number" @change="this.quantity_services = $event.target.value"
                                                    class="form-control" value="1" min="1" step="1"
                                                    aria-label="Input group example">
                                            </div>
                                            <div class="btn-group me-2" role="group">
                                                <button type="button" @click="pdf.StopAllServices()"
                                                    :disabled="pdf.DisableStopAll"
                                                    class="btn btn-danger"><font-awesome-icon
                                                        icon="fa-solid fa-stop" /></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight"></div>
                                    <div class="p-2 bd-highlight">
                                        <button type="button" @click="pdf.Info()"
                                            class="btn btn-primary"><font-awesome-icon icon="fa-solid fa-rotate" /></button>
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
                                                <input class="form-check-input" @change="pdf.SelectAll($event)"
                                                    :checked="pdf.CheckAll" type="checkbox">
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
                                    <tr v-for="(item) in pdf.Data" :key="item.Pid">
                                        <th>
                                            <div class="form-check">
                                                <input class="form-check-input" @change="pdf.SelectRow($event, item.Pid)"
                                                    :checked="item.select" type="checkbox" value="" id="flexCheckDefault">
                                            </div>
                                        </th>
                                        <td>{{ item.index }}</td>
                                        <td><strong v-if="item.Online">Работает</strong><strong v-else>Остановлен</strong>
                                        </td>
                                        <td scope="row">{{ item.Pid }}</td>
                                    </tr>
                                    <tr v-if="!pdf.Services">
                                        <td colspan="4">Пусто</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
</div></template>

<style scoped></style>