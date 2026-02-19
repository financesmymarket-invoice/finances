
import type { IProduct } from "../interfaces/IProduct";
import { apiService } from "./ApiServices";

const productsService = {
    async getProducts(): Promise<IProduct[]> {
        const { data } = await apiService.get<IProduct[]>("products/");
        return data;
    },

    async getProductById(id: number): Promise<IProduct> {
        const { data } = await apiService.get<IProduct>(`products/${id}/`);
        return data;
    },

    async deleteProduct(id: number) {
        console.log('ja vydalayu')
        await apiService.delete(`products/${id}/`);
       
    },

};

export { productsService };