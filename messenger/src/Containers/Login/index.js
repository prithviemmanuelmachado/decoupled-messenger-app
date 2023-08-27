import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

function Login(props){
    const { setIsLoading } = props;
    return<>
        <Box>
            <Link
                to={'/register'}
                style={{
                    textDecoration: 'none'
                }}>
                <Typography sx={{
                    color:"primary.contrastText",
                    fontWeight: 'medium'}}>
                    Register new user
                </Typography>
            </Link>
        </Box>
    </>
}

export default Login;