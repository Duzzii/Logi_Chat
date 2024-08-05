package com.chatiggo.chatigo.auth;

import com.chatiggo.chatigo.config.JwtService;
import com.chatiggo.chatigo.entity.Role;
import com.chatiggo.chatigo.entity.User;
import com.chatiggo.chatigo.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public boolean emailExists(String email) {
        return repository.existsByEmail(email);
    }

    public User getUserById(Integer userId) {
        return repository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email address already in use");
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User) // Ensure this matches the enum value
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateTokenWithId(user, Math.toIntExact(user.getId()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateTokenWithId(user, Math.toIntExact(user.getId()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public void resetPassword(String email, String newPassword) {
        Optional<User> userOptional = repository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        User user = userOptional.get();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        repository.save(user);
    }
}
