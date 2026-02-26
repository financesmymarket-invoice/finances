interface ParsedInvoiceItemInternal {
    productName: string;
    quantity: number;
    purchasePrice: number;
    unitType: 'PIECE' | 'BOX';
    boxSize?: number;
}
export declare class AzureOcrService {
    private client;
    constructor();
    extractInvoiceItems(filePath: string, agentId: number): Promise<ParsedInvoiceItemInternal[]>;
    private extractFromPrebuilt;
    private parseForAgent1;
    private parseForAgent2;
    private parseForAgent3;
    private parseForAgent4;
    private parseForAgent5;
    private parseForAgent6;
    private parseForAgent7;
    private parseForAgent10;
    private parseForAgent11;
    private parseForAgent12;
    private parseForAgent14;
    private parseForAgent15;
    private parseForAgent17;
    private parseForAgent18;
    private parseForAgent21;
    private parseForAgent22;
    private parseForAgent23;
    private parseForAgent24;
    private parseForAgent25;
    private parseForAgent28;
    private parseForAgent30;
    private parseForAgent31;
    private parseForAgent33;
    private parseForAgent34;
    private parseForAgent36;
    private parseForAgent37;
    private parseForAgent38;
}
export {};
