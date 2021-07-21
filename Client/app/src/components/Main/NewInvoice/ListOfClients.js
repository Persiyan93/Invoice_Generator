import { useEffect, useState } from 'react';
import { makeStyles, Paper, Toolbar, TextField, Button, Typography, TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import useFetch from '../../../hooks/useFetch';
import apiEndpoints from '../../../services/apiEndpoints';
import Popup from '../Popup';
import AddClientForm from '../Clients/AddClient/AddClientForm';
const useStyles = makeStyles({

    title: {
        fontSize: 20,
    },
    root: {
        // width: '90%',
        // display: 'block',
        // alignItems: 'center',
        // margin: 60,
        // marginBottom: 40,
        // // pading: '0 15px',
        // borderRadius: 10,
        // background: '#E6EAE9'
        cursor: 'pointer'




    },
    selected: {
        cursor: 'pointer'
    },
    body: {
        '& .MuiTableRow-root': {
            cursor: 'pointer'

        },

    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})

export default function ListOfClients(props) {
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [clients, setClients] = useState([])
    const [filterString, setFilterString] = useState('');
    const [isClientSelected, selectClient] = useState(false);
    const [response] = useFetch(apiEndpoints.allClients);
    const [clientId, setClientId] = useState('')
    const [filterFunc, setFilterFunc] = useState({ func: (clients) => { return (clients) } })

    useEffect(() => {
        if (response) {
            setClients(response);
        }
    }, [response])

    function searchHandler(event) {
        let target = event.target;
        setFilterString(target.value)
        setFilterFunc({
            func: clients => {
                if (target.value == '') {
                    return clients
                }
                else {
                    return clients
                        .filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()) ||
                            x.vatNumber.includes(target.value))
                }
            }
        })
    }
    function changeHandler(event) {

        if (isClientSelected) {
            selectClient(false)
            setClientId('')
        }
        else {
            let clientId = event.target.id
            selectClient(true)
            setClientId(clientId)
        }
    }
    function openPopupHandler() {
        setOpenPopup(true)
    }
    function confirmClientHandler(event){
        console.log(props)
        props.setClientId(clientId)
        props.setOpenPopup(false)
    }
    const classes = useStyles();
    return (
        <  >
            <Paper variant="outlined" className={classes.root} elevation={20}>
                <h1 style={{ textAlign: 'center' }}>Клиенти</h1>
                <Toolbar>
                    <TextField className={classes.searchInput}
                        value={filterString}
                        label="Намери клиент"
                        variant="outlined"
                        placeholder="Име на фирмата /ДДС номер"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        }}
                        onChange={searchHandler}

                    >
                    </TextField>
                </Toolbar>

            </Paper>

            <TableContainer component={Paper}  >
                <Table aria-label="collapsible table" className={classes.table}>

                    <TableHead>
                        {
                            clients.length != 0 ? (
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="left" >
                                        Име на фирмата
                                    </TableCell>
                                    <TableCell align="right" >
                                        ДДС Номер
                                    </TableCell>
                                    <TableCell align="right" >
                                        Брой на неплатени фактури
                                    </TableCell>

                                </TableRow>

                            )
                                :
                                (

                                    <TableRow>
                                        < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
                                            Все още няма добавени клиенти.
                                        </Typography>
                                        <Typography>
                                            <Button size="large">
                                                <AddCircleOutlineIcon />
                                                Добави Клиент
                                            </Button>
                                        </Typography>

                                    </TableRow>

                                )
                        }
                    </TableHead>

                    <TableBody className={classes.body}>
                        {

                            filterFunc.func(clients).map((client) => (

                                < TableRow key={client.id} hover={true} className={classes.row}>
                                    {


                                        <TableCell component="th" scope="row" padding="checkbox">
                                            <Checkbox
                                                id={client.id}
                                                disabled={!(!isClientSelected || (clientId === client.id))}
                                                color="primary"
                                                onChange={changeHandler}
                                                //checked={}
                                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            />
                                        </TableCell>
                                    }



                                    <TableCell>{client.name}</TableCell>
                                    <TableCell align="right">{client.vatNumber}</TableCell>
                                    <TableCell align="right">2</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>

                            <TableCell colSpan={2} align="left">
                                <Button size="large" onClick={openPopupHandler} >
                                    <AddCircleOutlineIcon />
                                    Добави Нов Клиент
                                </Button>
                            </TableCell>
                            {isClientSelected &&
                                <TableCell colSpan={2} align="right"  >
                                    <Button size="large" variant="contained" color="primary" onClick={confirmClientHandler}>
                                        Потвърди
                                    </Button>
                                </TableCell>

                            }

                        </TableRow>
                    </TableBody>


                </Table>

            </TableContainer>

            <Popup
                openPopup={isOpenPopup}
                setOpenPopup={setOpenPopup}
                title='Добавяне на клиент'
                width='sm'>
                <AddClientForm></AddClientForm>

            </Popup>




        </ >
    )
}
