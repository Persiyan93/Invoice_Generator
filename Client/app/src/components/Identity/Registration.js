import React from "react";
import { Button,TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../services/identityService';




const useStyles=(thema=>({
    root:{
        '& .MuiFormControl-root':{
            width:'90%',
            margin:thema.spacing(1)
            
        }
    }
}))

class Login extends React.Component{
    constructor(props){
    super(props)
    this.state={
        userName:'',
        password:'',
        repatPassword:'',
        email:''
    }
    this.changeHandler=this.changeHandler.bind(this);
    this.submitHandler=this.submitHandler.bind(this);

    }
    changeHandler(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
       this.setState({[name]:value});
    }

    async submitHandler(event){
        event.preventDefault();
        
        var user={...this.state};
        var response =await  identityService.login(user)
       
        if (response.status!=200){
           

        }
        else
        {
            
           
            
        }
       
      
       
    }
    render(){
        const {username,password,repatPassword,email}=this.state;
        const { classes } = this.props;
        return(
            <form className={classes.root}  onSubmit={this.submitHandler}>
            <TextField required variant="outlined" value={username} name="username" label="Потребител"  defaultValue="" onChange={this.changeHandler}  />
            <TextField required variant="outlined" value={password} name="password" label="Парола"  type="password" onChange={this.changeHandler}  />
            <TextField required variant="outlined" value={repatPassword} name="repatPassword" label="Повтори паролата"  type="password" onChange={this.changeHandler}  />
            <TextField required variant="outlined" value={email} name="email" label="Имеил адрес"  type="password" onChange={this.changeHandler}  />



          
            
            <Button  variant="contained" type="submit"  color="primary">
               Регистрация
            </Button>
         
         </form>
        );
    }
    
}


export default withStyles(useStyles)(Login);