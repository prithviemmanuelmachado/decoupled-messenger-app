import { Grid, Typography } from "@mui/material";


function Home(props){
    const { setIsLoading } = props;
    
    return<>
        <Grid container>
            <Grid item sx={{
                backgroundColor: 'primary.main',
                width: '10vw',
                height: '10vh',
                color: 'primary.contrastText',
                margin: 10
            }}>
                <Typography sx={{fontWeight: 'bold'}}>Primary Box</Typography>
            </Grid>
            <Grid item sx={{
                backgroundColor: 'secondary.main',
                width: '10vw',
                height: '10vh',
                color: 'secondary.contrastText',
                margin: 10
            }}>
                <Typography sx={{fontWeight: 'medium'}}>Secondary Box</Typography>
            </Grid>
            <Grid item sx={{
                backgroundColor: 'error.main',
                width: '10vw',
                height: '10vh',
                color: 'error.contrastText',
                margin: 10
            }}>
                <Typography sx={{fontWeight: 'regular'}}>Error Box</Typography>
            </Grid>
            <Grid item sx={{
                backgroundColor: 'info.main',
                width: '10vw',
                height: '10vh',
                color: 'info.contrastText',
                margin: 10
            }}>
                <Typography sx={{fontWeight: 'light'}}>Info Box</Typography>
            </Grid>
            <Grid item sx={{
                backgroundColor: 'success.main',
                width: '10vw',
                height: '10vh',
                color: 'success.contrastText',
                margin: 10
            }}>
                <Typography>Success Box</Typography>
            </Grid>
        </Grid>
        
    </>
}

export default Home;