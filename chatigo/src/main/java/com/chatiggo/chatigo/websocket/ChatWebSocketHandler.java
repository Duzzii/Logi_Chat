package com.chatiggo.chatigo.websocket;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.CloseStatus;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket handler for managing chat messages and WebSocket sessions.
 * Handles new connections, incoming messages, and connection closures.
 */
public class ChatWebSocketHandler extends TextWebSocketHandler {

    // A thread-safe set to store all active WebSocket sessions
    private static Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());

    /**
     * Called when a new WebSocket connection is established.
     * @param session The WebSocket session representing the newly connected client.
     * @throws Exception If any error occurs during handling.
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Add the newly established session to the set of active sessions
        sessions.add(session);
    }

    /**
     * Called when a text message is received from a client.
     * @param session The WebSocket session that sent the message.
     * @param message The text message sent by the client.
     * @throws Exception If any error occurs during handling.
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Broadcast the received message to all active WebSocket sessions
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen()) {
                // Send the message to each active session
                webSocketSession.sendMessage(message);
            }
        }
    }

    /**
     * Called when a WebSocket connection is closed.
     * @param session The WebSocket session that was closed.
     * @param status The status code indicating the reason for the closure.
     * @throws Exception If any error occurs during handling.
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove the closed session from the set of active sessions
        sessions.remove(session);
    }
}
