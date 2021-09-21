import { makeStyles, TextField, Button, MenuItem, Select,FormControl } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import UsersSelect from './UsersSelect'

const useStyles = makeStyles(theme => ({
    searchBarRow: {
        marginTop: theme.spacing(2),
    },
    button: {
        position: 'relative',
        left: '150px',
        bottom: '3px',
        mmarginLeft: '20px'
    }




}))



export default function SecondRowSearchBar(props) {
    const { changeSearchParametersHandler, pressSurchButtonHandler, searchParameters } = props


    const classes = useStyles();
    let { orderBy, clientName, order } = searchParameters
    return (


        <tr className={classes.searchBarRow}>
            <td align="right" valign="center">
                Получател:
            </td>
            <td>
                <table cellPadding="2" cellSpacing="10">
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                    variant="outlined"
                                    name="clientName"
                                    placeholder='Име на получателя'
                                    value={clientName}
                                    onChange={changeSearchParametersHandler}
                                    size="small"
                                />
                            </td>
                            <UsersSelect
                                createdBy={searchParameters.createdBy}
                                changeSearchParametersHandler={changeSearchParametersHandler}
                            />
                            <td align="right" valign="center">
                                <font style={{ fontWeight: 600, fontSize: 14 }}>&nbsp;&nbsp;Подреди по:</font>
                            </td>
                            <td>&nbsp;</td>
                            <td>
                                <FormControl style={{ maxWidth: 200, minWidth: 200 }}>
                                <Select
                                    value={orderBy}
                                    onChange={changeSearchParametersHandler}
                                    name="orderBy"
                                >
                                    <MenuItem value={'InvoiceNumber'}>Номер на фактура</MenuItem>
                                    <MenuItem value={'IssueDate'}>Дата на издаване</MenuItem>
                                    <MenuItem value={'PaymentDueDate'}>Падежна дата</MenuItem>
                                    <MenuItem value={'PriceWithVat'}>Стойност</MenuItem>
                                    <MenuItem value={'ClientName'}>Име на клиент</MenuItem>
                                    </Select>
                                    </FormControl>
                            </td>
                            <td align="right" valign="center">
                                <font style={{ fontWeight: 600, fontSize: 14 }}>&nbsp;&nbsp;Ред:</font>
                            </td>
                            <td>&nbsp;</td>
                            <td>
                                <Select
                                    value={order}
                                    name='order'
                                    onChange={changeSearchParametersHandler}
                                >
                                    <MenuItem value={'asc'}>Възходящ</MenuItem>
                                    <MenuItem value={'desc'} >Низходящ</MenuItem>
                                </Select>
                            </td>
                            <td colSpan="2" align="right">
                                <Button variant='outlined' startIcon={<SearchIcon />} onClick={pressSurchButtonHandler} className={classes.button} size='medium'>Търси</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>



    )
}