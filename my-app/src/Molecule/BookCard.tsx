import React from 'react';
import {Book} from '../Model/Book';
import './BookCard.css';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({book}) => {
    return (
        <div key={book.id} className="book-card">
            <img src={book.imageUrl} alt={book.title} style={{maxWidth: '200px'}}/>

            <h3>{book.title}</h3>
            <div>Author: {book.author}</div>
            <div>Publisher: {book.publisher}</div>
            <div>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</div>
            <div>ISBN: {book.isbn}</div>
            <div>Type: {book.type}</div>


        </div>
    );
};

export default BookCard;
