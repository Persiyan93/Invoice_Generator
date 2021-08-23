



export function validateInvoiceInputModel(invoice){
    let errors=[];
    if(invoice.clientId==''){
        errors.push('Моля въведете клиент')
    }
    if(invoice.articles.length==0){
        errors.push('Не може да бъде създадена фактура без артикули')
    }
    if(invoice.paymentTerm){
        errors.push('Моля въведете срок за плащане')
    }
    if(invoice.isInvoiceWithZeroVatRate){
        if (invoice.reasonForInvoiceWithZeroVatRate=='') {
            errors.push('Моля въведете основание за нулева ставка')
        }
    }
    let issueDate=new Date(invoice.issueDate);
    let dateOfTaxEvent=new Date(invoice.dateOfTaxEvent);
    if(issueDate<dateOfTaxEvent){
        errors.push('Дата на издавване не може да бъде преди данъчното събитие')
    }
    console.log(typeof invoice.paymentPeriod)
    if(invoice.paymentPeriod<=0){
      
        errors.push('Срока за плащане трябва да бъде положително число.')
    }

    return errors;
}



export function validateArticleQuanitytyInInvoice(articlesInStock,requiredArticles){
    let error=''
    let articleWithError
  
    requiredArticles.forEach(element => {
        let articleInStock=articlesInStock.find(x=>x.id==element.id)
        console.log(articleInStock)
        console.log(element)
         if (articleInStock.quantity<element.quantity){

            articleWithError=articleInStock
            
         }
     });
     if(articleWithError){
        return `Недостатъчно бройки от артикул ${articleWithError.name} с артикулен номер:${articleWithError.articleNumber}`
     }
    
   
}
