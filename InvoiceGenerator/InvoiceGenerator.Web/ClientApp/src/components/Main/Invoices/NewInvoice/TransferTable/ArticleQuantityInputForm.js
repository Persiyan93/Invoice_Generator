import { useState, } from 'react'
import { Button, makeStyles, TextField } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },

    },
    
 
}))

export default function ArticleQuantityInputForm(props) {
    const classes = useStyles();
    const { setProductsInRightTable, selectedProductsFromLeftTable, selectProductFromLeftTable, setOpenPopup, setProductsInLeftTable } = props
    const [productsInfo, setProductsInfo] = useState({ quantity: 0, discount: 0, })
    const { quantity } = productsInfo
    function submitHandler(e) {
        e.preventDefault()

        let newProducts = selectedProductsFromLeftTable.map(x =>
        ({
            id: x.id,
            name: x.name,
            discount: productsInfo.discount,
            quantity: parseInt(productsInfo.quantity),
            unitPrice: parseInt(x.unitPrice),
            vatRate: x.vatRate,
            unitType: x.unitType,
        }));

        setProductsInRightTable(prevState => ([...prevState, ...newProducts]));
        selectProductFromLeftTable([])


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
            <Button variant="contained" type="submit" color="primary">
                Потвърди
            </Button>

        </form>
    )
}
