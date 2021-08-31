import { useContext, useState } from 'react';
import { TextField, Button, makeStyles, FormControl, Typography, Select, InputLabel, FormHelperText, Paper, FormControlLabel, Checkbox } from '@material-ui/core/';
import apiEndpoints from '../../../services/apiEndpoints';
import useFetchPost from '../../../hooks/useFetchPost';
import NotificationContext from '../../../Context/NotificationContext';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(3)

        },
    },
    pageContent: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        borderRadius: 15,
        padding: theme.spacing(3),



    }


}))




export default function NewBankAccountForm(props) {
    const {setGetBankAccounts,setOpenPopup}=props;
    const [bankAccount, setBankAccount] = useState({})
    const {setNotification}=useContext(NotificationContext);



    //Post new Bank account
    const[postBankAccountTrigger,setPostBankAccountTrigger]=useState(false);
    useFetchPost(apiEndpoints.createBankAccount,bankAccount,postBankAccountTrigger,setPostBankAccountTrigger,actionAfterSuccessfullyAddedBankAccount);
    
    function changeHandler(event) {
        let name=event.target.name;
        let value = event.target.value;
        console.log(name);
        console.log(value);
        setBankAccount(prevState=>({...prevState,[name]:value}))
        
    }

    function submitHandler(e) {
        e.preventDefault();
       setPostBankAccountTrigger(true)

    }
    function actionAfterSuccessfullyAddedBankAccount(){
        setOpenPopup(false);
        setGetBankAccounts(true);
        setNotification({isOpen:true,severity:"success",message:'Банковия сметка беше добавен успешно'})

    }




    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.pageContent} elevation={30}>
           
            <form className={classes.root} onSubmit={submitHandler}>
            <TextField
             required 
             variant="outlined" 
             value={bankAccount.nameOfAccount} 
             name="nameOfAccount"
              label="Име на акаунта" 
              onChange={changeHandler} />

            <TextField
             required 
             variant="outlined" 
             value={bankAccount.bankName} 
             name="bankName"
              label="Име на банката" 
              onChange={changeHandler} />

            <TextField 
            required 
            variant="outlined" 
            value={bankAccount.bicCode} 
            name="bicCode"
             label="BIC" 
             onChange={changeHandler} />

            <TextField 
            required 
             variant="outlined" 
             value={bankAccount.iban} 
             name="iban" 
             label="IBAN" 
             onChange={changeHandler} />
             
             <Button variant="contained" type="submit" color="primary">
                    Запази
            </Button>


            </form>
        </Paper >
    )
}
