import { create } from "zustand";
import type { IInvoice } from "../interfaces/IInvoice";
import { invoicesService } from "../services/InvoiceServices";
type InvoiceState = {
    invoice?: IInvoice | null;
};

type InvoiceActions = {
    getInvoiceById: (id: number) => Promise<void>;
};

export const useInvoiceStore = create<InvoiceState & InvoiceActions>((set) => ({
    invoice: null,

    getInvoiceById: async (id: number) => {
        const data = await invoicesService.getInvoiceById(id);
        set({ invoice: data });
    }

}));