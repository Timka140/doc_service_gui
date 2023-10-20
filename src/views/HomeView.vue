<script>
import LeftMenu from '@/components/menu/LeftMenu.vue';
import { wsStore } from "@/stores/ws"
import Chart from 'chart.js/auto';

export default {
  name: "DocxServicesView",
  setup() {
    let ws = wsStore();

    return {
      ws,
    }
  },
  data() {
    return {
      charts: [],
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    Send() {
      this.ws.Send({
        tp: "test",
        data: "data",
      })
    },
    setChart(e) {
      if (!e) {
        return
      }
      this.charts.push(e);
    },
    renderChart() {
      const data = [];
      const data2 = [];
      let prev = 100;
      let prev2 = 80;
      for (let i = 0; i < 1000; i++) {
        prev += 5 - Math.random() * 10;
        data.push({ x: i, y: prev });
        prev2 += 5 - Math.random() * 10;
        data2.push({ x: i, y: prev2 });
      }

      const chartOptions = {
        animation: {
          duration: 0
        },
        interaction: {
          intersect: false
        },
        plugins: {
          legend: false,
          title: {
            display: true,
            text: () => "cpu"
          }
        },
        scales: {
          x: {
            type: 'linear'
          }
        }
      };

      for (let chart of this.charts) {
        const ctx = chart.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              // borderColor: Utils.CHART_COLORS.red,
              borderWidth: 1,
              radius: 0,
              data: data,
            },
            {
              // borderColor: Utils.CHART_COLORS.blue,
              borderWidth: 1,
              radius: 0,
              data: data2,
            }]
          },
          options: chartOptions,
        });
      }
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
        <h1 class="mb-4">Главная</h1>
        <div class="row mb-4">
          <div class="col-md-4">

            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black">
                    <font-awesome-icon icon="fa-file-word" /> 0
                  </h1>
                  <small class="text-muted">Сервисы формирования документов</small>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-4">

            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black"><font-awesome-icon icon="fa-solid fa-file-excel" /> 0</h1>
                  <small class="text-muted">Сервисы формирования таблиц</small>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-4">

            <div class="card p-3">
              <div class="box-content-big text-center">
                <div class="m-sm">
                  <h1 class="no-margins text-black"><font-awesome-icon icon="fa-solid fa-file-pdf" /> 0
                  </h1>
                  <small class="text-muted">Сервисы формирования PDF</small>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4">

            <div class="card p-3">
              <canvas :ref="setChart"></canvas>
            </div>

          </div>

          <div class="col-md-4">

            <div class="card p-3">
              <canvas :ref="setChart"></canvas>
            </div>

          </div>
          <div class="col-md-4">

            <div class="card p-3">
              <canvas :ref="setChart"></canvas>
            </div>

          </div>

        </div>

        <div class="row mb-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Список клиентов</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 50px;">#</th>
                      <th scope="col" style="width: 300px;">Pid</th>
                      <th scope="col" style="width: 300px;">Имя</th>
                      <th scope="col">Комментарий</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
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
