import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render(){
        const {book, onBookUpdate} = this.props;
        const imageBook = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail: [];
        const shelf = book.shelf?book.shelf:'none';

        return(
                <li>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageBook})` }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select value={shelf} onChange={(event) => onBookUpdate(book, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none" defaultChecked>None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{
                            book.authors&&
                            book.authors.map((authors,index)=>(
                            <p key={index}>{authors}</p>
                        ))}</div>
                    </div>
                </li>            
        );
    }
}

export default Book;