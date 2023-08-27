import { AppBar, IconButton, Menu, MenuItem, FormControl, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";

function Header(props){
    const { darkModeState, setDarkModeState } = props;
    const [ switchText, setSwitchText ] = useState('Light Mode');
    const [ loginText, setLoginText ] = useState('Login');
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if(!darkModeState)
            setSwitchText('Dark Mode');
        else
            setSwitchText('Light Mode');
    },[darkModeState]);

    useEffect(() => {
        if(localStorage.getItem('token')){
            setLoginText('Logout');
        }
        else{
            setLoginText('Login');
        }
    }, []);

    return<>
        <AppBar
            sx={{
                borderBottom: '3px solid',
                borderBottomColor: 'secondary.main',
                backgroundColor: 'secondary.main'
            }}
            color='primary'>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{
                        width: '50px',
                        color: 'primary.main',
                        marginLeft: 'auto',
                        marginRight: 0
                    }}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                          width: '30ch',
                        },
                    }}
                    sx={{
                        '&& .MuiMenu-paper': {
                            color: 'primary.contrastText',
                            backgroundColor: 'primary.main'
                        }
                    }}
                >
                    <Link
                        to={'/'}
                        style={{
                            textDecoration: 'none'
                        }}>
                        <MenuItem onClick={handleClose}>
                            <Typography sx={{
                                color:"primary.contrastText",
                                fontWeight: 'medium'}}>
                                Home
                            </Typography>                        
                        </MenuItem>
                    </Link>
                    <Link
                        to={'/login'}
                        style={{
                            textDecoration: 'none'
                        }}>
                        <MenuItem onClick={handleClose}>
                            <Typography sx={{
                                color:"primary.contrastText",
                                fontWeight: 'medium'}}>
                                {loginText}
                            </Typography>                        
                        </MenuItem>
                    </Link>
                    <MenuItem>
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Switch 
                                        checked={!darkModeState}
                                        onChange={() => setDarkModeState(!darkModeState)}
                                        color="secondary"
                                        name="DarkModeControl"/>
                                } label={
                                <Typography sx={{
                                    color:"primary.contrastText",
                                    fontWeight: 'medium'}}>
                                    {switchText}
                                </Typography>} color="primary" />
                            </FormGroup>
                        </FormControl>
                    </MenuItem>
                </Menu>
        </AppBar>
    </>
}

export default Header;