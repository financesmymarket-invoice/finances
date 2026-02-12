import { useEffect, useMemo, useRef, useState } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import styles from "./Invoice.module.scss";

interface Props {
    id: number;
}

const Invoice = ({ id }: Props) => {
    const { invoice, getInvoiceById, changeItem } = useInvoiceStore();

    // Локальні стейти для редагованих полів
    const [editingPrices, setEditingPrices] = useState<Record<number, string>>({});
    const [editingQuantities, setEditingQuantities] = useState<Record<number, string>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getInvoiceById(id);
    }, [id, getInvoiceById]);

    useEffect(() => {
        if (containerRef.current && invoice) {
            containerRef.current.scrollLeft = 0;
        }
    }, [invoice]);

    const sortedItems = useMemo(() => {
        if (!invoice) return [];
        return [...invoice.items].sort((a, b) => a.id - b.id);
    }, [invoice]);

    const totals = useMemo(() => {
        if (!invoice) return { purchase: 0, sales: 0 };
        return invoice.items.reduce(
            (acc, i) => {
                const purchase = Number(i.purchasePricePerUnit) || 0;
                const sales = Number(i.roundedPrice) || 0;
                acc.purchase += purchase * (i.quantity || 0);
                acc.sales += sales;
                return acc;
            },
            { purchase: 0, sales: 0 }
        );
    }, [invoice]);

    // --- Універсальна зміна quantity або price ---
    const handleItemChange = (
        itemId: number,
        productId: number,
        purchasePrice: number,
        type: "price" | "quantity",
        rawValue: string
    ) => {
        if (!invoice?.agentId) return;
        const item = invoice.items.find(i => i.id === itemId);
        if (!item) return;

        let newUnitPrice = item.calculatedPrice || 0;
        let newQuantity = item.quantity || 0;

        if (type === "price") {
            const value = Number(rawValue.replace(",", "."));
            if (Number.isNaN(value)) return;
            newUnitPrice = Math.round(value * 100);
            setEditingPrices(prev => ({ ...prev, [itemId]: rawValue }));
        }

        if (type === "quantity") {
            const value = parseFloat(rawValue.replace(",", "."));
            if (Number.isNaN(value) || value <= 0) return;
            newQuantity = value;
            setEditingQuantities(prev => ({ ...prev, [itemId]: rawValue }));
        }

        // --- Виклик на сервер ---
        changeItem(itemId, newUnitPrice, invoice.agentId, productId, purchasePrice, newQuantity);
    };

    if (!invoice) return <div>Завантаження...</div>;

    return (
        <div className={styles.container}>
            <h2>Накладна №{invoice.id}</h2>

            <header className={styles.header}>
                <div className={styles.headerItem}>
                    <p>Дата: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                    <p>Тип: {invoice.type}</p>
                </div>
                <div className={styles.headerItem}>
                    <strong>{invoice.agent?.name}</strong>
                    <p>Націнка: {invoice.markupPercent}%</p>
                </div>
            </header>

            <div className={styles.itemsWrapper} ref={containerRef}>
                <div className={`${styles.itemCard} ${styles.tableHeader}`}>
                    <div className={styles.title}>#</div>
                    <div className={styles.title}>ID</div>
                    <div className={styles.title}>Назва товару</div>
                    <div className={styles.title}>шт/ящ</div>
                    <div className={styles.title}>Кількість</div>
                    <div className={styles.title}>Ящиків</div>
                    <div className={styles.title}>Закуп/шт</div>
                    <div className={styles.title}>Продаж/шт</div>
                    <div className={styles.title}>Розрах. продаж/шт</div>
                    <div className={styles.title}>Сума закуп</div>
                    <div className={styles.title}>Сума продаж</div>
                </div>

                {sortedItems.map((item, i) => {
                    const purchaseUAH = (Number(item.purchasePricePerUnit) || 0) / 100;
                    const calculatedUAH = (Number(item.calculatedPrice) || 0) / 100;
                    const roundedUAH = (Number(item.roundedPrice) || 0) / 100;
                    const quantity = item.quantity || 0;
                    const totalPurchaseUAH = (purchaseUAH * quantity);

                    // Розрахункова продажна ціна
                    const calculatedByMarkup = purchaseUAH * (1 + (invoice?.markupPercent ?? 0) / 100);

                    // Умови для підсвічування
                    const rowClass = [
                        calculatedByMarkup > calculatedUAH ? styles.blinkRed : "",
                        editingPrices[item.id] ? styles.rowChanged : "",
                        item.purchasePriceChanged ? styles.purchaseChanged : "",
                        
                    ].join(" ");

                    return (
                        <div key={item.id} className={`${styles.itemCard} ${rowClass}`}>
                            <div className={styles.itemNumber}>{i + 1}</div>
                            <div className={styles.cell}>{item.productId}</div>
                            <div className={`${styles.cell} ${styles.productName}`}>{item.productName}</div>
                            <div className={styles.cell}>{item.unitType === "BOX" ? `Ящ (${item.boxSize}шт)` : "Шт"}</div>

                            {/* Кількість */}
                            <input
                                type="text"
                                inputMode="decimal"
                                value={editingQuantities[item.id] ?? quantity.toString().replace(".", ",")}
                                onChange={(e) =>
                                    setEditingQuantities(prev => ({ ...prev, [item.id]: e.target.value }))
                                }
                                onBlur={(e) =>
                                    handleItemChange(item.id, item.productId, item.purchasePricePerUnit || 0, "quantity", e.target.value)
                                }
                                className={styles.cell}
                            />

                            <div className={styles.cell}>{item.boxesCount ?? "-"}</div>

                            {/* Закупівельна ціна */}
                            <div className={`${styles.cell} ${styles.right}`}>{purchaseUAH.toFixed(2)}</div>

                            {/* Продажна ціна */}
                            <input
                                type="text"
                                inputMode="decimal"
                                value={editingPrices[item.id] ?? calculatedUAH.toFixed(2)}
                                onChange={(e) =>
                                    setEditingPrices(prev => ({ ...prev, [item.id]: e.target.value }))
                                }
                                onBlur={(e) =>
                                    handleItemChange(item.id, item.productId, item.purchasePricePerUnit || 0, "price", e.target.value)
                                }
                                className={`${styles.cell} ${item.priceChanged ? styles.rowChanged : ""} ${calculatedByMarkup > roundedUAH ? styles.blinkRed : ""}`}
                            />

                            <div className={`${styles.cell} ${styles.right}`}>{calculatedByMarkup.toFixed(2)}</div>
                            <div className={`${styles.cell} ${styles.right}`}>{totalPurchaseUAH.toFixed(2)}</div>
                            <div className={`${styles.cell} ${styles.right}`}>
                                <strong>{roundedUAH.toFixed(2)}</strong>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.footer}>
                <div>Відсоток: {totals.purchase ? ((totals.sales / totals.purchase) * 100).toFixed(0) : 0}%</div>
                <div>РАЗОМ:</div>
                <div className={styles.right}><strong>{(totals.purchase/100).toFixed(2)}</strong></div>
                <div className={styles.right}><strong>{(totals.sales/100).toFixed(2)}</strong></div>
            </div>
        </div>
    );
};

export default Invoice;

