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
    getAgentById: (id: number) => Promise<IAgent | null>;
    getAgents: () => Promise<void>;
};

export const useAgentStore = create<AgentState & AgentActions>((set) => ({
    agent: null,
    agents: [],
    loading: false,
    error: null,

    getAgentById: async (id: number): Promise<IAgent | null> => {
        set({ loading: true, error: null });

        try {
            const data = await agentsService.getAgentById(id);
            set({ agent: data });
            return data;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to fetch agent";

            set({ error: message, agent: null });
            return null; // критично: повертаємо null, а не undefined
        } finally {
            set({ loading: false });
        }
    },

    getAgents: async (): Promise<void> => {
        set({ loading: true, error: null });

        try {
            const data = await agentsService.getAgents();
            set({ agents: data });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to fetch agents";

            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },
}));