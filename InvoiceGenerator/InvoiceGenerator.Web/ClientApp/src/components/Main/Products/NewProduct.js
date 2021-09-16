import { useHistory } from 'react-router';
import { IconButton, Paper, makeStyles, Typography, Card, Grid } from '@material-ui/core/';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ReactComponent as ServiceSvg } from '../../../resources/service.svg';
import { ReactComponent as ProductSvg } from '../../../resources/product.svg';
import PageTitle from '../../Elements/PageTitle'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: '7%',
        marginRight: '10%',
        marginBottom: '3%',
        borderRadius:10

    },
    card: {
        width: 350,
        height: 350,
        display: 'inline-block',
        marginTop: '20px',
        marginBottom: '21px',
        borderRadius: 20,
        background: '#E6EAE9',
        '&:hover': {
            backgroundColor: '#40BF5F',
        }
    }

}))
export default function NewProduct() {
    let history = useHistory();
  

        
    function addServiceHandler(event) {
        history.push('/Products/NewProduct/NewService')
    }

    function addArticleHandler(event) {
        history.push('/Products/NewProduct/NewArticle')
    }

    const classes = useStyles();
    return (
        <>
           
                <PageTitle
                title="Продукти"
                icon={<AddShoppingCartIcon fontSize='large' />}
                subTitle="Нов Продукт"
                />
            

            <Paper variant="outlined" className={classes.root} elevation={30}>
               
                <Grid container alignItems="center">
                    <Grid item md="2" />
                    <Grid item md="4">
                        <Card className={classes.card} variant="outlined" >

                            <IconButton onClick={addServiceHandler}>
                                <ServiceSvg style={{ height: 250, width: 300 }}/>
                            </IconButton>
                            < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 37 }} >
                                Добавяне на  услуга
                                </Typography>
                        </Card>
                    </Grid>
                    <Grid item md="1" />
                    <Grid item md="4">
                        <Card className={classes.card} variant="outlined" >
                            <IconButton onClick={addArticleHandler} style={{ fontSize: "1px" }}>
                                <ProductSvg style={{ height:250,width:300}} />
                            </IconButton>
                            < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center', marginBottom: '2' }} >
                                Добавяне на артикул
                                </Typography>
                        </Card>
                    </Grid>
                    <Grid item md="1" />
                </Grid>


            </Paper>

        </>

    )
}

