package com.example.appbook.controller;

import com.example.appbook.model.Book;
import com.example.appbook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        if (updatedBook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedBook);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> PatchBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book existingBook = bookService.getBookById(id);
        if (existingBook == null) {
            return ResponseEntity.notFound().build();
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

        bookService.saveBook(existingBook); // Save the updated book entity

        return ResponseEntity.ok(existingBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
