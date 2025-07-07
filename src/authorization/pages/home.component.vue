<template>
  <div class="app-layout">
    <div class="main-content">
      <div class="charts-wrapper">
        <chart-box
            :title="t('sensors.temperature')"
            :data="temperature"
            :alert="Math.max(...temperature) > 25"
        />
        <chart-box
            :title="t('sensors.gasLevels')"
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

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTemperatureData, getGasLevels } from '/src/Sensors/services/sensor.service.js'
import ChartBox from '/src/Sensors/components/chart-box.component.vue'
import InputBox from '/src/Sensors/components/input-box.component.vue'
import { useAuthenticationStore } from '/src/authorization/services/authentication.store.js'

const { t } = useI18n()

const temperature = ref([])
const gas = ref([])
const customCharts = ref([])

onMounted(async () => {
  temperature.value = await getTemperatureData()
  gas.value = await getGasLevels()
})

function logout() {
  const authStore = useAuthenticationStore()
  authStore.signOut(this.$router)
}

function crearGrafico(nombre) {
  const ubicaciones = ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'Jesús María']
  const datos = ubicaciones.map(() => Math.floor(Math.random() * 50) + 10)

  customCharts.value.push({
    title: t('sensors.customChart', { name: nombre }),
    data: datos
  })
}
</script>


<style scoped>

</style>
