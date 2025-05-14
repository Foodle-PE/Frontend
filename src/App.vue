<template>
  <div class="app-layout">
    <sidebar />
    <div class="main-content">
      <header-bar />

      <div class="charts-wrapper">
        <chart-box
          title="Temperature"
          :data="temperature"
          :alert="Math.max(...temperature) > 25"
        />
        <chart-box
          title="Gas Levels"
          :data="gas"
          :alert="Math.max(...gas) > 40"
        />

        <!-- GRÁFICOS PERSONALIZADOS -->
        <chart-box
          v-for="(chart, index) in customCharts"
          :key="index"
          :title="chart.title"
          :data="chart.data"
          :alert="Math.max(...chart.data) > 40"
        />

        <input-box @create-graph="crearGrafico" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sensors/components/sidebar.component.vue'
import HeaderBar from './Sensors/components/header.component.vue'
import ChartBox from './Sensors/components/chart-box.component.vue'
import InputBox from './Sensors/components/input-box.component.vue'

import { getTemperatureData, getGasLevels } from './Sensors/services/sensor.service.js'

export default {
  components: {
    Sidebar,
    HeaderBar,
    ChartBox,
    InputBox
  },
  data() {
    return {
      temperature: [],
      gas: [],
      customCharts: [] // para gráficos nuevos
    }
  },
  async mounted() {
    this.temperature = await getTemperatureData()
    this.gas = await getGasLevels()
  },
  methods: {
    crearGrafico(nombre) {
      const ubicaciones = ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'Jesús María']
      const datos = ubicaciones.map(() => Math.floor(Math.random() * 50) + 10)

      this.customCharts.push({
        title: `${nombre}`,
        data: datos
      })
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Inter', sans-serif;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.charts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>
