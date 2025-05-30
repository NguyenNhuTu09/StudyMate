package com.example.app.server.controller;

import com.example.app.server.entity.dto.AuthRequest;
import com.example.app.server.entity.dto.AuthResponse;
import com.example.app.server.entity.dto.UserDTO;
import com.example.app.server.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        return authService.login(authRequest);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody UserDTO userDTO) {
        return authService.register(userDTO);
    }

    @PostMapping("/refresh-token")
    public AuthResponse refreshToken(@RequestBody String refreshToken) {
        return authService.refreshToken(refreshToken);
    }
}
