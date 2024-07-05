import React, {useEffect, useState} from 'react';
import {Book} from '../Model/Book';
import './BookModal.css';
import axios from "axios";
import {Rating} from "@smastrom/react-rating";
import {button} from "../../styled-system/recipes";
import {css} from "../../styled-system/css";


interface BookModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    bookId: number | null;
    onBookDeleted: () => void; // Callback function for when a book is deleted
}

const BookModal: React.FC<BookModalProps> = ({isOpen, onRequestClose, bookId, onBookDeleted}) => {
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (bookId && isOpen) {
                try {
                    const response = await axios.get<Book>(`http://localhost:8080/api/books/${bookId}`);
                    setBook(response.data);
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
        };
        fetchBook();
    }, [bookId, isOpen]);

    const handleDelete = async () => {
        if (bookId) {
            try {
                await axios.delete(`http://localhost:8080/api/books/${bookId}`);
                onBookDeleted(); // Call the callback function to update the book list
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    if (!book || !isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onRequestClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h1 className={css({textStyle: 'h3'})}>{book.title}</h1>

                    <Rating style={{maxWidth: 100}} value={book.rating}/>
                    <button className={button({variant: "primary"})} onClick={onRequestClose}>X</button>
                </div>
                <div className="modal-body">
                    <div className="modal-image">
                        <img src={book.imageUrl} alt={book.title}/>
                    </div>
                    <div className="modal-details">
                        <div>Author: {book.author}</div>
                        <div>Publisher: {book.publisher}</div>
                        <div>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</div>
                        <div>ISBN: {book.isbn}</div>
                        <div>Type: {book.type}</div>
                        <div>Description: {book.description}</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className={button({variant: "outlined"})} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
