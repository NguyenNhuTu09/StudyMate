package com.example.app.server.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.server.entity.User;
import com.example.app.server.entity.dto.UserDTO;
import com.example.app.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUserName(), user.getEmail(), null))
                .toList();
    }

    public UserDTO getUserById(String id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user.getId(), user.getUserName(), user.getEmail(), null);
    }

    public UserDTO createUser(UserDTO userDTO){
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getUserName(), savedUser.getEmail(), null);
    }

    public User updateUser(String id, User user){
        User user_test = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not found"));

        user_test.setUserName(user.getUserName());
        user_test.setFullName(user.getFullName());
        user_test.setEmail(user.getEmail());
        user_test.setPhoneNumber(user.getPhoneNumber());
        user_test.setDateOfBirth(user.getDateOfBirth());
        user_test.setAvatar(user.getAvatar());
        user_test.setEmail(user.getEmail());

        if(user_test.getPassword() != null && !user_test.getPassword().isEmpty()){
            user_test.setPassword(passwordEncoder.encode(user_test.getPassword()));
        }

        User updatedUser = userRepository.save(user_test);  
        return new User(updatedUser.getId(),
                updatedUser.getFullName(), 
                updatedUser.getUserName(), 
                updatedUser.getPassword(), 
                updatedUser.getEmail(),
                updatedUser.getPhoneNumber(),
                updatedUser.getAvatar(),
                updatedUser.getDateOfBirth(),
                updatedUser.getRole());


    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    public String extractUserId(String token){
        String userName = extractUserId(token);
        return userRepository.findByUserName(userName)
            .orElseThrow(() -> new RuntimeException("User not found"))
            .getId();
    }
}
