import React from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, Typography, AddCircleOutlineIcon, Grid,Select,MenuItem } from '@material-ui/core';
const useStyles = makeStyles({


    root: {
        backgroundColor: '#67876F',
    },
    card: {
        // position:'absolute',
        width: 350,
        height: 100,
        //  float:'right',

        display: 'inline-block',
        // marginRight: '10px',
        // padingRight: '15px',
        borderRadius: 7,
        background: '#E6EAE9'




    },
    cardElement:{
        display: 'flex',
        justifyContent:'space-between',
        marginRight:15,
        alignItems:'center'
    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})
export default function ControlMenu() {
    const classes = useStyles();
    return (
        <Grid container alignItems="center">
            <Grid item md="1" />
            <Grid item md="2" >
                <Button color='primary' variant="contained"> Създрай</Button>
            </Grid>

            <Grid item md="5" />

            <Grid item md="">

                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <div className={classes.cardElement}>
                        <Typography variant="subtitle1" component="h6" >
                            Начин на плащане:
                        </Typography>

                        <Select
                            value={10}
                            
                        >
                            <MenuItem value={10}>Банков превод</MenuItem>
                            <MenuItem value={20}>В брой</MenuItem>
                        
                        </Select>
                        </div>
                        <div className={classes.cardElement} >
                        <Typography variant="subtitle1" component="h6" >
                            Срок за плащане:
                        </Typography>
                        </div>
                        
                       
                    </CardContent>
                </Card>
            </Grid>






        </Grid>

    )
}
