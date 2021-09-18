const vatNumberRegex = `^(ATU[0-9]{8}|BE[01][0-9]{9}|BG[0-9]{9,10}|HR[0-9]{11}|CY[A-Z0-9]{9}|CZ[0-9]{8,10}|DK[0-9]{8}|EE[0-9]{9}|FI[0-9]{8}|FR[0-9A-Z]{2}[0-9]{9}|DE[0-9]{9}|EL[0-9]{9}|HU[0-9]{8}|IE([0-9]{7}[A-Z]{1,2}|[0-9][A-Z][0-9]{5}[A-Z])|IT[0-9]{11}|LV[0-9]{11}|LT([0-9]{9}|[0-9]{12})|LU[0-9]{8}|MT[0-9]{8}|NL[0-9]{9}B[0-9]{2}|PL[0-9]{10}|PT[0-9]{9}|RO[0-9]{2,10}|SK[0-9]{10}|SI[0-9]{8}|ES[A-Z]([0-9]{8}|[0-9]{7}[A-Z])|SE[0-9]{12}|GB([0-9]{9}|[0-9]{12}|GD[0-4][0-9]{2}|HA[5-9][0-9]{2}))$`
const articleNumberRegex = `^[0-9]{6}$`
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export function validateInvoiceInputModel(invoice) {
    let errors = [];
    if (invoice.clientId == '') {
        errors.push('Моля въведете клиент')
    }
    if (invoice.articles.length === 0 && invoice.services.length === 0) {
        errors.push('Не може да бъде създадена фактура без артикул или услуга')
    }
    if (invoice.paymentTerm) {
        errors.push('Моля въведете срок за плащане')
    }
    if (invoice.isInvoiceWithZeroVatRate) {
        if (invoice.reasonForInvoiceWithZeroVatRate == '') {
            errors.push('Моля въведете основание за нулева ставка')
        }
    }
    let issueDate = new Date(invoice.issueDate);
    let dateOfTaxEvent = new Date(invoice.dateOfTaxEvent);
    if (issueDate < dateOfTaxEvent) {
        errors.push('Дата на издавване не може да бъде преди данъчното събитие')
    }

    if (invoice.paymentPeriod <= 0) {

        errors.push('Срока за плащане трябва да бъде положително число.')
    }
    if (invoice.paymentMethod === 'BankTransfer' && !invoice.bankAccountId) {
        errors.push('Моля изберете банкова сметка от падащотот меню')
    }

    return errors;
}



export function validateArticleQuanitytyInInvoice(articlesInStock, requiredArticles) {
    let error = ''
    let articleWithError

    requiredArticles.forEach(element => {
        let articleInStock = articlesInStock.find(x => x.id == element.id)
        console.log(articleInStock)
        console.log(element)
        if (articleInStock.quantity < element.quantity) {

            articleWithError = articleInStock

        }
    });
    if (articleWithError) {
        return `Недостатъчно бройки от артикул ${articleWithError.name} с артикулен номер:${articleWithError.articleNumber}`
    }


}


export function validateClientInputModel(client, setErrors,) {
    const errors = {}
    if (client.companyName.length == 0) {

        errors.companyName = 'Моля въветете името на фирмата'

    }
    var regex = new RegExp(vatNumberRegex);
    if (!regex.test(client.vatNumber)) {
        errors.vatNumber = 'Невалиден формат на ДДС номера'
    }
    if (client.address.country.length == 0) {

        errors.country = 'Моля въведете държава на регистрация на фирмата'

    }
    if (client.address.town.length == 0) {

        errors.town = 'Моля въведете град на регистрация на фирмата'

    }
    if (client.address.addressText == 0) {

        errors.addressText = 'Моля въведете точен адрес на фирмата'

    }
    if (client.companyType.length == 0) {

        errors.companyType = 'Моля изберете типа на фирмата от падащотот меню'

    }
    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true

    }
    return false;
}

