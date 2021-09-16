import { useState} from 'react'
import {makeStyles, TableCell,  Paper,  TableRow, TableBody,  TablePagination, IconButton} from '@material-ui/core/';
import TableWithPagingAndSorting from '../../../Elements/TableWithPagingAndSorting';
import getResultAfterPagingAndSorting from '../../../../services/sortingService'
import useFetchGet from '../../../../hooks/useFetchGet';
import useFetchPut from '../../../../hooks/useFetchPut';
import apiEndpoints from '../../../../services/apiEndpoints';
import { currencyFormater, unitTypeFormater, productStatusFormater } from '../../../../services/globalServices'
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmPopup from '../../../Elements/ConfirmationPopup'
import Popup from '../../../Elements/Popup'
import NewArticleInputForm from './NewArticleInputForm';
import CheckIcon from '@material-ui/icons/Check';
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import ArticleQuantityInputForm from './ArticleQuantityInputForm'



//const useStyles = makeStyles(theme => ({
//    tableRow: {
//        borderTop: "outset",
//        borderBottom: "outset",

//    },
//    gridElement: {

//        borderTop: "solid",
//        borderLeft: "solid",

//        '&:hover': {
//            backgroundColor: '#A1A397',
//        },
//        cursor: 'pointer',
//        marginTop: 20,
//        borderRadius: 2
//    },
//    root: {
//        '& > *': {
//            borderBottom: 'unset',
//        },
//    },
//    table: {
//        '& thead th': {
//            fontWeight: '600',


//        },
//        '& tbody td': {
//            fontWeight: '400',

//        }, '& tbody tr:hover': {
//            backgroundColor: '#DAD4D3',
//            cursor: 'pointer'

//        }
//    },
//    searchInput: {
//        opacity: '0.6',
//        padding: '0px,5px',
//        fontSize: '0.6rem',
//        width: '70%',
//        '&:hover': {
//            backgroundColor: '#f2f2f2'
//        },
//        '& .MuiSvgIcon-root': {
//            marginRight: '8px'
//        }
//    },
//    menu: {
//        marginBottom: '20px',
//        borderRadius: '20px'
//    }

//}))






const headCells = [

    { id: 'name', title: 'Име на артикула' },
    { id: 'articleNumber', title: 'Номер на артикула' },
    { id: 'unitType', title: 'Мерна еденица', disableSorting: 'true' },
    { id: 'unitPrice', title: 'Цена' },
    { id: 'vatRate', title: 'ДДС ставка' },
    { id: 'quantity', title: 'Наличност' },
    { id: 'status', title: 'Статус' },
    { id: 'action', title: 'Действие', disableSorting: 'true' },
]

