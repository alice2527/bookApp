import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {flex, vstack} from '../../styled-system/patterns';
import {Rating} from "@smastrom/react-rating";
import {button, input} from "../../styled-system/recipes";
import {css, cx} from "../../styled-system/css";
import {Book} from "../Model/Book";
import Spinner from "../Atom/spinner";

const UpdateForm: React.FC = () => {
    const navigate = useNavigate();
    const {bookId} = useParams<{ bookId: string }>();

    const [status, setStatus] = useState("loading");
    const [book, setBook] = useState<Book | null>(null);
    const [rating, setRating] = useState(0);
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        publisher: "",
        publishedDate: "",
        isbn: "",
        type: "",
        imageUrl: "",
        rating: 0,
        description: ""
    });

    useEffect(() => {
        const fetchBook = async () => {
            if (bookId) {
                try {
                    const response = await axios.get<Book>(`http://localhost:8080/api/books/${bookId}`);
                    const fetchedBook = response.data;
                    setBook(fetchedBook);
                    const formattedPublishedDate = fetchedBook.publishedDate
                        ? new Date(fetchedBook.publishedDate).toISOString().split('T')[0]
                        : "";

                    setBookData({
                        title: fetchedBook.title || "",
                        author: fetchedBook.author || "",
                        publisher: fetchedBook.publisher || "",
                        publishedDate: formattedPublishedDate,
                        isbn: fetchedBook.isbn || "",
                        type: fetchedBook.type || "",
                        imageUrl: fetchedBook.imageUrl || "",
                        rating: fetchedBook.rating || 0,
                        description: fetchedBook.description || ""
                    });
                    setRating(fetchedBook.rating || 0);
                    setStatus("loaded");
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setBookData(prevBookData => ({
            ...prevBookData,
            [name]: value,
        }));
    };

    const handleRatingChange = (rate: number) => {
        setRating(rate);
        setBookData(prevBookData => ({
            ...prevBookData,
            rating: rate,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/books/${bookId}`, bookData);
            console.log('Book updated:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        status === "loaded" ? (
            <div className={vstack({gap: '6'})}>
                <h2>Update Book</h2>
                <form onSubmit={handleSubmit} className={cx(flex({direction: 'column', gap: "1rem"}), css({
                    bg: "white",
                    w: "40%",
                    padding: "1rem"
                }))}>
                    <label>Title</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Author</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />

                    <label>Publisher</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="publisher"
                        value={bookData.publisher}
                        onChange={handleChange}
                    />

                    <label>Published Date</label>
                    <input
                        type="date"
                        className={input({variant: "text"})}
                        name="publishedDate"
                        value={bookData.publishedDate}
                        onChange={handleChange}
                    />

                    <label>ISBN</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                    />

                    <label>Type</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="type"
                        value={bookData.type}
                        onChange={handleChange}
                    />

                    <label>Image URL</label>
                    <input
                        type="text"
                        className={input({variant: "text"})}
                        name="imageUrl"
                        value={bookData.imageUrl}
                        onChange={handleChange}
                    />

                    <label>Rating</label>
                    <Rating
                        onChange={handleRatingChange}
                        value={rating}
                        style={{maxWidth: 250}}
                    />

                    <label>Description:</label>
                    <textarea
                        name="description"
                        className={input({variant: "text"})}
                        value={bookData.description}
                        onChange={handleChange}
                    />

                    <button type="submit" className={button({variant: "outlined"})}>
                        Save Book
                    </button>
                </form>
            </div>
        ) : (
            <div className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                margin: "auto"
            })}>
                <Spinner/>
            </div>
        )
    );
};

export default UpdateForm;
