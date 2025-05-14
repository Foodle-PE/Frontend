<template>
  <div class="alert-container">
    <h2>Alertas</h2>

    <button @click="toggleHistory" class="history-btn">
      {{ showHistory ? 'Ocultar historial' : 'Historial de alertas' }}
    </button>

    <div v-if="loading">Cargando alertas...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-if="!showHistory && alerts.length === 0 && !loading && !error" class="no-alerts">
      <div class="check-icon">✔️</div>
      <p>Ya no hay más alertas</p>
    </div>

    <div v-if="!showHistory" class="alert-cards">
      <div
          class="alert-card"
          v-for="alert in alerts"
          :key="alert.id"
          :class="alert.severity"
      >
        <h3>{{ alert.type.toUpperCase() }}</h3>
        <p>{{ alert.message }}</p>
        <small>Fecha: {{ alert.date }}</small>
        <div class="buttons">
          <button @click="showDetails(alert)">Más detalles</button>
          <button @click="closeAlert(alert)">Cerrar</button>
        </div>
      </div>
    </div>

    <div v-else class="history-cards">
      <div class="history-card">
        <h3>Historial de Alertas Cerradas</h3>
        <div v-if="closedAlerts.length === 0">
          <p>No hay alertas cerradas.</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="alert in closedAlerts" :key="alert.id">
              <strong>{{ alert.type.toUpperCase() }}</strong> - {{ alert.message }}
              <br />
              <small>{{ alert.date }}</small>
            </li>
          </ul>
        </div>
      </div>



    </div>

    <!-- Card emergente de detalles -->
    <div v-if="selectedAlert" class="modal-overlay" @click.self="selectedAlert = null">
      <div class="modal-card">
        <h2>Detalle de Alerta</h2>
        <p><strong>Tipo:</strong> {{ selectedAlert.type }}</p>
        <p><strong>Mensaje:</strong> {{ selectedAlert.message }}</p>
        <p><strong>Severidad:</strong> {{ selectedAlert.severity }}</p>
        <p><strong>Fecha:</strong> {{ selectedAlert.date }}</p>
        <button @click="selectedAlert = null">Cerrar detalle</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { fetchAlerts } from '../services/alert.assembler'

export default {
  setup() {
    const alerts = ref([])
    const closedAlerts = ref([])
    const selectedAlert = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const showHistory = ref(false)

    onMounted(async () => {
      try {
        alerts.value = await fetchAlerts()
      } catch (err) {
        error.value = 'Error cargando alertas'
      } finally {
        loading.value = false
      }
    })

    function closeAlert(alert) {
      alerts.value = alerts.value.filter(a => a.id !== alert.id)
      closedAlerts.value.push(alert)
    }

    function showDetails(alert) {
      selectedAlert.value = alert
    }

    function toggleHistory() {
      showHistory.value = !showHistory.value
    }

    return {
      alerts,
      closedAlerts,
      loading,
      error,
      selectedAlert,
      showDetails,
      closeAlert,
      showHistory,
      toggleHistory
    }
  }
}
</script>

<style scoped>
.alert-container {
  padding: 20px;

}

.history-btn {
  margin-bottom: 20px;
  padding: 8px 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.alert-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;

}

.alert-card {
  border-radius: 15px;
  padding: 16px;
  background-color: #2e2e2e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.alert-card.low {
  border-left: 5px solid #4caf50;
}
.alert-card.medium {
  border-left: 5px solid #ff9800;
}
.alert-card.high {
  border-left: 5px solid #f44336;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.buttons button {
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: #ff9800;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 50, 50, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-card {
  background: #2e2e2e;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.history-cards {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.history-card {
  width: 100%;
  max-width: 600px;
  background-color: #2e2e2e;
  border: 1px solid #ddd;
  border-left: 5px solid #2196f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.history-card h3 {
  margin-top: 0;
}
.history-card ul {
  padding-left: 20px;
}
.history-card li {
  margin-bottom: 12px;
}

.no-alerts {
  text-align: center;
  margin-top: 40px;
  font-size: 1.2em;
  color: #4caf50;
}

.check-icon {
  font-size: 3em;
  margin-bottom: 10px;
}

</style>
