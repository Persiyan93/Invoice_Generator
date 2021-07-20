import { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core/';
import CompanyInfoCard from './CompanyInfoCard';
import InvoiceInfo from './InvoiceInfo';
import ArticleList from './ArticleList';
import ControlMenu from './ControlMenu';
const useStyles = makeStyles({
    title: {
        display: 'inline',
        textAlign:'center'
      
    },
    main: {
        marginTop: '10px',
        width:'100%',
        backgroundColor: '#67876F',
       

    }
})

const NewInvoice = (props) => {
    const classes = useStyles();
    return (

        <div>

            <Paper className={classes.main} elevation={5}>
                <div className={classes.title}>
                <h1 >Нова фактура</h1>
                </div>
               
                <Grid container alignItems="center">
                    {/* <Grid item md={1} /> */}
                    <Grid item md={2}>
                    <CompanyInfoCard></CompanyInfoCard>

                    </Grid>
                    <Grid item md={6} align="center" >
                        <InvoiceInfo></InvoiceInfo>
                    </Grid>
                    <Grid >
                    <CompanyInfoCard></CompanyInfoCard>
                    </Grid>
                </Grid>


               <ArticleList>

               </ArticleList>

        <ControlMenu></ControlMenu>
            </Paper>
        </div>
    );


}

export default NewInvoice