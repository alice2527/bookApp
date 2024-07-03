import React, {useEffect, useState} from 'react';
import {Book} from '../Model/Book';
import './BookModal.css';
import axios from "axios";

interface BookModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    bookId: number | null;
}

const BookModal: React.FC<BookModalProps> = ({isOpen, onRequestClose, bookId}) => {
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

    if (!book || !isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onRequestClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{book.title}</h2>
                    <button className="modal-close" onClick={onRequestClose}>X</button>
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
                        <div>Rating: {book.rating}</div>
                        <div>Description: {book.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
