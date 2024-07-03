import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Book} from "../Model/Book";
import './BookCatalog.css'
import BookCard from "../Molecule/BookCard";
import {useNavigate} from "react-router-dom";
import BookModal from "../Molecule/BookModal";

const BookCatalog: React.FC = () => {
    const navigate = useNavigate();
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get<Book[]>('http://localhost:8080/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleCreateBook = () => {
        navigate('/create-book'); // Redirect to the create book page
    };

    const openModal = (id: number) => {
        setSelectedBookId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedBookId(null);
        setModalIsOpen(false);
    };

    const handleBookDeleted = () => {
        closeModal();
        fetchBooks(); // Refresh the book list after a book is deleted
    };

    return (
        <div className="book-catalog">
            <button onClick={handleCreateBook} className="catalog-button">Create New Book</button>
            <div className="book-catalog-grid">
                {books.map((book) => (
                    <div key={book.id} onClick={() => openModal(book.id)}>
                        <BookCard book={book}/>
                    </div>
                ))}
            </div>
            <BookModal isOpen={modalIsOpen} onRequestClose={closeModal} bookId={selectedBookId}
                       onBookDeleted={handleBookDeleted}/>
        </div>
    );
};

export default BookCatalog;
