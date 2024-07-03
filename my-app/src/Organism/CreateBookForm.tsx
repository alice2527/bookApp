import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './CreateBookForm.css';

import {Rating} from "@smastrom/react-rating";

const CreateBookForm: React.FC = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0)
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        isbn: '',
        type: '',
        imageUrl: '',
        rating: 0,
        description: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };
    const handleRatingChange = (rate: number) => {
        setRating(rate)
        setBookData({
            ...bookData,
            rating: rate, // Convert back to a scale of 1-5
        });
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/books', bookData);
            console.log('Book created:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <div className="book-form-container">
            <h2>Create New Book</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={bookData.title} onChange={handleChange} required/>


                <label>Author:</label>
                <input type="text" name="author" value={bookData.author} onChange={handleChange} required/>


                <label>Publisher:</label>
                <input type="text" name="publisher" value={bookData.publisher} onChange={handleChange}/>


                <label>Published Date:</label>
                <input type="date" name="publishedDate" value={bookData.publishedDate} onChange={handleChange}/>


                <label>ISBN:</label>
                <input type="text" name="isbn" value={bookData.isbn} onChange={handleChange}/>


                <label>Type:</label>
                <input type="text" name="type" value={bookData.type} onChange={handleChange}/>


                <label>Image URL:</label>
                <input type="text" name="imageUrl" value={bookData.imageUrl} onChange={handleChange}/>


                <label>Rating:</label>
                <Rating onChange={handleRatingChange} value={bookData.rating} style={{maxWidth: 250}}/>


                <label>Description:</label>
                <textarea name="description" value={bookData.description} onChange={handleChange}/>


                <button type="submit">Save Book</button>
            </form>
        </div>
    );
};

export default CreateBookForm;
