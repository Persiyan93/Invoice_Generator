
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core/';


const useStyles = makeStyles(theme => ({
    gridElement: {

        borderTop: "solid",
        borderLeft: "solid",

        '&:hover': {
            backgroundColor: '#A1A397',
        },
        cursor: 'pointer',
        marginTop: 20,
        borderRadius: 2
    },


}))

export default function ProductTableNavigationMenu(props) {
    const { isArticleSelected, selectArticle } = props
    const classes = useStyles();
    return (
        <Paper>

            <Grid container alignItems="center"  >
                <Grid
                    item md={6}
                    sm={12}
                    name="article"
                    className={classes.gridElement}
                    style={isArticleSelected ? { backgroundColor: '#40BF5F' } : {}}
                    onClick={() => selectArticle(true)}
                >

                    < Typography variant="h8" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 20, fontWeight: 600 }} >
                        Артикули
                    </Typography>


                </Grid>
                <Grid
                    item md={6}
                    sm={12}
                    name="service"
                    className={classes.gridElement}
                    style={isArticleSelected ? {} : { backgroundColor: '#40BF5F' }}
                    onClick={() => selectArticle(false)}
                >
                    < Typography variant="h8" gutterBottom component="div" style={{ textAlign: 'center', marginTop: 20, fontWeight: 600 }} >
                        Услуги
                    </Typography>
                </Grid>

            </Grid>


        </Paper>
    )

}
