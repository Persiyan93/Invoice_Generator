import { makeStyles, TextField } from '@material-ui/core';
const useStyles = makeStyles({
    divInvoiceInfo: {
        width: 300,
        height: 300,
        display: 'block',
        marginLeft: '90px',
    },
    textField: {
        marginTop: 20,
        paddingTop: 10,
        fontSize: 13

    },
})

export default function InvoiceInfo(props) {
    const classes = useStyles();
    let { issueDate, dateOfTaxEvent, setInvoiceDetails } = props
    function dateOfIssueChangeHandler(e) {
        let value = e.target.value
        setInvoiceDetails(prevState => ({ ...prevState, issueDate: value }))
    }
    function dateOfTaxEventChangeHandler(e) {
        let value = e.target.value;
        console.log(e.target.name)


        setInvoiceDetails(prevState => ({ ...prevState, dateOfTaxEvent: value }))
    }
    return (
        <div className={classes.divInvoiceInfo}>
            <TextField
                name='issueDate'
                label="Дата на издаване"
                type="date"
                value={issueDate}
                className={classes.textField}
                onChange={dateOfIssueChangeHandler}
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}


            />
            <TextField
                label="Дата на данъчното събитие"
                type="date"
                value={dateOfTaxEvent}
                className={classes.textField}
                onChange={dateOfTaxEventChangeHandler}
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </div>
    )
}
