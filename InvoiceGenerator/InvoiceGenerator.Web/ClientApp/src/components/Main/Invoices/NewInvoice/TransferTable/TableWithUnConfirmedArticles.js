import { useState } from 'react';
import {
    makeStyles, IconButton, Button,
    TableRow, TableBody, TableCell, Table, TableHead
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { validateArticleQuanitytyInInvoice } from '../../../../../services/validationService';
import { currencyFormater, unitTypeFormater } from '../../../../../services/globalServices';
import ConfirmPopup from '../../../../Elements/ConfirmationPopup';
import EditArticleQuantityForm from './EditArticleQuantityForm';
import SmallPopup from '../../../../Elements/Popup';




const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginBottom: '2px'
    },


}))

export default function ListWithUnConfirmedArticles(props) {
    const { setArticlesInRightTable, articlesInRightTable, setInvoiceDetails,
        setOpenPopup, setArticlesInLeftTable, articlesInLeftTable } = props;

    const [isOpenConfirmPopup, setOpenConfirmPopup] = useState(false);
    const [isOpenQuantityInputForm, setOpenQuantityInputForm] = useState(false);
    const [markedArticleIdForDeletion, selectArticleIdForDeletion] = useState('');
    const [editArticle, setArticleToBeEdited] = useState();

    function confirmHandler(e) {
        //Validate article quantity before submit 
        let error = validateArticleQuanitytyInInvoice(articlesInLeftTable, articlesInRightTable)
        if (error) {
            props.setNotification({ isOpen: true, messages: [error], postion: 'relative' })
        }
        else {
            setInvoiceDetails(prevState => ({ ...prevState, articles: [...articlesInRightTable] }))
            setOpenPopup(false)
        }

    }

    function deleteArticleHandler(e) {
        setArticlesInRightTable(prevState => ([...prevState.filter(x => x.id !== markedArticleIdForDeletion)]));
        selectArticleIdForDeletion('');
    }

    const classes = useStyles();
    return (
        <>

            <h3 className={classes.title}>Продукти</h3>
            <Table className={classes.table}>
                <TableHead>

                    <TableRow className={classes.tableRow}>

                        <TableCell >Име на артикул</TableCell>
                        <TableCell> Количество</TableCell>
                        <TableCell>Стойност</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        articlesInRightTable.map((article) => (
                            <TableRow key={article.id}>


                                <TableCell>
                                    {article.name}
                                </TableCell>

                                <TableCell >
                                    {article.quantity + ` ${unitTypeFormater(article.unitType)}`}
                                </TableCell>
                                <TableCell>
                                    {currencyFormater(article.quantity * article.unitPrice)}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={(e) => { setOpenQuantityInputForm(true); setArticleToBeEdited(article) }} >
                                        <EditIcon fontSize="medium" />
                                    </IconButton >

                                    <IconButton size="small" name={article.id} onClick={(e) => { setOpenConfirmPopup(true); selectArticleIdForDeletion(article.id) }}>
                                        <DeleteIcon fontSize="medium" htmlColor='#961E13' />
                                    </IconButton >
                                </TableCell>

                            </TableRow>
                        ))
                    }
                    {
                        articlesInRightTable.length != 0 &&
                        <TableRow>

                            <TableCell colSpan={3} align='right'>
                                <Button color='primary' size='small' variant='contained' onClick={confirmHandler}> Потвърди</Button>
                            </TableCell>
                        </TableRow>

                    }

                </TableBody>
            </Table>
            <ConfirmPopup
                setOpenPopup={setOpenConfirmPopup}
                actionAfterConfirmation={deleteArticleHandler}
                openPopup={isOpenConfirmPopup}
                title='Премахване на артикул'
                question='Сигурни ли сте че искате да премахнете артикула'
            />

            <SmallPopup
                setOpenPopup={setOpenQuantityInputForm}
                openPopup={isOpenQuantityInputForm}
                title='Въведете желаното количество'
            >

                <EditArticleQuantityForm
                    setArticlesInRightTable={setArticlesInRightTable}
                    setOpenPopup={setOpenQuantityInputForm}
                    setArticlesInLeftTable={setArticlesInLeftTable}
                    editArticle={editArticle}
                />
            </SmallPopup>
        </>

    )
}
