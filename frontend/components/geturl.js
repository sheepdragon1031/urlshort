
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card:{
        margin: '0.5rem',
    }
})
function Getitem ({urlItem}){
    const classes = useStyles();
    return (
        <div>
            {urlItem
                .sort((a, b) => b.created_at.localeCompare(a.created_at))
                .map((data, i) => (
                    <Card key={i} className={classes.card} >
                        <CardContent>
                            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                            </Typography> */}
                            <Typography variant="body2" component="p">  
                                <a href={data.url2}>{data.url2}</a>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                    </Card>
                ))}
            
        </div>
    )
}

export default Getitem;

