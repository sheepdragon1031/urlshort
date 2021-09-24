import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import { useSession, getSession , signIn, signOut } from "next-auth/client"
import { GetServerSideProps } from 'next'

const useStyles = makeStyles({
    appbar: {
        flexGrow: 1,
      },
    title: {
        flexGrow: 1,
    },
})




const Appbar = ({  }) => {
    const [ session, loading ] = useSession()
    const signInButton = () => {
        
        if (session) {
            return false;
        }
        return (
        <Button color="inherit" onClick={(e) => {
                e.preventDefault();
                signIn();
            }} >
             Login
        </Button>
        );
    };
    const signOutButton = () => {
        
        if (!session) {
            return false;
        }
        return (
            <>
                <Typography>
                    {session.user.email}
                </Typography>
                <Button color="inherit"
                    onClick={(e) => {
                    e.preventDefault();
                    signOut();
                    }} >
                     Sign Out
                </Button>
            </>
        );
    };
    const classes = useStyles();
    return (
        <div className={classes.appbar}>
        <AppBar position="static">
          <Toolbar> 
            <Typography variant="h6" className={classes.title}>
                <Link href="/">URL2URL</Link>
            </Typography>
            {signOutButton()}
            {signInButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
 
  

export default Appbar;

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context)
      }
    }
  }

