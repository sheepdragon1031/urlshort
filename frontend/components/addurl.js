import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function addUrl({posturl}){
    return (
        <div>
          <div className="addUrl">
                <TextField 
                    className="addText"
                    label="Add new url here..."
                    id="urlText"
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            posturl(urlText.value);
                            urlText.value = "";
                        }
                    }}
                />
                <Button 
                    className="addButton"
                    variant="contained"
                    onClick={() => {
                        console.log(posturl)
                        posturl(urlText.value);
                        urlText.value = "";
                    }}
                >
                    Add Todo
                </Button>
            </div>
        </div>
      );
}
export default addUrl;
