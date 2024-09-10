# Use a Maven image to build the application
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . .

# Build the Spring Boot application
RUN mvn clean package -DskipTests

# Use a lightweight JDK base image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/your-app-name.jar /app/your-app-name.jar

# Expose the port the Spring Boot app will run on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/your-app-name.jar"]
