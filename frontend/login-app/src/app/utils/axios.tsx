import axios from "axios";

// Crear una instancia de axios
const api = axios.create({
    baseURL: "http://localhost:5000", // URL de la API
    withCredentials: true, // Enviar cookies al servidor
})

export default api;