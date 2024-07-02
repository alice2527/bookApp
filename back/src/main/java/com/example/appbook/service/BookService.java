package com.example.appbook.service;

import com.example.appbook.model.Book;
import com.example.appbook.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getAllBooksSortByRatings(String asc) {

        if (asc.equals("asc")) {
            return bookRepository.findAllByOrderByRatingDesc();

        } else {
            return bookRepository.findAllByOrderByRatingAsc();
        }
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public List<Book> getBookByAuthor(String author) {
        List<Book> books = bookRepository.findByAuthor(author);
        System.out.println("Books found for author " + author + ": " + books.size());
        return books;
    }

    public List<Book> getBookByType(String type) {
        List<Book> books = bookRepository.findByType(type);
        System.out.println("Books found for type " + type + ": " + books.size());
        return books;
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublisher(bookDetails.getPublisher());
            book.setPublishedDate(bookDetails.getPublishedDate());
            book.setIsbn(bookDetails.getIsbn());
            book.setRating(bookDetails.getRating());
            book.setDescription(bookDetails.getDescription());
            return bookRepository.save(book);
        }
        return null;
    }

    public Book patchBook(Long id, Book bookDetails) {

        Book existingBook = bookRepository.findById(id).orElse(null);
        if (existingBook == null) {
            return null;
        }

        Optional.ofNullable(bookDetails.getTitle()).ifPresent(existingBook::setTitle);
        Optional.ofNullable(bookDetails.getAuthor()).ifPresent(existingBook::setAuthor);
        Optional.ofNullable(bookDetails.getPublisher()).ifPresent(existingBook::setPublisher);
        Optional.ofNullable(bookDetails.getPublishedDate()).ifPresent(existingBook::setPublishedDate);
        Optional.ofNullable(bookDetails.getIsbn()).ifPresent(existingBook::setIsbn);
        Optional.ofNullable(bookDetails.getType()).ifPresent(existingBook::setType);
        Optional.ofNullable(bookDetails.getImageUrl()).ifPresent(existingBook::setImageUrl);
        if (bookDetails.getRating() != 0) { // Assuming rating is 0 if not set
            existingBook.setRating(bookDetails.getRating());
        }
        Optional.ofNullable(bookDetails.getDescription()).ifPresent(existingBook::setDescription);

        return bookRepository.save(existingBook); // Save the updated book entity
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
