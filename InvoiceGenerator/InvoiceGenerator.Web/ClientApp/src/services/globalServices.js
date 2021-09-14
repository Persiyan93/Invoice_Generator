export function getIdFromResponse(responseMessage) {

    let regex = new RegExp("[I]{1}[d]{1}:[^\\s]+")
    let result = regex.exec(responseMessage);
    if (result) {
        return result[0].replace('Id:', '');

    }

}

export function convertCompanyName(company) {

    const { name, companyType } = company;
    let typeBg = ''
    switch (companyType) {
        case 'JoinStockCompany':
            typeBg = 'АД'
            break;
        case 'SoleТrader':
            typeBg = 'ЕТ'
            break;
        case 'Ltd':
            typeBg = 'ООД'
            break;
        case 'LtdWithOneOwner':
            typeBg = 'ЕООД'
            break;
        default:
            break;
    }

    let convertedName = `"${name}"` + ` ${typeBg}`;

    return convertedName;

}

export function currencyFormater(number) {
    let formater = new Intl.NumberFormat('bg', { style: 'currency', currency: 'BGN' })
    return formater.format(number)
}
export function unitTypeFormater(unitType) {
    let result = '';
    switch (unitType) {
        case 'Count':
            result = 'бр.'
            break;
        case 'Kilogram':
            result = 'кг.'
            break;

        default:
            break;
    }
    return result;
}

export function productStatusFormater(productStatus) {
    let result = ''
    if (productStatus == 'Blocked') {
        result = 'Блокиран'
    }
    else if (productStatus == 'Active') {
        result = 'Активен'
    }
    return result
}
export function clientStatusFormater(clientStatus) {
    let result = ''
    if (clientStatus == 'Blocked') {
        result = 'Блокиран'
    }
    else if (clientStatus == 'Active') {
        result = 'Активен'
    }
    return result
}

export function userStatusFormater(userStatus) {
    let result = ''
    if (userStatus == 'Blocked') {
        result = 'Блокиран'
    }
    else if (userStatus == 'Active') {
        result = 'Активен'
    }
    return result
}

export function invoiceStatusConverter(invoiceStatus) {
    let result = '';
    switch (invoiceStatus) {
        case 'Overdue':
            result = 'Просрочена'
            break;
        case 'WaitingForPayment':
            result = 'За плащане'
            break;
        case 'Paid':
            result = 'Платена'
            break;
        case 'Locked':
            result = 'Заключена'
            break;


        default:
            break;
    }
    return result;
}

export function eventTypeConverter(eventType) {
    var result = '';

    switch (eventType) {
        case 'CreateInvoice':
            result = 'Нова фактура'
            break;

        case 'EditInvoice':
            result = 'Промяна по фактурата'
            break;
        case 'EditArticle':
            result = 'Промяна по артикула'
            break;
        case 'AddNewArticle':
            result = 'Добавен Нов артикул'
            break;
        case 'ArticleDelivery':
            result = 'Заприхождаване на бройки'
            break;

        default:
            break;
    }
    return result
}

export function convertNotificationDate() {
    //   timeStamp => {
    //         const d = new Date(timeStamp * 1000);
    //         const n = d.getDate();
    //         const m = d.getMonth();
    //         const monthNames = [
    //           "JAN",
    //           "FEB",
    //           "MAR",
    //           "APR",
    //           "MAY",
    //           "JUN",
    //           "JUL",
    //           "AUG",
    //           "SEP",
    //           "OCT",
    //           "NOV",
    //           "DEC"
    //         ];
    //         return { date: `${n} ${monthNames[m]}`, time: timeStamp };
    //       };

}