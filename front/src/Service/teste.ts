import { api } from "./api";

export class testeService {
async getTesteData() {
    const response = await api.get('http://localhost:3001');
    console.log('Response from API:', response.data);
    return response.data;
}
}
