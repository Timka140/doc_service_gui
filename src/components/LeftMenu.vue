<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px; height: 100vh;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">DocService</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink to="/gui/" class="nav-link active" aria-current="page">
                    Главная
                </RouterLink>
            </li>
            <li class="mb-1">
                <button class="btn btn-toggle align-items-center rounded collapsed text-white" data-bs-toggle="collapse"
                    data-bs-target="#dashboard-collapse" aria-expanded="false">
                    Микросервисы
                </button>
                <div class="collapse show" id="dashboard-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                        <li>
                            <RouterLink to="/gui/services/docx" class="nav-link text-white">
                                Docx
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    Orders
                </a>
            </li>
        </ul>
        <hr>
        <div class="dropdown">
            <small>Демонстрационный проект</small>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>