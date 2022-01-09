
import { makeStyles, Paper, Table, TableHead, TableRow, TableCell,  TableContainer} from '@material-ui/core/';


const useStyles = makeStyles({
    table: {
        
        '& thead th': {
            fontWeight: '550',
        },
        '& tbody td': {
            fontWeight: '300',
        }, '& tbody tr:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },


})


export default function TableWithPaging(props) {
    const classes = useStyles();
    const { headCells, isTableEmpty } = props
   

    return (
       
            <Table aria-label="collapsible table" className={classes.table} >

                <TableHead>
                    {isTableEmpty ?
                        props.children
                        :

                        (
                            <TableRow>

                                {
                                    headCells.map((headElement) => (
                                        <TableCell align={headElement.align ? 'left' : headElement.align} key={headElement.id} >
                                            {headElement.title}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        )
                    }

                </TableHead>

                    {!isTableEmpty && props.children}
               


            </Table>
       
    )
}



