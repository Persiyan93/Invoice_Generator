
import { useState, useEffect} from 'react'
import { Paper, makeStyles, Button, Grid } from '@material-ui/core'
import ConfirmPopup from '../../../../Elements/ConfirmationPopup';
import SmallPopup from '../../../../Elements/Popup';
import ArticleQuantityInputForm from './ArticleQuantityInputForm';
import ArticleListInTransferTable from './ArticlesTableInTransferTableComponent';
import * as productService from '../../../../../services/productsService'
import ListWithUnConfirmedArticles from './TableWithUnConfirmedArticles';
import BasicAlert from '../../../../Elements/BasicAlert'
const useStyles = makeStyles({
    leftButton: {
        marginLeft: '10px'
    },
    productTable: {
        width: '50%'
    },
    title: {
        fontSize: 20,
    },
    root: {
        display: 'inline'
    },
    buttons: {
        width: '10%'
    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})
export default function TransferTable(props) {

    const { setInvoiceDetails, articlesFromInvoice, } = props
    const [selectedArticlesFromLeftTable, selectArticlesFromLeftTable] = useState([]);
    const [articlesInRightTable, setArticlesInRightTable] = useState([])
    const [articlesInLeftTable, setArticlesInLeftTable] = useState([])
    const [isOpenPopup, setOpenPopup] = useState(false)

    const [notification, setNotification] = useState({ isOpen: false, message: '' })


    useEffect(() => {
        setArticlesInRightTable(prevState => ([...articlesFromInvoice]))
        productService.getAllArticles()
            .then(response => response.json())
            .then(response => {
                if (response.status == "Unsuccessful") {
                    console.log(response);
                }
                else {
                    setArticlesInLeftTable(response)
                }
            })
            .catch(err => {
                setTimeout(productService.getAllArticles(), 5000)

            })

    }, [])




    const classes = useStyles();
    return (
        <>

            <BasicAlert
                notification={notification}
                setNotification={setNotification}
            />
            <Paper className={classes.root}>
                <Grid container >
                    <Grid item md={6}>
                        <ArticleListInTransferTable
                            articles={articlesInLeftTable}
                            selectedProductsFromLeftTable={selectedArticlesFromLeftTable}
                            selectProductFromLeftTable={selectArticlesFromLeftTable}
                            productsFromRightTable={articlesInRightTable}
                        />

                    </Grid>
                    <Grid item md={1}>
                        <Button
                            style={{ marginLeft: '10px', marginTop: '200px' }}
                            variant="contained"
                            size="small"
                            color={selectedArticlesFromLeftTable.length != 0 ? 'primary' : 'default'}
                            onClick={() => { setOpenPopup(true) }}
                            disabled={selectedArticlesFromLeftTable.length === 0}
                        >
                            {'>>'}
                        </Button>

                    </Grid>
                    <Grid item md={5}>
                        <ListWithUnConfirmedArticles
                            setArticlesInRightTable={setArticlesInRightTable}
                            setArticlesInLeftTable={setArticlesInLeftTable}
                            articlesInRightTable={articlesInRightTable}
                            articlesInLeftTable={articlesInLeftTable}
                            setInvoiceDetails={setInvoiceDetails}
                            setOpenPopup={props.setOpenPopup}
                            setNotification={setNotification}
                        ></ListWithUnConfirmedArticles>

                    </Grid>

                </Grid>



            </Paper>

            <SmallPopup
                setOpenPopup={setOpenPopup}
                openPopup={isOpenPopup}
                title='Въведете желаното количество'
            >

                <ArticleQuantityInputForm
                    setProductsInRightTable={setArticlesInRightTable}
                    selectedProductsFromLeftTable={selectedArticlesFromLeftTable}
                    setOpenPopup={setOpenPopup}
                    selectProductFromLeftTable={selectArticlesFromLeftTable}
                    setProductsInLeftTable={setArticlesInLeftTable}

                />
            </SmallPopup>

        </>
    )
}
