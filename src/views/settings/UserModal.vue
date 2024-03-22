<script>

import { wsStore } from "@/stores/ws"
import { settingsUsersStore } from '@/stores/settings/users';

export default {
    name: "UserModal",
    setup() {
        let ws = wsStore();
        let users = settingsUsersStore();
        return {
            ws,
            users,
        }
    },
}
</script>

<template>
    <div class="modal" id="usersModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="users.AddUser">Добавление пользователя</h5>
                    <h5 class="modal-title" v-if="!users.AddUser">Настройки пользователя</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <div v-if="users.AddUser">
                            <label for="userLogin" class="form-label">Логин</label>
                            <input type="text" v-model="users.user.login" @input="users.CheckLogin"
                                :class="{ 'form-control': true, 'is-invalid': users.LoginVerification == 1, 'is-valid': users.LoginVerification == 2 }"
                                id="userLogin">
                        </div>
                        <label for="userPassword" class="form-label">Пароль</label>
                        <input type="text" placeholder="Введите новый пароль" v-model="users.user.password"
                            class="form-control" id="userPassword">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Права пользователя</label>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="users.user.rights.administrator"
                                        type="checkbox" id="flexSwitchCheckDisabled">
                                    <label class="form-check-label" for="flexSwitchCheckDisabled">Администратор</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="users.user.rights.guest" type="checkbox"
                                        id="flexSwitchCheckDefault">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">Гость</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="users.user.rights.creatingTemplate"
                                        type="checkbox" id="flexSwitchCheckChecked">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Создание
                                        шаблонов</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="users.user.rights.updatingTemplate"
                                        type="checkbox" id="flexSwitchCheckDisabled">
                                    <label class="form-check-label" for="flexSwitchCheckDisabled">Обновление
                                        шаблона</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" v-model="users.user.comment" placeholder="Введите комментарий"
                            style="height: 100px"></textarea>
                        <label for="floatingTextarea2">Комментарий</label>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Сохранить</button> -->
                </div>
                <div class="modal-footer">
                    <div v-if="users.AddUser">
                        <button type="button" @click="users.CreateUser" class="btn btn-primary"
                        data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-plus"/> Создать</button>
                    </div>
                   
                    <div v-if="!users.AddUser">
                        <button class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteUser"><font-awesome-icon icon="fa-solid fa-trash" /> Удалить</button>
                        <button type="button"  @click="users.EditUser" class="btn btn-primary"
                            data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-save" /> Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="deleteUser" tabindex="-2" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Удаление пользователя</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span>Удалить пользователя <strong>{{ users.UserLogin }}</strong></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon icon="fa-solid fa-close" /> Закрыть</button>
                    <button type="button" @click="users.RemoveUser" data-bs-dismiss="modal" class="btn btn-danger"><font-awesome-icon icon="fa-solid fa-trash" /> Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>