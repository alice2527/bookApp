import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    publishedDate: string;
    isbn: string;
    type: string;
    imageUrl: string;
    rating: number;
    description: string;
}

const BookCatalog: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get<Book[]>('http://localhost:8080/api/books');
                console.log(response)
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <div>Title: {book.title}</div>
                        <div>Author: {book.author}</div>
                        <div>Publisher: {book.publisher}</div>
                        <div>Published Date: {book.publishedDate}</div>
                        <div>ISBN: {book.isbn}</div>
                        <div>Type: {book.type}</div>
                        <div>Image URL: {book.imageUrl}</div>
                        <div>Rating: {book.rating}</div>
                        <div>Description: {book.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookCatalog;
