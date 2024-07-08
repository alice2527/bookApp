package com.example.appbook.controller;

import com.example.appbook.model.Book;
import com.example.appbook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Double ratingMin,
            @RequestParam(required = false) Double ratingMax,
            @RequestParam(required = false) String publisher) {
        return bookService.getAllBooks(searchTerm, type, author, ratingMin, ratingMax, publisher);
    }

    @GetMapping("/sortedByRating/{asc}")
    public List<Book> getAllBooksByRating(@PathVariable String asc) {
        return bookService.getAllBooksSortByRatings(asc);
    }

    @GetMapping("/types")
    public List<String> getAllTypes() {
        return bookService.getAllTypes();
    }

    @GetMapping("/publishers")
    public List<String> getAllPublishers() {
        return bookService.getAllPublishers();
    }

    @GetMapping("/authors")
    public List<String> getAllAuthors() {
        return bookService.getAllAuthors();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @GetMapping("/search/{name}")
    public List<Book> getBooksBySearch(@PathVariable String name) {
        return bookService.searchBook(name);
    }

    @GetMapping("/author/{author}")
    public List<Book> getBooksByAuthor(@PathVariable String author) {
        return bookService.getBookByAuthor(author);
    }

    @GetMapping("/type/{type}")
    public List<Book> getBooksByType(@PathVariable String type) {
        return bookService.getBookByType(type);
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
        Book book = bookService.patchBook(id, bookDetails);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
