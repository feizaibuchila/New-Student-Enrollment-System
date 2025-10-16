package com.qdhh.enrollment.repository;

import com.qdhh.enrollment.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserInfoRepository extends MongoRepository<UserInfo, String> {

    Optional<UserInfo> findByOpenid(String openid);
}
