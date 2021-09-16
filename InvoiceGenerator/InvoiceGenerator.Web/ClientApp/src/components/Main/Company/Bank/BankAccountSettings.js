import { useState, useContext } from 'react';
import { Paper, makeStyles, IconButton, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationContext from '../../../../Context/NotificationContext';
import PageTitle from '../../../Elements/PageTitle';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchGet from '../../../../hooks/useFetchGet';
import ConfirmPopup from '../../../Elements/ConfirmationPopup';
import Popup from '../../../Elements/Popup';
import useFetchDelete from '../../../../hooks/useFetchDelete';
import NewBankAccountForm from './NewBankAccountForm';



const useStyles = makeStyles(theme => ({

    table: {
        '& thead th': {
            fontWeight: '550',
        },
        '& tbody td': {
            fontWeight: '300',


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
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [isOpenConfirmationPopup, setOpenConfirmationPopup] = useState(false)
    const [bankAccounts, setBankAccounts] = useState([]);
    const [selectedBankAccountId, selectBankAccountId] = useState('')


    //States related with fetching bank accounts
    const [getBankAccountsTriger, setGetBankAccountsTriger] = useState(true);
    useFetchGet(apiEndpoints.getBankAccounts, setBankAccounts, getBankAccountsTriger, setGetBankAccountsTriger);

    //Remove bank account
    const [deleteBankAccountTriger, setDeleteBankAccountTriger] = useState(false)
    var deleteBankAccountUrl = apiEndpoints.deleteBankAccount + `/${selectedBankAccountId}`
    useFetchDelete(deleteBankAccountUrl, undefined, deleteBankAccountTriger, setDeleteBankAccountTriger, actionAfterSuccessfullyDeletedBankAccount)


    function actionAfterSuccessfullyDeletedBankAccount() {
        setGetBankAccountsTriger(true);
    }

    function addBankAccountHandler() {
        setOpenPopup(true)
    }


    function deleteBankAccountHandler(e, bankAccountId) {
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
                                        <IconButton onClick={(e) => deleteBankAccountHandler(e, account.id)}>
                                            <DeleteIcon htmlColor='red'></DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                            ))

                        }
                        {bankAccounts.length == 0 &&
                            <TableRow>
                                <TableCell colSpan={5} style={{ fontSize: 17, fontWeight: '550' }}>Все още няма добавена банкова сметка</TableCell>
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
            >
                <NewBankAccountForm
                    setGetBankAccounts={setGetBankAccountsTriger}
                    setOpenPopup={setOpenPopup}
                />
            </Popup>
            <ConfirmPopup
                setOpenPopup={setOpenConfirmationPopup}
                openPopup={isOpenConfirmationPopup}
                actionAfterConfirmation={() => setDeleteBankAccountTriger(true)}
                title='Премахване на Банковата сметка'
                question='Сигурни ли сте че искате да премахнете банковата сметка'
            >

            </ConfirmPopup>
        </>
    )
}
