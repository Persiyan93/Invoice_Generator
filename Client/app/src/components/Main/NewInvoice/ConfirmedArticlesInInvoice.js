
import { useState, useEffect, Fragment } from 'react'
import BaseTable from '../BaseTable'
import EmptyTableBody from '../../EmptyTableBody';
import {
    IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../Popup';
import ConfirmPopup from '../Popup/ConfirmPopup';
import TransferTable from './TransferTable';
import { currencyFormater, unitTypeFormater } from '../../../services/globalServices';
import OffeeredServicesTableInNewInvoiceView from '../Products/Services/OfferedServicesTableInNewInvoiceView';

const headElements = [
    { id: 0, title: 'Вид на стоката или услугата' },
    { id: 1, title: 'Мярка' },
    { id: 2, title: 'Количество' },
    { id: 3, title: 'Еденична цена' },
    { id: 4, title: 'Стойност' },
    { id: 5, title: 'Дейстиве' }

]

export default function ConfirmedArticlesInInvoice(props) {

    const { setInvoiceDetails, articles, vatValue, priceWithoutVat, isInvoiceWithZeroVatRate, services } = props;

    const [isOpenPopup, setOpenPopup] = useState(false)
    const [isOpenConfirmPopup, setOpenConfirmPopup] = useState(false)
    const [markedArticleIdForDeletion, selectArticleIdForDeletion] = useState('');
    const [isOpenAddServicePopup, setServicePopup] = useState(false);



    function addServiceHandler() {
        setServicePopup(true)

    }


    function addArticleHandler() {
        setOpenPopup(true)
    }
    function deleteArticle() {
        setInvoiceDetails(prevState => ({ ...prevState, articles: [...prevState.articles.filter(x => x.id != markedArticleIdForDeletion)] }))
    }
    let averageVatRate = isInvoiceWithZeroVatRate ? 0
        : (articles.reduce((sum, article) => { return sum + article.vatRate }, 0) +
            services.reduce((sum, service) => { return sum + service.vatRate }, 0))
        / (articles.length + services.length);
    return (
        <>
            <BaseTable
                headElements={headElements}
                isTableEmpty={articles.length == 0 && services.length == 0}
            >
                {articles.length == 0 && services.length == 0 ?
                    (<EmptyTableBody
                        rowText="Няма добавени артикули"
                        button={{ title: 'Добави артикул', clickHandler: setOpenPopup }}
                        secondButton={{ title: 'Добави услуга', clickHandler: addServiceHandler }}

                    />
                    )
                    :
                    (
                        <Fragment>

                            {articles.map(article => (
                                <TableRow key={article.id} hover={true}>
                                    <TableCell>{article.name}</TableCell>
                                    <TableCell>{unitTypeFormater(article.unitType)}</TableCell>
                                    <TableCell>{article.quantity}</TableCell>
                                    <TableCell>{currencyFormater(article.unitPrice)}</TableCell>
                                    <TableCell>{currencyFormater(article.unitPrice * article.quantity)}</TableCell>
                                    <TableCell align="left">



                                        <IconButton size="small" name={article.id} onClick={(e) => { setOpenConfirmPopup(true); selectArticleIdForDeletion(article.id) }}>
                                            <DeleteIcon fontSize="medium" htmlColor='#961E13' />
                                        </IconButton >


                                    </TableCell>
                                </TableRow>
                            ))}

                            {services.map(service => (
                                <TableRow key={service.id} hover={true}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{''}</TableCell>
                                    <TableCell>{service.quantity}</TableCell>
                                    <TableCell>{currencyFormater(service.price)}</TableCell>
                                    <TableCell>{currencyFormater(service.price * service.quantity)}</TableCell>
                                    <TableCell align="left">



                                        <IconButton size="small" name={service.id} onClick={(e) => { setOpenConfirmPopup(true); selectArticleIdForDeletion(service.id) }}>
                                            <DeleteIcon fontSize="medium" htmlColor='#961E13' />
                                        </IconButton >


                                    </TableCell>
                                </TableRow>
                            ))}


                            <TableRow>
                                <TableCell rowSpan={1} colSpan={1} />
                                <TableCell colSpan={3}>Всичко стойност</TableCell>
                                <TableCell align="left">{currencyFormater(priceWithoutVat)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={1} colSpan={1} />
                                <TableCell colSpan={2}>Данъчна ставка</TableCell>
                                <TableCell align="left">{averageVatRate}%</TableCell>
                                <TableCell align="left">{currencyFormater(vatValue)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={1} colSpan={1} />
                                <TableCell colSpan={3}>Общо</TableCell>
                                <TableCell align="left">{currencyFormater(priceWithoutVat + vatValue)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} align="left">
                                    <Button size="large" onClick={addArticleHandler} >
                                        <AddCircleOutlineIcon />
                                        Добави Артикул
                                    </Button>
                                </TableCell>
                                <TableCell colSpan={4} align="right">
                                    <Button size="large" onClick={addServiceHandler} >
                                        <AddCircleOutlineIcon />
                                        Добави услуга
                                    </Button>
                                </TableCell>
                            </TableRow>


                        </Fragment>

                    )

                }
            </BaseTable >


            {/* ArticlePopUp */}
            <Popup
                setOpenPopup={setOpenPopup}
                openPopup={isOpenPopup}
                title='Списък с артикули'
                width='xl'
                icon={<ListAltIcon color="default" size="large" />}
            >


                <TransferTable
                    setOpenPopup={setOpenPopup}
                    articlesFromInvoice={articles}
                    setInvoiceDetails={setInvoiceDetails}

                ></TransferTable>

            </Popup>


            {/* Service PopUp */}
            <Popup
                setOpenPopup={setServicePopup}
                openPopup={isOpenAddServicePopup}
                title='Списък с Услуги'
                width='xl'
                icon={<ListAltIcon color="default" size="large" />}
            >


                <OffeeredServicesTableInNewInvoiceView
                    setOpenPopup={setServicePopup}
                    articlesFromInvoice={articles}
                    setInvoiceDetails={setInvoiceDetails}
                    services={services}

                ></OffeeredServicesTableInNewInvoiceView>

            </Popup>

            <ConfirmPopup
                setOpenPopup={setOpenConfirmPopup}
                openPopup={isOpenConfirmPopup}
                actionAfterConfirmation={deleteArticle}
                title='Премахване на артикул'
                question='Сигурни ли сте че искате да премахнете артикула'
            >

            </ConfirmPopup>
        </>

    )
}

