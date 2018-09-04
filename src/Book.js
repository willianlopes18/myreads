import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component{
    // static propTypes = {
    //     books: PropTypes.array.isRequired
    // }

    stateSubmit = (e) =>{
        e.preventDefault()
        const shelves = e.target.value;
        const bookId = e.target.id;
        if(this.props.updateShelf)
            this.props.updateShelf(bookId,shelves);
    }

    render(){
        const {book, updateShelf} = this.props;
        return(
                <li>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={(event) => updateShelf(book,event.target.value)}>
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