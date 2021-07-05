import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react'
import axios from 'axios'


class MyFavoriteBooks extends React.Component {
    constructor(props){
      super(props);
      this.state={
        myBook:[],


      }
    }

    componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization":`Bearer ${ jwt }`
        },
        method: 'get',
        baseURL: process.env.REACT_APP_AUTH0_DOMAIN,
        url: '/authorize'
      }
       axios(config)
        .then(axiosResults => console.log(axiosResults.data))
        .catch(err => console.error(err));
     }).catch(err => console.error(err));
   }
}

getBooks=async ()=>{
  const {user}=this.props.auth0;
  const urlBooks =`${process.env.REACT_APP_BACKEND_URL}/books?email=${user.email}`;
  const reqBook= await axios.get(urlBooks)
  
}

render() {
  return (
    <Jumbotron>
      <h1>My Favorite Books</h1>
      <p>
        This is a collection of my favorite books
      </p>
    </Jumbotron>
  )
}
}

export default withAuth0(MyFavoriteBooks)
