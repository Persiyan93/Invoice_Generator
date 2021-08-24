import { useEffect, useState,useContext } from 'react';
import { useHistory } from 'react-router';
import { TextField, Button, makeStyles, FormControl, MenuItem, Select, InputLabel, FormHelperText, Paper, FormControlLabel, Checkbox } from '@material-ui/core/';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchPut from '../../../../hooks/useFetchPut';
import useFetchPost from '../../../../hooks/useFetchPost';
import * as productsService from '../../../../services/productsService'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import NotificationContext from '../../../../Context/NotificationContext'
import PageTitle from '../../Elements/PageTitle'
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },
    },
    pageContent: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        borderRadius: 15,
        padding: theme.spacing(3)

    }


}))

const serviceInitialValues = {
    serviceNumber: Math.floor(100000 + Math.random() * 900000),
    name: '',
    vatRate: 0,
    defaultPrice: 0,
   
  
}

export default function NewServiceInputForm(props) {
    const {setNotification}=useContext(NotificationContext)
    const history=useHistory();
   const [service,setService] = useState(serviceInitialValues)



   
    //Add new article
    const [postServiceTriger, setPostServiceTriger] = useState(false);
     useFetchPost(apiEndpoints.addNewService, { ...service }, postServiceTriger, setPostServiceTriger,actionAfterSuccessffullyCreatedService);
     function actionAfterSuccessffullyCreatedService(){
        setNotification({isOpen:true,message:'Услугата беше добавена успешно', severity:'success'})
        history.push('/Products/All')
     }

   

    
    function changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
      
        setService(prevState => ({ ...prevState, [name]: value }))
    }

    function submitHandler(e) {
        e.preventDefault();
        setPostServiceTriger(true)
     
    }

   
  
    const { name,  vatRate, serviceNumber,  defaultPrice } = service
    const classes = useStyles();
    return (
        <>
        <PageTitle
            title="Услуги"
            icon={<SettingsOutlinedIcon fontSize='large' />}
            subTitle="Нова Услуга"

        />
        <Paper variant="outlined" className={classes.pageContent} elevation={30}>
            <form className={classes.root} onSubmit={submitHandler}>


                <TextField required variant="outlined" value={name} name="name" label="Име на усллугата" onChange={changeHandler} />

                <TextField required variant="outlined" name="vatRate" value={vatRate} label="ДДС Ставка" onChange={changeHandler} />
                <TextField required variant="outlined" value={defaultPrice} name="defaultPrice" label="Цена по подразбиране" onChange={changeHandler} />
                <TextField required variant="outlined" value={serviceNumber} name="serviceNumber" label="Номер на услугата" onChange={changeHandler} />


                
                <Button variant="contained" type="submit" color="primary">
                    Добави услугата
                </Button>





            </form>
        </Paper>
        </>
    )
}
