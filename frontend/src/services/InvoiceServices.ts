import type { IInvoice, InvoiceType } from "../interfaces/IInvoice";
import { apiService } from "./ApiServices";

const invoicesService = {
    async getInvoices(): Promise<IInvoice[]> {
        const { data } = await apiService.get<IInvoice[]>("invoices/");
        return data;
    },

    async getInvoiceById(id: number): Promise<IInvoice> {
        const { data } = await apiService.get<IInvoice>(`invoices/${id}/`);
        return data;
    },

    async updateInvoiceItemPrice(itemId: number, quantity:number, calculatedPrice: number ) {
      
     const res =   await apiService.patch(`invoice-items/${itemId}`, { quantity, calculatedPrice });
        return res;
    },

    async updatePriceMemory(agentId: number, productId: number, price: number, purchasePrice:number) {
        return apiService.patch(`price-memory/`, { agentId, productId, price, purchasePrice });
    },

   async uploadInvoicePhoto(file: File, agentId: number, type: InvoiceType) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("agentId", agentId.toString());
        formData.append("type", type);

        return await apiService.post("invoice-photos/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }


};

export { invoicesService };

