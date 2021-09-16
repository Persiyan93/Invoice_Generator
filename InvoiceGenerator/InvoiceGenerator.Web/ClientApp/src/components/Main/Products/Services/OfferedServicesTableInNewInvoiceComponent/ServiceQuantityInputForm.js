import { useState, useEffect } from 'react'
import { Button, makeStyles, TextField } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },

    },
   
}))

export default function ServiceQuantityInputForm(props) {
    const { setInvoiceDetails, selectedService, setOpenPopup, services } = props
    const classes = useStyles();
    const [productsInfo, setProductsInfo] = useState({ quantity: 0, price: 0, })
    const { quantity, price } = productsInfo;

    useEffect(() => {
        setProductsInfo(prevState => ({ ...prevState, price: selectedService.defaultPriceWithoutVat }))
    }, [])


    function submitHandler(e) {
        e.preventDefault()
        let newService = [selectedService].map(x => ({
            id: x.id,
            name: x.name,
            quantity: productsInfo.quantity,
            vatRate: x.vatRate,
            price: productsInfo.price
        }))

        newService = newService[0];
        setInvoiceDetails(prevState => ({ ...prevState, services: [...prevState.services, newService] }))
        setOpenPopup(false);
    }

    function changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        setProductsInfo(prevState => ({ ...prevState, [name]: value }))

    }
    return (
        <form className={classes.root} onSubmit={submitHandler}>
            <TextField required variant="outlined" value={quantity} name="quantity" label="Количество" onChange={changeHandler} />
            <TextField required variant="outlined" value={price} name="price" label="Цена в левове" onChange={changeHandler} />

            <Button variant="contained" type="submit" color="primary">
                Потвърди
            </Button>

        </form>
    )
}
