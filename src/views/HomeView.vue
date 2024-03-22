<script>
// import { ref, onMounted } from 'vue';
import LeftMenu from '@/components/menu/LeftMenu.vue';
import TopMenu from '@/components/menu/TopMenu.vue';
import { wsStore } from "@/stores/ws"
import { servicesStore } from '../stores/dashboard/services';


import { dashboardStore } from '@/stores/dashboard/dashboard';

export default {
  name: "DocxServicesView",
  setup() {
    let ws = wsStore();
    let dashboard = dashboardStore();
    let services = servicesStore();

    return {
      ws,
      dashboard,
      services,
    }
  },
  data() {
    return {
      charts: [],
    }
  },
  // updated(){
  //   this.$nextTick(function () {
  //   // Код, который будет запущен только после
  //   // переотрисовки всех представлений
  // })
  // },
  mounted() {
    this.dashboard.InitChart('docxChart', 'docx')
    this.dashboard.InitChart('xlsxChart', 'xlsx')
    this.dashboard.InitChart('pdfChart', 'pdf')

    this.dashboard.Init();
    // this.renderChart()
  },
  methods: {
    Send() {
      this.ws.Send({
        tp: "test",
        data: "data",
      })
    },
  },
  components: {
    LeftMenu,
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
      <TopMenu />
      <main class="container-fluid mt-2">
        <h1 class="mb-4">Главная</h1>
        <div class="row mb-4">

          <div class="col-md-6">
            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black">
                    <font-awesome-icon icon="fa-file-word" /> {{ dashboard.DocxLen }}
                  </h1>
                  <small class="text-muted">Сервисы формирования документов</small>
                </div>
              </div>
            </div>

          </div>

          <!-- <div class="col-md-4">

            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black"><font-awesome-icon icon="fa-solid fa-file-excel" /> {{ dashboard.XlsxLen }}</h1>
                  <small class="text-muted">Сервисы формирования таблиц</small>
                </div>
              </div>
            </div>

          </div> -->

          <div class="col-md-6">

            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black"><font-awesome-icon icon="fa-solid fa-file-pdf" /> {{ dashboard.PdfLen
                  }}
                  </h1>
                  <small class="text-muted">Сервисы формирования PDF</small>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="row mb-4">

          <div class="col-md-6">
            <div class="card p-3">
              <canvas id="docxChart"></canvas>
            </div>

          </div>

          <!-- <div class="col-md-4">
            <div class="card p-3">
              <canvas id="xlsxChart"></canvas>
            </div>
          </div> -->

          <div class="col-md-6">
            <div class="card p-3">
              <canvas id="pdfChart"></canvas>
            </div>

          </div>
        </div>

        <div class="row mb-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Сервисы инициаторы</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 50px;">
                        <span>№</span>
                      </th>
                      <th scope="col" style="width: 50px;">
                        <span>Пинг</span>
                      </th>
                      <th scope="col" style="width: 300px;">Название</th>
                      <th scope="col">Комментарий</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item) in services.Data" :key="item.id">
                      <td>{{ item.index }}</td>
                      <td>{{ item.ping }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.comment }}</td>
                    </tr>
                    <tr v-if="!services.Services">
                      <td colspan="4">Пусто</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
