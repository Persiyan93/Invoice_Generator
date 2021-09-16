import { Button, Typography, TableRow, makeStyles, TableCell } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
    button: {
        marginRight: '70%'
    }
})
export default function EmptyTableBody(props) {
    const { secondButton, button, rowText, countOfColumns } = props
   
    const classes = useStyles();
    return (
        <>
            <TableRow>
                <TableCell colSpan={countOfColumns}>
                    < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' ,fontWeight:500 }} >
                        {rowText}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={ countOfColumns }>
                    <Typography>
                        <Button className={classes.button} size="large" onClick={button.clickHandler}>
                            <AddCircleOutlineIcon />
                            {button.title}
                        </Button>
                        {secondButton &&
                            <Button size="large" onClick={secondButton.clickHandler}>
                                <AddCircleOutlineIcon />
                                {secondButton.title}
                            </Button>
                        }

                    </Typography>
                </TableCell >

            </TableRow>
        </>
    )
}
