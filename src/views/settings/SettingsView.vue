<script>
// import { ref, onMounted } from 'vue';
import LeftMenu from '@/components/menu/LeftMenu.vue';
import TopMenu from '@/components/menu/TopMenu.vue';

import UserModal from './UserModal.vue';
import TableUsers from './TableUsers.vue';
import TableServices from './TableServices.vue'
import ServiceModal from './ServiceModal.vue';

import { wsStore } from "@/stores/ws"
import { authStore } from "@/stores/auth"
import { settingsUsersStore } from '@/stores/settings/users';


export default {
    name: "SettingsPage",
    setup() {
        let ws = wsStore();
        let users = settingsUsersStore();
        let auth = authStore();
        return {
            ws,
            users,
            auth,
        }
    },
    data() {
        return {
        };
    },
    computed: {
    },
    mounted() {
    },

    methods: {
    },
    components: {
        LeftMenu,
        UserModal,
        TableUsers,
        TableServices,
        ServiceModal,
        TopMenu,
    },
}
</script>


<template>
    <div class="d-flex bd-highlight" style="height: 100vh;">
        <div class="bd-highlight">
            <LeftMenu />
        </div>
        <div class="flex-fill bd-highlight b-site">
            <TopMenu/>
            <main v-if="this.auth.Rights.administrator" class="container-fluid mt-2">
                <div class="row">
                    <div class="col-xl-6 col-lg-12">
                        <TableUsers/>
                    </div>
                    <div class="col-xl-6 col-lg-12">
                        <TableServices/>
                    </div>
                </div>
            </main>
            <main v-else class="container-fluid mt-2">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <TableServices/>
                    </div>
                </div>
            </main>
        </div>
        <UserModal />
        <ServiceModal />
    </div>
</template>

<style scoped>

</style>