<template>
  <div class="alert-container">
    <h2>Alertas</h2>

    <div class="actions">
      <button @click="toggleHistory" class="history-btn">
        {{ showHistory ? 'Ocultar historial' : 'Historial de alertas' }}
      </button>
      <button @click="showAlertForm = !showAlertForm" class="add-alert-btn">
        {{ showAlertForm ? 'Cancelar' : 'Agregar Alerta' }}
      </button>
    </div>

    <!-- Formulario para nueva alerta -->
    <div v-if="showAlertForm" class="alert-form">
      <form @submit.prevent="submitAlert">
        <label>
          Tipo de alerta:
          <input v-model="newAlert.AlertType" required />
        </label>
        <label>
          Mensaje:
          <input v-model="newAlert.Message" required />
        </label>
        <label>
          Severidad:
          <select v-model="newAlert.Severity" required>
            <option disabled value="">Seleccione severidad</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>
        <button type="submit">Guardar Alerta</button>
      </form>
    </div>

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
          :key="alert.Id"
          :class="alert.Severity"
      >
        <h3>{{ alert.AlertType }}</h3>
        <p>{{ alert.Message }}</p>
        <small>Fecha: {{ alert.Date }}</small>
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
            <li v-for="alert in closedAlerts" :key="alert.Id">
              <strong>{{ alert.AlertType }}</strong> - {{ alert.Message }}
              <br />
              <small>{{ alert.Date }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="selectedAlert" class="modal-overlay" @click.self="selectedAlert = null">
      <div class="modal-card">
        <h2>Detalle de Alerta</h2>
        <p><strong>Tipo:</strong> {{ selectedAlert.AlertType }}</p>
        <p><strong>Mensaje:</strong> {{ selectedAlert.Message }}</p>
        <p><strong>Severidad:</strong> {{ selectedAlert.Severity }}</p>
        <p><strong>Fecha:</strong> {{ selectedAlert.Date }}</p>
        <button @click="selectedAlert = null">Cerrar detalle</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { fetchAlerts, createAlert, closeAlertById } from '../services/alert.assembler'

export default {
  setup() {
    const alerts = ref([])
    const closedAlerts = ref([])
    const selectedAlert = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const showHistory = ref(false)
    const showAlertForm = ref(false)

    const newAlert = ref({
      AlertType: '',
      Message: '',
      Severity: ''
    })

    onMounted(async () => {
      try {
        alerts.value = await fetchAlerts()
        console.log("Alertas recibidas:", alerts.value)
      } catch (err) {
        error.value = 'Error cargando alertas'
      } finally {
        loading.value = false
      }
    })

    async function closeAlert(alert) {
      try {
        await closeAlertById(alert.Id); // ✅ llama al backend para cerrar
        alerts.value = alerts.value.filter(a => a.Id !== alert.Id); // ✅ quítalo del array de alertas activas
        closedAlerts.value.push(alert); // ✅ agrégalo al historial local
      } catch (err) {
        console.error("Error al cerrar la alerta:", err);
      }
    }

    function showDetails(alert) {
      selectedAlert.value = alert
    }

    function toggleHistory() {
      showHistory.value = !showHistory.value
    }

    async function submitAlert() {
      try {
        const alertToSend = {
          ...newAlert.value,
          Date: new Date().toISOString()
        }
        const created = await createAlert(alertToSend)
        alerts.value.push(created)
        newAlert.value = { AlertType: '', Message: '', Severity: '' }
        showAlertForm.value = false
      } catch (err) {
        console.error('Error al crear alerta', err)
      }
    }

    return {
      alerts,
      closedAlerts,
      selectedAlert,
      loading,
      error,
      showHistory,
      toggleHistory,
      showDetails,
      closeAlert,
      showAlertForm,
      newAlert,
      submitAlert
    }
  }
}
</script>

<style scoped>
.alert-container {
  padding: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.history-btn,
.add-alert-btn {
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.history-btn {
  background-color: #2196f3;
}

.add-alert-btn {
  background-color: #4caf50;
}

.alert-form {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.alert-form label {
  display: block;
  margin-bottom: 10px;
}

.alert-form input,
.alert-form select {
  margin-left: 10px;
  padding: 4px;
}

.alert-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.alert-card {
  border-radius: 15px;
  padding: 16px;
  background-color: #b1b1b1;
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
  background-color: rgba(255, 201, 201, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-card {
  background: #f3e8cd;
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
  background-color: #f3e8cd;
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
