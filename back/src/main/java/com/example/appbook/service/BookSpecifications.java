package com.example.appbook.service;

import com.example.appbook.model.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecifications {

    public static Specification<Book> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                title == null ? null : criteriaBuilder.like(root.get("title"), "%" + title + "%");
    }

    public static Specification<Book> hasType(String type) {
        return (root, query, criteriaBuilder) ->
                type == null ? null : criteriaBuilder.equal(root.get("type"), type);
    }

    public static Specification<Book> hasAuthor(String author) {
        return (root, query, criteriaBuilder) ->
                author == null ? null : criteriaBuilder.equal(root.get("author"), author);
    }

    public static Specification<Book> hasPublisher(String publisher) {
        return (root, query, criteriaBuilder) ->
                publisher == null ? null : criteriaBuilder.equal(root.get("publisher"), publisher);
    }

    public static Specification<Book> hasRatingBetween(Double ratingMin, Double ratingMax) {
        return (root, query, criteriaBuilder) -> {
            if (ratingMin != null && ratingMax != null) {
                return criteriaBuilder.between(root.get("rating"), ratingMin, ratingMax);
            } else if (ratingMin != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), ratingMin);
            } else if (ratingMax != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("rating"), ratingMax);
            } else {
                return null;
            }
        };
    }
}
