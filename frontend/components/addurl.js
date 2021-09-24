import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




function AddUrl({postUrl, createID}){
    const UseStyles = makeStyles({
        Button: {
            margin: 'auto',
            left: 0,
            right: 0,
            display: 'block',
            margin: '0.5rem auto'
        },
        TextField:{
            marginTop: '1rem',
            padding: '0 0.5rem'
        }
    })
    const classes = UseStyles();
    return (
        <div>
          <div className="addUrl">
                <TextField 
                    className={classes.TextField}
                    label="Add new url here..."
                    id="urlText"
                    fullWidth
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            postUrl(urlText.value, createID);
                            urlText.value = "";
                        }
                    }}
                />
                <Button 
                    className={classes.Button}
                    variant="contained"
                    onClick={() => {
                        postUrl(urlText.value, createID);
                        urlText.value = "";
                    }}
                >
                    Add URL
                </Button>
            </div>
        </div>
      );
}
export default AddUrl;
