import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Book} from "../Model/Book";
import './BookCatalog.css'
import BookCard from "../Molecule/BookCard";
import {useNavigate} from "react-router-dom";

const BookCatalog: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateBook = () => {
        navigate('/create-book') // Redirige vers la page de création de livre
    };

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get<Book[]>('http://localhost:8080/api/books');
                console.log(response);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="book-catalog">
            <button onClick={handleCreateBook} className="catalog-button">Create New Book</button>
            <div className="book-catalog-grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book}/>
                ))}
            </div>
        </div>
    );
};

export default BookCatalog;
