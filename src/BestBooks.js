import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Jumbotron} from 'react-bootstrap/';
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


componentDidMount(){
  this.getBooks();
}

getBooks=async ()=>{
  console.log('test');
  const {user}=this.props.auth0;
  const urlBooks =`${process.env.REACT_APP_BACKEND_URL}/books?email=${user.email}`;
  const reqBook= await axios.get(urlBooks);
  console.log(reqBook.data.books);
  this.setState({
    myBook:reqBook.data.books
  })
  console.log(this.state.myBook);
}

render() {
  return (
    <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      {this.state.myBook.map((book, index) =>
          <>
          <Card className='cardBook'>
            <Card.Body key={index}>
              <Card.Title>Book name: {book.name}</Card.Title>
              <Card.Text>Description: {book.description}</Card.Text>
              <Card.Text>Status: {book.status}</Card.Text>
            </Card.Body>
            </Card>
          </>
          )}
    </>
  )
}}

export default withAuth0(MyFavoriteBooks)
