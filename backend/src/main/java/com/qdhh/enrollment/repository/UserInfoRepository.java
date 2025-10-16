package com.qdhh.enrollment.repository;

import com.qdhh.enrollment.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {

    Optional<UserInfo> findByOpenid(String openid);
}
