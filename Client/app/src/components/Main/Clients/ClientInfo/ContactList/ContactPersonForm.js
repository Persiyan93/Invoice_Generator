import React, { Component } from 'react'
import { TextField, withStyles, Button } from '@material-ui/core/';
import * as clientService from '../../../../../services/clientsService';
import * as globalService from '../../../../../services/globalServices'


const useStyles = (theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
            display: 'flex'

        },
       
    },
   


}))

export class ContactPersonForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            id:'',
            name:'',
            email:'',
            phoneNumber:''
        }
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        this.onChangeHandler=this.onChangeHandler.bind(this);
    }
    onSubmitHandler(event){
        event.preventDefault();
        let clientId=this.props.clientId;
        var person={...this.state,clientId};
        console.log(person)
        clientService.addContactPerson(person)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                let contactPersonId=globalService.getIdFromResponse(res.message); 
                console.log(contactPersonId)
            });

            this.props.addContactPerson({...this.state});
            this.props.setOpenPopup();

    }

    onChangeHandler(event){
        let name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value})
    }

    
    render() {
        const{name,email,phoneNumber}=this.state
        const{classes}=this.props
        return (
            <form className={classes.root} onSubmit={this.onSubmitHandler} >
                <TextField className={classes.inputField} name="name" value={name} required label="Име" onChange={this.onChangeHandler} />
                <TextField className={classes.inputField} name="email" value={email} required label="Имейл адрес" onChange={this.onChangeHandler} />
                <TextField className={classes.inputField} name="phoneNumber" value={phoneNumber} required label="Телефонен номер" onChange={this.onChangeHandler} />
                <Button variant="outlined" color="primary" type="submit" >  Добави</Button>
            </form>
        )
    }
}

export default withStyles(useStyles)(ContactPersonForm)
