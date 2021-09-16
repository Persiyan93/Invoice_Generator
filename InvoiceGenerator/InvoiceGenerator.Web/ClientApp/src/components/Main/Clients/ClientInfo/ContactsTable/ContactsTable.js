

import { useState,  } from "react";
import { makeStyles, TableBody, TableCell,TableRow, Button, IconButton, Paper } from '@material-ui/core/';
import useFetchGet from "../../../../../hooks/useFetchGet";  
import apiEndpoints from "../../../../../services/apiEndpoints";
import getResultAfterPagingAndSorting from '../../../../../services/sortingService';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../../../../Elements/Popup'
import ConfirmationPopup from '../../../../Elements/ConfirmationPopup'
import ContactPersonForm from "./NewContactPersonForm";
import TableWithPagingAndSorting from '../../../../Elements/TableWithPagingAndSorting'



const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '3%',
        backgroundColor: '#B8B1C5',
        borderRadius: 10,
        height: '400px',
        padding: theme.spacing(2)



    },
    Paper: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(10),

    },
   




}))

const headCells = [

    { id: 'fullName', title: "Име " },
    { id: 'eventType', title: 'Имейл адрес' },
    { id: 'dateOfEvent', title: 'Телефон' },
    { id: 'Action', title: 'Действие', disableSorting: 'true' },

]

export default function ContactList(props) {
    const { clientId } = props;
    const [isOpenContactPersonForm, setOpenContactPersonForm] = useState()
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [filterString, setFilterString] = useState('');
    const [contactList, setContactList] = useState([])
    const [filterFunction, setFilterFunc] = useState({ fn: (elements) => { return elements } })
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [selectedUserId, setSelectUserId] = useState('');

    const [getContactListTriger, setGetContactListTriger] = useState(true);
    let getContactListUrl = apiEndpoints.getContactList + `/${clientId}`
    useFetchGet(getContactListUrl, setContactList, getContactListTriger, setGetContactListTriger);


    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);

    function elementsAfterPagingAndSorting() {
        const { order, orderBy } = pagingAndSorting
        return getResultAfterPagingAndSorting(filterFunction.fn(contactList), order, orderBy)

    }

    function searchHandler(event) {
        let target = event.target;

        setFilterString(target.value)

        setFilterFunc({
            fn: elements => {
                if (target.value == '') {
                    return elements;
                }
                else {
                    return elements.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })



    }
    function catchOpenPopup() {

        setOpenContactPersonForm(prevState => (!prevState))

    }
    function addContactPerson(person) {

        setContactList(prevState => ([...prevState, person]));


    }
    function deletePersonHandler() {

    }
    function editPersonHandler() {

    }

    const classes = useStyles();
    const tableContainer = Paper;
    return (
        // <div className={classes.root}>



        <>

            {/* <SearchBar
                title="Списък с лица за контакт"
                searchbarLable="test"
                placeHolder='Име на лицето'
                searchHandler={searchHandler}
                filterString={filterString}
                setFilterString={setFilterString}


            >

            </SearchBar> */}
            <TableWithPagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
                tableContainer={tableContainer}
            >

                <TableBody className={classes.body}>

                    {

                        elementsAfterPagingAndSorting().map((person) => (

                            <TableRow key={person.id}  >
                                <TableCell component="th" scope="row" >
                                    {person.name}
                                </TableCell>
                                <TableCell align="cneter">{person.email} </TableCell>
                                <TableCell align="center">{person.phoneNumber}</TableCell>
                                <TableCell align="right">


                                    <IconButton size="medium" onClick={editPersonHandler}>
                                        <EditIcon fontSize="small" htmlColor='black' />
                                    </IconButton>
                                    <IconButton size="medium" onClick={deletePersonHandler}>
                                        <DeleteIcon fontSize="small" htmlColor='black' />
                                    </IconButton>


                                </TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow >
                        <Button size="large" onClick={catchOpenPopup}>
                            <AddCircleOutlineIcon />
                            Добави Клиент
                        </Button>
                    </TableRow >
                </TableBody>



            </TableWithPagingAndSorting>

            <ConfirmationPopup
                setOpenPopup={setOpenConfirmationPopup}
                //actionAfterConfirmation
                openPopup={openConfirmationPopup}
                title='Ограничаване на достъпа'
                question={`Сигурни ли сте че искате да ограничите достъпа на  `}
            />

            <Popup
                openPopup={isOpenContactPersonForm}
                setOpenPopup={setOpenContactPersonForm}
                title='Лице за контакт'
            >

                <ContactPersonForm
                    addContactPerson={addContactPerson}
                    setOpenPopup={setOpenContactPersonForm}
                    clientId={clientId}
                    setContactList={setContactList}
                />

            </Popup>
        </>
        // </Paper>
        // </div>

    )

}






