import React,{useState} from 'react'
import { Grid, Card, CardContent,Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import grey from 'material-ui/colors/grey';
import './login.css'

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
        console.log(values.userId)
        console.log(values.password)
    }   
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }; 

    return(
        <div id="grad">
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
                    onChange={handleChange('userId')}/>
                    <TextField
                    id="passwordField"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange('password')}/>
                    <MuiThemeProvider theme={theme}>
                        <Button 
                        id="loginButton"
                        variant="contained"
                        fullWidth
                        color="primary"> Login </Button>
                    </MuiThemeProvider>
                    <p> Sign up for an account now</p>
                </Grid>
            </Grid>
        </div>
    )
}