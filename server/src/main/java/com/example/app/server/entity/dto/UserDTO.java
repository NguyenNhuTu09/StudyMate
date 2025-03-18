package com.example.app.server.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String userName;
    private String email;
    private String password;
}
