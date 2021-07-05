import React from 'react';
import Header from './Header';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import BestBooks from './BestBooks';
import Login from './Login'
import Profile from './Profile';
import Footer from './Footer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
    componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization":`Bearer ${ jwt }`
        },
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/authorize'
      }
       axios(config)
        .then(axiosResults => console.log(axiosResults.data))
        .catch(err => console.error(err));
     }).catch(err => console.error(err));
   }
   
}
  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                  this.props.isAuthenticated ?<BestBooks/>:<Login/>

                }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route path="/profile">
                {this.props.auth0.isAuthenticated && <Profile/> }
              </Route>
            </Switch>
            <Footer />

        </Router>
      </>
    );
  }
}

export default withAuth0(App);
