package com.example.appbook.repository;

import com.example.appbook.model.Book;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAll(Specification<Book> spec);

    List<Book> findByAuthor(String author);

    @Query("SELECT DISTINCT b.type FROM Book b")
    List<String> findAllTypes();

    @Query("SELECT DISTINCT b.publisher FROM Book b")
    List<String> findAllPublishers();

    @Query("SELECT DISTINCT b.author FROM Book b")
    List<String> findAllAuthors();

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByType(String type);

    List<Book> findAllByOrderByRatingDesc();

    List<Book> findAllByOrderByRatingAsc();

}
