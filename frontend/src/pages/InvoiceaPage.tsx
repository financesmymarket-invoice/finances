
import { useParams } from "react-router-dom";
import Invoice from "../components/Invoice/Invoice";


interface Props {
    
}

const InvoicePage = (props: Props) => {
    const { id } = useParams();
    console.log('id', id)

    return (
        <div>
            <h1>Invoice Page</h1>
            {id && <Invoice id={parseInt(id)} />}
        </div>
    )
}

export default InvoicePage
