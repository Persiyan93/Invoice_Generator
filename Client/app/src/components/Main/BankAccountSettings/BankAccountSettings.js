import { useState, useEffect, useContext } from 'react';
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid, TextField, ThemeProvider, FormControl
    , FormControlLabel, FormLabel,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import TableWithPagingAndSorting from '../Elements/TableWithPagingAndSorting';
import NotificationContext from '../../../Context/NotificationContext';
import useFetchPost from '../../../hooks/useFetchPost';
import PageTitle from '../Elements/PageTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import apiEndpoints from '../../../services/apiEndpoints';
import useFetchGet from '../../../hooks/useFetchGet';
import ConfirmPopup from '../Popup/ConfirmPopup';
import useFetchDelete from '../../../hooks/useFetchDelete'
import { fontSize } from '@material-ui/system';
import NewBankAccountForm from './NewBankAccountForm';
import Popup from '../Popup';


const useStyles = makeStyles(theme => ({

    table: {


        '& thead th': {
            fontWeight: '550',


        },
        '& tbody td': {
            fontWeight: '300',
            //backgroundColor: '#DAD4D3',
            // backgroundColor: invoice

        }, 
    },

}))

const headCells = [
    { id: 'accountName', title: 'Име на акаунта' },
    { id: 'Iban', title: 'IBAN' },
    { id: 'BIC', title: 'BIC', disableSorting: 'true' },
    { id: 'bankName', title: 'Име на банката' },
    { id: 'action', title: '' },

]

export default function BankAccountSettings(props) {
    const { setNotification } = useContext(NotificationContext);
    const [isOpenPopup,setOpenPopup]=useState(false);
    const [isOpenConfirmationPopup,setOpenConfirmationPopup]=useState(false)
    const [bankAccounts, setBankAccounts] = useState([]);
    const [selectedBankAccountId,selectBankAccountId]=useState('')


    //States relatet with fetching bank accounts
    const [getBankAccountsTriger, setGetBankAccountsTriger] = useState(true);
    useFetchGet(apiEndpoints.getBankAccounts, setBankAccounts, getBankAccountsTriger, setGetBankAccountsTriger);

    //Remove bank account
    const[deleteBankAccountTriger,setDeleteBankAccountTriger]=useState(false)
    var deleteBankAccountUrl=apiEndpoints.deleteBankAccount+`/${selectedBankAccountId}`
    useFetchDelete(deleteBankAccountUrl,undefined,deleteBankAccountTriger,setDeleteBankAccountTriger,actionAfterSuccessfullyDeletedBankAccount)

    
    function actionAfterSuccessfullyDeletedBankAccount(){
        setGetBankAccountsTriger(true);
    }

    function addBankAccountHandler() {
            setOpenPopup(true)
    }


    function deleteBankAccountHandler(e,bankAccountId){
        selectBankAccountId(bankAccountId)
        setOpenConfirmationPopup(true)
    }
   

    const classes = useStyles();

    return (
        <>

            <PageTitle
                title="Банка"
                icon={<SettingsIcon fontSize='large' />}
                subTitle="Нстройки на Банковата сметка"
            />

            <TableContainer component={Paper} className={classes.paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {


                                headCells.map(headCell => (
                                    <TableCell align="left" key={headCell.id}>
                                        {headCell.title}

                                    </TableCell>

                                ))

                            }

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            bankAccounts.map(account => (
                                <TableRow key={account.id}>
                                    <TableCell >{account.accountName}</TableCell>
                                    <TableCell >{account.iban}</TableCell>
                                    <TableCell >{account.bicCode}</TableCell>
                                    <TableCell >{account.bankName}</TableCell>
                                    <TableCell align='right'>
                                        <IconButton onClick={(e)=>deleteBankAccountHandler(e,account.id)}>
                                            <DeleteIcon htmlColor='red'></DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                            ))

                        }
                        {bankAccounts.length == 0 &&
                            <TableRow>
                                <TableCell colSpan={5} style={{fontSize:17,fontWeight:'550'}}>Все още няма добавена банкова сметка</TableCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TableCell colSpan={5} align="right">
                                <Button size="large" onClick={addBankAccountHandler} >
                                    <AddCircleOutlineIcon />
                                   Добави банкова сметка
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>



                </Table >
            </TableContainer>
            <Popup
              setOpenPopup={setOpenPopup}
              openPopup={isOpenPopup}
              title='Нова Сметка'
              width='sm'
              //icon={<ListAltIcon color="default" size="large" />}
            >
                <NewBankAccountForm
                setGetBankAccounts={setGetBankAccountsTriger}
                setOpenPopup={setOpenPopup}
                />
            </Popup>
            <ConfirmPopup
                setOpenPopup={setOpenConfirmationPopup}
                openPopup={isOpenConfirmationPopup}
                actionAfterConfirmation={()=>setDeleteBankAccountTriger(true)}
                title='Премахване на Банковата сметка'
                question='Сигурни ли сте че искате да премахнете банковата сметка'
            >

            </ConfirmPopup>
        </>
    )
}
