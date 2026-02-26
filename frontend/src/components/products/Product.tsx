import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import styles from "./Product.module.scss";

const Product = () => {
    const { id } = useParams();
    const { product, getProductById } = useProductStore();

    useEffect(() => {
        if (!id) return;
        getProductById(+id);
    }, [id, getProductById]);

    if (!product) return <div className={styles.loading}>Завантаження...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Товар #{product.id}</h2>

            <div className={styles.card}>
                <div className={styles.row}>
                    <span className={styles.label}>Назва:</span>
                    <span>{product.name}</span>
                </div>

               

                <div className={styles.row}>
                    <span className={styles.label}>Агент-</span>
                    <span>{product.agent?.name ?? "-"}</span>
                </div>
            </div>

            {product.priceMemory && product.priceMemory?.length > 0 && (
                <div className={styles.priceBlock}>
                    <h3>Історія цін</h3>

                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div>Агент</div>
                            <div>Закуп</div>
                            <div>Продаж</div>
                            <div>Джерело</div>
                            <div>Дата</div>
                        </div>

                        {product.priceMemory.map((p) => (
                            <div key={p.id} className={styles.tableRow}>
                                <div>{product.agent?.name ?? "25" }</div>
                                <div>{(p.purchasePrice / 100).toFixed(2)}</div>
                                <div>{(p.salePrice / 100).toFixed(2)}</div>
                                <div>{p.source}</div>
                                <div>
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;

