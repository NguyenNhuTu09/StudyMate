package com.example.app.server.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.server.entity.User;
import com.example.app.server.entity.dto.AuthRequest;
import com.example.app.server.entity.dto.AuthResponse;
import com.example.app.server.entity.dto.UserDTO;
import com.example.app.server.repository.UserRepository;
import com.example.app.server.utils.CustomUserDetails;
import com.example.app.server.utils.JwtUtil;
import com.example.app.server.utils.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(Role.USER);
        if (userRepository.existsByUserName(userDTO.getUserName())) {
            throw new RuntimeException("User already exists");
        }

        if(userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getUserName());
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
        );

        User user = userRepository.findByUserName(authRequest.getUserName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetails userDetails = new CustomUserDetails(user);
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthResponse(token);
    }
}
