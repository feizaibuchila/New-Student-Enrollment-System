package com.qdhh.enrollment.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Year;

/**
 * Represents a WeChat user participating in the Qingdao Huanghai College enrollment system.
 */
@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    @Column(nullable = false, updatable = false, length = 64)
    private String openid;

    @Column(nullable = false, length = 32)
    private String role;

    @Column(length = 64)
    private String nickname;

    @Column(length = 512)
    private String avatar;

    @Column(length = 16)
    private String gender;

    @Column(name = "enrollment_year")
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
