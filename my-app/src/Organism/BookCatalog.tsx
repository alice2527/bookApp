import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Book} from "../Model/Book";
import './BookCatalog.css'
import BookCard from "../Molecule/BookCard";

const BookCatalog: React.FC = () => {
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
            <h2>Book List</h2>
            <div className="book-catalog-grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book}/>
                ))}
            </div>
        </div>
    );
};

export default BookCatalog;
