import { create } from "zustand";
import { agentsService } from "../services/AgentServices";
import type { IAgent } from "../interfaces/IAgent";

type AgentState = {
    agent: IAgent | null;
    agents: IAgent[];
    loading: boolean;
    error: string | null;
};

type AgentActions = {
    getAgentById: (id: number) => Promise<void>;
    getAgents: () => Promise<void>;
};

export const useAgentStore = create<AgentState & AgentActions>((set) => ({
    agent: null,
    agents:[],
    loading: false,
    error: null,

    getAgentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await agentsService.getAgentById(id);
            set({ agent: data });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch agent" });
        } finally {
            set({ loading: false });
        }
    },

    getAgents: async () => {
        set({ loading: true, error: null });
        try {
            const data = await agentsService.getAgents();
            set({ agents: data });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch agent" });
        } finally {
            set({ loading: false });
        }
    },
}));

