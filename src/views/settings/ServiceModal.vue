<script>
import { wsStore } from "@/stores/ws"
import { settingsServicesStore } from '@/stores/settings/services';

export default {
    name: "ServiceModal",
    setup() {
        let ws = wsStore();
        let services = settingsServicesStore();
        return {
            ws,
            services,
        }
    },
}
</script>

<template>
    <div class="modal" id="servicesModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="services.AddService">Добавление сервиса</h5>
                    <h5 class="modal-title" v-if="!services.AddService">Настройки сервиса</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <div v-if="services.AddService">
                            <label for="servicesName" class="form-label">Название</label>
                            <input type="text" v-model="services.service.name" @input="services.CheckLogin"
                                placeholder="Введите название сервиса"
                                :class="{ 'form-control': true, 'is-invalid': services.NameVerification == 1, 'is-valid': services.NameVerification == 2 }"
                                id="servicesName">
                        </div>
                        <div v-if="!services.AddService">
                            <label for="servicesName" class="form-label">Название</label>
                            <p class="fw-bold">{{ services.service.name }}</p>
                            <label for="" class="form-label">Ключа авторизации</label>
                            <p class="fw-bold">{{ services.ServiceKey }}</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" v-model="services.service.state" type="checkbox"
                                id="servicesState">
                            <label class="form-check-label" for="servicesState">Активен</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Права</label>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="services.service.rights.docx"
                                        type="checkbox" id="flexSwitchCheckDisabled">
                                    <label class="form-check-label" for="flexSwitchCheckDisabled">Генерация docx</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="services.service.rights.pdf"
                                        type="checkbox" id="flexSwitchCheckChecked">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Конвертация в
                                        PDF</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" v-model="services.service.comment"
                            placeholder="Введите комментарий" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">Комментарий</label>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Сохранить</button> -->
                </div>
                <div class="modal-footer">
                    <div v-if="services.AddService">
                        <button type="button" @click="services.CreateUser" class="btn btn-primary"
                            data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-plus" /> Создать</button>
                    </div>

                    <div v-if="!services.AddService">
                        <button class="btn btn-danger me-2" data-bs-toggle="modal"
                            data-bs-target="#deleteService"><font-awesome-icon icon="fa-solid fa-trash" /> Удалить</button>
                        <button type="button" @click="services.EditUser" class="btn btn-primary"
                            data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-save" /> Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="deleteService" tabindex="-2" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Удаление сервиса</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span>Удалить сервис <strong>{{ services.ServiceName }}</strong></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon
                            icon="fa-solid fa-close" /> Закрыть</button>
                    <button type="button" @click="services.RemoveUser" data-bs-dismiss="modal"
                        class="btn btn-danger"><font-awesome-icon icon="fa-solid fa-trash" /> Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>