import Appbar from '../components/appbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: '.25rem .5rem'
    },
    button:{
        margin: '.25rem .5rem'
    }
}))
const Login = () => {
    const classes = useStyles();
    return (
        <>
        <Appbar />
        <Container maxWidth="sm">
        <h1>login</h1>
        <TextField className={classes.textField} fullWidth id="login-user" label="username" variant="outlined" />
        <TextField className={classes.textField} fullWidth id="login-pass" label="password" variant="outlined" type="password" />
        <TextField className={classes.textField} fullWidth id="check-pass" label="password" variant="outlined" type="password" />
        <Button className={classes.button} variant="outlined">register</Button>
        <Link href="/login">Login</Link>
        </Container>
        
      </>
     )
}

export default Login
