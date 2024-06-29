package com.shrinkr.spring.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "urls")
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private String id;
    private String url;
    @Column(name = "short_id")
    private String shortId;
    @Column(name = "owner_id")
    private String ownerId;
    private int views;
    private Date createdAt;
    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "_id", insertable = false, updatable = false)
    private User user;
}
