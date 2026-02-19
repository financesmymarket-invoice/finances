import { create } from "zustand";
import type { IInvoice } from "../interfaces/IInvoice";
import { invoicesService } from "../services/InvoiceServices";
import type { InvoiceType } from "../interfaces/InvoiceEnum";

type UploadPhotoResponse = {
    invoice: IInvoice;
    items?: any[];
    photo?: any;
};

type InvoiceState = {
    invoice: IInvoice | null;
    uploadedPhotoUrl: string | null;
    uploading: boolean;
    uploadError: string | null;
};

type InvoiceActions = {
    getInvoiceById: (id: number) => Promise<void>;
    changeItem: (
        itemId: number,
        unitPrice: number,
        agentId: number,
        productId: number,
        purchasePrice: number,
        quantity: number
    ) => Promise<void>;
    uploadPhotoInvoice: (
        file: File,
        agentId: number,
        type: InvoiceType
    ) => Promise<UploadPhotoResponse | undefined>;
};

export const useInvoiceStore = create<InvoiceState & InvoiceActions>((set, get) => ({
    invoice: null,
    uploadedPhotoUrl: null,
    uploading: false,
    uploadError: null,

    getInvoiceById: async (id) => {
        const invoice = await invoicesService.getInvoiceById(id);

        set({
            invoice: {
                ...invoice,
                items: invoice.items ?? [],
            },
        });
    },


    changeItem: async (
        itemId,
        unitPrice,
        agentId,
        productId,
        purchasePrice,
        quantity
    ) => {
        const invoice = get().invoice;
        if (!invoice || !invoice.items) return;

        const roundedPrice = unitPrice * quantity;

        set({
            invoice: {
                ...invoice,
                items: invoice.items.map((i) =>
                    i.id === itemId
                        ? {
                            ...i,
                            calculatedPrice: unitPrice,
                            roundedPrice,
                            quantity,
                            priceChanged: true,
                        }
                        : i
                ),
            },
        });

        try {
            await invoicesService.updateInvoiceItemPrice(
                itemId,
                quantity,
                +unitPrice
            );
            await invoicesService.updatePriceMemory(
                agentId,
                productId,
                +unitPrice,
                +purchasePrice
            );
        } catch (err) {
            console.error("Помилка оновлення item", err);
        }
    },

    uploadPhotoInvoice: async (file, agentId, type) => {
        set({ uploading: true, uploadError: null });

        try {
            const response = await invoicesService.uploadInvoicePhoto(
                file,
                agentId,
                type
            );

            const { invoice, items } = response.data;

            set({
                invoice: {
                    ...invoice,
                    items: items ?? [],
                },
            });

            return response.data;
        } catch (err: any) {
            set({ uploadError: err.message || "Failed to upload photo" });
            return undefined;
        } finally {
            set({ uploading: false });
        }
    },

}));
