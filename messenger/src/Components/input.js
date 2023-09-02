import { Button, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function SingleInput(props){
    const {
        isSendActive,
        placeholder,
        color,
        value,
        setValue,
        onSearch,
        onClear,
        onSend,
        onUpload,
        searchGrid = 0,
        clearGrid = 0,
        sendGrid = 0,
        uploadGrid = 0
    } = props;
    const inputGrid = 12 - (searchGrid + clearGrid + sendGrid + uploadGrid);
    return<>
        <Grid container spacing={1}>
            <Grid item xs={inputGrid}>
            <TextField placeholder={placeholder} color={color} value={value} fullWidth sx={{
                backgroundColor: color + '.input',
                input: {color: color+'.contrastText'}
            }} variant='outlined' onChange={(e) => setValue(e)} 
                onKeyDown={e => {
                    if(e.key === 'Enter'){
                        console.log(isSendActive? true : false)
                        if(onSearch && value !== '') onSearch();
                        if(onSend && isSendActive && value !== '') onSend();
                        setValue('');
                    }
                }}/>
            </Grid>
            {
                searchGrid !== 0 &&  
                <Grid item xs={searchGrid}>
                    <IconButton
                    onClick={onSearch}
                    color={color === 'primary'? 'secondary' : color === 'secondary' ? 'primary' : color} size='large'>
                        <SearchIcon/>
                    </IconButton>
                </Grid>
            }
            {
                clearGrid !== 0 &&  
                <Grid item xs={clearGrid}>
                    <IconButton 
                    onClick={onClear}
                    color={color === 'primary'? 'secondary' : color === 'secondary' ? 'primary' : color} size='large'>
                        <ClearIcon/>
                    </IconButton>
                </Grid>
            }  
            {
                sendGrid !== 0 &&  
                <Grid item xs={sendGrid}>
                    <IconButton 
                    onClick={onSend}
                    color={color === 'primary'? 'secondary' : color === 'secondary' ? 'primary' : color} size='large'>
                        <SendIcon/>
                    </IconButton>
                </Grid>
            }
            {
                uploadGrid !== 0 &&  
                <Grid item xs={uploadGrid}>
                    <Button
                    component='label'
                    color={color === 'primary'? 'secondary' : color === 'secondary' ? 'primary' : color}
                    sx={{
                        padding: '10px'
                    }}>
                        <AttachFileIcon/>
                        <input hidden id={'fileUpload'} multiple type="file" onChange={onUpload} disabled={!isSendActive? true : false}/>
                    </Button>
                </Grid>
            }            
        </Grid>
    </>
}

export default SingleInput;