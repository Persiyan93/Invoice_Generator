import {  Button, Typography, TableRow, } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
export default function EmptyTableBody(props) {
    const {button,rowText}=props
    return (
        <TableRow>
            < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
               {rowText}
            </Typography>
            <Typography>
                <Button size="large" onClick={button.clickHandler}>
                    <AddCircleOutlineIcon />
                   { button.title}
                </Button>
            </Typography>

        </TableRow>
    )
}
