import * as dataService from './dataService';
import endpoints from "./apiEndpoints";
import apiEndpoints from './apiEndpoints';

export function saveInvoice(invoice) {
    return dataService.post(invoice, endpoints.addNewInvoice + `?culture=${invoice.invoiceLanguage}`)

}

export function editInvoice(invoice, invoiceId) {
    console.log(invoice)
    return dataService.put(invoice, endpoints.invoices + `/${invoiceId}?culture=${invoice.invoiceLanguage}`)

}
export function getAllInvoices() {
    console.log(endpoints.invoices)
    return dataService.get(endpoints.invoices)

}

export function getInvoiceInfo(invoiceId) {
    return dataService.get(endpoints.invoices + `/${invoiceId}`)
}
export function getInvoiceDefaultOptions() {
    return dataService.get(endpoints.getInvoiceDefaultOptions)
}

export function downloadInvoice(invoiceId) {
    return dataService.get(apiEndpoints.downloadInvoice + `/${invoiceId}`);
}
export function updateInvoiceStatus(invoiceId, status) {
    return dataService.post({ invoiceIds: [invoiceId], status: status }, endpoints.updateInvoiceStatus)
}

