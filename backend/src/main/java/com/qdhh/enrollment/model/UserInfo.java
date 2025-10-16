package com.qdhh.enrollment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Year;

/**
 * Represents a WeChat user participating in the Qingdao Huanghai College enrollment system.
 */
@Document(collection = "user_info")
public class UserInfo {

    @Id
    private String openid;

    private String role;

    private String nickname;

    private String avatar;

    private String gender;

    private Integer enrollmentYear;

    public UserInfo() {
    }

    public UserInfo(String openid, String role, String nickname, String avatar, String gender, Integer enrollmentYear) {
        this.openid = openid;
        this.role = role;
        this.nickname = nickname;
        this.avatar = avatar;
        this.gender = gender;
        this.enrollmentYear = enrollmentYear;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getEnrollmentYear() {
        return enrollmentYear;
    }

    public void setEnrollmentYear(Integer enrollmentYear) {
        if (enrollmentYear != null) {
            Year.parse(enrollmentYear.toString());
        }
        this.enrollmentYear = enrollmentYear;
    }
}
