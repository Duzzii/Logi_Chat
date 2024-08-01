package com.chatiggo.chatigo.controller;

import com.chatiggo.chatigo.entity.Chat;
import com.chatiggo.chatigo.service.ChatService;
import com.chatiggo.chatigo.service.ChatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// ChatController.java
@RestController
@RequestMapping("/chats")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat savedChat = chatService.save(chat);
        return new ResponseEntity<>(savedChat, HttpStatus.CREATED);
    }

    @GetMapping("/group/{groupCode}")
    public ResponseEntity<List<Chat>> getChatsByGroupCode(@PathVariable String groupCode) {
        List<Chat> chats = chatService.findByGroupCode(groupCode);
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chat> updateChat(@PathVariable Long id, @RequestBody Chat chat) {
        Chat updatedChat = chatService.update(id, chat);
        return new ResponseEntity<>(updatedChat, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long id) {
        chatService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

