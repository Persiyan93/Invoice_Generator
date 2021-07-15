
import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import * as clientService from '../../../../services/clientsService';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { getIdFromResponse } from "../../../../services/globalServices";
import AddressCard from "../ClientInfo/AddressCard";

const useStyles = (theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },

    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

class AddClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            companyType: '',
            address: {
                addressText: '',
                town: '',
                country: ''
            },
            vatNumber: '',
            accontablePersonName: '',
            uniqueIdentificationNumber: '',
            companyType: ''
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(event) {
        console.log(this.state)
        if (event) {
            event.preventDefault();
        }
        var response = await clientService.addNewClient({ ...this.state })
            .catch(x => console.log(x))
        if (response.status != 200) {
            console.log(await response.json());
        }
        else {
            let message = await response.json();
            let clientId = getIdFromResponse(message);

            this.props.history.push(`/Clients/${clientId}`);

        }

    }


    changeHandler(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == 'addressText' || name == 'town' || name == 'country') {
            this.setState({
                address:
                    { ...this.state.address, [name]: value }
            });
        }
        else {

            this.setState({ [name]: value });
        }
    }

    render() {
        const { name, companyType, vatNumber, accontablePersonName, uniqueIdentificationNumber, address: { town, country, addressText } } = this.state;
        const { classes } = this.props;
        return (

            <form className={classes.root} onSubmit={this.submitHandler}>
                <TextField required variant="outlined" value={name} name="name" label="Име на фирмата" defaultValue="" onChange={this.changeHandler} />

                <FormControl className={classes.formControl} >



                    <InputLabel>Вид на компанията</InputLabel>
                    <Select
                        name="companyType"
                        value={companyType}
                        onChange={this.changeHandler}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="SoleProprietorship">ЕТ</MenuItem>
                        <MenuItem value="LLC">ЕООД</MenuItem>
                        <MenuItem value="LTD">ООД</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
                <TextField required variant="outlined" name="country" value={country} label="Държава на регистрация" defaultValue="" onChange={this.changeHandler} />

                <TextField required variant="outlined" name="town" value={town} label="Град" defaultValue="" onChange={this.changeHandler} />

                <TextField required variant="outlined" value={addressText} name="addressText" label="Адрес" defaultValue="" onChange={this.changeHandler} />

                <TextField required variant="outlined" name="vatNumber" value={vatNumber} label="ДДС номер" defaultValue="" onChange={this.changeHandler} />


                <TextField variant="outlined" value={accontablePersonName} name="accontablePersonName" label="Материално отговорно лице " defaultValue="" onChange={this.changeHandler} />

                <TextField required variant="outlined" value={uniqueIdentificationNumber} name="uniqueIdentificationNumber" label="ЕИК" defaultValue="" onChange={this.changeHandler} />

                <Button variant="contained" type="submit" color="primary">
                    Добави клиент
                </Button>

            </form>
        )

    }


}


export default withStyles(useStyles)(AddClient);


