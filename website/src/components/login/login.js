import React,{useState} from 'react'
import { Grid,Button,IconButton,createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import grey from 'material-ui/colors/grey';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {Helmet} from "react-helmet";
import './login.css'
import axios from 'axios'
const theme = createMuiTheme({
    palette:{
        primary:{
            main: grey[900]
        },
    }
})

export default function Login() {
    const [values,setValues] = useState({
        userId:'',
        password:'',
        showPassword: false,
    })
    const login = () => {
        axios.post('http://localhost:9190/api/login',{
            email:values.userId,
            password:values.password
        }).then((result) => {
            console.log(result)
        }).catch((error)=>{
            console.log(error.response)
        })
    }   
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }; 

    return(
        <div id="grad">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wedstack | Login</title>
                <link rel="canonical" href="https://wedstack.io/Login" />
            </Helmet>
            <Grid
                container
                direction="row"
                alignItems="center"
                style={{minHeight:'100vh'}}
                >
                <Grid item xs={12} id="loginGrid">
                    <p id="loginHeader"> Wedstack</p>
                    <TextField
                    id="emailField"
                    value={values.userId}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    style={{marginBlockEnd:'1vh'}}
                    onChange={handleChange('userId')}
                    />
                    <TextField
                    id="passwordField"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange('password')}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            >
                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        ),
                      }}/>
                    <MuiThemeProvider theme={theme}>
                        <Button 
                        id="loginButton"
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={login}> Login </Button>
                    </MuiThemeProvider>
                        <p 
                        style={{marginTop:'2vh'}}>
                            No Account? <a href="/signup">Sign up here</a>
                        </p>
                </Grid>
            </Grid>
        </div>
    )
}