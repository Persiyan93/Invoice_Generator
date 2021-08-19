import { useState, useEffect } from 'react'
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useDebugValue } from 'react';
const useStyles = makeStyles(theme => ({
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

export default function EditArticleQuantityForm(props) {
    const classes = useStyles();
    const { setArticlesInRightTable, setOpenPopup, setArticlesInLeftTable, editArticle,  } = props
    const [newArticleQuantity, setnNewArticleQuantity] = useState(editArticle.quantity);
   
   

    function submitHandler(e) {
        e.preventDefault()
        console.log(newArticleQuantity);
        console.log(editArticle)
        setArticlesInRightTable(prevState => ([...prevState.map(article =>
            article.id === editArticle.id ?
                { ...article, quantity:parseInt( newArticleQuantity) }
                : article
        )]));
        // setArticlesInLeftTable(prevState => ([...prevState.map(article =>
        //     article.id === editArticle.id ?
        //         { ...article, quantity:parseInt(article.quantity-(newArticleQuantity-editArticle.quantity) )}
        //         : article
        // )]))


        setOpenPopup(false);

    }
    function changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        setnNewArticleQuantity(value)

    }
    return (
        <form className={classes.root} onSubmit={submitHandler}>
            <TextField required variant="outlined" value={newArticleQuantity} name="quantity" label="Количество" onChange={changeHandler} />
            {/* <TextField disabled={true} variant="outlined" value={discount} name="discount" label="Намаление" type="number" onChange={changeHandler} /> */}

            <Button variant="contained" type="submit" color="primary">
                Потвърди
            </Button>

        </form>
    )
}
