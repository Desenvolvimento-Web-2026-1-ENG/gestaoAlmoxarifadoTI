import axios from "axios";

// Centraliza a configuração de acesso à API do back-end Node/Express.
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;