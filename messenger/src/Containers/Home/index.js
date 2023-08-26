import { useState } from "react";
import Loader from "../../Components/loader";
import { FormControl, FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material";

function Home(props){
    const { darkModeState, setDarkModeState } = props;
    const [ switchText, setSwitchText ] = useState('Light Mode');
    const [isLoading, setIsLoading] = useState(false);
    const onSwitchChange = () => {
        setSwitchText(darkModeState ? 'Dark Mode' : 'Light Mode');
        setDarkModeState(!darkModeState);
    }
    return<>
        <Loader isLoading = {isLoading}/>
        <FormControl>
            <FormGroup>
                <FormControlLabel control={
                    <Switch 
                        onChange={onSwitchChange}
                        color="secondary"
                        name="DarkModeControl"/>
                } label={<Typography sx={{color:"primary.contrastText"}}>{switchText}</Typography>} color="primary" />
            </FormGroup>
        </FormControl>
        <Grid container>
            <Grid item sx={{
                backgroundColor: 'primary.main',
                width: '10vw',
                height: '10vh',
                color: 'primary.contrastText',
                margin: 10
            }}>
                Primary Box
            </Grid>
            <Grid item sx={{
                backgroundColor: 'secondary.main',
                width: '10vw',
                height: '10vh',
                color: 'secondary.contrastText',
                margin: 10
            }}>
                Secondary Box
            </Grid>
            <Grid item sx={{
                backgroundColor: 'error.main',
                width: '10vw',
                height: '10vh',
                color: 'error.contrastText',
                margin: 10
            }}>
                Error Box
            </Grid>
            <Grid item sx={{
                backgroundColor: 'info.main',
                width: '10vw',
                height: '10vh',
                color: 'info.contrastText',
                margin: 10
            }}>
                Info Box
            </Grid>
            <Grid item sx={{
                backgroundColor: 'success.main',
                width: '10vw',
                height: '10vh',
                color: 'success.contrastText',
                margin: 10
            }}>
                Success Box
            </Grid>
        </Grid>
        
    </>
}

export default Home;