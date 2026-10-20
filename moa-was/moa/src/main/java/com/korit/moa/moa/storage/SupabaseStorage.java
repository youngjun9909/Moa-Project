package com.korit.moa.moa.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

/** Uploads images to a Supabase Storage bucket and builds their public URLs. */
@Component
@ConditionalOnProperty(name = "app.storage.type", havingValue = "supabase")
public class SupabaseStorage {

    private final String baseUrl;
    private final String serviceKey;
    private final String bucket;
    private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

    public SupabaseStorage(
            @Value("${app.storage.supabase.url}") String url,
            @Value("${app.storage.supabase.service-key}") String serviceKey,
            @Value("${app.storage.supabase.bucket}") String bucket
    ) {
        if (url.isBlank() || serviceKey.isBlank() || bucket.isBlank()) {
            throw new IllegalStateException("SUPABASE_URL, SUPABASE_SERVICE_KEY and SUPABASE_BUCKET must be set when STORAGE_TYPE=supabase");
        }
        this.baseUrl = normalizeBaseUrl(url);
        this.serviceKey = serviceKey;
        this.bucket = bucket;
    }

    public void upload(String objectPath, byte[] content, String contentType) throws IOException {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(uploadUrl(objectPath)))
                .timeout(Duration.ofSeconds(30))
                .header("apikey", serviceKey)
                .header("Content-Type", contentType)
                .header("x-upsert", "false")
                .POST(HttpRequest.BodyPublishers.ofByteArray(content));
        // Legacy keys are JWTs and are also sent as a bearer token; new secret keys use the apikey header only.
        if (serviceKey.startsWith("eyJ")) {
            request.header("Authorization", "Bearer " + serviceKey);
        }

        try {
            HttpResponse<String> response = client.send(request.build(), HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() / 100 != 2) {
                throw new IOException("Supabase upload failed: HTTP " + response.statusCode() + " " + response.body());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Supabase upload interrupted", e);
        }
    }

    /** @param encodedObjectPath path whose segments are already URL-encoded */
    public String publicUrl(String encodedObjectPath) {
        return baseUrl + "/storage/v1/object/public/" + bucket + "/" + encodedObjectPath;
    }

    String uploadUrl(String objectPath) {
        return baseUrl + "/storage/v1/object/" + bucket + "/" + encodePath(objectPath);
    }

    /**
     * The dashboard shows several URLs for one project (".../rest/v1", ".../storage/v1/s3", ...).
     * Only the project root is needed, so strip any API path and trailing slashes.
     */
    static String normalizeBaseUrl(String url) {
        String trimmed = url.trim().replaceAll("/+$", "");
        return trimmed.replaceFirst("/(rest|storage|auth|realtime|functions)/v\\d+.*$", "");
    }

    static String encodePath(String objectPath) {
        StringBuilder encoded = new StringBuilder();
        for (String segment : objectPath.split("/")) {
            if (encoded.length() > 0) encoded.append('/');
            encoded.append(URLEncoder.encode(segment, StandardCharsets.UTF_8).replace("+", "%20"));
        }
        return encoded.toString();
    }
}
