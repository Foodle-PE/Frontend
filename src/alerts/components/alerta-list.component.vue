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
