export function validateInvoiceInputModel(invoice){
    let errors=[];
    if(invoice.clientId==''){
        errors.push('Моля въведете клиент')
    }
    if(invoice.articlies.length==0){
        errors.push('Не може да бъде създадена фактура без артикули')
    }
    if(invoice.paymentTerm){
        errors.push('Моля въведете срок за плащане')
    }
    if(invoice.isInvoiceWithZeroVatRate){
        if (invoice.reasonForInvoiceWithZeroVatRate=='') {
            errors.push('Мол въведете основание за нулева ставка')
        }
    }

    return errors;

}




