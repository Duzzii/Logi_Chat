package com.chatiggo.chatigo.service;


import com.chatiggo.chatigo.entity.Chat;

import java.util.List;

public interface ChatService {
    Chat save(Chat chat);
    List<Chat> findAll();
}
