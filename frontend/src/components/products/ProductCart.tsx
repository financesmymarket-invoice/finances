import { useEffect } from "react";
import type { IProduct } from "../../interfaces/IProduct";
import { useAgentStore } from "../../store/useAgentStore";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    product: IProduct;
}

const ProductCart = ({ product }: Props) => {
    const { agent, getAgentById } = useAgentStore();

    useEffect(() => {
        if (!product.agentId) return;
        getAgentById(product.agentId);
    }, [product.agentId, getAgentById]);

   

    return (
        <div className={styles.card}>
            <h4>{product.name}</h4>

            <p>
                <strong>ID:</strong> {product.id}
            </p>

            <p>
                <strong>price:</strong> {product.priceMemory && product.priceMemory.length > 0
                    ? product.priceMemory[product.priceMemory.length - 1].salePrice/100
                    : null}
            </p>


            <p>
                <strong>Агент:</strong> {agent?.name ?? "-"}
            </p>
            <Link to={`/product/${product.id}`}>Детальніше</Link>
        </div>
    );
};

export default ProductCart;

