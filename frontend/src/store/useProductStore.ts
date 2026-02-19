import { create } from "zustand";
import type { IProduct } from "../interfaces/IProduct";
import { productsService } from "../services/ProductService";

type ProductState = {
    product: IProduct | null;
    products: IProduct[];
    loading: boolean;
    error: string | null;
};

type ProductActions = {
    getProductById: (id: number) => Promise<void>;
    getProducts: () => Promise<void>;
    deleteProduct: (id:number) => void;
};

export const useProductStore = create<ProductState & ProductActions>((set) => ({
    product: null,
    products: [],
    loading: false,
    error: null,

    getProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await productsService.getProductById(id);
            set({ product: data });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch product" });
        } finally {
            set({ loading: false });
        }
    },

    getProducts: async () => {
        set({ loading: true, error: null });
        try {
            const data = await productsService.getProducts();
            set({ products: data });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch product" });
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id) => {
        await productsService.deleteProduct(id)
    }
}));
