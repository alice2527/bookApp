import React from 'react';
import {Book} from '../Model/Book';
import {Rating} from '@smastrom/react-rating'
import {css} from "../../styled-system/css";

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({book}) => {
    return (
        <div key={book.id} className={css({
            maxWidth: "20rem",
            width: "100%",
            backgroundColor: "white",
            margin: "1rem",
            padding: " 1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginInline: "2rem",
        })}>
            <img src={book.imageUrl} alt={book.title} style={{maxWidth: '12.5rem', height: "18.75rem"}}/>

            <h3 className={css({textStyle: 'heading3'})}>{book.title}</h3>

            <Rating style={{maxWidth: 100}} value={book.rating}/>

            <div>Author: {book.author}</div>
            <div>Publisher: {book.publisher}</div>
            <div>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</div>
            <div>ISBN: {book.isbn}</div>
            <div>Type: {book.type}</div>


        </div>
    );
};

export default BookCard;
