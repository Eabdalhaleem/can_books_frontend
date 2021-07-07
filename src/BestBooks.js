import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Jumbotron} from 'react-bootstrap/';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import AddBookBtn from './AddBookBtn';
import DeleteBookBtn from './DeleteBookBtn';


class MyFavoriteBooks extends React.Component {
    constructor(props){
      super(props);
      this.state={
        myBook:[],
        name:'',
        description:'',
        status:'',
        show:false
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

getName=(e)=>{
  e.preventDefault();
  this.setState({
    name:e.target.value
  })
}
getDescription=(e)=>{
  e.preventDefault();
  this.setState({
    deccription:e.target.value
  })
}
getStatus=(e)=>{
  e.preventDefault();
  console.log(e.target.value);
  this.setState({
    status:e.target.value
  })
}
addBook= async (e)=>{
  e.preventDefault();
  const {user}=this.props.auth0;
  const bookData={
    name:this.state.name,
    description:this.state.description,
    status:this.state.status,
    email:user.email
  }
  console.log(bookData);
  const addBookURL=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addbook`,bookData);
  console.log(addBookURL.data);
  this.setState({
    myBook:addBookURL.data
  })
}
deleteBook=async(book_idx)=>{
  const {user}=this.props.auth0;
  console.log(book_idx);
  const qureyEmail={
    email:user.email
  }
  const deleteBookURL=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletebook/${Number(book_idx)}`,{params:qureyEmail});
    console.log(deleteBookURL);
    this.setState({
      myBook:deleteBookURL.data
    })
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

      <AddBookBtn 
        getName={this.getName}
        getDescription={this.getDescription}
        getStatus={this.getStatus}
        addBook={this.addBook}
      />

      {this.state.myBook.map((book, index) =>
          <>
          <Card className='cardBook' key={index} id={index}>
            <Card.Body >
              <Card.Title>Book name: {book.name}</Card.Title>
              <Card.Text>Description: {book.description}</Card.Text>
              <Card.Text>Status: {book.status}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <DeleteBookBtn 
                deleteBook={this.deleteBook}
                index={index}
              />
            </Card.Footer>
            </Card>
          </>
          )}
    </>
  )
}}

export default withAuth0(MyFavoriteBooks)
