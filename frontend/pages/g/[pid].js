import Appbar from '../../components/appbar'
import Container from '@material-ui/core/Container';
import axios from "axios";
import { NextSeo } from 'next-seo';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  textField:{
      padding: '2rem 0rem',
      textAlign: 'center'
  },
  
}))

export async function getServerSideProps(context) {
  const { pid } = context.query
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/url/${pid}`);
  return {
    props: data, // will be passed to the page component as props
  }
}

const Tourl = ( context ) => {
  const urlData = context
  const classes = useStyles();
  return (
    <>
        <Appbar />
        
        <NextSeo
            title={urlData.metatitle}
            description={urlData.metatext}
            openGraph={{
              url: urlData.url,
              title: urlData.metatitle,
              description: urlData.metatext,
              images: [
                { url: urlData.metaimg },
              ],
              site_name: 'URL2URL',
            }}
          
          />
          <Container >
            <Typography component="div" variant="h5" className={classes.textField}>
                            {urlData.url}
            </Typography>
        </Container>
    
    </>
  )
}

export default Tourl
