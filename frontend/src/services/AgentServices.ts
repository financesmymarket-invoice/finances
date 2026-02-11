
import type { IAgent } from "../interfaces/IAgent";
import { apiService } from "./ApiServices";

const agentsService = {
    async getAgents(): Promise<IAgent[]> {
        const { data } = await apiService.get<IAgent[]>("agents/");
        return data;
    },

    async getAgentById(id: number): Promise<IAgent> {
        const { data } = await apiService.get<IAgent>(`agents/${id}/`);
        return data;
    },



};

export { agentsService };
