
import { makeStyles,  Table, TableCell, TableContainer, TableHead, Paper, TableRow, } from '@material-ui/core/';
import ProgressIndicator from '../../../Elements/ProgressIndicator'
const useStyles = makeStyles(theme => ({
   
    table: {
       '& thead th': {
            fontWeight: '550',


        },
        '& tbody td': {
            fontWeight: '300',
            

        }, '& tbody tr:hover': {
            
            cursor: 'pointer'

        }
    },


}))
export default function InvoicesTableHead(props) {
    const { headCells,isLoading,} = props
     const classes = useStyles()
    return (

        <>
            <ProgressIndicator
                isLoading={isLoading} />
            <TableContainer component={Paper} className={classes.paper} >
                <Table className={classes.table} style={isLoading ? { opacity: '0.6' } : { opacity: '1.0' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {


                                headCells.map(headCell => (
                                    <TableCell align="right" key={headCell.id}>
                                        {headCell.title}
                                     </TableCell>

                                ))

                            }

                        </TableRow>
                    </TableHead>

                    {props.children}



                </Table >
            </TableContainer>

        </>
    );


}










