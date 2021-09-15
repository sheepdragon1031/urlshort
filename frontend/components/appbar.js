import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles({
    appbar: {
        flexGrow: 1,
      },
    title: {
        flexGrow: 1,
    },
})
function Appbar() {
    const classes = useStyles();
    return (
        <div className={classes.appbar}>
        <AppBar position="static">
          <Toolbar> 
            <Typography variant="h6" className={classes.title}>
            <Link href="/">URL2URL</Link>
            </Typography>
            <Button color="inherit" > <Link href="/login">Login</Link></Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  export default Appbar;