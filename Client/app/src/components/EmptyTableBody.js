import {  Button, Typography, TableRow,makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
    button:{
        marginRight:'70%'
    }
})
export default function EmptyTableBody(props) {
    const {secondButton,button,rowText}=props
    const classes=useStyles();
    return (
        <TableRow>
            < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
               {rowText}
            </Typography>
            <Typography>
                <Button  className={classes.button} size="large" onClick={button.clickHandler}>
                    <AddCircleOutlineIcon />
                   { button.title}
                </Button>
                <Button size="large" onClick={secondButton.clickHandler}>
                    <AddCircleOutlineIcon />
                   { secondButton.title}
                </Button>
            </Typography>

        </TableRow>
    )
}
