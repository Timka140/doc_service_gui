<script>
import LeftMenu from '@/components/menu/LeftMenu.vue';
import ModalTemplateLoad from '@/components/modals/template/ModalTemplateLoad.vue';
import { wsStore } from "@/stores/ws";
import { templateLocalStore } from '@/stores/templates/template';
import {desktopStore} from "@/stores/desktop";

import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css"
import 'prismjs/components/prism-go.min.js'

export default {
    name: "TemplateView",
    setup() {
        let ws = wsStore();
        let tmp = templateLocalStore();
        let desktop = desktopStore();
        return {
            ws,
            desktop,
            tmp,
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
    },
    mounted() {
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
        Prism.highlightAll(); // highlight your code on mount
    },
    methods: {
        async CopyCode() {
            let text = document.getElementById('simpleCode').innerText;
            try {
                await navigator.clipboard.writeText(text);
                console.log('Content copied to clipboard');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        },
    },
    components: {
        LeftMenu,
        ModalTemplateLoad,
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

                <h2 class="mb-4">Шаблон: {{ tmp.TemplateName }}</h2>

                <div class="card mb-2">
                    <div class="card-header">
                        <div class="d-flex bd-highlight">
                            <div class="bd-highlight">
                                <h5 class="mt-2">Файл</h5>
                            </div>
                            <div class="flex-grow-1 bd-highlight"></div>
                            <div class="bd-highlight">
                                <button v-if="desktop.Desktop" class="btn btn-warning me-2" type="button" @click="tmp.OpenTemplate">
                                    <font-awesome-icon icon="fa-solid fa-file-pen" />
                                </button>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#upLoadTemplate" aria-expanded="false" aria-controls="upLoadTemplate">
                                    <font-awesome-icon icon="fa-solid fa-download" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div v-if="tmp.LoadFile">
                            <h5 class="card-title">{{ tmp.NameFile }}</h5>
                            <p class="card-text">Последнее обновление: <strong>{{ tmp.TmUpdate }}</strong></p>
                        </div>
                        <div v-if="!tmp.LoadFile">
                            <div class="alert alert-danger" role="alert">
                                <strong>Шаблон не загружен!</strong> загрузите шаблон.
                            </div>
                        </div>
                        <div class="collapse" id="upLoadTemplate">
                            <div class="col-12">
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">Файл для загрузки в базу</label>
                                    <input class="form-control" type="file"
                                        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        id="template_form">
                                </div>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary" @click="tmp.UpLoadFile()"
                                        type="button">Загрузить</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card text-center mb-2">
                    <div class="card-header">
                        <div class="d-flex bd-highlight">
                            <div class="bd-highlight">
                                Импорт шаблона в проект
                            </div>
                            <div class="flex-grow-1 bd-highlight"></div>
                            <div class="bd-highlight">
                                <button class="btn btn-success me-2" type="button" @click="this.CopyCode()">
                                    <font-awesome-icon icon="fa-solid fa-copy" />
                                </button>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#upCode" aria-expanded="false" aria-controls="upCode">
                                    <font-awesome-icon icon="fa-solid fa-angle-down" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="collapse" id="upCode">
                            <div class="col-12 code-container">
                                <pre class="code"><code class="language-go" id="simpleCode">res_docx, err := tr.DocxPerform("{{ tmp.TemplateID }}",
map[string]interface{}{
    "col_labels": []string{"fruit", "vegetable", "stone", "thing"},
    "tbl_contents": []interface{}{
        map[string]interface{}{"label": "yellow", "cols": []string{"banana", "capsicum", "pyrite", "taxi"}},
        map[string]interface{}{"label": "red", "cols": []string{"apple", "tomato", "cinnabar", "doubledecker"}},
        map[string]interface{}{"label": "green", "cols": []string{"guava", "cucumber", "aventurine", "card"}},
    },
})</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="card text-center mb-2">
                    <div class="card-header">
                        <div class="d-flex bd-highlight">
                            <div class="bd-highlight">
                                <ul class="nav nav-pills card-header-pills">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#">Active</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" href="#" tabindex="-1"
                                            aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex-grow-1 bd-highlight"></div>
                            <div class="bd-highlight">
                                <button class="btn btn-primary" type="button">
                                    <font-awesome-icon icon="fa-solid fa-floppy-disk" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Переменная</th>
                                    <th>Значение по умолчанию</th>
                                    <th style="width: 50px;">Обязательное поле</th>
                                    <th style="width: 50px;">Принудительно</th>
                                    <th style="width: 100px;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tmp.Data" :key="item.Pid">
                                    <td><input class="form-control" type="text" :value="index"></td>
                                    <td><input class="form-control" type="text"></td>
                                    <td>
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check mt-2">
                                            <input class="form-check-input" type="checkbox">
                                        </div>
                                    </td>
                                    <td><button type="button" name="deleteRow" class="btn btn-danger"><font-awesome-icon
                                                icon="fa-solid fa-trash" /></button></td>
                                </tr>
                                <tr v-if="tmp.Data.length == 0">
                                    <td colspan="5">Пусто</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div> -->

            </main>
        </div>
        <ModalTemplateLoad :idModal="'modalLoadTemplate'" />
    </div>
</template>

<style scoped>
.code-container {
    width: 100%;
    overflow-y: scroll;
    position: relative;
}

.code {
    position: relative;
    width: 100%;
    overflow-x: auto;
}
</style>