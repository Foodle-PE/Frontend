import Alert from "../model/alert.entity.js";
import http from "../../shared/services/http";

export async function fetchAlerts() {
    try {
        const response = await http.get("/Alerta"); // Usa mayúscula si así está en backend
        const rawAlerts = response.data;
        return rawAlerts.map(data => new Alert(data));
    } catch (error) {
        console.error("Error al obtener alertas:", error);
        throw new Error("No se pudieron obtener las alertas");
    }
}
