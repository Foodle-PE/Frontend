<template>
  <div class="chart-box" :class="{ alert: alert }">
    <div class="chart-header">
      <div class="title">{{ title }}</div>
      <span v-if="alert" class="alert-badge">⚠ Alerta</span>
    </div>
    <component
        :is="chartType"
        :data="chartData"
        :options="chartOptions"
        class="chart-container"
    />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale
)

// aca agregas tmb si quieres y ya
const DISTRITOS_LIMA = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

export default {
  name: 'ChartBox',
  components: {
    Bar,
    Line
  },
  props: {
    title: String,
    data: Array,
    alert: Boolean
  },
  computed: {
    chartType() {
      return this.title.includes('Temp') ? 'Line' : 'Bar'
    },
    chartData() {
      // Colores para los gráficos
      const temperatureColors = {
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderColor: 'rgba(53, 162, 235, 0.8)',
      }

      const gasColors = {
        backgroundColor: this.data.map(value =>
            value > 500 ? 'rgba(255, 99, 132, 0.8)' : // Rojo para valores altos
                value > 200 ? 'rgba(255, 159, 64, 0.8)' : // Naranja para valores moderados
                    'rgba(75, 192, 192, 0.8)' // Verde para valores bajos
        ),
        borderColor: 'rgba(54, 54, 54, 0.2)'
      }

      // Usar solo tantos distritos como datos tengamos
      const distritos = DISTRITOS_LIMA.slice(0, this.data.length)

      const colors = this.title.includes('Temp') ? temperatureColors : gasColors

      return {
        labels: distritos.map(distrito => distrito),
        datasets: [
          {
            label: this.title,
            data: this.data,
            ...colors,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: this.title.includes('Temp') ? 'rgba(53, 162, 235, 1)' : undefined,
            pointRadius: this.title.includes('Temp') ? 4 : undefined,
            pointHoverRadius: this.title.includes('Temp') ? 6 : undefined,
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            ticks: {
              color: 'rgba(0, 0, 0, 0.7)',
              font: {
                weight: 'bold'
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(0, 0, 0, 0.7)',
              font: {
                weight: 'bold'
              },
              maxRotation: 45,
              minRotation: 45
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (context) => {
                const value = context.raw;
                if (this.title.includes('Temp')) {
                  return `${value}°C`;
                } else {
                  return `${value} µg/m³`;
                }
              }
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-box {
  background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
  border-radius: 12px;
  padding: 1.2rem;
  height: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.chart-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.chart-box.alert {
  background: linear-gradient(135deg, #ffb347 0%, #ff8c42 100%);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.25);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  color: #333;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
}

.alert-badge {
  background-color: #ff4757;
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  box-shadow: 0 2px 4px rgba(255, 71, 87, 0.3);
  animation: pulse 2s infinite;
}

.chart-container {
  height: calc(100% - 40px) !important;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .chart-box {
    height: 220px;
    padding: 1rem;
  }

  .title {
    font-size: 1.1rem;
  }
}
</style>