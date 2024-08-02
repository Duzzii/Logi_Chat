package com.chatiggo.chatigo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
//@SpringBootApplication(scanBasePackages = "com.chatiggo.chatigo")
public class ChatigoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatigoApplication.class, args);
	}

}
