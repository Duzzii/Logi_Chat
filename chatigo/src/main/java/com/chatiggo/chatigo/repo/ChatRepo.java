package com.chatiggo.chatigo.repo;


import com.chatiggo.chatigo.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// ChatRepository.java
public interface ChatRepo extends JpaRepository<Chat, Long> {
    List<Chat> findByGroupCode(String groupCode);
    // Custom query methods if needed
    // Method to delete all chats by groupCode
    void deleteByGroupCode(String groupCode);
}
