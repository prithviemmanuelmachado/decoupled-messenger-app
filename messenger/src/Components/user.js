import { Chip, Grid, Link, Paper, Typography } from "@mui/material";

export default function User(props){
    const {
        userInfo,
        loadMessages,
        isSelected
    } = props;
    return<>
        <Link onClick={() => {
            loadMessages(userInfo);
        }} underline='none'>
        <Grid item sx={{
            height: '4rem',
            marginTop: '1em',
            marginInline: '0.75em'
        }}>
            <Paper elevation={isSelected? 20: 10} sx={{
                backgroundColor: isSelected? 'secondary.selected': 'primary.input',
                height: '100%'
            }}>
                <Grid container direction='row' alignItems='stretch' justifyContent='center'>
                    <Grid item xs={10} sx={{paddingLeft: '1em', paddingTop: '1em'}}>
                        <Typography sx={{
                            color: 'primary.contrastText'
                        }}>
                            {userInfo.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{paddingTop: '1em'}}>
                        <Chip label={userInfo.unreadMessages === -1? '-' : userInfo.unreadMessages} color='secondary'/>
                    </Grid>
                </Grid>                
            </Paper>
        </Grid>
        </Link>
    </>
}