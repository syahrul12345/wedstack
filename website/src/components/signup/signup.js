import React,{useState} from 'react'
import { Grid,TextField,Button, createMuiTheme, MuiThemeProvider,IconButton } from '@material-ui/core'
import grey from 'material-ui/colors/grey';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {Helmet} from "react-helmet";
import './signup.css'
import axios from 'axios';
const theme = createMuiTheme({
    palette:{
        primary:{
            main: grey[900]
        },
    }
})
export default function SignUp() {
    const [values,setValues] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        captcha:'',
        showPassword:false,
        showConfirmPassword:false,
    })
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = prop => event  => {
        if(prop == 'showPassword') {
            setValues({ ...values, [prop]: !values.showPassword });
        }
        if(prop == 'showConfirmPassword') {
            setValues({ ...values, [prop]: !values.showConfirmPassword });
        }
    }; 
    const createAccount = () => {
        //First ensure that the passwords are consisten
        if (values.password !==values.confirmPassword) {
            console.log("password is not the same")
            return
        }
        axios.post("/api/newAccount",{
            email:values.email,
            password:values.password
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error.response)
        })
    }
    return(
        <div id="grad">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wedstack | Signup</title>
                <link rel="canonical" href="https://wedstack.io/signup" />
            </Helmet>
            <Grid
            container
            direction="row"
            alignItems="center"
            style={{minHeight:'100vh',textAlign:'center'}}>
                <Grid
                item
                xs={12}
                id="signupGrid">
                <p>Sign up</p>
                <TextField
                id="emailField"
                value={values.email}
                label="Email"
                fullWidth
                variant="outlined"
                style={{marginBlockEnd:'1vh'}}
                onChange={handleChange('email')}/>
                <TextField
                id="passwordField"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                label="Password"
                fullWidth
                variant="outlined"
                style={{marginBlockEnd:'1vh'}}
                onChange={handleChange('password')}
                InputProps={{
                    endAdornment: (
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('showPassword')}
                        >
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    ),
                  }}/>
                <TextField
                id="confirmPasswordField"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                label="Confirm Password"
                fullWidth
                variant="outlined"
                onChange={handleChange('confirmPassword')}
                InputProps={{
                    endAdornment: (
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('showConfirmPassword')}
                        >
                            {values.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    ),
                  }}/>
                <MuiThemeProvider theme={theme}>
                        <Button 
                        id="createBtn"
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={createAccount}> Create Account </Button>
                </MuiThemeProvider>
                </Grid>
            </Grid>
        </div>
    )
}