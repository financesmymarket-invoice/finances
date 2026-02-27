import type { IProduct } from "../../interfaces/IProduct";
import { useAgentStore } from "../../store/useAgentStore";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    product: IProduct;
}

const ProductCard = ({ product }: Props) => {
    const agent = useAgentStore(
        (state) => state.agents.find((a) => a.id === product.agentId) || null
    );

    const lastPrice =
        product.priceMemory?.[product.priceMemory.length - 1]?.salePrice;

    return (
        <div className={styles.card}>
            <h4>{product.name}</h4>

            <p>
                <strong>ID:</strong> {product.id}
            </p>

            <p>
                <strong>price:</strong> {lastPrice ? lastPrice / 100 : "-"}
            </p>

            <p>
                <strong>Агент:</strong> {agent?.name ?? "-"}
            </p>

            <Link to={`/product/${product.id}`}>Детальніше</Link>
        </div>
    );
};

export default ProductCard;