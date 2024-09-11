# Use a base image for ARM64 architecture
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven build output (the jar file) to the container
COPY target/chatigo-0.0.1-SNAPSHOT.jar /app/chatigo.jar

# Expose the port that the Spring Boot app runs on
EXPOSE 8080

# Set the entry point to run the jar file
ENTRYPOINT ["java", "-jar", "/app/chatigo.jar"]
