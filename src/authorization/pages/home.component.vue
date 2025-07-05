<template>
  <div class="app-layout">
    <div class="main-content">
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
import ChartBox from '/src/Sensors/components/chart-box.component.vue'
import InputBox from '/src/Sensors/components/input-box.component.vue'

import { getTemperatureData, getGasLevels } from '/src/Sensors/services/sensor.service.js'
export default {
  name: 'HomeView',
  components: {
    ChartBox,
    InputBox
  },
  data() {
    return {
      temperature: [],
      gas: [],
      customCharts: []
    }
  },
  async mounted() {
    this.temperature = await getTemperatureData()
    this.gas = await getGasLevels()
  },
  methods: {
    logout() {
      const authStore = useAuthenticationStore();
      authStore.signOut(this.$router);
    },
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

import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js';
</script>

<style scoped>

</style>
