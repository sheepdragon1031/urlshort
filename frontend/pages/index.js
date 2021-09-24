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

import { useSession, signIn, signOut } from "next-auth/client"
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

let hostip = "http://localhost:1337"


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
  const userID = session? session.user.email : '@anonymous$'
  const [alert, setAlert] = useState(false);

  const indexurl = async (userID) =>{
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/urlshorts?userid=${userID}`);
    console.log(userID);
    seturlList(result?.data);
  }
  useEffect(async () => {
    indexurl(userID)
  }, [userID]);

  const deleteURLCallBack = useCallback(async (pid) => {
    await deleUrl(pid)
    indexurl(userID)
  }, [])
  const errorAlert = (res) =>{
    if(res == "not working web url"){
      setAlert("not working web url")
    }
    else if(res.message){
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
  const postUrlCallBack = useCallback(async (pid) => {
    let res = await postUrl(pid, userID)
    indexurl(userID)
    errorAlert(res)
  }, [])
 
  const putURLCallBack = useCallback(async (pid, url2) => {
    let res = await putUrl(pid, url2)
    indexurl(userID)
    errorAlert(res)
  }, [])

  const putMetaCallBack = useCallback(async (pid, meta) => {
    // console.log(pid, meta);
    await putMeta(pid, meta)
    indexurl(userID)
  }, [])
  
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
