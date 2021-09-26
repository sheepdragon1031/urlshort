/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import Header from "../components/header";
import Addurl from "../components/addurl";
import Getitem from "../components/getitem";
import Appbar from "../components/appbar";

import { deleUrl, postUrl, putUrl, putMeta} from '../hooks';

import axios from "axios";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

import { useSession, getSession , signIn, signOut } from "next-auth/client"
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles({
  container:{
    minHeight: '80vh',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
});

export default function Home() {
  const [session, loading] = useSession()
  const [urlList, seturlList] = useState([]);
  const classes = useStyles();
 
  const [alert, setAlert] = useState(false);
  const indexurl = async (userID) =>{
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/urlshorts?userid=${session?session.user.email:'anonymous'}`);
    seturlList(result?.data);
  }
  const errorAlert = (res) =>{
    if(res == "not working web url"){
      setAlert("not working web url")
    }
    else if(res){
      if(res.message == "This url wrong site orientation"){
        setAlert("This url wrong site orientation")
      }
      else if(res.message == " This url has already been used"){
        setAlert(res.message == " This url has already been used")
      }
    }
    else{
      setAlert(false)
    }
  }

  useEffect(async () => {
     indexurl()
  }, [loading]);

  const deleteURLCallBack = useCallback(async (pid) => {
    await deleUrl(pid)
    indexurl()
  }, [loading, urlList])
  const postUrlCallBack = useCallback(async (pid) => {
    let res = await postUrl(pid, session? session.user.email:'anonymous')
    indexurl()
    errorAlert(res)
  }, [loading, urlList])
 
  const putURLCallBack = useCallback(async (pid, url2) => {
    let res = await putUrl(pid, url2)
    indexurl()
    errorAlert(res)
  }, [loading, urlList])

  const putMetaCallBack = useCallback(async (pid, meta) => {
    await putMeta(pid, meta)
    indexurl()
  }, [loading, urlList])


  return (
    <>
      <Head>
        <title>URL2URL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <Container  maxWidth="sm">
        <Header />
        { alert?
          <Alert severity="error">{alert}</Alert>
          :<></>}
        <Addurl postUrl={postUrlCallBack} />
        <Getitem urlList={urlList}  deleUrl={deleteURLCallBack} putURL={putURLCallBack} putMeta={putMetaCallBack} />
      </Container>
    </>
  )
}
