import { useState, useEffect } from 'react'
import { IconButton, Paper, makeStyles, Typography, Card, Grid } from '@material-ui/core/';
import { ReactComponent as ServiceSvg } from '../../../service.svg';
import { ReactComponent as ProductSvg } from '../../../product.svg';
import NewArticleInputForm from './NewArticleInputForm';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#C3CFC6 ',
        alignItems: 'center',
        //display: 'flex',
    },
    card: {
        width: 350,
        height: 400,
        display: 'inline-block',
        marginTop: '20px',
        marginBottom: '21px',
        // pading: '0 15px',
        borderRadius: 20,
        background: '#E6EAE9',
        '&:hover': {
            backgroundColor: '#40BF5F',
        }
    }

}))
export default function InputForm() {
    const classes = useStyles();
    const [productType,setProductType]=useState();

    function addServiceHandler(event){
        setProductType('service')
    }
    function addArticleHandler(event){
        setProductType('article')
    }
    return (
        <>
        {
            !productType &&
            <Paper variant="outlined" className={classes.root} elevation={30}>
            < Typography variant="h4" gutterBottom component="div" style={{ textAlign: 'center', marginТop: '3' }} >
                Създавене на услуга или артикул
            </Typography>
            <Grid container alignItems="center">
                <Grid item md="2" />
                <Grid item md="4">
                    <Card className={classes.card} variant="outlined" >

                        <IconButton onClick={addServiceHandler}>
                            <ServiceSvg />
                        </IconButton>
                        < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 37 }} >
                            Добавяне на  услуга
                        </Typography>
                    </Card>
                </Grid>
                <Grid item md="1" />
                <Grid item md="4">
                    <Card className={classes.card} variant="outlined" >
                        <IconButton onClick={addArticleHandler}>
                            <ProductSvg />
                        </IconButton>
                        < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center', marginBottom: '2' }} >
                            Добавяне на артикул
                        </Typography>
                    </Card>
                </Grid>
                <Grid item md="1" />
            </Grid>


        </Paper>
        }
        {
            productType=='service'?
            <div/>:
            <NewArticleInputForm></NewArticleInputForm>
          


        }
        </>
        








    )
}

