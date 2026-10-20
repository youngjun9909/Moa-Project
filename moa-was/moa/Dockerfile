# Build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY gradlew settings.gradle build.gradle ./
COPY gradle gradle
RUN chmod +x gradlew && ./gradlew --no-daemon dependencies > /dev/null 2>&1 || true
COPY src src
RUN ./gradlew --no-daemon bootJar -x test

# Run (small heap so it fits free-tier memory)
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/build/libs/*-SNAPSHOT.jar app.jar
ENV JAVA_TOOL_OPTIONS="-Xmx320m -XX:+UseSerialGC -XX:MaxMetaspaceSize=128m -XX:TieredStopAtLevel=1"
EXPOSE 6060
ENTRYPOINT ["java", "-jar", "app.jar"]
