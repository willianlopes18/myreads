import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import Book from './Book';

class ListBooks extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        query:''
    }

    updateQuery = (query) => {
        this.setState({query:query.trimLeft()})
    }

    clearQuery = () => {
        this.setState({query:''})
    }
    
    render(){
        const {books,searchBook,updateShelf} = this.props;
        const {query} = this.state;
        
        let showingBooks
        
        if (query) {
            console.log(books);            
            searchBook(query);
            showingBooks = books;
        }else{
            showingBooks = ''
        }
        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                    
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event)=>this.updateQuery(event.target.value)}/>

                    </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {   
                                showingBooks.length>0 &&
                                showingBooks.map((book,index)=>
                                <Book key={index} updateShelf={updateShelf} book={book}/>
                                )
                            }                            
                        </ol>
                    </div>
                    
                </div>
            </div>
        );
    };
}

export default ListBooks;