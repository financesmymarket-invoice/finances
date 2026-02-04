import { useEffect, useState } from "react";
import type { Item } from "../../interfaces/IInvoice";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import styles from "./Invoice.module.scss"; // Імпорт модуля

interface Props {
    id: number;
}

const Invoice = ({ id }: Props) => {
    const { invoice, getInvoiceById } = useInvoiceStore();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getInvoiceById(id); // Використовуємо id з пропсів
    }, [id, getInvoiceById]);

    // Синхронізуємо локальний стейт, коли дані отримані зі стору
    useEffect(() => {
        if (invoice?.items) {
            // Перевіряємо чи items це масив, чи об'єкт (згідно з вашим інтерфейсом)
            const itemsArray = Array.isArray(invoice.items) ? invoice.items : [invoice.items];
            setItems(itemsArray);
        }
    }, [invoice]);

    const handlePriceChange = (itemId: number, newPrice: string) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, roundedPrice: newPrice, priceChanged: true } : item
        ));
    };

    const totalSum = items.reduce((acc, item) =>
        acc + (parseFloat(item.roundedPrice || "0") * parseFloat(item.quantity || "0")), 0
    );

    if (!invoice) return <div>Завантаження...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h2>Накладна №{invoice.id}</h2>
                    <p>Дата: {new Date(invoice.createdAt).toLocaleDateString()}</p>
                    <p>Тип: {invoice.type}</p>
                </div>
                <div>
                    <h3>Контрагент</h3>
                    <p><strong>{invoice.agent?.name}</strong></p>
                    <p>Націнка: {invoice.markupPercent}%</p>
                </div>
            </header>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Назва товару</th>
                        <th>Кількість</th>
                        <th>Ціна закупівлі</th>
                        <th>Ціна (ред.)</th>
                        <th>Сума</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className={item.priceChanged ? styles.rowChanged : ''}>
                            <td>{item.productId}</td>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>{item.purchasePrice}</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.roundedPrice}
                                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                    className={styles.priceInput}
                                />
                            </td>
                            <td>{(parseFloat(item.roundedPrice) * parseFloat(item.quantity)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} className={styles.textRight}><strong>Разом:</strong></td>
                        <td><strong>{totalSum.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>

            {invoice.photos && invoice.photos.length > 0 && (
                <div className={styles.photosSection}>
                    <h3>Фото документів</h3>
                    <div className={styles.photoGrid}>
                        {invoice.photos.map(photo => (
                            <img key={photo.id} src={photo.url} alt="Attachment" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;