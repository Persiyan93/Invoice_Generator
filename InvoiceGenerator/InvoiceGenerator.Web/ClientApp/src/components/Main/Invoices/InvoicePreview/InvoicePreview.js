import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Popup from "../../../Elements/Popup";
import apiEndpoints from "../../../../services/apiEndpoints";

export default function InvoicePrevew(props) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    let { isInvoicePreviewOpen, openInvoicePreview, invoiceId } = props;


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Popup
            setOpenPopup={openInvoicePreview}
            openPopup={isInvoicePreviewOpen}
            title='Фактура'
            width='sm'>

            <Document

                file={{ url: `${apiEndpoints.downloadInvoice}/${invoiceId}`, }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </Popup>
    );
}