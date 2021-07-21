import { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core/';

import CompanyInfoCard from './CompanyInfoCard';
import InvoiceInfo from './InvoiceInfo';
import ArticleList from './ArticleList';
import ControlMenu from './ControlMenu';
import useFetch from '../../../hooks/useFetch'
import apiEndpoints from '../../../services/apiEndpoints'
const useStyles = makeStyles({
    title: {
        display: 'inline',
        textAlign: 'center'

    },
    main: {
        marginTop: '10px',
        width: '100%',
        backgroundColor: '#67876F',


    }
})

const NewInvoice = (props) => {
    const [count, setCount] = useState(0);
    const [sellerInfo, setSellerInfo] = useState({});
    const [clientInfo,setClientInfo]=useState({});
    const [clientId,setClientId]=useState('');
    const [companyInfo] = useFetch(apiEndpoints.companyInfo);
    const [response]=useFetch(apiEndpoints.clientInfo+`/${clientId}`)
  
    useEffect(()=>{
        if(clientId!=''){
            console.log(clientId)
            console.log(response)
        }
    },[clientId])

    useEffect(() => {
        if (companyInfo) {
            const { address } = companyInfo
            setSellerInfo((prevState) => ({ ...companyInfo,address: address.country + ',гр. ' + address.town + ' , ' + address.addressText  }))
            
        }

    }, [companyInfo])

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
                        <CompanyInfoCard
                          setClientId={setClientId}

                        >
                            Получател
                        </CompanyInfoCard>

                    </Grid>
                    <Grid item md={6} align="center" >
                        <InvoiceInfo></InvoiceInfo>
                    </Grid>
                    <Grid >
                        <CompanyInfoCard
                            companyInfo={{ ...sellerInfo }}
                            disableButton={true}
                        >
                            Доставчик
                        </CompanyInfoCard>
                    </Grid>
                </Grid>


                {/* <ArticleList>

                </ArticleList> */}

                {/* <ControlMenu></ControlMenu> */}
            </Paper>
        </div>
    );


}

export default NewInvoice