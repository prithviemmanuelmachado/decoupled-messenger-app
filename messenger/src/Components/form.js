import { Button, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Form(props){
    const { 
        itemSpacing,
        heading,
        items,
        itemContainerStyling,
        onSubmit,
        link
    } = props
    return <>
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography sx={{
                    fontWeight: heading.fontWeight,
                    color: heading.color,
                }} variant={heading.variant}>{heading.text}</Typography>
            </Grid>
            <Grid item container spacing={itemSpacing} sx={itemContainerStyling} xs={12}>
                {items && items.map((ele, index) => {
                    return<>
                    <Grid item xs={ele.gridWidth} key={ele.label+'_'+index}>
                        <FormControlLabel
                        sx={{width: '100%'}}
                        control={
                        ele.type === 'textField' ? 
                        <TextField 
                            sx={{input: {color: 'secondary.main'} ,width: '100%'}}
                            label={<Typography sx={{fontWeight: 'bold'}}>{ele.label}</Typography>}
                            variant="outlined"
                            color="secondary"
                            focused
                            onChange={ele.onChange}
                            error={
                                ele.validationType === 'regex' ? ele.validation && !ele.validation.test(ele.value):
                                ele.validationType === 'boolean' ? ele.validation :
                                false
                            }/> : 
                        ele.type === 'password' ? 
                        <TextField 
                            type="password"
                            sx={{input: {color: 'secondary.main'} ,width: '100%'}}
                            label={<Typography sx={{fontWeight: 'bold'}}>{ele.label}</Typography>}
                            variant="outlined"
                            color="secondary"
                            focused
                            onChange={ele.onChange}
                            error={
                                ele.validationType === 'regex' ? ele.validation && !ele.validation.test(ele.value):
                                ele.validationType === 'boolean' ? ele.validation :
                                false
                            }/>
                        :null
                        }/>
                        {ele.validationMessage && ele.validation && <Typography sx={{
                            opacity: 
                            (ele.validationType === 'regex' ? ele.validation && !ele.validation.test(ele.value):
                            ele.validationType === 'boolean' ? ele.validation :
                            false)
                            ? '100%' : '0%',
                            color: 'error.main',
                            fontWeight: 'bold',
                            fontSize: '0.85rem'
                        }}>
                            {ele.validationMessage}
                        </Typography>}
                    </Grid>
                    </>
                })}
            </Grid>
            <Grid container item xs={12} sx={{
                display: 'flex'
            }}>
                <Grid item xs={8}>
                {
                    link &&
                    <Link
                        to={link.to}
                        style={{
                            textDecoration: 'none'
                        }}>
                        <Typography sx={{
                            color:"primary.contrastText",
                            fontWeight: 'medium'}}>
                            {link.text}
                        </Typography>
                    </Link>
                }
                </Grid>
                <Grid item xs={4} sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    paddingRight: '10px'
                }}>
                <Button 
                onClick={onSubmit}
                color="secondary"
                variant="contained">
                    Submit
                </Button>
                </Grid>
            </Grid>
        </Grid>
    </>
}