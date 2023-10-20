<template>
    <div class="modal fade" :id="this.idModal" tabindex="-1" :aria-labelledby="this.idModal + 'Label'" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="this.idModal + 'Label'">Создать каталога</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Название каталога</label>
                        <input type="text" v-model="this.catalog_info.name" class="form-control" placeholder="Введите название каталога">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><font-awesome-icon
                            icon="fa-solid fa-xmark" /></button>
                    <button type="button" data-bs-dismiss="modal" @click="temp.CreateCatalog(this.catalog_info)" class="btn btn-success"><font-awesome-icon icon="fa-solid fa-check" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { templatesListStore } from '@/stores/templates/templates_list';
export default {
    name: "ModalCatalogCreate",
    props: {
        idModal: String,
    },
    setup() {
        return {
            temp: templatesListStore(),
        }
    },
    data() {
        return {
            catalog_info: {
                name: "",     
            }
        }
    },
}
</script>

<style></style>