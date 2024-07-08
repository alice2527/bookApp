import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Book} from "../Model/Book";
import BookCard from "../Molecule/BookCard";
import BookModal from "../Molecule/BookModal";
import {button} from "../../styled-system/recipes";
import {css} from "../../styled-system/css";
import Spinner from "../Atom/spinner";
import SearchBar from "../Atom/searchBar";
import {hstack} from "../../styled-system/patterns";
import {fetchBooks} from "../service/service";

const BookCatalog: React.FC = () => {
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAndSetBooks = async (searchTerm: string = "") => {
        try {
            const fetchedBooks = await fetchBooks(searchTerm);
            setBooks(fetchedBooks);
            setStatus("loaded");
        } catch (error) {
            console.error('Error fetching books:', error);
            setStatus("error");
        }
    };

    useEffect(() => {
        fetchAndSetBooks();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchAndSetBooks(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

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
        fetchAndSetBooks(searchTerm);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        status === "loaded" ? (
            <div className={css({maxWidth: "80rem", margin: "auto"})}>
                <div className={hstack({gap: "2rem"})}>
                    <button onClick={handleCreateBook} className={button({variant: "outlined"})}>
                        Create New Book
                    </button>
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <div className={css({
                    display: "grid",
                    gridTemplateColumns: {
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)"
                    },
                    alignItems: "center",
                    margin: "auto"
                })}>
                    {books.map((book) => (
                        <div key={book.id} onClick={() => openModal(book.id)}>
                            <BookCard book={book}/>
                        </div>
                    ))}
                </div>
                <BookModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    bookId={selectedBookId}
                    onBookDeleted={handleBookDeleted}
                />
            </div>
        ) : status === "error" ? (
            <div>Error loading books.</div>
        ) : (
            <div className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                margin: "auto"
            })}>
                <Spinner/>
            </div>
        )
    );
};

export default BookCatalog;
