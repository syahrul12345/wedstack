import React,{useState} from 'react'
import { Grid, Card, CardContent,Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import './login.css'

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
                >
                <Grid item xs={12} id="loginGrid">
                    <Card>
                        <CardContent>
                            <Grid item xs={12}>
                                <p> LOGIN NOW</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                value={values.userId}
                                label="Email"
                                fullWidth
                                onChange={handleChange('userId')}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                label="Password"
                                fullWidth
                                onChange={handleChange('password')}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={login}>Login</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <a>Sign up</a>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}