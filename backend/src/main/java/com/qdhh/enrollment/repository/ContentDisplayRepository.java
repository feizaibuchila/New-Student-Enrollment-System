package com.qdhh.enrollment.repository;

import com.qdhh.enrollment.model.ContentDisplay;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContentDisplayRepository extends MongoRepository<ContentDisplay, String> {

    List<ContentDisplay> findByRoleIn(List<String> roles);
}
