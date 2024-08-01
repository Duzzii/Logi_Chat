package com.chatiggo.chatigo.entity;



import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
// Chat.java
@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String content;
    private String groupCode; // Group Code

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    // Getters and setters
}


