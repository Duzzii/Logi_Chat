package com.chatiggo.chatigo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import com.chatiggo.chatigo.entity.Chat;
import com.chatiggo.chatigo.service.ChatService;

import java.util.Date;

@Controller
public class WebSocketController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Chat sendMessage(Chat chat, SimpMessageHeaderAccessor headerAccessor) {
        chat.setTimestamp(new Date());
        Chat savedChat = chatService.save(chat);
        return savedChat;
    }
}
