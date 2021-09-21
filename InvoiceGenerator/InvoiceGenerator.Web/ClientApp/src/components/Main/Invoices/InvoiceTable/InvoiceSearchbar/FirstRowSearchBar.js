import { makeStyles, TextField, MenuItem, Select} from '@material-ui/core/';
const useStyles = makeStyles(theme => ({
    tableRow: {
        marginBottom: '50px',
        paddintBottom:'20px'

    },
   

}))

export default function FirstRowSearchBar(props) {
    const { changeSearchParametersHandler, searchParameters } = props

    let { invoiceNumber, dateFrom, dateTo, invoiceStatus } = searchParameters
    const classes = useStyles();
    return (


        <tr className={classes.tableRow}>
            <td align="right" valign="center">
                Фак. &#8470;
                        </td>

            <td>
                <table cellPadding="10" cellSpacing="0">
                    <tbody >
                        <tr>

                            <td>
                                <TextField
                                    value={invoiceNumber}
                                    name='invoiceNumber'
                                    onChange={changeSearchParametersHandler}
                                    variant="outlined"
                                    size="small"
                                />
                            </td>


                            <td align="right" valign="center">
                                <font style={{ fontWeight: 600, fontSize: 14, }}>&nbsp;&nbsp;От дата:</font>
                            </td>
                            <td>&nbsp;</td>
                            <td valign="center">
                                <TextField
                                    name='dateFrom'
                                    variant='outlined'
                                    type="date"
                                    size='small'
                                    value={dateFrom}
                                    onChange={changeSearchParametersHandler}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}


                                />
                                <br />
                            </td>

                            <td align="right" valign="center">
                                <font style={{ fontWeight: 600, fontSize: 14, }}>&nbsp;&nbsp;До дата:</font>
                            </td>
                            <td>&nbsp;</td>
                            <td valign="center">
                                <TextField
                                    name='dateTo'
                                    variant='outlined'
                                    type="date"
                                    size='small'
                                    value={dateTo}
                                    onChange={changeSearchParametersHandler}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}


                                />
                                <br />
                            </td>
                            <td align="right" valign="center">
                                <font style={{ fontWeight: 600, fontSize: 14, }}>&nbsp;&nbsp;Статус:</font>
                            </td>
                            <td>&nbsp;</td>
                            <td>
                              
                           
                                <Select
                                    name='invoiceStatus'
                                    value={invoiceStatus}
                                    onChange={changeSearchParametersHandler}
                                >
                                    <MenuItem value={'All'}>Всички</MenuItem>
                                    <MenuItem value={'Paid'}>Платен</MenuItem>
                                    <MenuItem value={'Overdue'}>Просрочен</MenuItem>
                                    <MenuItem value={'WaitingForPayment'}>Изчаква плащане</MenuItem>
                                    <MenuItem value={'Locked'}>Заключен</MenuItem>
                                </Select>
    
                            </td>


                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>


    )
}