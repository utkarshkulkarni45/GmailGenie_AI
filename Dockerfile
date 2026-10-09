# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Set Java release compatibility to 21 for production deployment container
RUN sed -i 's/<java.version>25<\/java.version>/<java.version>21<\/java.version>/g' pom.xml
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/gmailgenie-ai-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Render sets $PORT dynamically, default 8080)
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["sh", "-c", "java -jar -Dserver.port=${PORT:-8080} app.jar"]

