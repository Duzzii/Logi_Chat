package com.chatiggo.chatigo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Configure the message broker for handling messages.
     * @param config The MessageBrokerRegistry to configure.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable a simple in-memory message broker with a destination prefix "/topic"
        config.enableSimpleBroker("/topic");

        // Set the application destination prefix for messages to be sent to the server
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Register STOMP endpoints that clients can use to connect to the WebSocket server.
     * @param registry The StompEndpointRegistry to configure.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register the "/ws" endpoint for WebSocket connections
        registry.addEndpoint("/ws")
                // Allow connections from specific origins (in this case, localhost on port 4200)
                .setAllowedOriginPatterns("http://localhost:4200") // Use patterns or specific origins
                // Enable fallback options for browsers that do not support WebSocket
                .withSockJS();
    }
}
