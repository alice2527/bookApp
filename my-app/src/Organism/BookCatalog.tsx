import React, {useEffect, useState} from 'react';
import {Book} from '../Model/Book';
import {useNavigate} from 'react-router-dom';
import BookCard from '../Molecule/BookCard';
import BookModal from '../Molecule/BookModal';
import {fetchBooks} from '../service/service';
import {flex, hstack} from '../../styled-system/patterns';
import {css} from '../../styled-system/css';
import {button} from '../../styled-system/recipes';
import SearchBar from "../Atom/searchBar";
import Spinner from "../Atom/spinner";

const BookCatalog: React.FC = () => {
    const [status, setStatus] = useState('loading');
    const navigate = useNavigate();
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        type: '',
        author: '',
        ratingMin: 0,
        ratingMax: 5,
        publisher: '',
    });
    const [types, setTypes] = useState<string[]>([]);
    const [authors, setAuthors] = useState<string[]>([]);
    const [publishers, setPublishers] = useState<string[]>([]);
    const fetchFilterOptions = async () => {
        try {
            const fetchedTypes = await fetchFilterOption('types');
            const fetchedAuthors = await fetchFilterOption('authors');
            const fetchedPublishers = await fetchFilterOption('publishers');

            setTypes(fetchedTypes);
            setAuthors(fetchedAuthors);
            setPublishers(fetchedPublishers);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };
    useEffect(() => {
        // Fetch filter options (types, authors, publishers)


        fetchFilterOptions();
    }, []);

    const fetchFilterOption = async (option: string): Promise<string[]> => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/${option}`);
            const data = await response.json();

            return data.map((item: any) => item.toLowerCase());
        } catch (error) {
            console.error(`Error fetching ${option} options:`, error);
            return [];
        }
    };

    const fetchAndSetBooks = async (filters: any) => {
        try {
            const fetchedBooks = await fetchBooks(filters);
            setBooks(fetchedBooks);
            setStatus('loaded');
        } catch (error) {
            console.error('Error fetching books:', error);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchAndSetBooks(filters);
    }, [filters]);

    const handleCreateBook = () => {
        navigate('/create-book');
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
        fetchFilterOptions();
        fetchAndSetBooks(filters);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked, value} = event.target;
        setFilters({
            ...filters,
            [name]: checked ? value : '',
        });
    };

    const handleSearch = (searchTerm: string) => {
        setFilters({
            ...filters,
            searchTerm,
        });
    };

    return (
        status === "loaded" ?
            <div className={css({maxWidth: '80rem', margin: 'auto', display: 'flex'})}>

                <div className={css({width: '20%', padding: '1rem', borderRight: '1px solid #ccc'})}>
                    <h3>Filters</h3>

                    <h4>Type</h4>

                    <div className={flex({gap: '0.5rem', direction: 'column'})}>
                        {types.map((type, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="type"
                                    value={type}
                                    onChange={handleCheckboxChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                    <h4>Author</h4>

                    <div className={flex({gap: '0.5rem', direction: 'column'})}>
                        {authors.map((author, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="author"
                                    value={author}
                                    onChange={handleCheckboxChange}
                                />
                                {author}
                            </label>
                        ))}
                    </div>
                    <h4>Publisher</h4>
                    <div className={flex({gap: '0.5rem', direction: 'column'})}>
                        {publishers.map((publisher, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="publisher"
                                    value={publisher}
                                    onChange={handleCheckboxChange}
                                />
                                {publisher}
                            </label>
                        ))}
                    </div>
                    <h4>Rating Range</h4>
                    <label>
                        Min Rating: {filters.ratingMin}
                        <input
                            type="range"
                            name="ratingMin"
                            min="0"
                            max="5"
                            value={filters.ratingMin}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        Max Rating: {filters.ratingMax}
                        <input
                            type="range"
                            name="ratingMax"
                            min="0"
                            max="5"
                            value={filters.ratingMax}
                            onChange={handleFilterChange}
                        />
                    </label>
                </div>

                {/* Main Content */}
                <div className={css({flex: 1})}>
                    <div className={hstack({gap: '2rem'})}>
                        <button onClick={handleCreateBook} className={button({variant: 'outlined'})}>
                            Create New Book
                        </button>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: {
                                sm: 'repeat(1, 1fr)',
                                md: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)',
                            },
                            alignItems: 'center',
                            margin: 'auto',
                        })}
                    >
                        {books.map((book) => (
                            <div key={book.id} onClick={() => openModal(book.id)}>
                                <BookCard book={book}/>
                            </div>
                        ))}
                    </div>
                    <BookModal isOpen={modalIsOpen} onRequestClose={closeModal} bookId={selectedBookId}
                               onBookDeleted={handleBookDeleted}/>
                </div>
            </div> : <div className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                margin: "auto"
            })}>
                <Spinner/>
            </div>
    );
};

export default BookCatalog;
