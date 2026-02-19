import React, { useState } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { useNavigate } from "react-router-dom";
import type { InvoiceType } from "../../interfaces/InvoiceEnum";

type UploadInvoicePhotoProps = {
    agentId: number;
};


const UploadInvoicePhoto: React.FC<UploadInvoicePhotoProps> = ({ agentId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { uploadPhotoInvoice, uploading, uploadError, uploadedPhotoUrl } = useInvoiceStore();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log('Selected file:', file); // <- має показати name, size, type
            setSelectedFile(file);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile || !agentId) return;

        try {
            const res = await uploadPhotoInvoice(
                selectedFile,
                agentId,
                "INCOME" as InvoiceType
            );

            console.log("Upload response:", res);

            if (res && res.invoice && res.invoice.id) {
                navigate(`/invoice/${res.invoice.id}`);
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setSelectedFile(null);
        }
    };



    return (
        <div className="upload-invoice-photo">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading || !selectedFile}>
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
