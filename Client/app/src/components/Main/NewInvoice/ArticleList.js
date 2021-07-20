import React from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, Typography,Paper,Table,TableHead,TableRow,TableCell,TableBody,TableContainer} from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({

    title: {
        fontSize: 20,
    },
    root: {
        width: '90%',
        display: 'block',
        alignItems:'center',
        margin:60,
        marginBottom:40,
        // pading: '0 15px',
        borderRadius: 10,
        background: '#E6EAE9'




    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})

export default function ArticleList() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.root}  >
            <Table aria-label="collapsible table" className={classes.table}>

                <TableHead>
                    <TableRow>
                      
                        <TableCell align="left" >
                        Вид на стоката
                        </TableCell>
                        <TableCell align="left" >
                        Мярка
                        </TableCell>
                        <TableCell align="left" >
                        Количество
                        </TableCell>
                        <TableCell align="left" >
                        Еденична цена
                        </TableCell>
                        <TableCell align="center" >
                       Стойност
                        </TableCell>
                        <TableCell align="center" >
                       Действие
                        </TableCell>
            </TableRow>

            </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            Извършена транспортна услуга по заявка idjoasdjoiasdj
                        </TableCell>
                        <TableCell>
                            бр.
                        </TableCell>
                        <TableCell>
                           1
                        </TableCell>
                        <TableCell>
                           250
                        </TableCell>
                        <TableCell>
                           250
                        </TableCell>
                        <TableCell>
                           250
                        </TableCell>
                    </TableRow>

                </TableBody>
                
                <TableRow>
                        
                        <Typography>
                            <Button size="large">
                                <AddCircleOutlineIcon />
                                Добави Артикул
                            </Button>
                        </Typography>

                    </TableRow>
            </Table>
        </TableContainer>
    )
}
