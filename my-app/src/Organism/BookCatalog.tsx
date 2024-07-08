import React, {useEffect, useState} from 'react';
import {Book} from '../Model/Book';
import {useNavigate} from 'react-router-dom';
import BookCard from '../Molecule/BookCard';
import BookModal from '../Molecule/BookModal';
import {fetchBooks, fetchFilterOption} from '../service/service';
import {hstack} from '../../styled-system/patterns';
import {css} from '../../styled-system/css';
import {button} from '../../styled-system/recipes';
import SidebarFilter from "../Molecule/sidebarFilter";
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
        fetchFilterOptions();
    }, []);

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
        status === "loaded" ? (
            <div className={css({maxWidth: '80rem', margin: 'auto', display: 'flex'})}>

                <SidebarFilter
                    authors={authors}
                    types={types}
                    publishers={publishers}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onCheckboxChange={handleCheckboxChange}
                />

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

export default BookCatalog;
