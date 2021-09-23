import { useState } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IosShareIcon  from '@material-ui/icons/IosShare';
import DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import AnalyticsIcon from '@material-ui/icons/Analytics';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Link from 'next/link'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    card:{
        margin: '0.5rem',
        display: 'flex'
    },
    box:{
        display: 'flex',
        flexDirection: 'column',
        width: '73%', 
    },
    cardContent:{
        flex: '1 0 auto',
      
    },
    cardMedia:{
        width: 152
    },
    boxflex:{
        display: 'flex', 
        alignItems: 'center',
       
    },
    viewnum:{
        padding: '0 .5rem',
        
    },
    cardContentUpdata:{
        display: 'flex',
        width: '100%',
    },
    cardContentmetas:{
        display: 'flex',
        width: '100%',
        padding: '1rem 0rem',
    },
    metatext:{
        padding: '.5rem 0'
    },
    cardContentmeta:{
        width: '100%',
    },
    updataUrl:{
        flex: 9.
    },
    updataUrlBtn:{
        flex: 1,
    },
    contentBody:{
        paddingBottom: '1rem',
    }
})
function CardPackage ({deleUrl, data, index, putURL, putMeta}){
    const classes = useStyles();
    const [edit, setedit] = useState(false)
    const [urlText, setUrlText] = useState(data.url2)
    const [metaEdit, setMetaEdit] = useState(false)
    const [metadata, setMetadata] = useState({
        metaTitle: data.metatitle,
        metaImage: data.metaimg,
        metaDdescription: data.metatext,
    })
    return (
            <>
            <Card key={index} className={classes.card} >
                <Box className={classes.box}>
                    <CardContent className={classes.cardContent}>
                    <Typography component="div" variant="h5">
                        {data.url2}
                    </Typography>
                    <Typography variant="body1" className={classes.contentBody} component="div">
                        {data.metatext}
                    </Typography>
                   
                    <Typography variant="subtitle1" className={classes.subtitle} component="div">
                        {data.metatitle}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        <Link sx={{ pl: 1, pb: 1}} href={`/g/${data.url}`}>{`/g/${data.url}`}</Link>
                    </Typography>
                    </CardContent>
                    <Box className={classes.boxflex}>
                        <Button title="view">
                            <IosShareIcon /> 
                            <Typography className={classes.viewnum} >
                                {data.view}
                            </Typography>
                        </Button>
                        <Button title="delete"
                            onClick={()=>{
                                deleUrl(data.id)
                            }}>
                            <DeleteOutlineIcon /> 
                        </Button>
                        <Button title="update"  
                            onClick={()=>{
                                setedit(!edit)
                            }}>
                            <EditIcon />
                        </Button>
                        <Button title="update"  
                            onClick={()=>{
                                setMetaEdit(!metaEdit)
                            }}>
                            <AnalyticsIcon />
                        </Button>
                        <Link href={`/g/${data.url}`} passHref>
                            <Button title="Open In Browser">
                                    <OpenInBrowserIcon />
                            </Button>
                        </Link>
                    </Box>
                </Box>
                
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={data.metaimg}
                    alt={data.titletext}
                />
                
            </Card>
            {
                edit?
                <Card key={`edit-${index}`} className={classes.card} >
                    <CardContent className={classes.cardContentUpdata}>
                        <TextField 
                            className={classes.updataUrl} 
                            fullWidth 
                            id="updata-url" 
                            label="web url"
                            onChange={e=>setUrlText(e.target.value)} 
                            value={urlText}
                            variant="outlined" />
                        <Button className={classes.updataUrlBtn} title="send" onClick={()=>{putURL(data.id, urlText)}}>
                            <EditIcon />
                        </Button>
                    </CardContent>
                </Card>:
                <></>
            } 
            {
                 metaEdit?
                 <Card key={`metaedit-${index}`} className={classes.card} >
                    <CardContent className={classes.cardContentmeta} >
                        <Container className={classes.cardContentmetas}>
                            <TextField 
                                className={classes.updataUrl} 
                                fullWidth 
                                id="meta-title" 
                                label="meta title"
                                // defaultValue={metadata.metaTitle}
                                value={metadata.metaTitle|| ''}
                                onChange={e=>setMetadata({...metadata, metaTitle: e.target.value})} 
                                // value={urlText}
                                variant="outlined" />
                            <Button className={classes.updataUrlBtn} title="send"
                                onClick={()=>{putMeta(data.id, metadata)}}>
                                <EditIcon />
                            </Button>
                        </Container>
                       
                        <TextField 
                            className={classes.metatext} 
                            fullWidth 
                            id="meta-img" 
                            label="meta img"
                            // defaultValue={metadata.metaImage}
                            value={metadata.metaImage|| ''}
                            onChange={e=>setMetadata({...metadata, metaImage: e.target.value})} 
                            // value={urlText}
                            variant="outlined" />
                        
                        <TextField 
                           className={classes.metatext} 
                           fullWidth 
                           id="meta-description" 
                           label="meta description"
                        //    defaultValue={metadata.metaDdescription}
                           value={metadata.metaDdescription|| ''}
                           multiline
                           rows={4}
                           onChange={e=>setMetadata({...metadata, metaTmetaDdescriptionitle: e.target.value})} 
                           // value={urlText}
                           variant="outlined" />
                    </CardContent>
                </Card>:
                <></>
            }
            </>
              
    )
}

export default CardPackage;