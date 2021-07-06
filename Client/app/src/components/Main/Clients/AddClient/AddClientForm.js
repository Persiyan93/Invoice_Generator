
import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import {ClientService} from'../../../../services/ClientsService'

import { withStyles } from '@material-ui/core/styles';

const useStyles=(thema=>({
    root:{
        '& .MuiFormControl-root':{
            width:'90%',
            margin:thema.spacing(1)
            
        }
    }
}))

class AddClient extends React.Component{

    constructor(props){
        super(props)
       this.state={
            name:'',
            companyType:'',
            addressText:'',
            countryName:'',
            vatNumbe:'',
            accountablepersonName:'',
            UniqueIdentificationNumber:''
        };
        this.changeHandler=this.changeHandler.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
    }
   
    submitHandler(event){
     //console.log(this.state)
    }


    changeHandler(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        console.log(name);
        this.setState({[name]:value});
    }
   
    render(){
        const {name,companyType,addressText,townName,countryName,vatNumber,accountablepersonName,uniqueIdentificationNumber}=this.state;
        const { classes } = this.props;
        return (
            
            <form className={classes.root}  onSubmit={this.submitHandler()}>
                <TextField required variant="outlined" value={name} name="name" label="Име на фирмата"  defaultValue="" onChange={this.changeHandler}  size="Normal"/>

              
                {/* <div > 
                    <label htmlFor="name">Вид на Фирмата</label>
                    <input type="text" onChange={this.changeHandler} />
                </div> */}
                <TextField required variant="outlined" value={countryName}  label="Държава на регистрация"  defaultValue="" onChange={this.changeHandler}  />
                
                <TextField required variant="outlined" value={townName} label="Град"  defaultValue="" onChange={this.changeHandler}  />
                
                <TextField required variant="outlined" value={addressText}  label="Адрес"  defaultValue="" onChange={this.changeHandler}  />
               
                <TextField required variant="outlined" value={vatNumber} label="ДДС номер"  defaultValue="" onChange={this.changeHandler}  />
                
                
                <TextField  variant="outlined" value={accountablepersonName} label="Материално отговорно лице "  defaultValue="" onChange={this.changeHandler} />
             
                <TextField required variant="outlined"value={uniqueIdentificationNumber}  label="ЕИК"  defaultValue="" onChange={this.changeHandler}  />

                <Button  variant="contained" type="submit" size="large" color="primary">
                    Добави клиент
                </Button>
             








            </form>
        )

    }


}

  
  export default withStyles(useStyles)(AddClient);


