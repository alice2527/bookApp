import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {flex, vstack} from '../../styled-system/patterns'
import {Rating} from "@smastrom/react-rating";
import {button, input} from "../../styled-system/recipes";
import {css, cx} from "../../styled-system/css";
import {createBook} from "../service/service";

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
            rating: rate,
        });
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await createBook(bookData);
            console.log('Book created:', response);
            navigate('/');
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };


    return (
        <div className={vstack({gap: '6'})}>
            <h2>Create New Book</h2>
            <form onSubmit={handleSubmit} className={cx(flex({direction: 'column', gap: "1rem"}), css({
                bg: "white",
                w: "40%",
                padding: "1rem"
            }))}>
                <label>Title</label>
                <input type="text" className={input({variant: "text"})} name="title" value={bookData.title}
                       onChange={handleChange} required/>

                <label>Author</label>
                <input type="text" className={input({variant: "text"})} name="author" value={bookData.author}
                       onChange={handleChange} required/>

                <label>Publisher</label>
                <input type="text" className={input({variant: "text"})} name="publisher" value={bookData.publisher}
                       onChange={handleChange}/>

                <label>Published Date</label>
                <input type="date" className={input({variant: "text"})} name="publishedDate"
                       value={bookData.publishedDate} onChange={handleChange}/>


                <label>ISBN</label>
                <input type="text" className={input({variant: "text"})} name="isbn" value={bookData.isbn}
                       onChange={handleChange}/>


                <label>Type</label>
                <input type="text" className={input({variant: "text"})} name="type" value={bookData.type}
                       onChange={handleChange}/>


                <label>Image URL</label>
                <input type="text" className={input({variant: "text"})} name="imageUrl" value={bookData.imageUrl}
                       onChange={handleChange}/>


                <label>Rating</label>
                <Rating onChange={handleRatingChange} value={bookData.rating} style={{maxWidth: 250}}/>


                <label>Description:</label>
                <textarea name="description" className={input({variant: "text"})} value={bookData.description}
                          onChange={handleChange}/>


                <button type="submit" className={button({variant: "outlined"})}>Save Book</button>
            </form>
        </div>
    );
};

export default CreateBookForm;
