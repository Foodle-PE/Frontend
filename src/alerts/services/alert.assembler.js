import Alert from "../model/alert.entity.js";
import http from "../../shared/services/http";

// Obtener alertas
export async function fetchAlerts() {
    try {
        const response = await http.get("/Alerta"); // respeta mayúscula si backend lo exige
        const rawAlerts = response.data;
        return rawAlerts.map(data => new Alert(data));
    } catch (error) {
        console.error("Error al obtener alertas:", error);
        throw new Error("No se pudieron obtener las alertas");
    }
}

// Crear alerta nueva
export async function createAlert(alertData) {
    try {
        const response = await http.post("/Alerta", alertData);
        return new Alert(response.data); // Devuelve instancia transformada
    } catch (error) {
        console.error("Error al crear alerta:", error);
        throw new Error("No se pudo crear la alerta");
    }


}

export async function closeAlertById(id) {
    try {
        await http.put(`/Alerta/${id}/close`);
    } catch (error) {
        console.error(`Error al cerrar alerta ${id}:`, error);
        throw error;
    }
}