const pages = [5, 10, 15]
export default function ArticleTable(props) {

    //States related with Paging and Sorting
    const { filterFunction } = props
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [isLoading, setIsLoading] = useState(true);


    const [articles, setArticles] = useState([]);
    const [isOpenEditArticlePopup, setOpenEditArticlePopup] = useState(false)
    const [isOpenConfirmPopup, setOpenConfirmPopup] = useState(false);
    const [isOpenEditArticleQuantityPopup, setOpenEditArticleQuantityPopup] = useState(false)
    const [selectedArticle, selectArticle] = useState({})
    const [newStatus, setNewStatus] = useState('')

    //Get articles
    const [getArticlesTriger, setGetArticlesTriger] = useState(true);
    useFetchGet(apiEndpoints.getAllArticles, setArticles, getArticlesTriger, setGetArticlesTriger)

    //Block article 
    const [putArticleTriger, setPutArticleTriger] = useState(false);
    var updateArticleUrl = apiEndpoints.updateArticle + `/${selectedArticle.id}`;
    useFetchPut(updateArticleUrl, putArticleTriger, setPutArticleTriger, { ...selectedArticle, status: newStatus }, actionAfterSuccessfullyupdatedArticle);

    function articlesAfterPagingAndSorting(event) {
        const { order, orderBy } = sorting
        const { page, rowsPerPage } = paging
        return getResultAfterPagingAndSorting(filterFunction.fn(articles), order, orderBy)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }



    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }));

    }

    function rowsPerPageHandler(event) {
        setPaging({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    }

    function actionAfterSuccessfullyupdatedArticle() {
        setGetArticlesTriger(true)
    }

    function blockArticleHandler(e, articleId) {
        setNewStatus('Blocked')
        setOpenConfirmPopup(true)
        selectArticle(articles.find(x => x.id === articleId));
    }

    function activateArticleHandler(e, articleId) {
        setNewStatus('Active')
        setOpenConfirmPopup(true)
        selectArticle(articles.find(x => x.id === articleId));
    }

    function blockArticle() {
        setPutArticleTriger(true);
        setOpenConfirmPopup(false)
    }

    function editArticleHandler(e, articleId) {
        selectArticle(articles.find(x => x.id === articleId))
        setOpenEditArticlePopup(true);
    }

    function editArticleQuantityHandler(e, articleId) {
        e.preventDefault()
        selectArticle(articles.find(x => x.id === articleId))
        setOpenEditArticleQuantityPopup(true)
    }

    function actionAfterSuccessFullyUpdatedArticleQuantity() {
        setOpenEditArticleQuantityPopup(false);
        setGetArticlesTriger(true)
    }


    return (
        <>

            <TableWithPagingAndSorting
                headCells={headCells}
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
                isLoading={isLoading}
                tableContainer={Paper}

            >
                <TableBody>
                    {
                        articlesAfterPagingAndSorting().map((article) => (
                            <TableRow key={article.id}>


                                <TableCell >
                                    {article.name}
                                </TableCell>
                                <TableCell >
                                    {article.articleNumber}
                                </TableCell>
                                <TableCell>
                                    {unitTypeFormater(article.unitType)}
                                </TableCell>
                                <TableCell>
                                    {currencyFormater(article.unitPrice)}
                                </TableCell>
                                <TableCell>
                                    {article.vatRate} %
                                </TableCell>
                                <TableCell>
                                    {article.quantity}
                                </TableCell>
                                <TableCell style={{ color: article.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                                    {productStatusFormater(article.status)}
                                </TableCell>
                                <TableCell align='right'>
                                    {article.status === 'Blocked' ?
                                        (
                                            <IconButton size="medium" onClick={(e) => { activateArticleHandler(e, article.id) }}>
                                                <CheckIcon id="block" fontSize="medium" htmlColor={'green'} />
                                            </IconButton>
                                        ) :
                                        (
                                            <IconButton id="activate" size="medium" onClick={(e) => { blockArticleHandler(e, article.id) }}>
                                                <BlockIcon id="block" fontSize="medium" htmlColor={'red'} />
                                            </IconButton>
                                        )

                                    }
                                    <IconButton size="medium" onClick={(e) => { editArticleHandler(e, article.id) }}>
                                        <EditIcon fontSize="small" htmlColor={'black'} />
                                    </IconButton>
                                    <IconButton size="medium" onClick={(e) => { editArticleQuantityHandler(e, article.id) }}>
                                        <ControlPointIcon fontSize="small" htmlColor={'black'} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>



            </TableWithPagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={articles.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={rowsPerPageHandler}
            />
            <ConfirmPopup
                setOpenPopup={setOpenConfirmPopup}
                openPopup={isOpenConfirmPopup}
                actionAfterConfirmation={blockArticle}
                title='Блокиране на артикул'
                question='Сигурни ли сте че искате да блокирате артикула'

            >

            </ConfirmPopup>
       
            <Popup
                title='Промяна на артикула'
                openPopup={isOpenEditArticlePopup}
                setOpenPopup={setOpenEditArticlePopup}

            >
                <NewArticleInputForm
                    disableButton={true}
                    articleInfo={selectedArticle}
                    setGetArticlesTriger={setGetArticlesTriger}
                    setOpenPopup={setOpenEditArticlePopup}
                />
            </Popup>

            <Popup
                title='Добавяне на ново количество'
                openPopup={isOpenEditArticleQuantityPopup}
                setOpenPopup={setOpenEditArticleQuantityPopup}

            >
                <ArticleQuantityInputForm
                    actionAfterSuccessFullyUpdatedArticleQuantity={actionAfterSuccessFullyUpdatedArticleQuantity}
                    articleInfo={selectedArticle}
                    setOpenPopup={setOpenEditArticleQuantityPopup}
                />
            </Popup>



        </>

    )
}

