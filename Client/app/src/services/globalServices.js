export function getIdFromResponse(responseMessage) {

    let regex = new RegExp("[Id]{1}[^\\s]+")
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