import { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router';
import { IconButton, Paper, makeStyles, Typography, Card, Grid } from '@material-ui/core/';
import { ReactComponent as ServiceSvg } from '../../../resources/service.svg';
import { ReactComponent as ProductSvg } from '../../../resources/product.svg';


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
export default function NewProduct() {
    let history = useHistory();
    const classes = useStyles();
    const [locationKeys, setLocationKeys] = useState([])
    const [productType, setProductType] = useState();

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH') {
                setLocationKeys([location.key])
            }

            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([_, ...keys]) => keys)

                    // Handle forward event

                } else {
                    setLocationKeys((keys) => [location.key, ...keys])

                    console.log('back button was')

                }
            }
        })
    }, [locationKeys,])
    function addServiceHandler(event) {

        history.push('/Products/NewProduct/NewService')

    }
    function addArticleHandler(event) {

        history.push('/Products/NewProduct/NewArticle')
    }
    return (
        <Fragment>

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

        </Fragment>









    )
}

