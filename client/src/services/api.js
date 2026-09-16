import axios from "axios";

// Centraliza a configuração de acesso à API do back-end Node/Express.
// Se o back-end rodar em outra porta/host, altere apenas aqui.
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;