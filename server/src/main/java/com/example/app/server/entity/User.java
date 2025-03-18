package com.example.app.server.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Document(collection="users")
public class User {
    @Id
    private String id;
    private String fullName;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private String avatar;
    private Date dateOfBirth;
}
