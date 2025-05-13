import http from '/src/shared/services/http.js';  // Asegúrate de importar correctamente la instancia configurada

export async function postProfile(profileData) {
    try {
        const response = await http.post('/api/v1/profiles', profileData);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al enviar el perfil:', error);
        throw error;  // Lanza el error para que sea manejado en el componente que llame esta función
    }
}

