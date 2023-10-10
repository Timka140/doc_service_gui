<script>
import LeftMenu from '@/components/LeftMenu.vue';
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
      login: "",
      password: "",
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
    renderChart() {
      const data = [];
      const data2 = [];
      let prev = 100;
      let prev2 = 80;
      for (let i = 0; i < 1000; i++) {
        prev += 5 - Math.random() * 10;
        data.push({x: i, y: prev});
        prev2 += 5 - Math.random() * 10;
        data2.push({x: i, y: prev2});
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

      const ctx = this.$refs.chart.getContext('2d');
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
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <canvas ref="chart"></canvas>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
