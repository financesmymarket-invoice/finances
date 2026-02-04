
import type { IInvoice } from "../interfaces/IInvoice";
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
};

export { invoicesService };