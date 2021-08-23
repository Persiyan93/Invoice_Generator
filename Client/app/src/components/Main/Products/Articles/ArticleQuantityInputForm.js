import { useEffect, useState } from 'react';
import { TextField, Button, makeStyles, FormControl, Typography, Select, InputLabel, FormHelperText, Paper, FormControlLabel, Checkbox } from '@material-ui/core/';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchPut from '../../../../hooks/useFetchPut';
import * as productsService from '../../../../services/productsService'
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




export default function ArticleQuantityInputForm(props) {
    const { articleInfo,actionAfterSuccessFullyUpdatedArticleQuantity } = props
    const [newQuantity, setNewQuantity] = useState(0)



    //Update article
    const [putArticleQuantityTriger, setPutArticleQuantityTriger] = useState(false);
    var updateArticleUrl = apiEndpoints.updateArticleQuantity + `/${articleInfo.id}`;
    useFetchPut(updateArticleUrl, putArticleQuantityTriger, setPutArticleQuantityTriger, {quantity: parseInt(newQuantity) },actionAfterSuccessFullyUpdatedArticleQuantity);






    function changeHandler(event) {
        
        let value = event.target.value;

        setNewQuantity(value)
        
    }

    function submitHandler(e) {
        e.preventDefault();
        setPutArticleQuantityTriger(true);

    }




    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.pageContent} elevation={30}>
            {/*  */}
            <form className={classes.root} onSubmit={submitHandler}>

                <Typography className={classes.title} component="h5" variant="h6" gutterBottom={false} align="center">
                    Име на артикула
                </Typography>
                <Typography className={classes.pos} color="textSecondary"align="center">
                    "{articleInfo.name}"
                </Typography>
                <Typography className={classes.title} component="h5" variant="h6" gutterBottom={false} align="center">
                    Номер на артикул
                </Typography>
                <Typography className={classes.pos} color="textSecondary" align="center">
                    {articleInfo.articleNumber}
                </Typography>
                <Typography className={classes.title} component="h5" variant="h6" gutterBottom={false} align="center">
                    Налично количество
                </Typography>
                <Typography className={classes.pos} color="textSecondary" align="center">
                    {articleInfo.quantity}
                </Typography>
                <TextField required type='number' variant="outlined" value={newQuantity} name="newQuantoty" label="Досртавено количество" onChange={changeHandler} />






                <Button variant="contained" type="submit" color="primary">
                    Запази
                </Button>


            </form>
        </Paper >
    )
}
