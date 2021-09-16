import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '50%',
        marginTop: '15%',
        zIndex: 1900,
        position: 'fixed',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function ProgressIndicator(props) {
    const classes = useStyles();

    let { isLoading } = props;
    return (
        <div className={classes.root} style={isLoading ? { display: 'flex' } : { display: 'none' }}>
            <CircularProgress thickness={10}>

            </CircularProgress >

        </div>
    );
}