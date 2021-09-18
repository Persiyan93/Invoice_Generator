import { useState } from 'react'
import { makeStyles, } from "@material-ui/core";
import useFetchPost from '../../../../hooks/useFetchPost'
import apiEndpoints from '../../../../services/apiEndpoints'
import * as identityService from '../../../../services/identityService';
import UserDetails from "./UserDetails.js";
import CompanyDetails from "./CompanyDetails.js";
import CompanyAddressDetails from "./CompanyAddressDetails.js";
import BackgroundImage from '../../../../resources/identityImage.jpg'

const useStyles = makeStyles(theme => ({

    background: {
        backgroundImage: `url(${BackgroundImage})`,
        position: 'fixed',
        minHeight: '100%',
        minWidth: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat'

    },

}))

const initialUserDetail = {
    name: '',
    username: '',
    password: '',
    repatPassword: '',
    email: '',
}
const initialCompanyDetails = {
    companyName: '',
    vatNumber: '',
    companyType: '',
    accountablePersonName: '',
    companyEmail: '',
    uniqueIdentificationNumber: '',

}
const initialCompanyAddressDetails = {
    addressText: '',
    town: '',
    country: ''
}
export default function RegisterForm(props) {
    const classes = useStyles();
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState(initialUserDetail);
    const [companyDetails, setCompanyDetails] = useState(initialCompanyDetails);
    const [companyAddressDetails, setCompanyAddressDetails] = useState(initialCompanyAddressDetails);

    const [postRegisterFormTriger, setPostRegisterFormTriger] = useState(false);
    let userData = { ...userDetails, companyDetails: { ...companyDetails, address: { ...companyAddressDetails } } }
    useFetchPost(apiEndpoints.register,userData,postRegisterFormTriger,setPostRegisterFormTriger,actionAfterSuccessfullyRegisteredUser)

    function actionAfterSuccessfullyRegisteredUser() {
        props.history.push('/Identity/Login')
    }

    function userDetailsChangeHandler() {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUserDetails(prevState => ({ ...prevState, [name]: value }))
    }

    function companyDetailsChangeHandler() {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        setCompanyDetails(prevState => ({ ...prevState, [name]: value }))
    }

    function companyAddressDetailsChangeHandler() {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setCompanyAddressDetails(prevState => ({ ...prevState, [name]: value }))
    }
    function changeCompanyTypeHandler(e) {
        setCompanyDetails(prevState => ({ ...prevState, companyType: e.target.value }))
    }

    function submitHandler() {
        setPostRegisterFormTriger(true)
    }

    function prevStep() {
        setStep(prevState => (prevState - 1))
    }

    function nextStep() {
        setStep(prevState => (prevState + 1))
    }

    switch (step) {
        case 1:
            return (
                <div className={classes.background}>
                    <UserDetails
                        nextStep={nextStep}
                        inputFields={userDetails}
                        changeHandler={userDetailsChangeHandler}
                    />
                </div>
            )


        case 2:
            return (
                <div className={classes.background}>

                    <CompanyDetails
                        nextStep={nextStep}
                        prevStep={prevStep}
                        inputFields={companyDetails}
                        changeHandler={companyDetailsChangeHandler}
                        changeCompanyTypeHandler={changeCompanyTypeHandler}
                    />


                </div >
            )

        case 3:
            return (
                <div className={classes.background} >

                    <CompanyAddressDetails
                        submit={submitHandler}
                        prevStep={prevStep}
                        inputFields={companyAddressDetails}
                        changeHandler={companyAddressDetailsChangeHandler}
                    />


                </div >
            )



        default:
            return (<div></div>)
    }

}

