import { useEffect, useState } from "react";
import { useAgentStore } from "../store/useAgentStore";
import UploadInvoicePhoto from "../components/Invoice/UploadInvoicePhoto";

const HomePage = () => {
    const { agents, getAgents, getAgentById, agent } = useAgentStore();
    const [selectedAgentId, setSelectedAgentId] = useState<number | "">("");

    useEffect(() => {
        getAgents();
    }, [getAgents]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAgentId(Number(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Selected agent id:", selectedAgentId);
        // Тут можна робити що завгодно з вибраним агентом
    };

    useEffect(() => {
        if (selectedAgentId)
            getAgentById(selectedAgentId);
    }, [selectedAgentId]);

    return (
        <>
            <h1>Home Page</h1>
            <h3>Вибраний Агент: { agent?.name}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="agents">Agents</label>
                <select
                    name="agents"
                    id="agents"
                    value={selectedAgentId}
                    onChange={handleChange}
                >
                    <option value="">Select an agent</option>
                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>

                <input type="submit" value="Submit" />
            </form>

            <UploadInvoicePhoto agentId={+selectedAgentId} />

        </>
    );
};

export default HomePage;
