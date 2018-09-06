import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }
    
    render(){
        const {books, onBookUpdate} = this.props;
        const shelf = [{title:'Currently Reading',item:'currentlyReading'},{title:'Want to Read',item:'wantToRead'},{title:'Read',item:'read'}]
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                
                <div className="list-books-content">
                {
                    shelf.map((shelf) =>(
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {                             
                                        books.filter((b) => b.shelf === shelf.item).map((book,index)=>(
                                            <Book key={index} book={book} onBookUpdate={onBookUpdate}/>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                    ))
                }
                </div>
                
                <div className="open-search">
                    <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
                </div>
            
            </div>
        );
    }
}

export default Shelf;