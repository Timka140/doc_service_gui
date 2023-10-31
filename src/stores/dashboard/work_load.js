import Chart from "chart.js/auto";

class WorkLoad {
  chart = {};
  ctx = {};
  iteration = 0;

  data = [{ x: 0, y: 0 }];

  constructor(id) {
    let th = this;
    
    let canvas = document.getElementById(id);
      if (!canvas) {
        return
    }

    th.ctx = canvas.getContext("2d");

    let options = {
      animation: {
        duration: 0,
      },
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: () => "Запросов в секунду",
        },
      },
      scales: {
        x: {
          type: "linear",
        },
      },
    };

    th.chart = new Chart(th.ctx, {
      type: "line",
      data: {
        datasets: [
          {
            // borderColor: "red",
            borderWidth: 1,
            radius: 0,
            data: th.data,
          },
        ],
      },
      options: options,
    });

    setInterval(() => {
      if (th.chart == undefined) return;
      th.chart.update();
    }, 2000);

    window.addEventListener('resize', () => {
      if (th.chart == undefined) return;
      th.chart.resize();
    });
    
  }

  Tick(val) {
    // 86400 - 24 часа
    let th = this;
    th.chart.data.datasets.forEach((dataset) => {
      let l = dataset.data.length;
      if (l > 86400) {
        dataset.data.shift();
      }

      dataset.data.push({ x: l, y: val });
    });
    th.iteration++
  }
  Data() {
    const data = [];
    let prev = 100;
    for (let i = 0; i < 1000; i++) {
      prev += 5 - Math.random() * 10;
      data.push({ x: i, y: prev });
    }
  }
}

export default WorkLoad;
