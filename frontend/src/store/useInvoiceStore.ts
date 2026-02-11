import { create } from "zustand";
import type { IInvoice, InvoiceType } from "../interfaces/IInvoice";
import { invoicesService } from "../services/InvoiceServices";

type InvoiceState = {
    invoice: IInvoice | null;
    uploadedPhotoUrl: string | null; // зберігаємо URL завантаженого фото
    uploading: boolean;
    uploadError: string | null;
};

type InvoiceActions = {
    getInvoiceById: (id: number) => Promise<void>;
    changeItemSalePrice: (
        itemId: number,
        unitPrice: number,
        agentId: number,
        productId: number,
        purchasePrice: number
    ) => Promise<void>;
    uploadPhotoInvoice: (file: File, agentId: number, type: InvoiceType) => Promise<IInvoice | undefined>;
};

export const useInvoiceStore = create<InvoiceState & InvoiceActions>((set, get) => ({
    invoice: null,
    uploadedPhotoUrl: null,
    uploading: false,
    uploadError: null,

    getInvoiceById: async (id) => {
        const data = await invoicesService.getInvoiceById(id);
        set({ invoice: data });
    },

    changeItemSalePrice: async (itemId, unitPrice, agentId, productId, purchasePrice) => {
        const invoice = get().invoice;
        if (!invoice) return;

        const item = invoice.items.find((i) => i.id === itemId);
        if (!item) return;

        const quantity = item.quantity || 1;
        const roundedPrice = unitPrice * quantity;

        // Локально оновлюємо item
        set({
            invoice: {
                ...invoice,
                items: invoice.items.map((i) =>
                    i.id === itemId
                        ? { ...i, calculatedPrice: unitPrice, roundedPrice, priceChanged: true }
                        : i
                ),
            },
        });

        // Оновлюємо на бекенді
        await invoicesService.updateInvoiceItemPrice(itemId, unitPrice);
        await invoicesService.updatePriceMemory(agentId, productId, unitPrice, purchasePrice);
    },

    uploadPhotoInvoice: async (file: File, agentId: number, type: InvoiceType) => {
        set({ uploading: true, uploadError: null });
        try {
            const response = await invoicesService.uploadInvoicePhoto(file, agentId, type);
            const updatedInvoice: IInvoice = response.data; // повертається сам IInvoice
            set({ invoice: updatedInvoice });
            return updatedInvoice;
        } catch (err: any) {
            set({ uploadError: err.message || "Failed to upload photo" });
            return undefined;
        } finally {
            set({ uploading: false });
        }
    },

}));


