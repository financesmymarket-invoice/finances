import { useEffect, useMemo, useRef, useState } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import styles from "./Invoice.module.scss";

interface Props {
    id: number;
}

const Invoice = ({ id }: Props) => {
    const { invoice, getInvoiceById, changeItemSalePrice } = useInvoiceStore();
    const [editingPrices, setEditingPrices] = useState<Record<number, string>>({});
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

    const handleBlur = (itemId: number, productId: number, purchasePrice: number) => {
        const raw = editingPrices[itemId];
        if (!raw) return;
        const value = Number(raw.replace(",", "."));
        if (Number.isNaN(value)) return;
        const unitPrice = Math.round(value * 100);
        if (invoice?.agentId) {
            changeItemSalePrice(itemId, unitPrice, invoice.agentId, productId, purchasePrice);
        }
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
                    <div className={styles.itemNumber}>#</div>
                    <div className={styles.cell}>ID</div>
                    <div className={`${styles.cell} ${styles.productName}`}>Назва товару</div>
                    <div className={styles.cell}>шт/ящ</div>
                    <div className={`${styles.cell} ${styles.right}`}>Кількість</div>
                    <div className={styles.cell}>Ящиків</div>
                    <div className={`${styles.cell} ${styles.right}`}>Закуп/шт</div>
                    <div className={`${styles.cell} ${styles.right}`}>Продаж/шт</div>
                    <div className={`${styles.cell} ${styles.right}`}>Розрах. продаж/шт</div>
                    <div className={`${styles.cell} ${styles.right}`}>Сума закуп</div>
                    <div className={`${styles.cell} ${styles.right}`}>Сума продаж</div>
                </div>
                {sortedItems.map((item, i) => {
                    const purchaseUAH = Number(item.purchasePricePerUnit) / 100;
                    const calculatedUAH = Number(item.calculatedPrice) / 100;
                    const roundedUAH = Number(item.roundedPrice) / 100;
                    const totalPurchaseUAH = (Number(item.purchasePricePerUnit) * (item.quantity || 0)) / 100;
                    const calculatedByMarkup = purchaseUAH * (1 + (invoice?.markupPercent ?? 0) / 100);

                    return (
                        <div
                            key={item.id}
                            className={`${styles.itemCard} ${item.priceChanged ? styles.rowChanged : ""} ${item.purchasePriceChanged ? styles.purchaseChanged : ""}`}
                        >
                            <div className={styles.itemNumber}>{i + 1}</div>
                            <div className={styles.cell}>{item.productId}</div>
                            <div className={`${styles.cell} ${styles.productName}`}>{item.productName}</div>
                            <div className={styles.cell}>{item.unitType === "BOX" ? `Ящ (${item.boxSize}шт)` : "Шт"}</div>
                            <div className={`${styles.cell} ${styles.right}`}>{item.quantity}</div>
                            <div className={styles.cell}>{item.boxesCount ?? "-"}</div>
                            <div className={`${styles.cell} ${styles.right}`}>{purchaseUAH.toFixed(2)}</div>
                            <div className={styles.cell}>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={editingPrices[item.id] ?? calculatedUAH.toFixed(2)}
                                    onChange={(e) => setEditingPrices((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                    onBlur={() => handleBlur(item.id, item.productId, item.purchasePricePerUnit || 0)}
                                    className={`${styles.priceInput} ${calculatedUAH < purchaseUAH ? styles.blinkRed : ""}`}
                                />
                            </div>
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
                <div className={styles.right}><strong>{(totals.purchase / 100).toFixed(2)}</strong></div>
                <div className={styles.right}><strong>{(totals.sales / 100).toFixed(2)}</strong></div>
            </div>
        </div>
    );
};

export default Invoice;