export function validateArticleInputModel(article, setErrors) {
    let errors = {}
    if (article.name.length === 0) {
        errors.articleName = 'Моля попълнете името на артикула'
    }
    let regex = new RegExp(articleNumberRegex)
    if (!regex.test(article.articleNumber)) {
        errors.articleNumber = 'Невалиден формат на артикулния номер.Трябва да съдържа 6 цифри'
    }
    if (article.unitType.length === 0) {
        errors.unitType = 'Моля попълнете мерната еденица на артикула'
    }
    if (parseInt(article.quantity) <= 0) {
        errors.quantity = 'Количеството не може да бъде отрицателна'
    }
    if (parseInt(article.unitPrice) <= 0) {
        errors.unitPrice = 'Еденичната цена не може да бъде отрицателна'
    }
    if (parseInt(article.vatRate) < 0) {
        errors.vatRate = 'ДДС  не може да бъде отрицателно'
    }
    if (parseInt(errors.quantityLowerLimit) < 0) {
        errors.quantityLowerLimit = 'Долната граница не може да бъде отрицателна'
    }


    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true

    }
    return false;

}

export function validateService(service, setErrors) {
    let errors = {}
    if (service.name == '') {
        errors.serviceName = 'Моля въведете име на услугата'
    }
    if (parseInt(service.vatRate) < 0) {
        errors.vatRate = 'ДДС ставката трябва да бъде положителна'
    }
    if (parseInt(service.defaultPrice) < 0) {
        errors.defaultPrice = 'Цената по подразбиране трябва да бъде положителна'
    }

    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true

    }
    return false;

}

export function validateUserInputModel(user, setErrors) {
    const errors = {}
    if (user.fullName.length === 0) {
        errors.fullName = "Моля въведете името на служителя";

    }
    let regex = new RegExp(emailRegex)
    if (!regex.test(String(user.email).toLocaleLowerCase())) {
        errors.email = "Моля въведете валиден имейл адрес";
    }
    if (user.userName.length === 0) {
        errors.userName = "Моля въведете потребителско име"
    }

    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true

    }
    return false;
}

export function validateUserDetails(user, setErrors) {
    const errors = {}
    if (user.username.length === 0) {
        errors.username = "Моля въведете потребителско име";
    }
    if (user.name.length === 0) {
        errors.name = 'Моля въведете Име и фамилия'
    }
    let regex = new RegExp(emailRegex)
    if (!regex.test(String(user.email).toLocaleLowerCase())) {
        errors.email = 'Моля въведете валиден имейл адрес';
    }
    if (user.password.length === 0) {
        errors.password = 'Моля въведете парола'
    }
    if (user.password.length<6) {
        errors.password ='Минималната дължина на паролата е 6 символа'
    }
    if (user.password != user.repatPassword) {
      errors.repeatPassword = 'Двете пароли се различват.Моля проверете за грешка';
    }
   
    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true
    }
    return false;

}

export  function validateCompanyDetails(company, setErrors) {
    let errors = {}
    if (company.companyName.length === 0) {
        errors.companyName = 'Моля въведете имете но фирмата'
    }
    if (company.companyType.length === 0) {
        errors.companyType = 'Моля въведете вида на фирмата'
    }
    let regex = new RegExp(vatNumberRegex)
    if (!regex.test(company.vatNumber)) {
        errors.vatNumber = 'Моля въведете валиден ДДС Номер'
    }
    let countryCode = company.vatNumber.substring(0, 2);
    if (countryCode === 'BG' && company.uniqueIdentificationNumber.length == 0) {
        errors.uniqueIdentificationNumber = 'Моля въведете ЕИК.За български фирми той е задължителен';
    }
    if (countryCode === 'BG' && company.uniqueIdentificationNumber.length != 0) {
        let uniqueIdentificationNumber = company.uniqueIdentificationNumber;
        let expectedUniqueIdentificationNumer = company.vatNumber.substring(2, company.vatNumber.length)
        
        if (expectedUniqueIdentificationNumer != uniqueIdentificationNumber) {
            errors.uniqueIdentificationNumber = 'Моля въведете валиден ЕИК';
        }
    }
    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true
    }
    return false;

}
export function validateCompanyAddressDetails(address, setErrors) {
    let errors = {}
    console.log(address)
    if (address.country.length === 0) {
        errors.country = 'Моля въведете държава на регистрация '
    }
    if (address.town.length===0) {
        errors.town = 'Моля въведете насеселеното място'
    }
    
    if (address.addressText.length===0) {
        errors.addressText = 'Моля въведете точен адрес'
    }
    
    setErrors({ ...errors })
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        return true
    }
    return false;

}
