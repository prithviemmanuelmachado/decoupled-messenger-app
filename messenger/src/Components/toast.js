import { Alert, Snackbar } from "@mui/material";

export default function Toast(props){
    const {open, setOpen, toastMsg, toastSeverity} = props
    return <>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={6000}
            key={'topright'}>
            <Alert variant="filled" onClose={() => setOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
            {toastMsg}
            </Alert>
        </Snackbar>
    </>
}