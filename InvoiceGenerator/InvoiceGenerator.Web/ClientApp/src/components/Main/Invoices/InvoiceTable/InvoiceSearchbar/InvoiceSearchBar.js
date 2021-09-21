import { makeStyles, Grid, Paper,} from '@material-ui/core/';
import SecondRowSearchBar from './SecondRowSearchBar';
import FirstRowSearchBar from './FirstRowSearchBar'


const useStyles = makeStyles(theme => ({
    table: {
       marginLeft:'10px'

    },
    title: {
        textAlign: 'center',
        marginTop: '2px',
    }
    ,
    toolbar: {
        marginTop: '5px'
    },
    searchInput: {
        opacity: '0.7',
        padding: '0px,5px',
        fontSize: '0.6rem',
        width: '100%',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    },
    menu: {
        marginBottom: '20px',
        borderRadius: '20px',
        paddingLeft:'100px'
    },
    options: {
        height: '100px',
        width: '1500px',
        borderRadius: 10,
        marginRight: '10%',
        marginBottom: '1%',
        borderStyle: 'dotted'

    },
    button: {
        marginBottom: '1px'
    }




}))



export default function InvoiceSearchBar(props) {
    const { changeSearchParametersHandler, searchParameters, pressSurchButtonHandler } = props

   
  

   
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.menu} elevation={10}>
            <h2 className={classes.title}>Фактури</h2>
            <table>
                <tbody>
                    <FirstRowSearchBar
                        searchParameters={searchParameters}
                        changeSearchParametersHandler={changeSearchParametersHandler}
                    />
                    <SecondRowSearchBar
                        searchParameters={searchParameters}
                        changeSearchParametersHandler={changeSearchParametersHandler}
                        pressSurchButtonHandler={pressSurchButtonHandler}
                        />
                </tbody>
            </table>
        </Paper>
    )
}