import React, {useEffect, useState} from 'react';
import {Book} from '../Model/Book';
import axios from "axios";
import {Rating} from "@smastrom/react-rating";
// @ts-ignore
import {button, modal} from "../../styled-system/recipes";
import {css, cx} from "../../styled-system/css";
import {hstack} from "../../styled-system/patterns";
import {useNavigate} from "react-router-dom";


interface BookModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    bookId: number | null;
    onBookDeleted: () => void; // Callback function for when a book is deleted
}

const BookModal: React.FC<BookModalProps> = ({isOpen, onRequestClose, bookId, onBookDeleted}) => {
    const [book, setBook] = useState<Book | null>(null);
    const navigate = useNavigate();
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
    const handleUpdate = () => {
        navigate(`/update-book/${bookId}`)
    };
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
        <div className={modal({variant: "overlay"})} onClick={onRequestClose}>
            <div className={modal({variant: "content"})} onClick={(e) => e.stopPropagation()}>
                <div className={modal({variant: "header"})}>
                    <h1 className={css({textStyle: 'h3'})}>{book.title}</h1>

                    <Rating style={{maxWidth: 100}} value={book.rating} readOnly={true}/>
                    <button className={button({variant: "primary"})} onClick={onRequestClose}>X</button>
                </div>
                <div className={css({display: "flex"})}>
                    <div className={css({
                        maxWidth: "150px",
                        height: "auto",
                        marginRight: "1rem",
                        borderRadius: "8px",
                    })}>
                        <img src={book.imageUrl} alt={book.title}/>
                    </div>
                    <div className={modal({variant: "details"})}>
                        <div>Author: {book.author}</div>
                        <div>Publisher: {book.publisher}</div>
                        <div>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</div>
                        <div>ISBN: {book.isbn}</div>
                        <div>Type: {book.type}</div>
                        <div>Description: {book.description}</div>
                    </div>
                </div>
                <div className={cx(modal({variant: "footer"}), hstack({gap: "1rem"}))}>
                    <button className={button({variant: "primary"})} onClick={handleUpdate}>Update</button>
                    <button className={button({variant: "outlined"})} onClick={handleDelete}>Delete</button>

                </div>
            </div>
        </div>
    );
};

export default BookModal;
