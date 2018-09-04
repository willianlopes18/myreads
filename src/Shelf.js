import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render(){
        const {books, updateShelf} = this.props;
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    books&&
                                    books.map((book,index)=>(
                                        book.shelf==="currentlyReading"&&
                                        <Book key={index} book={book} updateShelf={updateShelf}/>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    books&&
                                    books.map((book,index)=>(
                                        book.shelf==="wantToRead"&&
                                        <Book key={index} book={book} updateShelf={updateShelf}/>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    books&&
                                    books.map((book,index)=>(
                                        book.shelf==="read"&&
                                        <Book key={index} book={book} updateShelf={updateShelf}/>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                </div>
                </div>
                <div className="open-search">
                <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Shelf;