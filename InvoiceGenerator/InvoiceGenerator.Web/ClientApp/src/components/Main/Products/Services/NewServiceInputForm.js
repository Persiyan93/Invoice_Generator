import {useState } from 'react';
import { useHistory } from 'react-router';
import { TextField, Button, makeStyles, Paper} from '@material-ui/core/';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchPost from '../../../../hooks/useFetchPost';
import { validateService } from '../../../../services/validationService';
import PageTitle from '../../../Elements/PageTitle';

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
    serviceNumber: '',
    name: '',
    vatRate: 0,
    defaultPrice: 0,
}

export default function NewServiceInputForm(props) {
     const history = useHistory();
    const [service, setService] = useState(serviceInitialValues)
    const [errors, setErrors] = useState({})




    //Add new article
    const [postServiceTriger, setPostServiceTriger] = useState(false);
    useFetchPost(apiEndpoints.addNewService, { ...service }, postServiceTriger, setPostServiceTriger, actionAfterSuccessffullyCreatedService);

    function actionAfterSuccessffullyCreatedService() {
        history.push('/Products/All')
    }




    function changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;

        setService(prevState => ({ ...prevState, [name]: value }))
    }

    function submitHandler(e) {
        e.preventDefault();
        if (validateService(service, setErrors)) {
            setPostServiceTriger(true)
        }
    }


    const { name, vatRate, defaultPrice } = service
    const classes = useStyles();
    return (
        <>
            <PageTitle
                title="Услуги"
                icon={<SettingsOutlinedIcon fontSize='large' />}
                subTitle="Нова Услуга"

            />
            <Paper variant="outlined" className={classes.pageContent} elevation={30}>
                <form className={classes.root} onSubmit={submitHandler} noValidate>
                    <TextField
                        required
                        helperText={errors.serviceName}
                        error={errors.serviceName}
                        variant="outlined"
                        value={name}
                        name="name"
                        label="Име на усллугата"
                        onChange={changeHandler}
                    />
                    <TextField
                        required
                        helperText={errors.vatRate}
                        error={errors.vatRate}
                        variant="outlined"
                        name="vatRate"
                        value={vatRate}
                        label="ДДС Ставка"
                        onChange={changeHandler}
                    />
                    <TextField
                        required
                        helperText={errors.defaultPrice}
                        error={errors.defaultPrice}
                        variant="outlined"
                        value={defaultPrice}
                        name="defaultPrice"
                        label="Цена по подразбиране"
                        onChange={changeHandler}
                    />

                    <Button variant="contained" type="submit" color="primary">
                        Добави услугата
                    </Button>





                </form>
            </Paper>
        </>
    )
}
