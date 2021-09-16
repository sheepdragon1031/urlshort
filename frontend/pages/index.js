import Head from 'next/head'
import { useEffect, useState } from "react";
import Image from 'next/image'
import Header from "../components/header";
import Addurl from "../components/addurl";
import Getitem from "../components/geturl";
import Appbar from "../components/appbar";

import axios from "axios";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

import { getSession, signIn, signOut } from "next-auth/client";

let hostip = "http://localhost:1337/"

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
const shortCode = (num) =>{
    let atoz = []
    for (let i = 65; i <= 90; i++) {
      atoz.push(String.fromCharCode(i))
      atoz.push(String.fromCharCode(i + 32))
    }
    // for (let i = 0; i <= 9; i++) {
    //   atoz.push(i)
    // }
  return atoz[num]  
}

export default function Home() {
  const [urlList, seturlList] = useState([]);
  
  
  const classes = useStyles();
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios.get(`${hostip}`+ 'urlshorts');
    seturlList(result?.data);
  }, []);
  const posturl = async (urlText) => {
    if (urlText && urlText.length > 0) {
      // const result = await axios.get(`${hostip}`+ 'urlshorts');
      shortCode()
      let now =Date.now();
      let urlcode = []
      let num = 52
      while(now > 0){
        let tmp = now % num;
        let c = shortCode(tmp)
        urlcode.unshift(c);
        now = parseInt(now / num);
      }
  
      await axios.post(`${hostip}`+ 'urlshorts', {
        url: urlcode.join('') ,
        url2: urlText,
        userid: 'test'
      });
  
      const result = await axios.get(`${hostip}`+ 'urlshorts');
      seturlList(result?.data);
      // setTodos([...todos, result?.data]);
    }
  };
  return (
    <>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <div className={classes.container} >
        <Header />
        <Addurl posturl={posturl} />
        <Getitem urlItem={urlList} />
      </div>
    </>
  )
}
