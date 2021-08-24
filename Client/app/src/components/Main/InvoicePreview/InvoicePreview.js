
import Popup from "../Popup";




import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function InvoicePrevew(props) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    let {isInvoicePreviewOpen,openInvoicePreview,invoiceId}=props;
  

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
                file={{ url: `http://localhost:45163/api/Documents/${invoiceId}`, }}
               // file={{ url: `https://www.dropbox.com/s/qegp77inokb1iim/8200d618-79de-4973-9ee2-89e271fec7d9.pdf?dl=0`, }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </Popup>
    );
}