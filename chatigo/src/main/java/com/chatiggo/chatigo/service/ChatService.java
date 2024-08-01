package com.chatiggo.chatigo.service;


import com.chatiggo.chatigo.entity.Chat;

import java.util.List;

public interface ChatService {
    Chat save(Chat chat);
    List<Chat> findByGroupCode(String groupCode);
    List<Chat> findAll();
    void delete(Long id);
    Chat update(Long id, Chat chat);
}
