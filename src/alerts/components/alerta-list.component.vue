<template>
  <div class="alert-container">
    <h2>{{ t('alerts.title') }}</h2>

    <div class="actions">
      <button @click="toggleHistory" class="history-btn">
        {{ showHistory ? t('alerts.hideHistory') : t('alerts.showHistory') }}
      </button>
      <button @click="showAlertForm = !showAlertForm" class="add-alert-btn">
        {{ showAlertForm ? t('alerts.cancel') : t('alerts.addAlert') }}
      </button>
    </div>

    <div v-if="showAlertForm" class="alert-form">
      <form @submit.prevent="submitAlert">
        <label>
          {{ t('alerts.type') }}:
          <input v-model="newAlert.AlertType" required />
        </label>
        <label>
          {{ t('alerts.message') }}:
          <input v-model="newAlert.Message" required />
        </label>
        <label>
          {{ t('alerts.severity') }}:
          <select v-model="newAlert.Severity" required>
            <option disabled value="">{{ t('alerts.selectSeverity') }}</option>
            <option value="low">{{ t('alerts.low') }}</option>
            <option value="medium">{{ t('alerts.medium') }}</option>
            <option value="high">{{ t('alerts.high') }}</option>
          </select>
        </label>
        <button type="submit">{{ t('alerts.save') }}</button>
      </form>
    </div>

    <div v-if="loading">{{ t('alerts.loading') }}</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-if="!showHistory && alerts.length === 0 && !loading && !error" class="no-alerts">
      <div class="check-icon">✔️</div>
      <p>{{ t('alerts.noAlerts') }}</p>
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
        <small>{{ t('alerts.date') }}: {{ alert.Date }}</small>
        <div class="buttons">
          <button @click="showDetails(alert)">{{ t('alerts.details') }}</button>
          <button @click="closeAlert(alert)">{{ t('alerts.close') }}</button>
        </div>
      </div>
    </div>

    <div v-else class="history-cards">
      <div class="history-card">
        <h3>{{ t('alerts.closedTitle') }}</h3>
        <div v-if="closedAlerts.length === 0">
          <p>{{ t('alerts.noClosed') }}</p>
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
        <h2>{{ t('alerts.detailTitle') }}</h2>
        <p><strong>{{ t('alerts.type') }}:</strong> {{ selectedAlert.AlertType }}</p>
        <p><strong>{{ t('alerts.message') }}:</strong> {{ selectedAlert.Message }}</p>
        <p><strong>{{ t('alerts.severity') }}:</strong> {{ selectedAlert.Severity }}</p>
        <p><strong>{{ t('alerts.date') }}:</strong> {{ selectedAlert.Date }}</p>
        <button @click="selectedAlert = null">{{ t('alerts.closeDetails') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAlerts, createAlert, closeAlertById } from '../services/alert.assembler'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    error.value = t('alerts.loadingError')
  } finally {
    loading.value = false
  }
})

async function closeAlert(alert) {
  try {
    await closeAlertById(alert.Id)
    alerts.value = alerts.value.filter(a => a.Id !== alert.Id)
    closedAlerts.value.push(alert)
  } catch (err) {
    console.error("Error al cerrar la alerta:", err)
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