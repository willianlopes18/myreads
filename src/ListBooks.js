import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        query: PropTypes.any,
        onQueryUpdate: PropTypes.func.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }
    
    render(){
        const {books,query,onQueryUpdate,onBookUpdate} = this.props;

        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link className="close-search" to='/' onClick={()=> onQueryUpdate('')}>Close</Link>
                    <div className="search-books-input-wrapper">
                    
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => onQueryUpdate(event.target.value)}/>

                    </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {   
                                
                                books.length > 0?
                                books.map((book,index)=>
                                    <Book key={index} onBookUpdate={onBookUpdate} book={book}/>
                                ):<h4>Not Books Avaible</h4>
                            }                            
                        </ol>
                    </div>
                    
                </div>
            </div>
        );
    };
}

export default ListBooks;