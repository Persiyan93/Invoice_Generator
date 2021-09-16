import { useState } from 'react'
import { Button, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
    }

}))

export default function EditArticleQuantityForm(props) {
    const { setArticlesInRightTable, setOpenPopup, setArticlesInLeftTable, editArticle, } = props
    const [newArticleQuantity, setnNewArticleQuantity] = useState(editArticle.quantity);

    function submitHandler(e) {
        e.preventDefault()
        console.log(newArticleQuantity);
        console.log(editArticle)
        setArticlesInRightTable(prevState => ([...prevState.map(article =>
            article.id === editArticle.id ?
                { ...article, quantity: parseInt(newArticleQuantity) }
                : article
        )]));
        setOpenPopup(false);
    }

    function changeHandler(e) {
        let value = e.target.value;
        setnNewArticleQuantity(value)
    }

    const classes = useStyles();
    return (
        <form className={classes.root} onSubmit={submitHandler}>
            <TextField required variant="outlined" value={newArticleQuantity} name="quantity" label="Количество" onChange={changeHandler} />
            <Button variant="contained" type="submit" color="primary">
                Потвърди
            </Button>

        </form>
    )
}
