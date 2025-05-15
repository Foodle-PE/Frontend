import Alert from "../model/alert.entity.js";

export async function fetchAlerts() {
    const response = await fetch('http://localhost:3001/alerts')
    if (!response.ok) {
        throw new Error('No se pudieron obtener las alertas')
    }
    const rawAlerts = await response.json()
    return rawAlerts.map(data => new Alert(data))
}