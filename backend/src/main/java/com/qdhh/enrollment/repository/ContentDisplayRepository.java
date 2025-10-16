package com.qdhh.enrollment.repository;

import com.qdhh.enrollment.model.ContentDisplay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentDisplayRepository extends JpaRepository<ContentDisplay, String> {
    List<ContentDisplay> findByRoleIn(List<String> roles);
}
