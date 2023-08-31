import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function Message(props){
    const {
        body,
        date,
        isToMe
    } = props;

    let messageBody = null;
    if((typeof body === 'string')){
        messageBody = <Typography sx={{
            color: isToMe? 'secondary.main' : 'secondary.contrastText',
            margin: '10px',
            overflowWrap: 'break-word'
        }}>
            {body}
        </Typography>
    }
    else{
        if(body.type.toUpperCase().includes('IMAGE')){
            messageBody = <a href={body.url} download>
                <img src={body.url} style={{ maxWidth: '500px', maxHeight: '700px' }} alt=''/>
            </a>
        }else{
            messageBody = <Button onClick={() => {
                var element = document.createElement('a');
                element.setAttribute('href', body.url);
                element.setAttribute('download', '');
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }} color={isToMe? 'secondary' : 'primary'}>
                <SaveAltIcon/>
                <Typography sx={{paddingLeft: '10px', fontWeight: 'bold'}}>
                    {body.url.split('.').pop().toUpperCase()}
                </Typography>
            </Button>
        }
    }

    return<>
        <Box>
        <Grid container item xs={12} justifyContent={isToMe? 'flex-start' : 'flex-end'}>
        <Grid item sx={{
                minHeight: '5rem',
                height: '100%',
                marginTop: '1em',
                marginInline: '1em',
                maxWidth: '70%'
            }} zeroMinWidth>
                <Paper elevation={10} sx={{
                    backgroundColor: isToMe? 'secondary.input' : 'secondary.main',
                    height: '100%',
                    padding: '4px',
                }}>
                    {messageBody} 
                    <Typography sx={{
                        color: isToMe? 'secondary.main' : 'secondary.contrastText',
                        margin: '10px',
                        overflowWrap: 'break-word',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textAlign: isToMe? 'left' : 'right'
                    }}>
                        {date.getDate()+'/'+(date.getMonth() + 1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()}
                    </Typography>          
                </Paper>
            </Grid>
        </Grid>
        </Box>
    </>
}