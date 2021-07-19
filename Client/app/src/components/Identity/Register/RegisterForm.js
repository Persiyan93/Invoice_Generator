import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../../services/identityService.js';
import UserDetails from "./UserDetails.js";
import CompanyDetails from "./CompanyDetails.js";
import CompanyAddressDetails from "./CompanyAddressDetails.js";




const useStyles = (thema => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: thema.spacing(1)

        }
    }
}))

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            name: '',
            username: '',
            password: '',
            repatPassword: '',
            email: '',
            companyDetails: {
                companyName: '',
                vatNumber: '',
                companyType: '',
                address: {
                    addressText: '',
                    town: '',
                    country: ''
                },
                accontablePersonName: '',
                companyEmail: '',
                uniqueIdentificationNumber: '',
            }

        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);

    }
    changeHandler(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == 'addressText' || name == 'town' || name == 'country') {
            this.setState(prevState=>({
                ...prevState,
                companyDetails:{
                    ...prevState.companyDetails,
                    address:{
                        ...prevState.companyDetails.address,[name]:value
                    }
                }
            }))
        }
        else if (name == 'companyName' || name == 'vatNumber'
            || name == 'accontablePersonName' || name == 'companyEmail' || name == 'uniqueIdentificationNumber'||name == 'companyType') {
           this.setState({
                companyDetails:
                    { ...this.state.companyDetails, [name]: value }
            });
        }
        else {

            this.setState({ [name]: value });
        }

    }

    submitHandler(event) {
        event.preventDefault();
        console.log('inside submit handler')
        identityService.register({ ...this.state })
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log('Unsuccessful status ')
                    console.log(res);
                }
                else {
                    this.props.history.push('/Identity/Login')
                }

            })
            .catch(err => {
                this.props.history.push('/Errors/ConnectionError')
            })
    }

    prevStep() {
        console.log('Inside prevStep');
        this.setState(prevState => ({ step: prevState.step - 1 }))
    }

    nextStep() {
        console.log('Inside NextStep')
        this.setState(prevState => ({ step: prevState.step + 1 }))
    }
    render() {
        const { step, companyDetails } = this.state

        const { classes } = this.props;
        switch (step) {
            case 1:
                return (
                    <UserDetails
                        nextStep={this.nextStep}
                        inputFields={{ ...this.state }}
                        changeHandler={this.changeHandler}
                    />
                )

            case 2:
                return (
                    <CompanyDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputFields={{ ...companyDetails }}
                        changeHandler={this.changeHandler}
                    >

                    </CompanyDetails>
                )

            case 3:
                return (
                    <CompanyAddressDetails
                        submitHandler={this.submitHandler}
                        prevStep={this.prevStep}
                        inputFields={{ ...companyDetails }}
                        changeHandler={this.changeHandler}
                    >

                    </CompanyAddressDetails>
                )



            default:
                return (<div></div>)
        }

    }

}


export default withStyles(useStyles)(RegisterForm);