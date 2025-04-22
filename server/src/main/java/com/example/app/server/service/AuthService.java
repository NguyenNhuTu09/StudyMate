package com.example.app.server.service;

import com.example.app.server.entity.User;
import com.example.app.server.entity.dto.AuthRequest;
import com.example.app.server.entity.dto.AuthResponse;
import com.example.app.server.entity.dto.UserDTO;
import com.example.app.server.repository.UserRepository;
import com.example.app.server.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse register(UserDTO userDTO) {
        if (userRepository.existsByUserName(userDTO.getUserName())) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);

        String token = jwtUtil.generateAccessToken(user.getUserName());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUserName());

        return new AuthResponse(token, refreshToken);
    }

    public AuthResponse login(AuthRequest authRequest) {
        // authenticationManager.authenticate(
        //     new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
        // );

        User user = userRepository.findByUserName(authRequest.getUserName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateAccessToken(authRequest.getUserName());
        String refreshToken = jwtUtil.generateRefreshToken(authRequest.getUserName());

        return new AuthResponse(token, refreshToken);
    }

    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);
        if (username != null && !jwtUtil.isTokenExpired(refreshToken)) {
            String newAccessToken = jwtUtil.generateAccessToken(username);
            return new AuthResponse(newAccessToken, refreshToken);
        }
        throw new RuntimeException("Refresh token is invalid or expired.");
    }
}
