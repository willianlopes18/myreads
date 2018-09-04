import React,{Component} from 'react'
import {Route} from 'react-router-dom';
import Shelf from './Shelf';
import ListBooks from './ListBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    books:[],
    search:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then( books =>{
      this.setState((state)=>({
        books: state.books.filter((b)=>b.id !== book.id)
      }))
    })
    BooksAPI.get(book.id).then((book)=>{
      this.setState((state)=>({
        books: state.books.concat([book])
      }))
    })
  }

  searchBook = (query) =>{
    if(query !== ""){
      BooksAPI.search(query).then(books => {
        this.setState({search:books})
      })
    }else{
      this.setState({search:""})
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <Shelf updateShelf={(book,shelf)=> {
            this.updateShelf(book,shelf)}}
            books={this.state.books}/>
        )}/>

        <Route path="/search" render={({history}) => (
          <ListBooks 
            searchBook={this.searchBook}
            updateShelf={(book,shelf)=>{
            this.updateShelf(book,shelf)
            }}
            books={this.state.search}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
