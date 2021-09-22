/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

import Appbar from '../../components/appbar'
import Container from '@material-ui/core/Container';
import axios from "axios";
import Router from 'next/router'
import { getSession, useSession, signIn, signOut } from "next-auth/client";
import MetaTags from 'react-meta-tags';

const Tourl = () => {
  const router = useRouter()
  const { pid } = router.query
  const [urlData, seturlData] = useState([]);
  const [isSending, setIsSending] = useState(false)
  useEffect(() => {
    
    if(isSending === false){
      if(pid){
        async function GetData() {
          const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/url/${pid}`);
          seturlData(result?.data);
        }
        GetData()
        setIsSending(true)
      }
    }
    else{
      router.push(urlData['url2'])
    }
    
  }, [pid, urlData])
 
  
  // 
  return (
    <>
    
        <Appbar />
        <Container maxWidth="sm">
        <MetaTags>
            <title>{urlData.url}</title>
            <meta name="description" content={urlData.metatext} />
            <meta property="og:title" content={urlData.metatitle} />
            <meta property="og:image" content={urlData.metaimg} />
          </MetaTags>
        {/* <h1>{pid}</h1> */}
        </Container>
    
    </>
  )
}

export default Tourl
