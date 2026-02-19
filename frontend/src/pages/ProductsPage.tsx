import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useProductStore } from "../store/useProductStore";
import { useAgentStore } from "../store/useAgentStore";
import ProductCart from "../components/products/ProductCart";
import styles from "./ProductsPage.module.scss";

const ITEMS_PER_PAGE = 15;

const ProductsPage = () => {
    const { products, getProducts, deleteProduct } = useProductStore();
    const { agents, getAgents } = useAgentStore();

    const [selectedAgent, setSelectedAgent] = useState<number | "all">("all");
    const [search, setSearch] = useState("");
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getProducts();
        getAgents();
    }, [getProducts, getAgents]);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesAgent =
                selectedAgent === "all" || p.agentId === selectedAgent;

            const matchesSearch =
                !normalizedSearch ||
                p.name.toLowerCase().includes(normalizedSearch);

            return matchesAgent && matchesSearch;
        });
    }, [products, selectedAgent, normalizedSearch]);

    const displayedProducts = useMemo(() => {
        return filteredProducts.slice(0, displayCount);
    }, [filteredProducts, displayCount]);

    const hasMore = displayCount < filteredProducts.length;

    const handleScroll = useCallback(() => {
        if (!listRef.current || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrolledPercentage > 0.8) {
            setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
        }
    }, [hasMore]);

    useEffect(() => {
        const element = listRef.current;
        if (!element) return;

        element.addEventListener("scroll", handleScroll, { passive: true });
        return () => element.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setDisplayCount(ITEMS_PER_PAGE);
        listRef.current?.scrollTo(0, 0);
    }, [selectedAgent, normalizedSearch]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Продукти ({filteredProducts.length})
            </h1>

            <div className={styles.filters}>
                <label>Фільтр по агенту:</label>

                <select
                    value={selectedAgent}
                    onChange={(e) =>
                        setSelectedAgent(
                            e.target.value === "all"
                                ? "all"
                                : Number(e.target.value)
                        )
                    }
                >
                    <option value="all">Всі</option>
                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Пошук по назві..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />

                <span className={styles.info}>
                    Показано {displayedProducts.length} з{" "}
                    {filteredProducts.length}
                </span>

                {hasMore && (
                    <button
                        onClick={() =>
                            setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
                        }
                    >
                        Завантажити ще
                    </button>
                )}
            </div>

            <div ref={listRef} className={styles.productList}>
                {displayedProducts.map((product) => (
                    <div key={product.id} className={styles.productBox}>
                        <ProductCart product={product} />
                        <button onClick={() => deleteProduct(product.id)}>
                            Видалити
                        </button>
                    </div>
                ))}

                {hasMore && (
                    <div className={styles.loading}>
                        Прокрутіть вниз для завантаження
                    </div>
                )}

                {!hasMore && displayedProducts.length > 0 && (
                    <div className={styles.loading}>
                        Всі продукти завантажено
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className={styles.empty}>
                        Немає продуктів за заданими параметрами
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
