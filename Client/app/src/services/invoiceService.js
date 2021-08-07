import * as dataService from './dataService';
import endpoints from "./apiEndpoints";

export function saveInvoice(invoice) {
   return dataService.post(invoice, endpoints.addNewInvoice)

}

export function editInvoice(invoice,invoiceId) {
   console.log(invoice)
   return dataService.put(invoice,endpoints.invoices + `/${invoiceId}`)

}
export function getAllInvoices() {
   console.log(endpoints.invoices)
   return dataService.get(endpoints.invoices)

}

export function getInvoiceInfo(invoiceId) {
   return dataService.get(endpoints.invoices+`/${invoiceId}`)
}

export function downloadInvoice(invoiceId) {
   console.log(invoiceId)
   console.log(endpoints.documents)
   return dataService.get(endpoints.documents+`/${invoiceId}`)
}
export function updateInvoiceStatus(invoiceId,status){
   return dataService.post({invoiceIds:[invoiceId],status:status},endpoints.updateInvoiceStatus)
}

