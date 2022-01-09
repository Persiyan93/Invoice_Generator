import { useEffect, useState, } from 'react'
import { convertCompanyName, clientStatusFormater } from '../../../../../services/globalServices'
import { makeStyles, Typography } from '@material-ui/core/';




const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        height: 210,
        display: 'inline-flex',
        backgroundColor: '#F1F3EF'
    },
    companyDetails: {
        display: 'inline-block',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: "100%" 
    },
    maintText: {
        fontFamily: ' Garamond, serif',
        fontSize: 17,
        marginRight: '5px'

    },
    secondaryText: {
        fontSize: 20,
        marginRight: '20px',
        fontFamily: 'Trebuchet MS, sans-serif',
        fontWeight: 550
    },
    companyName: {
        marginTop: '20px',
        display: 'block',
        marginBottom: '10px'
    }

}))




export default function MainClientInfo(props) {
    const { clientInfo } = props

    const classes = useStyles();
    const { countOfOverdueInvoices, countOfUnpaidInvoices, status, uniqueIdentificationNumber, vatNumber } = clientInfo
    let statusColor=status=='Blocked'?'red':'green'

    return (
        <div className={classes.main}>
            <img src="pic_trulli.jpg" width="150" height="150" style={{ display: 'inline-block', marginLeft: '25px', marginTop: '25px' }} />
            <div className={classes.companyDetails}>
                <Typography className={classes.companyName} variant='h4'>{convertCompanyName(clientInfo)}</Typography>
                <Typography  style={{ display: 'block', marginBottom: '3px', color: statusColor,fontWeight:'bold' }} variant='h6'>{clientStatusFormater(status)}</Typography>
                <span className={classes.maintText}>ДДС номер:</span>
                <span className={classes.secondaryText}>{vatNumber}</span>
                <span className={classes.maintText}>ЕИК:</span>
                <span className={classes.secondaryText}>{uniqueIdentificationNumber}</span>
                <span className={classes.maintText}>Всички фактури:</span>
                <span className={classes.secondaryText}></span>
                <span className={classes.maintText}>Просрочени фактури :</span>
                <span className={classes.secondaryText}>{countOfOverdueInvoices}</span>
                <span className={classes.maintText}>Неплатени фактури :</span>
                <span className={classes.secondaryText}>{countOfUnpaidInvoices}</span>


            </div>








        </div>
    )
}
