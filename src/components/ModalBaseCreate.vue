<template>
    <div class="modal fade" :id="this.idModal" tabindex="-1" :aria-labelledby="this.idModal + 'Label'" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="this.idModal + 'Label'">Создать соединение с базой данных</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Адрес базы данных</label>
                        <input type="text" class="form-control" placeholder="localhost:5432">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Название базы</label>
                        <input type="text" class="form-control" placeholder="local">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Пользователь</label>
                        <input type="text" class="form-control" placeholder="User">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Пароль</label>
                        <input type="password" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><font-awesome-icon
                            icon="fa-solid fa-xmark" /></button>
                    <button type="button" class="btn btn-success"><font-awesome-icon icon="fa-solid fa-check" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalBaseCreate",
    props: {
        idModal: String,
    },
    setup() {

    },
    data() {
        return {
            
        }
    },
}
</script>

<style></style>