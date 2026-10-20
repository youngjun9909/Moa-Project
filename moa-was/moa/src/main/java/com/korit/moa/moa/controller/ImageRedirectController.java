package com.korit.moa.moa.controller;

import com.korit.moa.moa.storage.SupabaseStorage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

/** Keeps the existing /image/** URLs working by redirecting them to the Supabase public bucket. */
@RestController
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.storage.type", havingValue = "supabase")
public class ImageRedirectController {

    private static final String PREFIX = "/image/";

    private final SupabaseStorage storage;

    @GetMapping(PREFIX + "**")
    public ResponseEntity<Void> redirect(HttpServletRequest request) {
        String encodedPath = request.getRequestURI().substring(PREFIX.length());
        String decoded = URLDecoder.decode(encodedPath, StandardCharsets.UTF_8);
        if (encodedPath.isEmpty() || decoded.contains("..") || decoded.startsWith("/")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, storage.publicUrl(encodedPath))
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600")
                .build();
    }
}
