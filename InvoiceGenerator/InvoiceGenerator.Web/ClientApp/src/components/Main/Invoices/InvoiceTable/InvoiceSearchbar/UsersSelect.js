import {useState} from 'react'
import { makeStyles, FormControl, MenuItem, Select, } from '@material-ui/core/';
import useFetchGet from '../../../../../hooks/useFetchGet'
import apiEndpoints from '../../../../../services/apiEndpoints'


const useStyles = makeStyles(theme => ({
    searchBarRow: {
        marginTop: theme.spacing(2),
    },
    button: {
        position: 'relative',
        left: '250px',
        bottom: '3px',
        mmarginLeft: '20px'
    }




}))



export default function UsersSelect(props) {
    const [users, setUsers] = useState([])
    const { changeSearchParametersHandler, createdBy } = props

   
    const [getUsersTriger, setGetUsersTriger] = useState(true);
    useFetchGet(apiEndpoints.getUsers, setUsers, getUsersTriger, setGetUsersTriger)
   
  
    return (
        <>
            <td align="right" valign="center">
                <font style={{ fontWeight: 600, fontSize: 14 }}>&nbsp;&nbsp;Съставил</font>
            </td>
            <td>&nbsp;</td>
            <td>
                <FormControl style={{maxWidth:150,minWidth:150}}>
                <Select
                    value={createdBy}
                    onChange={changeSearchParametersHandler}
                    name="createdBy"
                   
                >
                    <MenuItem value='All'>
                        Всички
                     </MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.fullName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </td>
        </>



    )
}