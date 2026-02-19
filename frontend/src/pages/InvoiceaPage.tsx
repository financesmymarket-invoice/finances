
import { useParams } from "react-router-dom";
import Invoice from "../components/Invoice/Invoice";



const InvoicePage = () => {
    const { id } = useParams();
   

    const invoiceId = Number(id);

    if (!invoiceId) return null;

    return (
        <div className="flex-center">
            <Invoice id={invoiceId} />
        </div>
    );

}

export default InvoicePage
