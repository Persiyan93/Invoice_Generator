import { useState, useEffect } from 'react'
import {makeStyles,Grid,  Paper, Typography} from '@material-ui/core/';


const useStyles = makeStyles(theme => ({
    tableRow: {
        borderTop: "outset",
        borderBottom: "outset",

    },
    gridElement: {
        // border-left: 1px solid;
        borderTop: "solid",
        borderLeft: "solid",

        '&:hover': {
            backgroundColor: '#A1A397',
        },
        cursor: 'pointer',
        marginTop: 20,
        borderRadius: 2
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    table: {
        '& thead th': {
            fontWeight: '600',


        },
        '& tbody td': {
            fontWeight: '300',

        }, '& tbody tr:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px,5px',
        fontSize: '0.6rem',
        width: '70%',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    },
    menu: {
        marginBottom: '20px',
        borderRadius: '20px'
    }

}))

export default function ProductTableNavigationMenu(props) {
    const classes = useStyles();
    const { isArticleSelected, selectArticle } = props
    return (
        <Paper style={{ backgroundColor: '' }}>

            <Grid container alignItems="center"  >
                <Grid item md={6} sm={12} name="article" className={classes.gridElement} style={isArticleSelected ? { backgroundColor: '#40BF5F' } : {}} onClick={() => selectArticle(true)} >

                    < Typography variant="h8" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 20, fontWeight: 600 }} >
                        Артикули
                    </Typography>


                </Grid>
                <Grid item md={6} sm={12} name="service" className={classes.gridElement} style={isArticleSelected ? {} : { backgroundColor: '#40BF5F' }} onClick={() => selectArticle(false)}>
                    < Typography variant="h8" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 20, fontWeight: 600 }} >
                        Услуги
                    </Typography>
                </Grid>

            </Grid>


        </Paper>
    )

}
