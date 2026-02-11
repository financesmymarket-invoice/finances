import React, { useState } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import type { InvoiceType } from "../../interfaces/IInvoice";
import { useNavigate } from "react-router-dom";

type UploadInvoicePhotoProps = {
    agentId: number;
};

const UploadInvoicePhoto: React.FC<UploadInvoicePhotoProps> = ({ agentId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { uploadPhotoInvoice, uploading, uploadError, uploadedPhotoUrl } = useInvoiceStore();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        // Передаємо тип як рядок "INCOME"
        const res = await uploadPhotoInvoice(selectedFile, agentId, "INCOME" as InvoiceType);
        setSelectedFile(null);
        navigate(`invoice/${res?.id}`)
    };

    return (
        <div className="upload-invoice-photo">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || uploading}>
                {uploading ? "Uploading..." : "Upload Photo"}
            </button>

            {uploadError && <p style={{ color: "red" }}>Error: {uploadError}</p>}

            {uploadedPhotoUrl && (
                <div>
                    <p>Uploaded Photo:</p>
                    <img src={uploadedPhotoUrl} alt="Invoice" style={{ maxWidth: "300px" }} />
                </div>
            )}
        </div>
    );
};

export default UploadInvoicePhoto;
