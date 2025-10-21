import axios from "axios";

const API_URL = "http://localhost:3000/admin/anounce";

export const anounceService = {
  async sendAnounce(title: string, description: string, date: string, role: string) {
    try {
      const response = await axios.post(API_URL, {
        title,
        description,
        date,
        role,
      });

      return response.data;
    } catch (error: any) {
      console.error("Erro ao enviar anúncio:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "Falha ao enviar anúncio.");
    }
  },
};