import { Chip, Grid, Link, Paper, Typography } from "@mui/material";

export default function User(props){
    const {
        userInfo
    } = props;
    return<>
        <Link onClick={() => {
            console.log(userInfo.userID);
        }} underline='none'>
        <Grid item sx={{
            height: '4rem',
            marginTop: '0.2em',
            marginInline: '0.2em'
        }}>
            <Paper elevation={10} sx={{
                backgroundColor: 'primary.input',
                height: '100%'
            }}>
                <Grid container direction='row' alignItems='stretch' justifyContent='center'>
                    <Grid item xs={10} sx={{paddingLeft: '1em', paddingTop: '1em'}}>
                        <Typography sx={{
                            color: 'primary.contrastText'
                        }}>
                            {userInfo.fName + ' ' + userInfo.lName}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{paddingTop: '1em'}}>
                        <Chip label={userInfo.unreadMessages} color='success'/>
                    </Grid>
                </Grid>                
            </Paper>
        </Grid>
        </Link>
    </>
}