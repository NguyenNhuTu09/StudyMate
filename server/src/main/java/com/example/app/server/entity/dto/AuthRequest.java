package com.example.app.server.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String userName;
    private String password;
}
