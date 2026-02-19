import { useEffect, useMemo, useRef, useState } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import styles from "./Invoice.module.scss";
interface Props {
    id: number;
}

const Invoice = ({ id }: Props) => {
    const invoice = useInvoiceStore(s => s.invoice);
    const getInvoiceById = useInvoiceStore(s => s.getInvoiceById);
    const changeItem = useInvoiceStore(s => s.changeItem);


    const [editingPrices, setEditingPrices] = useState<Record<number, string>>({});
    const [editingQuantities, setEditingQuantities] = useState<Record<number, string>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('id', id)
        if (!id) return;
        getInvoiceById(id);
    }, [id, invoice]);

/* 
    useEffect(() => {
        if (containerRef.current && invoice) {
            containerRef.current.scrollLeft = 0;
        }
    }, [invoice]); */
    console.log('invoice', invoice)

    const sortedItems = useMemo(() => {
        if (!invoice) return [];
        return [...invoice.items].sort((a, b) => a.id - b.id);
    }, [invoice]);

    const totals = useMemo(() => {
        if (!invoice) return { purchase: 0, sales: 0 };
        return invoice.items.reduce(
            (acc, i) => {
                const purchase = Number(i.purchasePricePerUnit) || 0; // копійки
                const sales = Number(i.roundedPrice) || 0; // копійки
                acc.purchase += purchase * (i.quantity || 0);
                acc.sales += sales;
                return acc;
            },
            { purchase: 0, sales: 0 }
        );
    }, [invoice]);

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
                    <div className={`${styles.cell} ${styles.title}`}>#</div>
                    <div className={`${styles.cell} ${styles.title}`}>ID</div>
                    <div className={`${styles.cell} ${styles.title}`}>Назва товару</div>
                    <div className={`${styles.cell} ${styles.title}`}>шт/ящ</div>
                    <div className={`${styles.cell} ${styles.title}`}>Кількість</div>
                    <div className={`${styles.cell} ${styles.title}`}>Ящиків</div>
                    <div className={`${styles.cell} ${styles.title}`}>Закуп/шт</div>
                    <div className={`${styles.cell} ${styles.title}`}>Продаж/шт</div>
                    <div className={`${styles.cell} ${styles.title}`}>Розрах. продаж/шт</div>
                    <div className={`${styles.cell} ${styles.title}`}>Сума закуп</div>
                    <div className={`${styles.cell} ${styles.title}`}>Сума продаж</div>
                </div>

                {sortedItems.map((item, i) => {
                    // --- працюємо в копійках ---
                    const purchaseCents = Number(item.purchasePricePerUnit) || 0;
                    const calculatedCents = Number(item.calculatedPrice) || 0;
                    const roundedCents = Number(item.roundedPrice) || 0;
                    const quantity = item.quantity || 0;

                    const purchaseUAH = purchaseCents / 100;
                    const calculatedUAH = calculatedCents / 100;
                    const roundedUAH = roundedCents / 100;

                    const totalPurchaseUAH = purchaseUAH * quantity;

                    // 🔥 стабільний розрахунок в копійках
                    const markupCents = Math.round(
                        purchaseCents * (1 + (invoice?.markupPercent ?? 0) / 100)
                    );

                    const isHigher = markupCents > calculatedCents;

                    const rowClass = [
                        isHigher ? styles.blinkRed : "",
                        editingPrices[item.id] ? styles.rowChanged : "",
                        item.purchasePriceChanged ? styles.purchaseChanged : "",
                    ].join(" ");

                    return (
                        <div key={item.id} className={`${styles.itemCard} ${rowClass}`}>
                            <div className={styles.cell}>{i + 1}</div>
                            <div className={styles.cell}>{item.productId}</div>
                            <div className={`${styles.cell} ${styles.productName}`}>
                                {item.productName}
                            </div>
                            <div className={styles.cell}>
                                {item.unitType === "BOX"
                                    ? `Ящ (${item.boxSize}шт)`
                                    : "Шт"}
                            </div>

                            <input
                                type="text"
                                inputMode="decimal"
                                value={
                                    editingQuantities[item.id] ??
                                    quantity.toString().replace(".", ",")
                                }
                                onChange={(e) =>
                                    setEditingQuantities(prev => ({
                                        ...prev,
                                        [item.id]: e.target.value,
                                    }))
                                }
                                onBlur={(e) =>
                                    handleItemChange(
                                        item.id,
                                        item.productId,
                                        item.purchasePricePerUnit || 0,
                                        "quantity",
                                        e.target.value
                                    )
                                }
                                className={styles.cell}
                            />

                            <div className={styles.cell}>
                                {item.boxesCount ?? "-"}
                            </div>

                            <div className={`${styles.cell} ${styles.right} ${item.purchasePriceChanged ? styles.purchaseChanged : ""}`}>
                                {purchaseUAH.toFixed(2)}
                            </div>

                            <input
                                type="text"
                                inputMode="decimal"
                                value={
                                    editingPrices[item.id] ??
                                    calculatedUAH.toFixed(2)
                                }
                                onChange={(e) =>
                                    setEditingPrices(prev => ({
                                        ...prev,
                                        [item.id]: e.target.value,
                                    }))
                                }
                                onBlur={(e) =>
                                    handleItemChange(
                                        item.id,
                                        item.productId,
                                        item.purchasePricePerUnit || 0,
                                        "price",
                                        e.target.value
                                    )
                                }
                                className={`${styles.cell} ${item.priceChanged ? styles.rowChanged : ""
                                    } ${isHigher ? styles.blinkRed : ""}`}
                            />

                            <div className={`${styles.cell} ${styles.right}`}>
                                {(markupCents / 100).toFixed(2)}
                            </div>

                            <div className={`${styles.cell} ${styles.right}`}>
                                {totalPurchaseUAH.toFixed(2)}
                            </div>

                            <div className={`${styles.cell} ${styles.right}`}>
                                <strong>{roundedUAH.toFixed(2)}</strong>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.footer}>
                <div>
                    Відсоток:{" "}
                    {totals.purchase
                        ? ((totals.sales / totals.purchase) * 100).toFixed(0)
                        : 0}
                    %
                </div>
                <div>РАЗОМ:</div>
                <div className={styles.right}>
                    <strong>{(totals.purchase / 100).toFixed(2)}</strong>
                </div>
                <div className={styles.right}>
                    <strong>{(totals.sales / 100).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
