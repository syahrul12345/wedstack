import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Mainpage from '../mainpage'
import Login from '../login'

export default function App() {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Mainpage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}

function Home() {
    return <h2>Home</h2>;
}
  
function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}