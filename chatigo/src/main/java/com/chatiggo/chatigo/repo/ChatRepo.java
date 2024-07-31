package com.chatiggo.chatigo.repo;


import com.chatiggo.chatigo.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepo extends JpaRepository<Chat, Long> {
}
