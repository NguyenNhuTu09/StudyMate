package com.example.app.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.app.server.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserName(String userName);
}
