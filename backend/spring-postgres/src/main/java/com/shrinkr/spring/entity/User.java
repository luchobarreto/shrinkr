package com.shrinkr.spring.entity;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private Date birthdate;
    private String phone;
    @Column(name = "photo_url")
    private String photoUrl;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Url> urls;

}
