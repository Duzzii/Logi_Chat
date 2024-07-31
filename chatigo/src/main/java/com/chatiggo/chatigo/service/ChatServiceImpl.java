package com.chatiggo.chatigo.service;


import com.chatiggo.chatigo.entity.Chat;
import com.chatiggo.chatigo.repo.ChatRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    public class ChatServiceImpl implements ChatService {

        @Autowired
        private ChatRepo chatRepository;

        @Override
        public Chat save(Chat chat) {
            return chatRepository.save(chat);
        }

        @Override
        public List<Chat> findAll() {
            return chatRepository.findAll();
        }
    }
