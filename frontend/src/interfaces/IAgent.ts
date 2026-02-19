export interface IAgent {
    id: number;
    name: string;
    markupPercent: number; // тепер number, бо зручніше для розрахунків
    createdAt: string;
    updatedAt: string;
}