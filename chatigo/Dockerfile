# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the jar from the build stage
COPY --from=builder /app/target/chatigo-0.0.1-SNAPSHOT.jar /app/chatigo.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "/app/chatigo.jar"]
