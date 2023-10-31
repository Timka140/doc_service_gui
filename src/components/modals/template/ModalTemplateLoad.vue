<template>
    <div class="modal fade" :id="this.idModal" tabindex="-1" :aria-labelledby="this.idModal + 'Label'" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="this.idModal + 'Label'">Загрузить шаблон</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Файл для загрузки в базу</label>
                        <input class="form-control" type="file" id="template_form">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><font-awesome-icon
                            icon="fa-solid fa-xmark" /></button>
                    <button type="button" data-bs-dismiss="modal" @click="Send()" class="btn btn-success"><font-awesome-icon
                            icon="fa-solid fa-check" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { templateLocalStore } from '@/stores/templates/template';

export default {

    name: "ModalTemplateLoad",
    props: {
        idModal: String,
    },
    setup() {
        const temp = templateLocalStore();

        return {
            temp: temp,
        }
    },
    data() {
        return {
            template_info: {
                name: "",
            }
        }
    },
    methods: {
        Send() {
            this.temp.CreateTemplate(this.template_info)
        }
    },
}
</script>

<style></style>