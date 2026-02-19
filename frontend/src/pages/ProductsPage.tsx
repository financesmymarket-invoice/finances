import { useEffect, useMemo, useRef, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useAgentStore } from "../store/useAgentStore";
import ProductCart from "../components/products/ProductCart";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {
    const { products, getProducts, deleteProduct } = useProductStore();
    const { agents, getAgents } = useAgentStore();
    const [selectedAgent, setSelectedAgent] = useState<number | "all">("all");
    const [displayCount, setDisplayCount] = useState(15);
    const ITEMS_PER_PAGE = 15;

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getProducts();
        getAgents();
    }, [getProducts, getAgents, deleteProduct]);

    const filteredProducts = useMemo(() => {
        if (selectedAgent === "all") return products;
        return products.filter(p => p.agentId === selectedAgent);
    }, [products, selectedAgent]);

  
    const displayedProducts = useMemo(() => {
        return filteredProducts.slice(0, displayCount);
    }, [filteredProducts, displayCount]);

    const hasMore = displayedProducts.length < filteredProducts.length;

    // ✅ Простий обробник скролу
    const handleScroll = () => {
        if (!listRef.current || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;

        // Якщо проскролили більше 80%
        if (scrolledPercentage > 0.8) {
            console.log('📦 Завантажуємо ще', ITEMS_PER_PAGE, 'елементів');
            setDisplayCount(prev => prev + ITEMS_PER_PAGE);
        }
    };

    // ✅ Підписка на скрол
    useEffect(() => {
        const element = listRef.current;
        if (!element) return;

        element.addEventListener('scroll', handleScroll, { passive: true });
        return () => element.removeEventListener('scroll', handleScroll);
    }, [hasMore]); // ✅ Залежність тільки від hasMore

    // ✅ Скидання при зміні фільтра
    useEffect(() => {
        setDisplayCount(15);
        listRef.current?.scrollTo(0, 0);
    }, [selectedAgent]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Продукти ({products.length})</h1>

            <div className={styles.filters}>
                <label>Фільтр по агенту:</label>
                <select
                    value={selectedAgent}
                    onChange={(e) =>
                        setSelectedAgent(
                            e.target.value === "all" ? "all" : Number(e.target.value)
                        )
                    }
                >
                    <option value="all">Всі</option>
                    {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>

                <span className={styles.info}>
                    Показано {displayedProducts.length} з {filteredProducts.length}
                </span>

                {/* Кнопка для ручного завантаження */}
                {hasMore && (
                    <button onClick={() => setDisplayCount(prev => prev + ITEMS_PER_PAGE)}>
                        Завантажити ще
                    </button>
                )}
            </div>

            <div ref={listRef} className={styles.productList}>
                {displayedProducts.map((product) => (
                    <div className={styles.productBox}>
                        <ProductCart key={product.id} product={product} />
                        <button onClick={() => deleteProduct(product.id)}> Видалити </button>

                    </div>
                ))}

                {hasMore && (
                    <div className={styles.loading}>
                        Прокрутіть вниз для завантаження
                    </div>
                )}

                {!hasMore && displayedProducts.length > 0 && (
                    <div className={styles.loading}>
                        ✅ Всі продукти завантажено
                    </div>
                )}

                {displayedProducts.length === 0 && filteredProducts.length === 0 && (
                    <div className={styles.empty}>
                        Немає продуктів для цього агента
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;