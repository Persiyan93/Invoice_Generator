import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getClientInfo } from "../../../../services/clientsService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import style from './ClientInfo.module.css'
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../../Popup'
import AddressCard from './AddressCard'
import PrintIcon from '@material-ui/icons/Print';
import ContactPersonForm from "./ContactList/ContactPersonForm";
import * as clientService from '../../../../services/clientsService';




class ContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openPopup: false,
            clientId: '',
            contactList: []
        }
        this.setOpenPopup = this.setOpenPopup.bind(this);
        this.addContactPerson = this.addContactPerson.bind(this);
    }

    componentDidMount() {
        let contactList = clientService.getContactList(this.props.clientId)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState(prevState => ({ contactList: [...prevState.contactList, ...res] }))
                console.log(this.state)
            })
            .catch(err => console.log(err));


    }
    setOpenPopup() {

        this.setState((state) => ({ openPopup: !state.openPopup }))
    }
    addContactPerson(person) {
        this.setState(prevState => ({ contactList: [...prevState.contactList, person] }))

    }

    render() {
        return (
            <div>
                <h2 className={style.h2}>Лица за контакт</h2>
                {/* className={classes.table} */}
                < Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Име</TableCell>
                            <TableCell align="right">Имейл адрес</TableCell>
                            <TableCell align="right">Телефон</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.contactList.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell component="th" scope="row">
                                    {person.name}
                                </TableCell>
                                <TableCell align="right">{person.email}</TableCell>
                                <TableCell align="right">{person.phoneNumber}</TableCell>
                                <TableCell align="right">

                                    <Button size="small" onClick={this.deleteHandler}>
                                        <EditIcon fontSize="small" />
                                    </Button>
                                </TableCell>

                            </TableRow>


                        ))}
                        <TableRow >
                            <Button size="large" onClick={this.setOpenPopup}>
                                <AddCircleOutlineIcon />
                                Добави Клиент
                            </Button>
                        </TableRow >

                    </TableBody>
                </Table >
                <Popup
                    openPopup={this.state.openPopup}
                    setOpenPopup={this.setOpenPopup}
                    title='Лице за контакт'
                >

                    <ContactPersonForm
                        addContactPerson={this.addContactPerson}
                        setOpenPopup={this.setOpenPopup}
                        clientId={this.props.clientId}
                    />

                </Popup>
            </div >
        )
    }
}


export default ContactList


