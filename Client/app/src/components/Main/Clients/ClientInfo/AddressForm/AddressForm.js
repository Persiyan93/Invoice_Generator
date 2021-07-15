
import React from 'react';
import { TextField, withStyles, Button } from '@material-ui/core/';
import * as clientService from '../../../../../services/clientsService';



const useStyles = (theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
            display: 'flex'

        },
       
    },
   


}))
class AddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            clientId:this.props.clientId,
            country:'',
            town:'',
            addressText:''
        }
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        
      
    
    }
    

    componentDidMount(){
        this.setState({...this.props.fieldValues})
        
        
    }
        
        onChangeHandler(event){
            let name=event.target.name;
            let value=event.target.value
            this.setState({[name]:value})
            
            
        }
        onSubmitHandler(event){
            event.preventDefault();
            this.props.updateAddress(this.state);
            this.props.setOpenPopup();
                
        }
    

    render() {
        const { classes } = this.props;
        const {country,town,addressText}=this.state
        return (
            <form className={classes.root} onSubmit={this.onSubmitHandler} >
                <TextField className={classes.inputField} name="country" value={country} required label="Държава" onChange={this.onChangeHandler}/>
                <TextField className={classes.inputField} name="town" value={town} required label="Град" onChange={this.onChangeHandler}/>
                <TextField className={classes.inputField}name="addressText"  value={addressText} required label="Адрес" onChange={this.onChangeHandler}/>
                <Button variant="outlined" color="primary" type="submit" >  Добави</Button>
            </form>
        )

    }
}

export default withStyles(useStyles)(AddressForm)