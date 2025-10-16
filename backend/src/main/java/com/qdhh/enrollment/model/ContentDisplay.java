package com.qdhh.enrollment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * Content that can be displayed to specific roles inside the onboarding system.
 */
@Document(collection = "content_display")
public class ContentDisplay {

    @Id
    private String id;

    private String title;

    private String content;

    private Instant publishDate;

    private String author;

    private String role;

    public ContentDisplay() {
    }

    public ContentDisplay(String id, String title, String content, Instant publishDate, String author, String role) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.author = author;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Instant publishDate) {
        this.publishDate = publishDate;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
