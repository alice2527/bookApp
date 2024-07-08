import axios from 'axios';
import {Book} from '../Model/Book';

const API_URL = 'http://localhost:8080/api/books';

export const fetchBooks = async (filters: {
    searchTerm?: string;
    type?: string;
    author?: string;
    ratingMin?: number;
    ratingMax?: number;
    publisher?: string
} = {}): Promise<Book[]> => {
    console.log(filters)
    const response = await axios.get<Book[]>(API_URL, {
        params: filters,
    });
    console.log(response.data)
    return response.data;
};

export const fetchBook = async (bookId: number): Promise<Book> => {
    const response = await axios.get<Book>(`${API_URL}/${bookId}`);
    return response.data;
};

export const fetchFilterOption = async (option: string): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/${option}`);
    return response.data;
};

export const updateBook = async (bookId: number, bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.put<Book>(`${API_URL}/${bookId}`, bookData);
    return response.data;
};

export const createBook = async (bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.post<Book>(API_URL, bookData);
    return response.data;
};

export const deleteBook = async (bookId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${bookId}`);
};
