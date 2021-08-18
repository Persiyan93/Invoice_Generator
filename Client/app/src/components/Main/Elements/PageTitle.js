import React from 'react'
import { Paper, Card,Typography, makeStyles, colors } from '@material-ui/core/';

const useStyles=makeStyles(theme=>({
    root:{
        //backgroundColor:'black'
        width:'80%',
        marginLeft:theme.spacing(10),
        borderRadius:10
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(3)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        colors:'black'
    },
    pageTitel:{
        paddingLeft:theme.spacing(3)
    }

    
}))
export default function PageTitle(props) {
    const {title,subTitle,icon}=props

    const classes=useStyles();
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                {icon}
                </Card>
                <div className={classes.pageTitel}>
                    <Typography
                    variant="h6"
                    component="div"
                    >
                        {title}
                    </Typography>
                </div>
            </div>  
        </Paper>
    )
}
