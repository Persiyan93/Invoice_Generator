import { makeStyles, Checkbox, TableCell, TableHead, TableRow, TableBody, } from '@material-ui/core/';
import { currencyFormater, unitTypeFormater } from '../../../../../services/globalServices';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginBottom: '2px'
    },
    tableRow: {
        borderTop: "outset",
        borderBottom: "outset",

    },

}))




export default function ArticlesTableInTransferTableComponent(props) {

    const { selectedProductsFromLeftTable, selectProductFromLeftTable, articles, productsFromRightTable } = props

    function changeHandler(e) {
        let id = e.target.id
        if (selectedProductsFromLeftTable.find(x => (x.id === id))) {
            selectProductFromLeftTable(prevState => (prevState.filter(x => x.id !== id)))
        }
        else {
           let product = articles.find(x => x.id == id);
            selectProductFromLeftTable(prevState => ([...prevState, product]))
        }
    }
    const classes = useStyles();
    return (
        <>
            <h3 className={classes.title}> Налични Продукти</h3>
            <TableHead>

                <TableRow className={classes.tableRow}>
                    <TableCell />
                    <TableCell >Име на артикула</TableCell>
                    <TableCell >Номер на артикула</TableCell>
                    <TableCell> Цена без ддс</TableCell>
                    <TableCell>Наличност</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell component="th" scope="row" padding="checkbox">
                                <Checkbox
                                    id={article.id}
                                    checked={selectedProductsFromLeftTable.some(x => x.id == article.id)}
                                    disabled={productsFromRightTable.some(x => x.id == article.id) || article.quantity == 0 || article.status == 'Blocked'}
                                    color="primary"
                                    onChange={changeHandler}

                                />
                            </TableCell>
                            <TableCell>
                                {article.name}
                            </TableCell>
                            <TableCell>
                                {article.articleNumber}%
                            </TableCell>
                            <TableCell>
                                {currencyFormater(article.unitPrice)}
                            </TableCell>

                            <TableCell>
                                {article.quantity + ` ${unitTypeFormater(article.unitType)}`}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

