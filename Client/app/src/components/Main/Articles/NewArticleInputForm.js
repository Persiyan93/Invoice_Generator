import { useEffect, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },
    }


}))


export default function NewArticleInputForm() {
    const [article, setArticle] = useState({})

    const classes = useStyles();
    function changeHandler(event) {

    }
    function submitHandler(event) {

    }
    const { name, measure, price, quantity, vatRate } = article
    return (
        <form className={classes.root} onSubmit={submitHandler}>
            <TextField required variant="outlined" value={name} name="name" label="Име на артикул" onChange={changeHandler} />

            <TextField required variant="outlined" name="measure" value={measure} label="Мярка" onChange={changeHandler} />

            <TextField required variant="outlined" value={price} name="price" label="Цена" onChange={changeHandler} />

            <TextField required variant="outlined" name="quantity" value={quantity} label="Количестви" onChange={changeHandler} />

            <TextField required variant="outlined" name="vatRate" value={vatRate} label="ДДС Ставка" onChange={changeHandler} />

            <Button variant="contained" type="submit" color="primary">
                Добави клиент
            </Button>

        </form>
    )
}
