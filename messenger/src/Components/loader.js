import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

function Loader(props){
    const { isLoading } = props;

    return<>
        {isLoading && 
            <Box sx={{
                zIndex: 1,
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.25)'
            }}>
                <CircularProgress
                    thickness='4'
                    color='primary'
                    size='6rem'/>
            </Box>}
    </>
}

export default Loader;