
import { useParams } from "react-router-dom";
import Invoice from "../components/Invoice/Invoice";



const InvoicePage = () => {
    const { id } = useParams();
    console.log('id', id)

    return (
        <div className="flex-center" >
            {id && <Invoice id={parseInt(id)} />}
        </div>
    )
}

export default InvoicePage
