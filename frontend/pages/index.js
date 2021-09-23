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
  const [urlList, seturlList] = useState([]);
  
  const [session, loading] = useSession()
  const classes = useStyles();
  let userID = session? session.user.email : '@anonymous$'
  console.log(session);
  const indexurl = async (userID) =>{
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/urlshorts?userid=${userID}`);
    // console.log(result);
    seturlList(result?.data);
  }
  useEffect(async () => {
    indexurl(userID)
  }, [userID]);

  const deleteURLCallBack = useCallback(async (pid) => {
    await deleUrl(pid)
    indexurl(userID)
  }, [])

  const postUrlCallBack = useCallback(async (pid) => {
    console.log(userID);
    await postUrl(pid, userID)
    indexurl(userID)
  }, [])
 
  const putURLCallBack = useCallback(async (pid, url2) => {
    await putUrl(pid, url2)
    indexurl(userID)
  }, [])

  const putMetaCallBack = useCallback(async (pid, meta) => {
    // console.log(pid, meta);
    await putMeta(pid, meta)
    // indexurl(userID)
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
        <Addurl postUrl={postUrlCallBack} />
        <Getitem urlList={urlList}  deleUrl={deleteURLCallBack} putURL={putURLCallBack} putMeta={putMetaCallBack} />
      </Container>
    </>
  )
}
