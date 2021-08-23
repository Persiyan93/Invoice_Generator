import { useEffect, useState,useContext, } from 'react';
import { useHistory } from 'react-router-dom'
import { TextField, Button, makeStyles, FormControl, MenuItem, Select, InputLabel, FormHelperText, Paper, FormControlLabel, Checkbox } from '@material-ui/core/';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchPut from '../../../../hooks/useFetchPut';
import useFetchPost from '../../../../hooks/useFetchPost';
import * as productsService from '../../../../services/productsService'
import PageTitle from '../../Elements/PageTitle'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import NotificationContext from '../../../../Context/NotificationContext';
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

const articleInitialValues = {
    articleNumber:Math.floor(100000 + Math.random() * 900000),
    unitType: '',
    name: '',
    vatRate: 0,
    quantity: 0,
    unitPrice: 0,
    quantityMonitoring: false,
    quantityLowerLimit:parseInt(0)
}

export default function NewArticleInputForm(props) {
    const { disableButton, articleInfo, setGetArticlesTriger, setOpenPopup } = props
    let history=useHistory();
    const {setNotification}=useContext(NotificationContext);
        const [article, setArticle] = useState(articleInitialValues)



    //Update article
    const [putArticleTriger, setPutArticleTriger] = useState(false);
    var updateArticleUrl = apiEndpoints.updateArticle + `/${articleInfo?.id}`;
    useFetchPut(updateArticleUrl, putArticleTriger, setPutArticleTriger, {...article,quantityLowerLimit:parseInt(article.quantityLowerLimit)},  actionAfterSuccessfullyUpdateArticle);

    //Add new article
    const [postArticleTriger, setPostArticleTriger] = useState(false);
    useFetchPost(apiEndpoints.addArticle, {...article,quantityLowerLimit:parseInt(article.quantityLowerLimit)}, postArticleTriger, setPostArticleTriger,actionAfterSuccessfullyAddedArticle);

    //Fill text fields  if form will be used to update article
    useEffect(() => {
        if (articleInfo) {
            setArticle({ ...articleInfo })
        }

    }, [articleInfo])

   
    function changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        if(name=='quantityLowerLimit'){
            console.log('Inside if')
            setArticle(prevState => ({ ...prevState, [name]: parseInt(value) }))
        }
        setArticle(prevState => ({ ...prevState, [name]: value }))
    }

    function submitHandler(e) {
        e.preventDefault();
        articleInfo ? setPutArticleTriger(true) : setPostArticleTriger(true);
    }

    function actionAfterSuccessfullyUpdateArticle() {
             setGetArticlesTriger(true)
            setOpenPopup(false);
            setNotification({isOpen:true,message:'Артикула беше редактиран успешнo', severity:'success'})
        
    }
    function actionAfterSuccessfullyAddedArticle(){
        setNotification({isOpen:true,message:'Артикула беше създаден успешно', severity:'success'})
        history.push('/Products/All')
    }
    function quantityMonitoringchangeHandler(e) {
        setArticle(prevState=>({...prevState, quantityMonitoring:!prevState.quantityMonitoring}))
    }
    const { name, unitType, unitPrice, quantity, vatRate, articleNumber, quantityMonitoring,quantityLowerLimit } = article
    const classes = useStyles();
    return (
        <>
        {
            !disableButton&&
            <PageTitle
            title="Артикули"
            icon={<AddCircleOutlinedIcon fontSize='large' />}
            subTitle="Нов Артикул"

        />
        }
        

           
        <Paper variant="outlined" className={classes.pageContent} elevation={30}>
            <form className={classes.root} onSubmit={submitHandler}>
                {!disableButton &&
                    <>
                        <TextField required variant="outlined" value={name} name="name" label="Име на артикул" onChange={changeHandler} />
                        <TextField required variant="outlined" value={articleNumber} name="articleNumber" label="Номер на артикула" onChange={changeHandler} />

                        <FormControl required className={classes.formControl} >
                            <InputLabel>Мярка</InputLabel>
                            <Select
                                required
                                name="unitType"
                                value={unitType}
                                onChange={changeHandler}
                                className={classes.selectEmpty}
                            >
                                <MenuItem value=""><em>-</em></MenuItem>
                                <MenuItem value="Count">Брой</MenuItem>
                                <MenuItem value="кilogram">Килограм</MenuItem>

                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <TextField required variant="outlined" name="quantity" value={quantity} label="Количестви" onChange={changeHandler} />




                    </>
                }
                <TextField required variant="outlined" value={unitPrice} name="unitPrice" label="Цена" onChange={changeHandler} />
                <TextField required variant="outlined" name="vatRate" value={vatRate} label="ДДС Ставка" onChange={changeHandler} />
                <FormControl>
                    <FormControlLabel
                        name='quantityMonitoring'
                        label='Известяване при достигане на зададеo количество'
                        checked={quantityMonitoring}
                        onChange={quantityMonitoringchangeHandler}
                        control={<Checkbox color='primary' />} />
                </FormControl>
                {
                    quantityMonitoring &&
                    <TextField required type='number' variant="outlined" value={quantityLowerLimit} name="quantityLowerLimit" label="Долна граница за известяване" onChange={changeHandler} />
                }


                {articleInfo ?
                    (

                        <Button variant="contained" type="submit" color="primary">
                            Запази промените
                        </Button>
                    )
                    :
                    (
                        <Button variant="contained" type="submit" color="primary">
                            Добави артикул
                        </Button>
                    )


                }


            </form>
        </Paper>
        </>
    )
}
