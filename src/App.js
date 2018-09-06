import React,{Component} from 'react'
import {Route} from 'react-router-dom';
import Shelf from './Shelf';
import sortBy from 'sort-by';
import ListBooks from './ListBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    books:[],
    searchBooks:[],
    query:'',
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState(state =>({
        books:books.sort(sortBy('title'))
      }))
    })
  }

  updateBook = (book, shelf) => {
    if(this.state.books){
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).sort(sortBy('title'))
      }))

      BooksAPI.update(book,shelf).then( () => {
          book.shelf = shelf
          this.setState(state => ({
            books: state.books.filter((b) => b.id !== book.id).concat([book]).sort(sortBy('title'))
          }))
          if(this.query){
            this.setState(state => ({
              searchBooks: state.books.filter((b) => b.id !== book.id).concat([book]).sort(sortBy('title'))
            }))
          }
      })
    }
  }

  queryUpdate = (query) =>{
    if(!query){
      this.setState({query:'',searchBooks:[]});
      return;
    }
    this.setState({
      query:query,
      searchBooks:[]
    }, () => {
      this.search();
    })
  }

  search = () => {
    var query = this.state.query;
    if(query.trim() === ''){
      this.setState({query:'',searchBooks:[]});
      return;
    }
    BooksAPI.search(query).then((books)=>{
      if(query !== this.state.query){
        return;
      }
      if('error' in books){
        books = []
      }else{
        books.map(book=>(this.state.books.filter((b)=>b.id === book.id).map(b => book.shelf = b.shelf)))
      }
      this.setState({searchBooks:books.sort(sortBy('title'))})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <Shelf 
            onBookUpdate = {this.updateBook}
            books={this.state.books}
          />
        )}/>

        <Route path="/search" render={() => (
          <ListBooks 
            books={this.state.searchBooks}
            query={this.state.query}
            onQueryUpdate={this.queryUpdate}
            onBookUpdate={this.updateBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
