import Appbar from '../components/appbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getSession, useSession, signIn, signOut } from "next-auth/client";
import { Link } from '@material-ui/core';
import Router from 'next/router'
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: '.25rem .5rem'
    },
    button:{
        margin: '.25rem .5rem'
    }
}))


export default function Login(){
    const classes = useStyles();
    const [ session, loading ] = useSession()
    
    useEffect(() => {
        if(session){
            Router.push('/')
        }
    });
    
    return (
        <>
        <Appbar />
        <Container maxWidth="sm">
        <h1>login</h1>
        <TextField className={classes.textField} fullWidth id="login-user" label="username" variant="outlined" />
        <TextField className={classes.textField} fullWidth id="login-pass" label="password" variant="outlined" type="password" />
        <Button className={classes.button} variant="outlined">login</Button>
        <hr />
        <Link href="/api/auth/nextauth" >
            <Button className={classes.button} variant="outlined"
            onClick={(e) => {
                e.preventDefault();
                signIn();
            }}>
                Google
            </Button>
        </Link>
        </Container>
        
      </>
     )
     
}

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context)
      }
    }
  }