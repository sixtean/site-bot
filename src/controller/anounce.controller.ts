import { anounceService } from "../services/anounce.service";

export class anounceController {
  static async send(formData: {
    title: string;
    description: string;
    date: string;
    role: string;
  }) {
    const { title, description, date, role } = formData;

    if (!title || !description || !date || !role) {
      throw new Error("Preencha todos os campos antes de enviar.");
    }

    const response = await anounceService.sendAnounce(title, description, date, role);
    return response;
  }
}