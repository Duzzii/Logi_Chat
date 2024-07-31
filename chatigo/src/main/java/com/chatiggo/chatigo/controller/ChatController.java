package com.chatiggo.chatigo.controller;

import com.chatiggo.chatigo.entity.Chat;
import com.chatiggo.chatigo.service.ChatService;
import com.chatiggo.chatigo.service.ChatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatServiceImpl chatService;

    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat savedChat = chatService.save(chat);
        return new ResponseEntity<>(savedChat, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Chat>> getAllChats() {
        List<Chat> chats = chatService.findAll();
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    // Optional: Add methods for handling specific chat operations like fetching by ID, deleting, etc.
}
